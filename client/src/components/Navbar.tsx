import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo_v6.png";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";

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
  // Always solid background when scrolled, transparent only at very top of home
  const navbarClasses = scrolled 
    ? "bg-white/90 backdrop-blur-md shadow-sm py-[2px] lg:py-2 border-b border-zinc-200" 
    : (isHome ? "bg-transparent py-[2px] lg:py-4 border-b border-white/10" : "bg-white py-[2px] lg:py-4 border-b border-zinc-200");

  const logoClasses = scrolled 
    ? "w-24 brightness-0" 
    : (isHome ? "w-28 brightness-0 invert" : "w-28 brightness-0");

  const linkClasses = (href: string) => {
    if (scrolled) return location === href ? "text-primary font-bold bg-primary/10" : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100";
    if (isHome) return location === href ? "text-white font-bold bg-white/10" : "text-white/80 hover:text-white hover:bg-white/5";
    return location === href ? "text-primary font-bold bg-primary/10" : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100";
  };

  const buttonClasses = scrolled 
    ? "text-zinc-900 hover:bg-zinc-100" 
    : (isHome ? "text-white hover:bg-white/10" : "text-zinc-900 hover:bg-zinc-100");

  return (
    <>
      {/* Top Bar - Hidden on mobile, visible on desktop */}
      <div className={`hidden lg:flex fixed top-0 left-0 right-0 z-[51] w-full transition-all duration-300 ${scrolled ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'} bg-zinc-100 text-zinc-600 border-b border-white/5`}>
        <div className="w-full px-8 h-10 flex justify-between items-center text-xs font-medium tracking-wide">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer">
              <Phone size={14} className="text-primary" /> (925) 250-4605
            </span>
            <span className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer">
              <Mail size={14} className="text-primary" /> fortyninertrucking@gmail.com
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <Clock size={14} className="text-primary" /> 24/7
            </span>
            <Link href="/contact">
               <span className="text-primary hover:text-zinc-900 transition-colors cursor-pointer font-bold ml-2">Request A Quote &rarr;</span>
            </Link>
          </div>
        </div>
      </div>

      <nav className={`fixed left-0 right-0 z-50 w-full transition-all duration-300 ${scrolled ? 'top-0' : 'top-0 lg:top-10'} ${navbarClasses}`}>
        <div className="w-full px-4 lg:px-8 flex items-center justify-between h-[72px]">
          
          {/* Logo Area */}
          <div className="flex-shrink-0 relative h-full flex items-center max-w-[75%]">
            <Link href="/">
              <div className="cursor-pointer hover:opacity-90 transition-opacity relative group h-full flex items-center">
                   <img 
                    src={logo} 
                    alt="FortyNiner Trucking" 
                    className={`transition-all duration-300 object-contain drop-shadow-md w-[160px] h-auto ${scrolled ? 'brightness-0' : (isHome ? 'brightness-0 invert' : 'brightness-0')}`}
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
                      className="absolute inset-0 rounded-full border border-primary/50"
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
            
            {/* Mobile Menu Trigger */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <button 
                  className={`lg:hidden p-2 rounded-md transition-colors relative z-[60] cursor-pointer ${buttonClasses}`}
                  aria-label="Open menu"
                >
                  <Menu size={32} />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-full p-0 border-l-0">
                 <div className="sr-only">
                    <SheetTitle>Mobile Menu</SheetTitle>
                    <SheetDescription>Navigation links for mobile devices</SheetDescription>
                 </div>
                 
                 <div className="flex flex-col h-full bg-white text-zinc-900">
                    <div className="flex justify-between items-center p-6 border-b border-zinc-100">
                      <div className="h-auto w-[160px] relative flex items-center">
                         <img src={logo} alt="FortyNiner Trucking" className="w-full h-auto max-h-[80px] object-contain brightness-0" />
                      </div>
                      {/* Close button is automatically added by SheetContent, but we can add a custom one if we want specific styling or just rely on the default. The default is small and in the corner. Let's hide the default and use ours if we want or just use ours to close. SheetContent has a close button. We can just let it be. But the original design had a specific layout. I'll hide the default close button via CSS in globals or just accept it. Wait, I can't easily hide the default one without looking at SheetPrimitive. Let's just use our custom header layout and let the default close button overlay or remove it.
                      Actually, SheetContent renders a SheetPrimitive.Close. I can't remove it easily via props. I'll just rely on the built-in close button for better accessibility and simplicity, or try to match the design.
                      
                      The built-in Close button is: absolute right-4 top-4.
                      My design has a header with logo left and close right.
                      I'll render my own close button that calls setIsMobileMenuOpen(false) and maybe hide the default one with CSS or just let them coexist (bad).
                      I'll just use the standard Sheet behavior which is robust.
                      */}
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-6 flex flex-col justify-start gap-1">
                      {navLinks.map((item, idx) => (
                        <Link key={item.name} href={item.href}>
                          <motion.div 
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className={`text-base font-bold uppercase tracking-widest py-3 border-b border-zinc-50/50 cursor-pointer flex items-center justify-between group ${location === item.href ? 'text-primary' : 'text-zinc-600'}`}
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
                    
                    <div className="p-8 bg-zinc-50 text-center space-y-4">
                       <p className="text-zinc-400 text-sm">Need immediate assistance?</p>
                       <a href="tel:9252504605" className="text-2xl font-black text-zinc-900 block">(925) 250-4605</a>
                    </div>
                 </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </>
  );
}
