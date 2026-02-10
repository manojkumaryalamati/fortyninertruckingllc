import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import logo from "@/assets/logo_v6.png";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
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
          <div className="flex-shrink-0 relative h-full flex items-center max-w-[200px] lg:max-w-[75%]">
            <Link href="/">
              <div className="cursor-pointer hover:opacity-90 transition-opacity relative group h-full flex items-center">
                   <img 
                    src={logo} 
                    alt="FortyNiner Trucking" 
                    className={`transition-all duration-300 object-contain drop-shadow-md w-[120px] lg:w-[160px] h-auto ${scrolled ? 'brightness-0' : (isHome ? 'brightness-0 invert' : 'brightness-0')}`}
                  />
              </div>
            </Link>
          </div>

          {/* Navigation - Visible on all screens now, scrollable on mobile */}
          <div className="flex items-center gap-1 lg:gap-6 overflow-x-auto no-scrollbar mask-gradient px-2 max-w-[calc(100%-130px)] lg:max-w-none">
            {navLinks.map((item) => (
              <Link key={item.name} href={item.href}>
                <div className={`
                  relative px-2 lg:px-3 py-2 rounded-full cursor-pointer transition-all duration-300 group whitespace-nowrap flex-shrink-0
                  ${linkClasses(item.href)}
                `}>
                  <span className="text-xs lg:text-sm tracking-wide uppercase font-semibold">{item.name}</span>
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
        </div>
      </nav>
    </>
  );
}
