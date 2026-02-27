import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail, Clock } from "lucide-react";
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
    { name: "Services", href: "/services" },
    { name: "Our Trucks", href: "/fleet" },
    { name: "Certifications", href: "/certifications" },
    { name: "Careers", href: "/careers" },
    { name: "Subhaulers", href: "/subhaulers" },
    { name: "Admin", href: "/login" },
  ];

  const isHome = location === "/";
  // Always solid background when scrolled, solid white at top of home
  const navbarClasses = scrolled 
    ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[var(--border)]" 
    : "bg-white border-b border-[var(--border)]";

  const logoClasses = "w-28 brightness-0";

  const linkClasses = (href: string) => {
    return location === href ? "text-[var(--primary)] font-bold bg-[var(--primary)]/10" : "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--border)]";
  };

  const buttonClasses = "text-[var(--text)] hover:bg-[var(--border)]";

  return (
    <>
      {/* Top Bar - Hidden on mobile, visible on desktop */}
      <div className={`hidden lg:flex fixed top-0 left-0 right-0 z-[51] w-full transition-all duration-300 ${scrolled ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'} bg-[var(--surface-2)] text-[var(--text-muted)] border-b border-[var(--border)]`}>
        <div className="w-full px-2 lg:px-8 h-10 flex justify-between items-center text-xs font-medium tracking-wide">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 hover:text-[var(--primary)] transition-colors cursor-pointer">
              <Phone size={14} className="text-[var(--primary)]" /> (925) 250-4605
            </span>
            <span className="flex items-center gap-2 hover:text-[var(--primary)] transition-colors cursor-pointer">
              <Mail size={14} className="text-[var(--primary)]" /> fortyninertrucking@gmail.com
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <Clock size={14} className="text-[var(--primary)]" /> 24/7
            </span>
            <Link href="/contact">
               <span className="text-[var(--primary)] hover:text-[var(--text)] transition-colors cursor-pointer font-bold ml-2">Request A Quote &rarr;</span>
            </Link>
          </div>
        </div>
      </div>

      <nav className={`fixed left-0 right-0 z-50 w-full transition-all duration-300 ${scrolled ? 'top-0' : 'top-0 lg:top-10'} ${navbarClasses}`}>
        <div className="w-full px-2 lg:px-8 flex items-center justify-between h-[72px]">
          
          {/* Logo Area */}
          <div className="flex-shrink-0 relative h-full flex items-center">
            <Link href="/">
              <div className="cursor-pointer hover:opacity-90 transition-opacity relative group h-full flex items-center">
                <Logo 
                  variant="dark" 
                  className={`transition-all duration-300 ${scrolled ? 'scale-75 origin-left' : 'scale-90 md:scale-100 origin-left'}`}
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((item) => (
              <Link key={item.name} href={item.href}>
                <div className={`
                  relative px-3 py-2 rounded-full cursor-pointer transition-all duration-300 group
                  ${linkClasses(item.href)}
                `}>
                  <span className="text-sm tracking-wide uppercase font-semibold">{item.name}</span>
                  {location === item.href && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full border border-[var(--primary)]/50"
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
               className={`lg:hidden p-2 rounded-md transition-colors ${buttonClasses}`}
               onClick={() => setIsMobileMenuOpen(true)}
             >
               <Menu size={32} />
             </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Redesigned */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-white text-[var(--text)] p-0 lg:hidden flex flex-col"
          >
            <div className="flex justify-between items-center p-4 border-b border-[var(--border)]">
              <div className="h-10 w-auto relative flex items-center">
                 <Logo variant="dark" className="scale-75 origin-left" />
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-full bg-[var(--surface-2)] hover:bg-[var(--border)] transition-colors text-[var(--text)]"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-4">
              <div className="space-y-1">
                {navLinks.map((item, idx) => (
                  <Link key={item.name} href={item.href}>
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className={`text-lg font-bold tracking-wide py-3 px-4 rounded-xl cursor-pointer flex items-center justify-between group ${location === item.href ? 'bg-[var(--primary)]/10 text-[var(--primary)]' : 'text-[var(--text-muted)] hover:bg-[var(--surface-2)] hover:text-[var(--text)]'}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                      <span className={`transition-opacity ${location === item.href ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} text-[var(--primary)]`}>→</span>
                    </motion.div>
                  </Link>
                ))}
              </div>
              
              <Link href="/contact" className="mt-4">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                   <Button className="w-full h-12 text-base font-bold bg-[var(--primary)] text-white tracking-wide rounded-xl shadow-md">
                     Get a Quote
                   </Button>
                  </motion.div>
              </Link>
            </div>
            
            <div className="p-6 bg-[var(--surface-2)] border-t border-[var(--border)] text-center">
               <p className="text-[var(--text-muted)] text-sm mb-2 font-medium">Need immediate assistance?</p>
               <a href="tel:9252504605" className="text-xl font-black text-[var(--primary)] flex items-center justify-center gap-2">
                 <Phone size={18} />
                 (925) 250-4605
               </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
