import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
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
    { name: "Services", href: "/services" },
    { name: "Fleet", href: "/fleet" },
    { name: "Careers", href: "/careers" },
    { name: "Subhaulers", href: "/subhaulers" },
    { name: "Contact", href: "/contact" }
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-xl border-b border-border/50 py-2 shadow-sm" : "bg-background/80 backdrop-blur-md py-4 border-b border-border/20"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center cursor-pointer hover:opacity-90 transition-opacity">
            <Logo className="h-20 md:h-24" /> 
          </div>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((item) => (
            <Link key={item.name} href={item.href}>
              <a className={`px-4 py-2 text-sm font-semibold rounded-full transition-all ${
                location === item.href 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}>
                {item.name}
              </a>
            </Link>
          ))}
          <div className="w-px h-6 bg-border mx-2" />
          <Link href="/admin">
             <Button variant="ghost" size="sm" className="font-semibold text-muted-foreground hover:text-foreground">
               Login
             </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 rounded-full transition-colors text-foreground hover:bg-secondary"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-b border-border bg-background overflow-hidden"
          >
            <div className="p-4 flex flex-col gap-2">
              {navLinks.map((item) => (
                <Link key={item.name} href={item.href}>
                  <a 
                    className={`text-base font-medium px-4 py-3 rounded-lg transition-colors ${
                      location === item.href
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-secondary"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                </Link>
              ))}
              <div className="h-px bg-border my-2" />
              <Link href="/admin">
                 <Button variant="secondary" className="w-full font-bold justify-start px-4">
                   Portal Login
                 </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
