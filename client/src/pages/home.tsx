import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Shield, Clock, MapPin, Truck, Phone } from "lucide-react";
import Logo from "@/assets/logo.png";
import HeroImage from "@/assets/hero-truck.jpg";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
      {/* Navigation */}
      <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={Logo} alt="FortyninerTrucking Logo" className="h-10 w-10 object-contain" />
            <span className="font-display text-2xl font-bold tracking-tight text-primary">
              FORTYNINER<span className="text-foreground">TRUCKING</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm font-medium hover:text-primary transition-colors">Services</a>
            <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">About Us</a>
            <a href="#fleet" className="text-sm font-medium hover:text-primary transition-colors">Fleet</a>
            <Button size="sm" className="font-bold">
              GET A QUOTE
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={HeroImage} 
            alt="Truck on highway" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
              Modern Logistics Since 1849
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-[0.9] text-foreground">
              THE GOLD STANDARD <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-600">
                IN LOGISTICS
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
              Reliable, efficient, and nationwide freight solutions. We carry the weight so you can move forward.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="h-12 px-8 text-base font-bold uppercase tracking-wider">
                Track Shipment
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-base font-bold uppercase tracking-wider bg-background/50 backdrop-blur border-primary/50 hover:bg-primary/10">
                View Services
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-secondary text-secondary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center space-y-1">
              <h3 className="text-4xl font-display font-bold text-primary">50k+</h3>
              <p className="text-sm text-secondary-foreground/70 uppercase tracking-widest">Loads Delivered</p>
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-4xl font-display font-bold text-primary">48</h3>
              <p className="text-sm text-secondary-foreground/70 uppercase tracking-widest">States Covered</p>
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-4xl font-display font-bold text-primary">99%</h3>
              <p className="text-sm text-secondary-foreground/70 uppercase tracking-widest">On-Time Rate</p>
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-4xl font-display font-bold text-primary">24/7</h3>
              <p className="text-sm text-secondary-foreground/70 uppercase tracking-widest">Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-4xl font-display font-bold">OUR SERVICES</h2>
            <p className="text-muted-foreground">
              Comprehensive freight solutions tailored to your supply chain needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-card border-none shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-8 space-y-4">
                <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Truck size={28} />
                </div>
                <h3 className="text-xl font-bold font-display">Full Truckload (FTL)</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Dedicated capacity for your large shipments. Direct routes, minimized handling, and maximum efficiency across the continent.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-none shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-8 space-y-4">
                <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <MapPin size={28} />
                </div>
                <h3 className="text-xl font-bold font-display">Regional Haul</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Specialized short-haul services for the Western United States. Fast turnaround times and expert local knowledge.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-none shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-8 space-y-4">
                <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Clock size={28} />
                </div>
                <h3 className="text-xl font-bold font-display">Expedited Freight</h3>
                <p className="text-muted-foreground leading-relaxed">
                  When time is critical, our team delivery services ensure your freight arrives safely and faster than standard transit.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight">
              BUILT ON <br />
              <span className="text-primary">TRUST & GRIT</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Like the pioneers of '49, we forge paths where others see obstacles. Our modern fleet and experienced drivers ensure your cargo is in the safest hands in the industry.
            </p>
            
            <ul className="space-y-4">
              {[
                "Real-time GPS Tracking",
                "Late Model Fleet (Avg 2.5 Years)",
                "EPA SmartWay Certified Partner",
                "Dedicated Customer Success Team"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <Check size={14} strokeWidth={3} />
                  </div>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <Button size="lg" className="mt-4">
              Learn More About Us
            </Button>
          </div>
          
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-secondary overflow-hidden relative z-10">
               {/* Pattern overlay or secondary image could go here */}
               <div className="absolute inset-0 flex items-center justify-center text-secondary-foreground/20">
                 <Shield size={200} strokeWidth={1} />
               </div>
               <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent text-white">
                 <p className="font-display text-2xl font-bold">"FortyninerTrucking has been our most reliable partner for 5 years running."</p>
                 <p className="mt-2 text-primary font-medium">— J. Doe, Manufacturing Corp</p>
               </div>
            </div>
            <div className="absolute -top-4 -right-4 w-full h-full border-2 border-primary rounded-2xl z-0" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-secondary text-secondary-foreground relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-display font-bold">READY TO MOVE?</h2>
          <p className="text-xl text-secondary-foreground/80 max-w-2xl mx-auto">
            Get a competitive quote for your next shipment within minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="h-14 px-8 text-lg font-bold">
              Request Quote
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-bold bg-transparent border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground">
              <Phone className="mr-2 h-5 w-5" />
              (800) 555-0149
            </Button>
          </div>
        </div>
        
        {/* Abstract tire tread pattern background */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
           <svg width="100%" height="100%">
             <pattern id="tread" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
               <path d="M0 20 L20 0 L40 20 L20 40 Z" fill="currentColor" />
             </pattern>
             <rect x="0" y="0" width="100%" height="100%" fill="url(#tread)" />
           </svg>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <img src={Logo} alt="Logo" className="h-8 w-8 object-contain" />
                <span className="font-display text-xl font-bold">FORTYNINER</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Moving America forward with integrity, safety, and speed.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Full Truckload</a></li>
                <li><a href="#" className="hover:text-primary">LTL Shipping</a></li>
                <li><a href="#" className="hover:text-primary">Expedited</a></li>
                <li><a href="#" className="hover:text-primary">Warehousing</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">About Us</a></li>
                <li><a href="#" className="hover:text-primary">Careers</a></li>
                <li><a href="#" className="hover:text-primary">News</a></li>
                <li><a href="#" className="hover:text-primary">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <MapPin size={16} className="mt-0.5 text-primary" />
                  <span>123 Gold Rush Blvd<br/>Sacramento, CA 95814</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={16} className="text-primary" />
                  <span>(800) 555-0149</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">
              © 2024 FortyninerTrucking. All rights reserved.
            </p>
            <div className="flex gap-4 text-xs text-muted-foreground">
              <a href="#" className="hover:text-foreground">Privacy Policy</a>
              <a href="#" className="hover:text-foreground">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
