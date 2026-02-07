import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Shield, Clock, Users, ArrowRight, Truck, HardHat, Scale, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Footer from "@/components/Footer";
import { Logo } from "@/components/Logo";

export default function Home() {
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
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      
      {/* Navigation */}
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
                <a className="text-sm font-medium transition-colors text-muted-foreground hover:text-foreground cursor-pointer relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full">
                  {item.name}
                </a>
              </Link>
            ))}
            <Link href="/admin">
               <Button variant="ghost" className={`font-medium ${scrolled ? "text-muted-foreground hover:text-foreground" : "text-foreground/80 hover:text-foreground"}`}>
                 Login
               </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className={`md:hidden p-2 rounded-full transition-colors ${
              scrolled ? "text-foreground hover:bg-secondary" : "text-foreground hover:bg-black/5"
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
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
                  <a 
                    className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2 border-b border-border/50 last:border-0"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
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

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/40 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1503754928629-bd661a4773c3?q=80&w=2940&auto=format&fit=crop" 
            alt="Construction Hauling Fleet" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-6 relative z-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl space-y-8"
          >
            <Badge variant="outline" className="px-4 py-1.5 text-sm border-primary/30 bg-primary/10 text-primary backdrop-blur-md rounded-full mb-4">
              Premier Construction Logistics
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
              Precision Hauling.<br />
              <span className="text-primary">Built on Reliability.</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
              We deliver heavy hauling solutions for contractors, municipalities, and infrastructure projects. On time. Every time. Safety first.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/contact">
                <Button size="lg" className="rounded-full h-14 px-8 text-base font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
                  Request a Quote
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-base font-bold bg-background/50 backdrop-blur-sm border-2 hover:bg-background transition-colors">
                  Talk to Dispatch
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-sm font-bold uppercase tracking-widest text-primary">Who We Are</h2>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight">Driving Progress for America’s Infrastructure.</h3>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  FortyNinerTrucking LLC is a full-service trucking and hauling company dedicated to the construction and material transport industry. We don't just move dirt and material; we move projects forward.
                </p>
                <p>
                  With years of experience in the field, we have built a reputation for operational excellence, adhering to the highest standards of safety and compliance. We treat every job site with professionalism and every deadline as a commitment.
                </p>
                <p>
                  We believe in building long-term partnerships, not just completing one-off hauls. When you contract with us, you gain a logistics partner invested in the success of your project.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-3xl transform rotate-3" />
              <img 
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2940&auto=format&fit=crop" 
                alt="Trucking Operations" 
                className="relative rounded-3xl shadow-2xl z-10 w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Our Core Values</h2>
            <p className="text-muted-foreground text-lg">The principles that drive our fleet and define our service.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: "Safety", desc: "We compromise on nothing when it comes to the safety of our drivers, our cargo, and the public." },
              { icon: Clock, title: "Reliability", desc: "We deliver on our promises. When we say we'll be there, we are there, ready to work." },
              { icon: HardHat, title: "Expertise", desc: "Our team brings deep industry knowledge to solve complex hauling challenges efficiently." },
              { icon: Scale, title: "Accountability", desc: "We take ownership of our work, ensuring transparency and integrity in every mile." }
            ].map((value, i) => (
              <Card key={i} className="border-none shadow-lg shadow-black/5 hover:shadow-xl transition-shadow">
                <CardContent className="p-8 space-y-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <value.icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Safety & Compliance */}
      <section className="py-24 bg-foreground text-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-last lg:order-first">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 mt-8">
                  <img src="https://images.unsplash.com/photo-1616432043562-3671ea2e5242?q=80&w=2940&auto=format&fit=crop" className="rounded-2xl shadow-lg" alt="Safety Inspection" />
                  <div className="bg-primary p-6 rounded-2xl">
                    <h4 className="font-bold text-2xl mb-2">100%</h4>
                    <p className="opacity-90">DOT Compliance Focus</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-background/10 p-6 rounded-2xl backdrop-blur-sm border border-white/10">
                    <CheckCircle2 size={32} className="text-primary mb-4" />
                    <h4 className="font-bold text-xl mb-2">Rigorous Training</h4>
                    <p className="text-sm opacity-80">Continuous driver education programs.</p>
                  </div>
                  <img src="https://images.unsplash.com/photo-1605218427306-635ba2439af2?q=80&w=2940&auto=format&fit=crop" className="rounded-2xl shadow-lg" alt="Truck Maintenance" />
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <Badge className="bg-primary text-foreground hover:bg-primary px-4 py-1">Safety First Culture</Badge>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Compliance is our Cornerstone.</h2>
              <p className="text-xl opacity-80 leading-relaxed">
                We maintain a rigorous safety culture that goes beyond basic regulations. Our fleet undergoes strict maintenance schedules, and our drivers are trained to uphold the highest industry standards.
              </p>
              <ul className="space-y-4">
                {[
                  "Full DOT & FMCSA Compliance",
                  "Regular Fleet Safety Inspections",
                  "Comprehensive Driver Vetting",
                  "Digital Documentation & Tracking"
                ].map(item => (
                  <li key={item} className="flex items-center gap-3 text-lg font-medium">
                    <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-foreground shrink-0">
                      <Check size={14} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-4xl text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Ready to Move Your Project Forward?</h2>
          <p className="text-xl text-muted-foreground">
            Contact us today for reliable dispatch and expert hauling solutions. We respond fast to keep your job site moving.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link href="/contact">
              <Button size="lg" className="rounded-full h-14 px-10 text-lg font-bold shadow-xl shadow-primary/20">
                Get a Quote
              </Button>
            </Link>
            <Link href="/services">
              <Button size="lg" variant="outline" className="rounded-full h-14 px-10 text-lg font-bold">
                View Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function CheckCircle2(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}
