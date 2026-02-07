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
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-[95%] max-w-7xl z-50 rounded-full transition-all duration-300 ${
          scrolled || isMobileMenuOpen 
            ? "bg-white/90 dark:bg-black/90 backdrop-blur-xl shadow-lg border border-white/20" 
            : "bg-white/80 dark:bg-black/50 backdrop-blur-md border border-white/10"
        }`}
      >
        <div className="px-6 py-3 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center cursor-pointer hover:opacity-80 transition-opacity">
              <Logo className="h-16 md:h-20" /> 
            </div>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((item) => (
              <Link key={item.name} href={item.href}>
                <a className={`px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${
                  location === item.href 
                    ? "bg-primary text-primary-foreground shadow-md" 
                    : "text-foreground/80 hover:bg-secondary hover:text-foreground"
                }`}>
                  {item.name}
                </a>
              </Link>
            ))}
            <div className="w-px h-6 bg-border mx-2 opacity-50" />
            <Link href="/contact">
               <Button className="rounded-full px-6 font-semibold shadow-lg shadow-primary/20">
                 Get Quote
               </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 rounded-full hover:bg-secondary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-24 left-4 right-4 z-40 bg-card border border-border rounded-3xl shadow-2xl overflow-hidden md:hidden"
          >
            <div className="p-4 flex flex-col gap-2">
              {navLinks.map((item) => (
                <Link key={item.name} href={item.href}>
                  <a 
                    className={`text-lg font-medium px-6 py-4 rounded-2xl transition-colors ${
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
              <Link href="/contact">
                 <Button className="w-full rounded-xl py-6 text-lg font-bold shadow-lg">
                   Get a Quote
                 </Button>
              </Link>
              <Link href="/admin">
                 <Button variant="ghost" className="w-full rounded-xl py-6 text-muted-foreground">
                   Admin Login
                 </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
