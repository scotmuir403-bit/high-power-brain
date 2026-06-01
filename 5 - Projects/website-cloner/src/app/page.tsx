import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import ProductGrid from "@/components/ProductGrid";
import VIPBanner from "@/components/VIPBanner";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Countdown />
      <ProductGrid />
      <VIPBanner />
      <Gallery />
      <Footer />
    </main>
  );
}
