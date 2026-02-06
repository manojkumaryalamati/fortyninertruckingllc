import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Truck, HardHat, Warehouse, Clock, MapPin, ArrowRight, Shield, ChevronLeft, Menu, X, Users, Briefcase } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Footer from "@/components/Footer";

export default function Services() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    <div className="min-h-screen bg-background text-foreground font-sans pt-24">
      {/* Shared Navbar */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border/50 py-3 shadow-sm" : "bg-background/80 backdrop-blur-md py-4 border-b border-border/20"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="text-white font-bold text-lg">49</span>
              </div>
              <div className="flex flex-col text-foreground">
                <span className="font-bold text-lg tracking-tight leading-none">FortyNiner</span>
                <span className="text-xs font-medium opacity-80 uppercase tracking-widest">Trucking LLC</span>
              </div>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => (
              <Link key={item.name} href={item.href}>
                <a className="text-sm font-medium transition-colors text-muted-foreground hover:text-foreground cursor-pointer">
                  {item.name}
                </a>
              </Link>
            ))}
            <Link href="/admin">
               <Button variant="ghost" className="font-medium text-muted-foreground hover:text-foreground">
                 Login
               </Button>
            </Link>
          </div>

          <button 
            className="md:hidden p-2 rounded-full transition-colors text-foreground hover:bg-secondary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 bg-background border-b border-border shadow-2xl p-6 md:hidden flex flex-col gap-4"
            >
              {navLinks.map((item) => (
                <Link key={item.name} href={item.href}>
                  <a className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2 border-b border-border/50 last:border-0" onClick={() => setIsMobileMenuOpen(false)}>
                    {item.name}
                  </a>
                </Link>
              ))}
              <Link href="/admin">
                 <Button variant="outline" className="w-full font-bold rounded-xl h-12 mt-2">
                   Portal Login
                 </Button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <div className="container mx-auto px-6 mb-16">
        <div className="max-w-3xl space-y-6">
           <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
            Specialized Hauling <br/>
            <span className="text-primary">Solutions.</span>
           </h1>
           <p className="text-xl text-muted-foreground leading-relaxed">
             We provide comprehensive trucking services tailored to the unique demands of construction sites, infrastructure projects, and material supply chains.
           </p>
        </div>
      </div>

      <div className="bg-secondary/30 py-24">
        <div className="container mx-auto px-6">
          <div className="grid gap-12">
             {/* Service 1 */}
             <div className="grid md:grid-cols-2 gap-12 items-center">
               <div className="space-y-6">
                 <div className="h-14 w-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary">
                   <HardHat size={28} />
                 </div>
                 <h3 className="text-3xl font-bold">Construction Material Hauling</h3>
                 <p className="text-lg text-muted-foreground leading-relaxed">
                   Reliable transport for aggregates, asphalt, sand, and gravel. We ensure a steady flow of materials to keep your job site operational and on schedule.
                 </p>
                 <ul className="space-y-3">
                   {["End Dump Services", "Aggregate Delivery", "Site Clearing Support", "Permit Compliant Routing"].map(item => (
                     <li key={item} className="flex items-center gap-3 font-medium">
                       <Check size={18} className="text-primary" /> {item}
                     </li>
                   ))}
                 </ul>
               </div>
               <div className="rounded-3xl overflow-hidden shadow-2xl h-[400px]">
                 <img src="https://images.unsplash.com/photo-1590496793907-71876d7dd545?q=80&w=2800&auto=format&fit=crop" className="w-full h-full object-cover" alt="Construction Hauling" />
               </div>
             </div>

             {/* Service 2 */}
             <div className="grid md:grid-cols-2 gap-12 items-center">
               <div className="rounded-3xl overflow-hidden shadow-2xl h-[400px] md:order-first order-last">
                 <img src="https://images.unsplash.com/photo-1617135002770-65c7f9392943?q=80&w=2940&auto=format&fit=crop" className="w-full h-full object-cover" alt="Dump Truck" />
               </div>
               <div className="space-y-6">
                 <div className="h-14 w-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary">
                   <Truck size={28} />
                 </div>
                 <h3 className="text-3xl font-bold">Dump Truck Services</h3>
                 <p className="text-lg text-muted-foreground leading-relaxed">
                   Our fleet includes Super Dumps and Standard 10-Wheelers ready for heavy loads. Perfect for excavation projects, paving operations, and dirt removal.
                 </p>
                 <ul className="space-y-3">
                   {["Super Dump Capabilities", "High-Volume Dirt Removal", "Paving Support", "Precision Dumping"].map(item => (
                     <li key={item} className="flex items-center gap-3 font-medium">
                       <Check size={18} className="text-primary" /> {item}
                     </li>
                   ))}
                 </ul>
               </div>
             </div>

             {/* Service 3 */}
             <div className="grid md:grid-cols-2 gap-12 items-center">
               <div className="space-y-6">
                 <div className="h-14 w-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary">
                   <Briefcase size={28} />
                 </div>
                 <h3 className="text-3xl font-bold">Project-Based Hauling</h3>
                 <p className="text-lg text-muted-foreground leading-relaxed">
                   Complete logistics management for large-scale infrastructure and commercial developments. We coordinate fleet deployment to match project phases.
                 </p>
                 <ul className="space-y-3">
                   {["Dedicated Fleet Assignment", "On-Site Coordination", "Phase-Specific Scheduling", "Budget-Friendly Contracts"].map(item => (
                     <li key={item} className="flex items-center gap-3 font-medium">
                       <Check size={18} className="text-primary" /> {item}
                     </li>
                   ))}
                 </ul>
               </div>
               <div className="rounded-3xl overflow-hidden shadow-2xl h-[400px]">
                 <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2940&auto=format&fit=crop" className="w-full h-full object-cover" alt="Project Site" />
               </div>
             </div>
          </div>
        </div>
      </div>
      
      <div className="bg-background py-24 text-center">
        <div className="container mx-auto px-6 max-w-2xl space-y-8">
          <h2 className="text-4xl font-bold">Have a specialized hauling need?</h2>
          <p className="text-muted-foreground text-lg">We adapt to your project requirements. Let's discuss your logistics plan.</p>
          <div className="flex justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="rounded-full h-14 px-8 font-bold">Contact Sales</Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
