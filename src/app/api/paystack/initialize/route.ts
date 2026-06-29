import { NextResponse } from "next/server";
import {
  getPaystackSecretKey,
  getSiteUrl,
  isValidDonationAmount,
  isValidEmail,
  MAX_DONATION_NGN,
  MIN_DONATION_NGN,
  normalizeDonationAmount,
  sanitizeDonorName,
} from "@/lib/paystack";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const secretKey = getPaystackSecretKey();

    if (!secretKey) {
      return NextResponse.json(
        {
          error:
            "Payment is not configured. Set PAYSTACK_SECRET_KEY in your hosting environment and redeploy.",
        },
        { status: 500 }
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const payload = body as {
      email?: unknown;
      amount?: unknown;
      name?: unknown;
    };

    const email =
      typeof payload.email === "string" ? payload.email.trim() : undefined;
    const amount = normalizeDonationAmount(payload.amount);
    const name = payload.name;

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "A valid email is required." },
        { status: 400 }
      );
    }

    if (amount === null || !isValidDonationAmount(amount)) {
      return NextResponse.json(
        {
          error: `Enter a whole amount between ₦${MIN_DONATION_NGN.toLocaleString()} and ₦${MAX_DONATION_NGN.toLocaleString()}.`,
        },
        { status: 400 }
      );
    }

    const amountInKobo = amount * 100;
    const callbackUrl = `${getSiteUrl(request)}/thanks`;
    const donorName = sanitizeDonorName(name);

    const paystackResponse = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${secretKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          amount: amountInKobo,
          currency: "NGN",
          callback_url: callbackUrl,
          metadata: {
            source: "healthfirstafrica_website",
            custom_fields: [
              {
                display_name: "Donor Name",
                variable_name: "donor_name",
                value: donorName,
              },
            ],
          },
        }),
        cache: "no-store",
      }
    );

    let result: {
      status?: boolean;
      message?: string;
      data?: { authorization_url?: string; reference?: string };
    };

    try {
      result = await paystackResponse.json();
    } catch {
      return NextResponse.json(
        { error: "Payment provider returned an invalid response." },
        { status: 502 }
      );
    }

    if (!paystackResponse.ok || !result.status || !result.data?.authorization_url) {
      return NextResponse.json(
        { error: result.message ?? "Could not start payment." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      authorizationUrl: result.data.authorization_url,
      reference: result.data.reference,
    });
  } catch (error) {
    console.error("[paystack/initialize]", error);
    return NextResponse.json(
      { error: "Payment service failed. Please try again shortly." },
      { status: 500 }
    );
  }
}
