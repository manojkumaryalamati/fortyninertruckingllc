import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Truck, HardHat, Warehouse, Clock, MapPin, ArrowRight, Shield, ChevronLeft, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import Logo from "@/assets/logo.png";
import { motion, AnimatePresence } from "framer-motion";

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
                <span className="font-bold text-lg tracking-tight leading-none">Fortyniner</span>
                <span className="text-xs font-medium opacity-80 uppercase tracking-widest">Trucking</span>
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
            <Link href="/tracking">
               <Button className="font-semibold shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 text-white rounded-full px-6 transition-all hover:scale-105 active:scale-95">
                 Track Load
               </Button>
            </Link>
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
              <Link href="/tracking">
                 <Button className="w-full font-bold bg-primary text-white rounded-xl h-12 shadow-lg shadow-primary/20 mt-2">
                   Track Load
                 </Button>
              </Link>
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
        <div className="max-w-3xl space-y-4">
           <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
            Precision Logistics for <br/>
            <span className="text-primary">Every Mile.</span>
           </h1>
           <p className="text-xl text-muted-foreground leading-relaxed">
             We deliver comprehensive freight solutions tailored to the unique demands of construction, manufacturing, and retail supply chains.
           </p>
        </div>
      </div>

      <div className="bg-secondary/30 py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
             {/* Service 1 */}
             <div className="space-y-6">
               <div className="h-14 w-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary">
                 <HardHat size={28} />
               </div>
               <h3 className="text-3xl font-bold">Construction Logistics</h3>
               <p className="text-lg text-muted-foreground leading-relaxed">
                 From raw aggregate to finished structural steel, we understand the critical timeline of a job site. Our fleet is equipped for heavy haul and specialized deliveries.
               </p>
               <ul className="space-y-3">
                 {["End Dump & Super Dump", "Flatbed & Step Deck", "Job Site Coordination", "Permit Management"].map(item => (
                   <li key={item} className="flex items-center gap-3 font-medium">
                     <Check size={18} className="text-primary" /> {item}
                   </li>
                 ))}
               </ul>
             </div>
             <div className="rounded-3xl overflow-hidden shadow-2xl h-[400px]">
               <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2940&auto=format&fit=crop" className="w-full h-full object-cover" alt="Construction Site" />
             </div>

             {/* Service 2 */}
             <div className="rounded-3xl overflow-hidden shadow-2xl h-[400px] md:order-last">
               <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2940&auto=format&fit=crop" className="w-full h-full object-cover" alt="Warehouse" />
             </div>
             <div className="space-y-6">
               <div className="h-14 w-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary">
                 <Warehouse size={28} />
               </div>
               <h3 className="text-3xl font-bold">Dedicated Supply Chain</h3>
               <p className="text-lg text-muted-foreground leading-relaxed">
                 Secure guaranteed capacity and consistent rates with our dedicated fleet program. We become a seamless extension of your operation.
               </p>
               <ul className="space-y-3">
                 {["Fixed Contract Rates", "Branded Fleet Options", "Priority Dispatch", "KPI Reporting"].map(item => (
                   <li key={item} className="flex items-center gap-3 font-medium">
                     <Check size={18} className="text-primary" /> {item}
                   </li>
                 ))}
               </ul>
             </div>
          </div>
        </div>
      </div>

      <div className="py-24 container mx-auto px-6">
         <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-primary text-primary-foreground border-none">
              <CardContent className="p-8 space-y-4">
                <Shield size={48} />
                <h3 className="text-2xl font-bold">Safety First</h3>
                <p className="opacity-90">Maintained FMCSA safety rating in top 5% of carriers nationwide.</p>
              </CardContent>
            </Card>
            <Card className="bg-foreground text-background border-none">
              <CardContent className="p-8 space-y-4">
                <Clock size={48} />
                <h3 className="text-2xl font-bold">On-Time Guarantee</h3>
                <p className="opacity-80">99.9% on-time delivery rate across all service lanes.</p>
              </CardContent>
            </Card>
            <Card className="bg-secondary text-foreground border-none">
              <CardContent className="p-8 space-y-4">
                <MapPin size={48} className="text-primary" />
                <h3 className="text-2xl font-bold">Nationwide</h3>
                <p className="text-muted-foreground">Serving all 48 contiguous states with regional expertise.</p>
              </CardContent>
            </Card>
         </div>
      </div>
      
      <div className="bg-secondary/50 py-24 text-center">
        <div className="container mx-auto px-6 max-w-2xl space-y-8">
          <h2 className="text-4xl font-bold">Ready to streamline your logistics?</h2>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="rounded-full h-14 px-8">Get A Quote</Button>
            <Button size="lg" variant="outline" className="rounded-full h-14 px-8">Contact Sales</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
