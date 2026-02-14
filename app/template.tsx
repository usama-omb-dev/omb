import Footer from "@/components/section/Footer";
import Header from "@/components/section/Header";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
