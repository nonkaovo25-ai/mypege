import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Campaign from "@/components/Campaign";
import Menu from "@/components/Menu";
import Voice from "@/components/Voice";
import FAQ from "@/components/FAQ";
import Reservation from "@/components/Reservation";
import Access from "@/components/Access";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Navbar />
      <main>
        <Hero />
        <Campaign />
        <Menu />
        <Voice />
        <FAQ />
        <Reservation />
        <Access />
      </main>
      <Footer />
    </>
  );
}
