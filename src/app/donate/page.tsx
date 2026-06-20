"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

// Declaring Paystack on the window object for TypeScript
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    PaystackPop: any;
  }
}

export default function Donate() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [loading, setLoading] = useState(false);

  // Updated presets to match a 1,000 NGN minimum baseline cleaner
  const presetAmounts = [2000, 5000, 10000, 25000];

  const handlePaystackPayment = (e: React.FormEvent) => {
    e.preventDefault();

    // Enforce 1k minimum rule on form submission
    if (!email || !amount || Number(amount) < 1000) {
      alert("The minimum donation amount is ₦1,000.");
      return;
    }

    setLoading(true);

    // Dynamically load the Paystack script if it `&#39;`s not already loaded
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;

    script.onload = () => {
      // Forcefully inject custom CSS directly into the document to size up the checkout wrapper container
      const styleNode = document.createElement("style");
      styleNode.id = "paystack-modal-sizing-override";
      styleNode.innerHTML = `
        @media (min-width: 768px) {
          #paystack-wrapper, 
          iframe[name="paystack-checkout-iframe"],
          div[style*="max-width: 400px"], 
          div[style*="width: 400px"] {
            max-width: 550px !important;
            width: 550px !important;
            height: 650px !important;
          }
        }
      `;
      document.head.appendChild(styleNode);

      const handler = window.PaystackPop.setup({
        key: "pk_test_3da0320b4ef3fc9240bbfbb0d577ae3e6d15b407", 
        email: email,
        amount: Number(amount) * 100, 
        currency: "NGN",
        metadata: {
          custom_fields: [
            {
              display_name: "Donor Name",
              variable_name: "donor_name",
              value: name,
            },
          ],
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        callback: function (response: any) {
          setLoading(false);
          // Clean up sizing node styles on success callback wrapper termination
          document.getElementById("paystack-modal-sizing-override")?.remove();
          alert(`Thank you for your donation! Reference: ${response.reference}`);
          setName("");
          setEmail("");
          setAmount("");
        },
        onClose: function () {
          setLoading(false);
          // Clean up sizing node styles on interface modal exit
          document.getElementById("paystack-modal-sizing-override")?.remove();
          alert("Transaction cancelled.");
        },
      });

      handler.openIframe();
    };

    script.onerror = () => {
      setLoading(false);
      alert("Failed to load Paystack SDK. Please check your internet connection.");
    };

    document.body.appendChild(script);
  };

  return (
    <section className="bg-[#F9F5EF] min-h-screen py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-xl mx-auto">
        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link
            href="/"
            className="inline-block text-[#3C8A4E] font-medium hover:underline"
          >
            ← Back to Home
          </Link>
        </motion.div>

        {/* Logo */}
        <Link href="/" className="flex flex-col items-center mb-8">
          <Image
            src="/logo.png"
            alt="NGO Logo"
            width={90}
            height={90}
            className="rounded-full object-contain"
          />
        </Link>

        {/* Donation Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-neutral-100"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#194E6B] mb-2 text-center">
            Support Our Cause
          </h2>
          <p className="text-sm text-neutral-500 text-center mb-8">
            Your dynamic contributions directly fund our local community projects.
          </p>

          <form onSubmit={handlePaystackPayment} className="space-y-5">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Full Name (Optional)
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-[#3C8A4E] focus:border-transparent outline-none transition text-black"
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="johndoe@example.com"
                className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-[#3C8A4E] focus:border-transparent outline-none transition text-black"
              />
            </div>

            {/* Quick Amount Selection */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Select Amount (NGN)
              </label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 mb-3">
                {presetAmounts.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setAmount(preset)}
                    className={`py-2 px-3 text-sm font-medium rounded-lg border transition ${
                      amount === preset
                        ? "bg-[#3C8A4E] text-white border-[#3C8A4E]"
                        : "bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50"
                    }`}
                  >
                    ₦{preset.toLocaleString()}
                  </button>
                ))}
              </div>

              {/* Custom Amount Input */}
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 font-medium">
                  ₦
                </span>
                <input
                  type="number"
                  required
                  min="1000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
                  placeholder="Other Amount (Min ₦1,000)"
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-[#3C8A4E] focus:border-transparent outline-none transition text-black"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#3C8A4E] hover:bg-[#327441] text-white font-semibold py-3 px-4 rounded-lg transition dynamic-shadow disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
              {loading ? "Processing..." : `Donate ₦${amount ? Number(amount).toLocaleString() : "0"}`}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}