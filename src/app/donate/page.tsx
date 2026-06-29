"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AlertCircle, Heart, Lock, ShieldCheck } from "lucide-react";
import PageShell from "@/app/components/PageShell";
import {
  formatNaira,
  MAX_DONATION_NGN,
  MIN_DONATION_NGN,
} from "@/lib/paystack";

const PRESET_AMOUNTS = [2000, 5000, 10000, 25000];

const IMPACT_POINTS = [
  "Community health outreach in underserved areas",
  "Maternal and child health support programmes",
  "Medical supplies for vulnerable populations",
];

export default function DonatePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!errorMessage) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setErrorMessage(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [errorMessage]);

  useEffect(() => {
    // Reset the redirecting state when the user returns to this page
    // (e.g. cancels on Paystack or hits back), including from the bfcache.
    const resetLoading = () => setLoading(false);

    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        resetLoading();
      }
    };

    window.addEventListener("pageshow", onPageShow);
    window.addEventListener("focus", resetLoading);

    return () => {
      window.removeEventListener("pageshow", onPageShow);
      window.removeEventListener("focus", resetLoading);
    };
  }, []);

  const closeError = () => setErrorMessage(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    if (!email || !amount || Number(amount) < MIN_DONATION_NGN) {
      setErrorMessage(
        `The minimum donation amount is ${formatNaira(MIN_DONATION_NGN)}.`
      );
      return;
    }

    if (Number(amount) > MAX_DONATION_NGN) {
      setErrorMessage(
        `The maximum donation amount is ${formatNaira(MAX_DONATION_NGN)}.`
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          amount: Number(amount),
          name,
        }),
      });

      const raw = await response.text();
      let result: { authorizationUrl?: string; error?: string } = {};

      if (raw) {
        try {
          result = JSON.parse(raw) as typeof result;
        } catch {
          setLoading(false);
          setErrorMessage(
            `Server error (${response.status}). Payment could not be started. Please try again or contact support.`
          );
          return;
        }
      }

      if (!response.ok || !result.authorizationUrl) {
        setLoading(false);
        setErrorMessage(result.error ?? "Could not start payment. Try again.");
        return;
      }

      window.location.href = result.authorizationUrl;
    } catch {
      setLoading(false);
      setErrorMessage(
        "Could not reach the payment service. Check your connection and try again."
      );
    }
  };

  return (
    <PageShell narrow>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-brand-navy/5"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-brand-navy mb-2 text-center">
          Support Our Cause
        </h1>
        <p className="text-sm text-neutral-500 text-center mb-6">
          You&apos;ll be redirected to Paystack&apos;s secure checkout to
          complete your donation.
        </p>

        <div className="mb-8 rounded-xl bg-brand-cream p-4">
          <div className="flex items-center gap-2 text-sm font-medium text-brand-navy mb-3">
            <Heart className="w-4 h-4 text-brand-green" aria-hidden="true" />
            Where your donation goes
          </div>
          <ul className="space-y-2 text-sm text-neutral-600">
            {IMPACT_POINTS.map((point) => (
              <li key={point} className="flex gap-2">
                <span className="text-brand-green" aria-hidden="true">
                  •
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div>
            <label
              htmlFor="donor-name"
              className="block text-sm font-medium text-neutral-700 mb-1"
            >
              Full Name (Optional)
            </label>
            <input
              id="donor-name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="John Doe"
              maxLength={100}
              className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition text-black"
            />
          </div>

          <div>
            <label
              htmlFor="donor-email"
              className="block text-sm font-medium text-neutral-700 mb-1"
            >
              Email Address *
            </label>
            <input
              id="donor-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="johndoe@example.com"
              className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition text-black"
            />
          </div>

          <fieldset>
            <legend className="block text-sm font-medium text-neutral-700 mb-2">
              Select Amount (NGN)
            </legend>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 mb-3">
              {PRESET_AMOUNTS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  aria-pressed={amount === preset}
                  onClick={() => setAmount(preset)}
                  className={`py-2 px-3 text-sm font-medium rounded-lg border transition ${
                    amount === preset
                      ? "bg-brand-green text-white border-brand-green"
                      : "bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50"
                  }`}
                >
                  {formatNaira(preset)}
                </button>
              ))}
            </div>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 font-medium">
                ₦
              </span>
              <input
                type="number"
                required
                inputMode="numeric"
                min={MIN_DONATION_NGN}
                max={MAX_DONATION_NGN}
                step={1}
                value={amount}
                onChange={(event) =>
                  setAmount(
                    event.target.value === "" ? "" : Number(event.target.value)
                  )
                }
                placeholder={`Other amount (min ${formatNaira(MIN_DONATION_NGN)})`}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition text-black"
              />
            </div>
          </fieldset>

          <button
            type="submit"
            disabled={loading}
            aria-busy={loading}
            className="btn-primary w-full mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? "Redirecting to checkout..."
              : `Donate ${amount ? formatNaira(Number(amount)) : formatNaira(0)}`}
          </button>

          <div className="flex flex-col gap-2 pt-1 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
            <span className="inline-flex items-center justify-center gap-1.5">
              <Lock className="w-3.5 h-3.5" aria-hidden="true" />
              Secure checkout via Paystack
            </span>
            <span className="inline-flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
              Card, bank transfer &amp; USSD accepted
            </span>
          </div>
        </form>
      </motion.div>

      <AnimatePresence>
        {errorMessage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            onClick={closeError}
            role="presentation"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="donate-error-title"
              aria-describedby="donate-error-message"
              onClick={(event) => event.stopPropagation()}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-xl max-w-md w-full text-center"
            >
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2
                id="donate-error-title"
                className="text-xl font-bold text-brand-navy mb-2"
              >
                Something went wrong
              </h2>
              <p id="donate-error-message" className="text-neutral-600 mb-6">
                {errorMessage}
              </p>
              <button
                type="button"
                onClick={closeError}
                className="w-full btn-secondary"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PageShell>
  );
}
