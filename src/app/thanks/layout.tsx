import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank You | Health First Africa",
  description: "Donation confirmation for Health First Africa.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThanksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
