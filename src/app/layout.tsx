import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Load Inter font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://health1stafrica.org"),
  title: "Health First Africa",
  description: "Health First Africa is a leading health NGO in Abuja, Nigeria, dedicated to promoting health and dignity by bridging the gap in healthcare access for underserved populations across Nigeria.",
  keywords: [
    "NGOs in Nigeria",
    "NGOs in Abuja",
    "Health NGOs in Abuja",
    "Healthcare NGO Nigeria",
    "Non-profit organization Abuja",
    "Maternal health NGO Nigeria",
    "Community outreach Abuja",
    "Medical charity Nigeria",
    "Health First Africa",
    "Health 1st Africa"
  ],
  icons: {
    icon: "/logo.png",
  },
  alternates: {
    canonical: "https://health1stafrica.org",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Health First Africa | Top Health NGO in Abuja, Nigeria",
    description: "Promoting health, dignity, and equitable healthcare access for underserved communities across Nigeria.",
    url: "https://health1stafrica.org",
    siteName: "Health First Africa",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Health First Africa Logo",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
};

// Structured Schema.org JSON-LD data to help search engines index the NGO details and site name
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Health First Africa",
    "alternateName": ["Health 1st Africa"],
    "url": "https://health1stafrica.org"
  },
  {
    "@context": "https://schema.org",
    "@type": "NGO",
    "name": "Health First Africa",
    "alternateName": "Health 1st Africa",
    "url": "https://health1stafrica.org",
    "logo": "https://health1stafrica.org/logo.png",
    "description": "Health First Africa is a registered non-profit health NGO in Abuja, Nigeria, dedicated to promoting health and dignity by bridging the gap in healthcare access for underserved populations across Nigeria.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Wing C, House 6, Gold City Estate 2, Airport Road",
      "addressLocality": "Abuja",
      "addressRegion": "FCT",
      "addressCountry": "NG"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+234-906-078-9816",
      "contactType": "customer service",
      "email": "Info@health1stafrica.org",
      "availableLanguage": ["English", "Hausa", "Yoruba", "Igbo"]
    },
  }
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        {/* Inject JSON-LD Schema on all pages */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}

