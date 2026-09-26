import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Workflows from "@/components/Workflows";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-bg-primary">
      <Navbar />
      <Hero />
      <Workflows />
      <About />
      <Contact />
    </main>
  );
}
