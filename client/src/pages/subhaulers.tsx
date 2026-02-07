import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Check, Upload, Menu, X, Truck, Handshake, ShieldCheck, Briefcase } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

import Footer from "@/components/Footer";
import { Logo } from "@/components/Logo";

export default function Subhaulers() {
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
    <div className="min-h-screen bg-background text-foreground font-sans pt-24 pb-24">
      {/* Shared Navbar */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border/50 py-3 shadow-sm" : "bg-background/80 backdrop-blur-md py-4 border-b border-border/20"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <Logo className="h-20" />
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

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <h1 className="text-5xl font-bold tracking-tight">Partner With Us.</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We are always looking for reliable owner-operators and subhaulers to join our network. FortyNinerTrucking LLC offers fair dispatch practices, consistent work, and transparent communication.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6 pt-4">
               {[
                 { icon: Handshake, title: "Fair Dispatch", desc: "Equitable distribution of loads and routes." },
                 { icon: ShieldCheck, title: "Clear Terms", desc: "Transparent payment schedules and agreements." },
                 { icon: Briefcase, title: "Long-term Work", desc: "Access to ongoing construction projects." },
                 { icon: Truck, title: "Diverse Fleet", desc: "Opportunities for various truck types." }
               ].map((item, i) => (
                 <Card key={i} className="bg-secondary/30 border-none">
                   <CardContent className="p-6 space-y-3">
                     <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                       <item.icon size={20} />
                     </div>
                     <h3 className="font-bold text-lg">{item.title}</h3>
                     <p className="text-sm text-muted-foreground">{item.desc}</p>
                   </CardContent>
                 </Card>
               ))}
            </div>
          </div>

          <Card className="border-none shadow-2xl bg-secondary/30">
            <CardContent className="p-8 md:p-10">
              <h2 className="text-2xl font-bold mb-6">Subhauler Registration</h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input id="companyName" placeholder="Your Trucking Co." className="bg-background" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactName">Contact Person</Label>
                    <Input id="contactName" placeholder="Full Name" className="bg-background" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="dispatch@example.com" className="bg-background" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="(555) 000-0000" className="bg-background" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="truckType">Truck Types Available</Label>
                  <Input id="truckType" placeholder="e.g. Super Dumps, Transfers" className="bg-background" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="fleetSize">Fleet Size</Label>
                  <Input id="fleetSize" type="number" placeholder="Number of units" className="bg-background" />
                </div>

                <Button size="lg" className="w-full rounded-full h-12 text-base font-bold">Submit Registration</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}
