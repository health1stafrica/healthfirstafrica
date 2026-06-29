"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { AlertCircle, CheckCircle, Heart, Loader2 } from "lucide-react";
import PageShell from "@/app/components/PageShell";
import {
  CONTACT_EMAIL,
  formatNaira,
  koboToNaira,
} from "@/lib/paystack";

type VerifyState = "loading" | "verified" | "failed" | "idle";

function ThankYouFallback() {
  return (
    <PageShell narrow>
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-10 h-10 text-brand-green animate-spin" />
      </div>
    </PageShell>
  );
}

function ThankYouContent() {
  const searchParams = useSearchParams();
  const reference =
    searchParams.get("reference") ?? searchParams.get("trxref") ?? null;

  const [verifyState, setVerifyState] = useState<VerifyState>(
    reference ? "loading" : "idle"
  );
  const [verifyMessage, setVerifyMessage] = useState<string | null>(null);
  const [donationAmount, setDonationAmount] = useState<number | null>(null);

  useEffect(() => {
    if (!reference) {
      return;
    }

    let cancelled = false;

    async function verifyPayment() {
      try {
        const response = await fetch("/api/paystack/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reference }),
        });

        const result = await response.json();

        if (cancelled) return;

        if (response.ok && result.verified) {
          setDonationAmount(koboToNaira(result.amount));
          setVerifyState("verified");
          return;
        }

        setVerifyState("failed");
        setVerifyMessage(
          result.error ?? "We could not confirm your payment. Contact support."
        );
      } catch {
        if (cancelled) return;
        setVerifyState("failed");
        setVerifyMessage("Could not verify your payment. Contact support.");
      }
    }

    verifyPayment();

    return () => {
      cancelled = true;
    };
  }, [reference]);

  return (
    <PageShell narrow>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white w-full p-8 pt-6 rounded-2xl shadow-sm border border-brand-navy/5 text-center"
      >
        {verifyState === "loading" && (
          <>
            <Loader2 className="mx-auto mb-4 text-brand-green w-12 h-12 animate-spin" />
            <h1 className="text-2xl font-bold text-brand-navy mb-3">
              Confirming your payment...
            </h1>
            <p className="text-brand-ink/80 text-sm leading-relaxed">
              Please wait while we verify your donation.
            </p>
          </>
        )}

        {verifyState === "verified" && (
          <>
            <CheckCircle className="mx-auto mb-4 text-brand-green w-12 h-12" />
            <h1 className="text-2xl font-bold text-brand-navy mb-3">
              Thank You for Your Donation!
            </h1>
            {donationAmount !== null && (
              <p className="text-lg font-semibold text-brand-green mb-3">
                {formatNaira(donationAmount)}
              </p>
            )}
            <p className="text-brand-ink/80 mb-6 text-sm leading-relaxed">
              Your generosity makes a real impact. We&apos;re grateful for your
              support in helping us reach more lives and create lasting change.
            </p>
            {reference && (
              <p className="text-xs text-neutral-500 mb-6">
                Reference:{" "}
                <span className="font-mono text-neutral-700">{reference}</span>
              </p>
            )}
            <Link href="/" className="btn-primary mt-4">
              Return Home
            </Link>
          </>
        )}

        {verifyState === "failed" && (
          <>
            <AlertCircle className="mx-auto mb-4 text-red-500 w-12 h-12" />
            <h1 className="text-2xl font-bold text-brand-navy mb-3">
              Payment not confirmed
            </h1>
            <p className="text-brand-ink/80 mb-4 text-sm leading-relaxed">
              {verifyMessage}
            </p>
            {reference && (
              <p className="text-xs text-neutral-500 mb-4">
                Reference:{" "}
                <span className="font-mono text-neutral-700">{reference}</span>
              </p>
            )}
            <p className="text-xs text-neutral-500 mb-6">
              If you were charged, email{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-brand-green hover:underline"
              >
                {CONTACT_EMAIL}
              </a>{" "}
              with your reference.
            </p>
            <Link href="/donate" className="btn-secondary mt-2">
              Try Again
            </Link>
          </>
        )}

        {verifyState === "idle" && (
          <>
            <Heart className="mx-auto mb-4 text-brand-green w-12 h-12" />
            <h1 className="text-2xl font-bold text-brand-navy mb-3">
              Donation confirmation
            </h1>
            <p className="text-brand-ink/80 mb-6 text-sm leading-relaxed">
              This page confirms completed donations. If you just paid, wait a
              moment and refresh. Otherwise, start a new donation below.
            </p>
            <Link href="/donate" className="btn-primary">
              Make a Donation
            </Link>
          </>
        )}
      </motion.div>
    </PageShell>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={<ThankYouFallback />}>
      <ThankYouContent />
    </Suspense>
  );
}
