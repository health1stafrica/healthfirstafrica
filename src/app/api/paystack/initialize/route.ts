import { NextResponse } from "next/server";
import {
  getPaystackSecretKey,
  getSiteUrl,
  isValidDonationAmount,
  isValidEmail,
  MAX_DONATION_NGN,
  MIN_DONATION_NGN,
  sanitizeDonorName,
} from "@/lib/paystack";

export async function POST(request: Request) {
  const secretKey = getPaystackSecretKey();

  if (!secretKey) {
    return NextResponse.json(
      { error: "Payment is not configured on the server." },
      { status: 500 }
    );
  }

  let email: string | undefined;
  let amount: number | undefined;
  let name: string | undefined;

  try {
    const body = await request.json();
    email = typeof body.email === "string" ? body.email.trim() : undefined;
    amount = body.amount;
    name = body.name;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }

  if (!isValidDonationAmount(amount)) {
    return NextResponse.json(
      {
        error: `Enter an amount between ₦${MIN_DONATION_NGN.toLocaleString()} and ₦${MAX_DONATION_NGN.toLocaleString()}.`,
      },
      { status: 400 }
    );
  }

  const amountInKobo = amount * 100;
  const callbackUrl = `${getSiteUrl(request)}/thanks`;
  const donorName = sanitizeDonorName(name);

  try {
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

    const result = await paystackResponse.json();

    if (!paystackResponse.ok || !result.status) {
      return NextResponse.json(
        { error: result.message ?? "Could not start payment." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      authorizationUrl: result.data.authorization_url,
      reference: result.data.reference,
    });
  } catch {
    return NextResponse.json(
      { error: "Could not reach payment provider. Try again shortly." },
      { status: 502 }
    );
  }
}
