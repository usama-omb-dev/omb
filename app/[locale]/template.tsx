import BakeResult from "@/components/section/BakeResult";
import Footer from "@/components/section/Footer";
import Header from "@/components/section/Header";
import ScrollToTop from "./ScrollToTop";
import { Toaster } from "@/components/ui/sonner";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main suppressHydrationWarning>
        <ScrollToTop />
        {children}
        <Toaster />
        <BakeResult />
      </main>
      <Footer />
    </>
  );
}
