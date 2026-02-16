import BakeResult from "@/components/section/BakeResult";
import Footer from "@/components/section/Footer";
import Header from "@/components/section/Header";
import ScrollToTop from "./ScrollToTop";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main suppressHydrationWarning>
        <ScrollToTop />
        {children}
        <BakeResult />
      </main>
      <Footer />
    </>
  );
}
