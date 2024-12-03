import { CheckCircle2, Shield, Clock, Users } from "lucide-react";

const benefits = [
  {
    title: "Verified Professionals",
    description: "All legal professionals are thoroughly vetted and verified",
    icon: CheckCircle2,
  },
  {
    title: "Secure Platform",
    description: "Your information is protected with enterprise-grade security",
    icon: Shield,
  },
  {
    title: "Quick Matching",
    description: "Get matched with the right legal professional in minutes",
    icon: Clock,
  },
  {
    title: "Expert Support",
    description: "24/7 support to guide you through the process",
    icon: Users,
  },
];

const Benefits = () => {
  return (
    <div className="py-20 bg-gray-50" id="benefits">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Why Choose legal
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            We make finding legal representation simple and efficient
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="relative p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-12 h-12 mx-auto mb-4 text-primary">
                <benefit.icon className="w-full h-full" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-500">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Benefits;