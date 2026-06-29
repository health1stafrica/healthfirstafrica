import Navbar from "./Navbar";
import Footer from "./Footer";

interface PageShellProps {
  children: React.ReactNode;
  narrow?: boolean;
}

export default function PageShell({ children, narrow = false }: PageShellProps) {
  return (
    <div className="bg-brand-cream text-brand-ink min-h-screen selection:bg-brand-navy/10">
      <Navbar />
      <main
        id="main-content"
        className={`pt-28 pb-16 px-6 md:px-12 lg:px-24 ${
          narrow ? "max-w-xl mx-auto" : "max-w-6xl mx-auto"
        }`}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
