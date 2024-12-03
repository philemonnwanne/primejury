import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import Process from "@/components/Process";
import CallToAction from "@/components/CallToAction";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Benefits />
        <Process />
        <CallToAction />
      </main>
    </div>
  );
};

export default Index;