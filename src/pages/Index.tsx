import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <main className="bg-background">
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <Pricing />
      <Contact />
    </main>
  );
};

export default Index;
