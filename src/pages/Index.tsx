import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Professionals } from "@/components/Professionals";
import { Categories } from "@/components/Categories";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Professionals />
      <Categories />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
