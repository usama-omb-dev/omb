import BakeResult from "@/components/section/BakeResult";
import Footer from "@/components/section/Footer";
import Header from "@/components/section/Header";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>
        {children}
        <BakeResult />
      </main>
      <Footer />
    </>
  );
}
