import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo_v6.png";

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
    { name: "Certifications", href: "/certifications" },
    { name: "Careers", href: "/careers" },
    { name: "Subhaulers", href: "/subhaulers" },
  ];

  const isHome = location === "/";
  // Always solid background when scrolled, transparent only at very top of home
  const navbarClasses = scrolled 
    ? "bg-white/90 backdrop-blur-md shadow-sm py-2 border-b border-zinc-200" 
    : "bg-transparent py-4 border-b border-white/10";

  return (
    <>
      {/* Top Bar - Hidden on mobile, visible on desktop */}
      <div className={`hidden lg:block fixed top-0 left-0 right-0 z-[51] w-full transition-all duration-300 ${scrolled ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'} h-10 bg-black text-white/80 border-b border-white/5`}>
        <div className="w-full max-w-[1800px] mx-auto px-8 h-full flex justify-between items-center text-xs font-medium tracking-wide">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer">
              <Phone size={14} className="text-primary" /> (925) 250-4605
            </span>
            <span className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer">
              <Mail size={14} className="text-primary" /> fortyninertrucking@gmail.com
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <Clock size={14} className="text-primary" /> Mon - Fri: 7:00 AM - 5:00 PM
            </span>
            <Link href="/contact">
               <span className="text-primary hover:text-white transition-colors cursor-pointer font-bold">Request A Quote &rarr;</span>
            </Link>
          </div>
        </div>
      </div>

      <nav className={`fixed left-0 right-0 z-50 w-full transition-all duration-300 ${scrolled ? 'top-0' : 'top-0 lg:top-10'} ${navbarClasses}`}>
        <div className="w-full max-w-[1800px] mx-auto px-4 md:px-8 flex items-center justify-between h-20">
          
          {/* Logo Area */}
          <div className="flex-shrink-0 relative h-full flex items-center">
            <Link href="/">
              <div className="cursor-pointer hover:opacity-90 transition-opacity relative group h-full flex items-center">
                   <img 
                    src={logo} 
                    alt="FortyNiner Trucking" 
                    className={`transition-all duration-300 ${scrolled ? 'w-24 brightness-0' : 'w-28 brightness-0 invert'} object-contain drop-shadow-md`}
                  />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((item) => (
              <Link key={item.name} href={item.href}>
                <div className={`
                  relative px-5 py-2 rounded-full cursor-pointer transition-all duration-300 group
                  ${location === item.href 
                    ? (scrolled ? "text-primary font-bold bg-primary/10" : "text-white font-bold bg-white/10") 
                    : (scrolled ? "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100" : "text-white/80 hover:text-white hover:bg-white/5")
                  }
                `}>
                  <span className="text-sm tracking-wide uppercase font-semibold">{item.name}</span>
                  {location === item.href && (
                    <motion.div
                      layoutId="nav-pill"
                      className={`absolute inset-0 rounded-full border ${scrolled ? "border-primary/50" : "border-primary/50"}`}
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </div>
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            
             <button 
               className={`lg:hidden p-2 rounded-md transition-colors ${scrolled ? "text-zinc-900 hover:bg-zinc-100" : "text-white hover:bg-white/10"}`}
               onClick={() => setIsMobileMenuOpen(true)}
             >
               <Menu size={32} />
             </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Unchanged mostly, just styling tweaks */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-zinc-950 text-white p-0 lg:hidden flex flex-col"
          >
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <div className="h-12 w-auto relative flex items-center">
                 <img src={logo} alt="FortyNiner Trucking" className="h-full w-auto object-contain brightness-0 invert" />
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 flex flex-col justify-center gap-2">
              {navLinks.map((item, idx) => (
                <Link key={item.name} href={item.href}>
                  <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`text-lg font-bold uppercase tracking-widest py-4 border-b border-white/5 cursor-pointer flex items-center justify-between group ${location === item.href ? 'text-primary' : 'text-white/80'}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-primary">→</span>
                  </motion.div>
                </Link>
              ))}
              <Link href="/contact">
                  <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                   <Button className="w-full h-14 text-sm font-bold bg-primary text-white uppercase tracking-widest rounded-none">
                     Get a Quote
                   </Button>
                  </motion.div>
              </Link>
            </div>
            
            <div className="p-8 bg-black/20 text-center space-y-4">
               <p className="text-white/50 text-sm">Need immediate assistance?</p>
               <a href="tel:9252504605" className="text-2xl font-black text-white block">(925) 250-4605</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
