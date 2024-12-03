import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <div className="bg-primary/5 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-500 mb-8">
            Join thousands who have found the right legal representation through our platform
          </p>
          <Button className="bg-primary text-white hover:bg-primary/90 px-8 py-6 text-lg">
            Find Your Lawyer Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;