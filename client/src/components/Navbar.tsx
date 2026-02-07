import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

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
  ];

  const isHome = location === "/";
  const isTransparent = isHome && !scrolled;

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${isTransparent ? 'bg-transparent py-4' : 'bg-[#0F3F40]/90 backdrop-blur-md shadow-lg py-3 border-b border-white/10'}`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <div className="cursor-pointer hover:opacity-80 transition-opacity">
                <img src={logo} alt="FortyNiner Trucking" className="h-24 w-auto object-contain drop-shadow-md" />
              </div>
            </Link>
          </div>

          {/* Center: Navigation Links */}
          <div className="hidden lg:flex items-center gap-8 bg-black/20 backdrop-blur-sm px-8 py-3 rounded-full border border-white/10">
            {navLinks.map((item) => (
              <Link key={item.name} href={item.href}>
                <div className="relative group cursor-pointer">
                  <span className={`text-sm font-medium tracking-wide transition-colors ${
                    location === item.href 
                      ? "text-primary font-bold" 
                      : "text-white/90 group-hover:text-white"
                  }`}>
                    {item.name}
                  </span>
                  {location === item.href && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white/50 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
                </div>
              </Link>
            ))}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-4">
            <Link href="/contact">
              <Button className="hidden lg:flex rounded-full bg-primary hover:bg-primary/90 font-bold text-white shadow-lg shadow-primary/20 px-6">
                Get a Quote
              </Button>
            </Link>
             <button 
               className="lg:hidden p-2 text-white"
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
            className="fixed inset-0 z-[60] bg-[#0F3F40] text-white p-6 lg:hidden"
          >
            <div className="flex justify-between items-center mb-12">
              <div className="h-20 w-auto">
                <img src={logo} alt="FortyNiner Trucking" className="h-full w-auto object-contain" />
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="flex flex-col gap-6">
              {navLinks.map((item) => (
                <Link key={item.name} href={item.href}>
                  <span 
                    className="text-2xl font-bold hover:text-primary transition-colors py-2 border-b border-white/10 cursor-pointer"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </span>
                </Link>
              ))}
              <Link href="/contact">
                <span 
                  className="text-2xl font-bold hover:text-primary transition-colors py-2 border-b border-white/10 cursor-pointer"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact Us
                </span>
              </Link>
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
