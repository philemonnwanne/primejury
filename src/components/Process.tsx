import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Describe Your Need",
    description: "Tell us about your legal situation and requirements",
  },
  {
    number: "02",
    title: "Get Matched",
    description: "We'll connect you with qualified legal professionals",
  },
  {
    number: "03",
    title: "Choose Your Lawyer",
    description: "Review profiles and select the best match for you",
  },
];

const Process = () => {
  return (
    <div className="py-20" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            Three simple steps to find your legal representative
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex flex-col items-center">
                <span className="text-4xl font-bold text-primary mb-4">
                  {step.number}
                </span>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-center">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/4 right-0 transform translate-x-1/2">
                  <ArrowRight className="w-6 h-6 text-gray-300" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Process;