import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donate | Health First Africa",
  description:
    "Support Health First Africa with a secure donation. Your contribution funds community health projects across Nigeria.",
  alternates: {
    canonical: "https://health1stafrica.org/donate",
  },
  openGraph: {
    title: "Donate | Health First Africa",
    description:
      "Support Health First Africa with a secure donation. Your contribution funds community health projects across Nigeria.",
    url: "https://health1stafrica.org/donate",
  },
};

export default function DonateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
