import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Logo from "./Logo";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "glass-effect shadow-sm" : ""}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Logo />
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">
              How it Works
            </a>
            <a href="#benefits" className="text-gray-600 hover:text-gray-900 transition-colors">
              Benefits
            </a>
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
              Sign In
            </Button>
            <Button className="bg-primary text-white hover:bg-primary/90">
              Get Started
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;