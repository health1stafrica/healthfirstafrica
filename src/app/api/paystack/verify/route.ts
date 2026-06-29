import { NextResponse } from "next/server";
import { verifyPaystackTransaction } from "@/lib/paystack";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let reference: string | undefined;
  let expectedAmount: number | undefined;

  try {
    const body = await request.json();
    reference = body.reference;
    expectedAmount = body.amount;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!reference || typeof reference !== "string") {
    return NextResponse.json(
      { error: "Missing transaction reference." },
      { status: 400 }
    );
  }

  const result = await verifyPaystackTransaction(
    reference,
    typeof expectedAmount === "number" ? expectedAmount : undefined
  );

  if (!result.ok) {
    return NextResponse.json(
      { error: result.error, verified: false },
      { status: result.status }
    );
  }

  return NextResponse.json(result.data);
}
