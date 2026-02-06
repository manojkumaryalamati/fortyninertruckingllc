import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Check, Upload, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

export default function Careers() {
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
    <div className="min-h-screen bg-background text-foreground font-sans pt-24 pb-24">
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

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <h1 className="text-5xl font-bold tracking-tight">Drive With The Best.</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We offer more than just a job. We offer a career with top-tier equipment, competitive pay, and a team that respects your time on the road.
            </p>
            
            <div className="space-y-6 pt-8">
               {[
                 { title: "Competitive Pay", desc: "Top CPM in the industry with quarterly safety bonuses." },
                 { title: "New Equipment", desc: "Drive 2024+ Kenworth and Peterbilt trucks." },
                 { title: "Home Time", desc: "Flexible scheduling to get you home when it matters." },
                 { title: "Full Benefits", desc: "Health, Dental, Vision, and 401k with match." }
               ].map((benefit, i) => (
                 <div key={i} className="flex gap-4">
                   <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                     <Check size={20} />
                   </div>
                   <div>
                     <h3 className="font-bold text-lg">{benefit.title}</h3>
                     <p className="text-muted-foreground">{benefit.desc}</p>
                   </div>
                 </div>
               ))}
            </div>
          </div>

          <Card className="border-none shadow-2xl bg-secondary/30">
            <CardContent className="p-8 md:p-10">
              <h2 className="text-2xl font-bold mb-6">Start Your Application</h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" className="bg-background" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" className="bg-background" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="john@example.com" className="bg-background" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="(555) 000-0000" className="bg-background" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Experience</Label>
                  <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option>Less than 1 year</option>
                    <option>1-3 years</option>
                    <option>3-5 years</option>
                    <option>5+ years</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="license">CDL Number</Label>
                  <Input id="license" placeholder="Enter License #" className="bg-background" />
                </div>

                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center space-y-2 hover:bg-background/50 transition-colors cursor-pointer">
                  <Upload className="mx-auto text-muted-foreground" />
                  <p className="text-sm font-medium">Upload Resume or CDL (Optional)</p>
                  <p className="text-xs text-muted-foreground">PDF, JPG, PNG up to 5MB</p>
                </div>

                <Button size="lg" className="w-full rounded-full h-12 text-base font-bold">Submit Application</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
