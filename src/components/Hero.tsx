import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-8">
            Find the Right Legal
            <span className="block text-primary">Representation</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-xl text-gray-500 sm:text-2xl md:mt-5 md:max-w-3xl">
            Simplifying the process of connecting with qualified legal professionals. Get expert legal help in minutes.
          </p>
          <div className="mt-10 flex justify-center gap-x-6">
            <Button className="bg-primary text-white hover:bg-primary/90 px-8 py-6 text-lg">
              Get Started Now
            </Button>
            <Button variant="outline" className="px-8 py-6 text-lg">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;