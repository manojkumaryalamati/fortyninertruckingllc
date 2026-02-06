import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

export default function Contact() {
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

      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Let's Connect</h1>
          <p className="text-xl text-muted-foreground">
            Contractors, subhaulers, and partners – reach out to our dispatch team for reliable service and fast response times.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <Card className="bg-secondary/20 border-border">
            <CardContent className="p-8 text-center space-y-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto">
                <Phone size={24} />
              </div>
              <h3 className="text-xl font-bold">Call Dispatch</h3>
              <p className="text-muted-foreground">Immediate Assistance</p>
              <p className="text-2xl font-bold text-primary">(925) 250-4605</p>
            </CardContent>
          </Card>
          
          <Card className="bg-secondary/20 border-border">
            <CardContent className="p-8 text-center space-y-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto">
                <Mail size={24} />
              </div>
              <h3 className="text-xl font-bold">Email Us</h3>
              <p className="text-muted-foreground">Quotes & Bids</p>
              <p className="text-xl font-bold text-primary">fortyninertrucking@gmail.com</p>
            </CardContent>
          </Card>

          <Card className="bg-secondary/20 border-border">
            <CardContent className="p-8 text-center space-y-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto">
                <MapPin size={24} />
              </div>
              <h3 className="text-xl font-bold">Visit HQ</h3>
              <p className="text-muted-foreground">Main Terminal</p>
              <p className="text-lg font-medium">28 Glen Canyon Court<br/>Pittsburg CA 94565</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
           <Card className="border-none shadow-2xl">
             <CardContent className="p-8 md:p-10">
               <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
               <form className="space-y-6">
                 <div className="grid md:grid-cols-2 gap-4">
                   <div className="space-y-2">
                     <Label htmlFor="name">Name</Label>
                     <Input id="name" placeholder="Your Name" className="bg-secondary/30" />
                   </div>
                   <div className="space-y-2">
                     <Label htmlFor="email">Email</Label>
                     <Input id="email" type="email" placeholder="email@company.com" className="bg-secondary/30" />
                   </div>
                 </div>
                 
                 <div className="space-y-2">
                   <Label htmlFor="subject">Subject</Label>
                   <select className="w-full h-10 rounded-md border border-input bg-secondary/30 px-3 py-2 text-sm">
                     <option>Request a Quote</option>
                     <option>Subhauler Inquiry</option>
                     <option>Billing Question</option>
                     <option>General Information</option>
                   </select>
                 </div>

                 <div className="space-y-2">
                   <Label htmlFor="message">Message</Label>
                   <Textarea id="message" placeholder="How can we help you?" className="min-h-[150px] bg-secondary/30" />
                 </div>

                 <Button size="lg" className="w-full rounded-full h-12 text-base font-bold">Send Message</Button>
               </form>
             </CardContent>
           </Card>

           {/* Map Placeholder */}
           <div className="rounded-3xl overflow-hidden bg-secondary h-full min-h-[400px] relative">
             <iframe 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3143.9827670732437!2d-121.89059152367503!3d38.00125867192892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085290656041a3d%3A0xe526d713217277!2sPittsburg%2C%20CA!5e0!3m2!1sen!2sus!4v1709772345678!5m2!1sen!2sus" 
               width="100%" 
               height="100%" 
               style={{ border: 0 }} 
               allowFullScreen 
               loading="lazy" 
               referrerPolicy="no-referrer-when-downgrade"
               className="grayscale hover:grayscale-0 transition-all duration-500"
             />
           </div>
        </div>
      </div>
    </div>
  );
}
