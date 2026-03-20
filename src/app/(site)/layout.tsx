import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </>
  );
}
