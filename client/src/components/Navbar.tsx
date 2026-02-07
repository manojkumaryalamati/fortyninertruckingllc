import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/Logo";

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
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Fleet", href: "/fleet" },
    { name: "Contact Us", href: "/contact" }
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 py-6 px-8 flex items-center justify-between pointer-events-none">
        {/* Left: Logo */}
        <div className="pointer-events-auto">
          <Link href="/">
            <div className="cursor-pointer hover:opacity-80 transition-opacity">
              <Logo className="h-12 text-white" /> 
            </div>
          </Link>
        </div>

        {/* Center: Navigation Pill */}
        <div className="hidden md:flex pointer-events-auto absolute left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md rounded-full px-2 py-1.5 items-center gap-1 border border-white/10 shadow-xl">
          {navLinks.map((item) => (
            <Link key={item.name} href={item.href}>
              <a className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                location === item.href 
                  ? "bg-white text-black font-bold shadow-sm" 
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              }`}>
                {item.name}
              </a>
            </Link>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 pointer-events-auto">
           <Button variant="outline" size="icon" className="rounded-full h-10 w-10 bg-white/10 backdrop-blur border-white/20 text-white hover:bg-white/20">
             <span className="text-xs font-bold">EN</span>
           </Button>
           <Button 
             variant="outline" 
             size="icon" 
             className="rounded-full h-10 w-10 bg-white/10 backdrop-blur border-white/20 text-white hover:bg-white/20"
             onClick={() => setIsMobileMenuOpen(true)}
           >
             <Menu size={20} />
           </Button>
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
            className="fixed inset-0 z-[60] bg-black text-white p-6 md:hidden"
          >
            <div className="flex justify-between items-center mb-12">
              <Logo className="h-10 text-white" />
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="flex flex-col gap-4">
              {navLinks.map((item) => (
                <Link key={item.name} href={item.href}>
                  <a 
                    className="text-3xl font-bold hover:text-primary transition-colors py-2 border-b border-white/10"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                </Link>
              ))}
              <div className="mt-8">
                 <Button className="w-full rounded-full py-6 text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90">
                   Get a Quote
                 </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
