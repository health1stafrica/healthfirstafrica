import ThankYouClient from "./ThankYouClient";

export const dynamic = "force-dynamic";

interface ThankYouPageProps {
  searchParams: Promise<{
    reference?: string;
    trxref?: string;
  }>;
}

export default async function ThankYouPage({ searchParams }: ThankYouPageProps) {
  const params = await searchParams;
  const reference = params.reference ?? params.trxref ?? null;

  return <ThankYouClient reference={reference} />;
}
