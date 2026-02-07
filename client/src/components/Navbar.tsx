import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Our Trucks", href: "/fleet" },
    { name: "Careers", href: "/careers" },
    { name: "Subhaulers", href: "/subhaulers" },
    { name: "Contact Us", href: "/contact" }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4 border-b border-border/50' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <div className="cursor-pointer hover:opacity-80 transition-opacity">
                <span className="text-xl font-bold tracking-tight text-foreground">FortyNinerTrucking</span>
              </div>
            </Link>
          </div>

          {/* Center: Navigation Links */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((item) => (
              <Link key={item.name} href={item.href}>
                <a className={`text-sm font-medium tracking-wide transition-colors ${
                  location === item.href 
                    ? "text-primary font-semibold" 
                    : "text-muted-foreground hover:text-foreground"
                }`}>
                  {item.name}
                </a>
              </Link>
            ))}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-4">
             <button 
               className="lg:hidden p-2 text-foreground"
               onClick={() => setIsMobileMenuOpen(true)}
             >
               <Menu size={28} />
             </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-white text-black p-6 lg:hidden"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-xl font-bold">FortyNinerTrucking</span>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="flex flex-col gap-6">
              {navLinks.map((item) => (
                <Link key={item.name} href={item.href}>
                  <a 
                    className="text-2xl font-bold hover:text-primary transition-colors py-2 border-b border-gray-100"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                </Link>
              ))}
              <div className="mt-8">
                 <Button className="w-full rounded-full py-6 text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center gap-2">
                   <Phone size={20} fill="currentColor" />
                   Call Now
                 </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
