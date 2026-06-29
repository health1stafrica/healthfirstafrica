export function normalizeEnvValue(value: string | undefined): string {
  return (value ?? "").trim().replace(/^['"]|['"]$/g, "");
}

export function getPaystackSecretKey(): string | null {
  const key = normalizeEnvValue(process.env.PAYSTACK_SECRET_KEY);

  if (!key || !/^sk_(test|live)_/i.test(key)) {
    return null;
  }

  return key;
}

export function getSiteUrl(request: Request): string {
  const envUrl = normalizeEnvValue(process.env.NEXT_PUBLIC_SITE_URL);
  if (envUrl) {
    return envUrl.replace(/\/$/, "");
  }

  const forwardedHost = request.headers.get("x-forwarded-host");
  const host = forwardedHost ?? request.headers.get("host");

  if (host) {
    const protocol =
      request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim() ??
      "https";
    return `${protocol}://${host}`.replace(/\/$/, "");
  }

  const origin = request.headers.get("origin");
  if (origin) {
    return origin.replace(/\/$/, "");
  }

  return "http://localhost:3000";
}

export const MIN_DONATION_NGN = 1000;
export const MAX_DONATION_NGN = 10_000_000;
export const CONTACT_EMAIL = "Info@health1stafrica.org";

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function isValidReference(reference: string): boolean {
  return /^[a-zA-Z0-9._-]{5,100}$/.test(reference);
}

export function sanitizeDonorName(name: unknown): string {
  if (typeof name !== "string") {
    return "Anonymous";
  }

  const trimmed = name.trim().slice(0, 100);
  return trimmed || "Anonymous";
}

export function normalizeDonationAmount(amount: unknown): number | null {
  if (typeof amount === "number" && Number.isFinite(amount)) {
    return Math.round(amount);
  }

  if (typeof amount === "string" && amount.trim() !== "") {
    const parsed = Number(amount);
    if (Number.isFinite(parsed)) {
      return Math.round(parsed);
    }
  }

  return null;
}

export function isValidDonationAmount(amount: unknown): amount is number {
  const normalized = typeof amount === "number" ? amount : normalizeDonationAmount(amount);

  return (
    normalized !== null &&
    Number.isInteger(normalized) &&
    normalized >= MIN_DONATION_NGN &&
    normalized <= MAX_DONATION_NGN
  );
}

export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

export function koboToNaira(kobo: number): number {
  return kobo / 100;
}

export interface VerifyResult {
  verified: true;
  reference: string;
  amount: number;
  currency: string;
}

export async function verifyPaystackTransaction(
  reference: string,
  expectedAmountKobo?: number
): Promise<
  | { ok: true; data: VerifyResult }
  | { ok: false; error: string; status: number }
> {
  const secretKey = getPaystackSecretKey();

  if (!secretKey) {
    return {
      ok: false,
      error: "Payment verification is not configured.",
      status: 500,
    };
  }

  if (!isValidReference(reference)) {
    return { ok: false, error: "Invalid transaction reference.", status: 400 };
  }

  try {
    const paystackResponse = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        headers: { Authorization: `Bearer ${secretKey}` },
        cache: "no-store",
      }
    );

    const result = await paystackResponse.json();

    if (!paystackResponse.ok || !result.status) {
      return {
        ok: false,
        error: result.message ?? "Unable to verify transaction.",
        status: 400,
      };
    }

    const transaction = result.data;

    if (transaction.status !== "success") {
      return {
        ok: false,
        error: "Transaction was not successful.",
        status: 400,
      };
    }

    if (
      typeof expectedAmountKobo === "number" &&
      transaction.amount !== expectedAmountKobo
    ) {
      return {
        ok: false,
        error: "Transaction amount does not match.",
        status: 400,
      };
    }

    return {
      ok: true,
      data: {
        verified: true,
        reference: transaction.reference,
        amount: transaction.amount,
        currency: transaction.currency,
      },
    };
  } catch {
    return {
      ok: false,
      error: "Could not reach payment provider.",
      status: 502,
    };
  }
}
