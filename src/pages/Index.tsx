import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Concept from "@/components/Concept";
import Domain from "@/components/Domain";
import DomainFeatures from "@/components/DomainFeatures";
import VillaModels from "@/components/VillaModels";
import FeaturedOffers from "@/components/FeaturedOffers";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <Concept />
      <Domain />
      <DomainFeatures />
      <VillaModels />
      <FeaturedOffers />
      <Gallery />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
