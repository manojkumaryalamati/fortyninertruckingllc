import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Shield, Clock, MapPin, Truck, Phone, HardHat, Warehouse, BadgeCheck } from "lucide-react";
import Logo from "@/assets/logo.png";
import HeroImage from "@/assets/hero-truck.jpg";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
      {/* Navigation */}
      <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer">
              <img src={Logo} alt="FortyninerTrucking Logo" className="h-10 w-10 object-contain" />
              <span className="font-display text-2xl font-bold tracking-tight text-primary">
                FORTYNINER<span className="text-foreground">TRUCKING</span>
              </span>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm font-medium hover:text-primary transition-colors">Services</a>
            <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">Our Fleet</a>
            <Link href="/tracking" className="text-sm font-medium hover:text-primary transition-colors cursor-pointer">
              Track Load
            </Link>
            <Button size="sm" className="font-bold bg-primary hover:bg-primary/90 text-primary-foreground">
              (925) 555-0149
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[650px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={HeroImage} 
            alt="Commercial trucking fleet on highway" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-in slide-in-from-left duration-700">
            <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary tracking-wide uppercase">
              <Shield className="h-3 w-3 mr-2" />
              Locally Owned & Operated
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-[0.9] text-foreground tracking-tight">
              SAFETY FIRST.<br />
              <span className="text-primary">SERVICE ALWAYS.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
              We provide premier commercial hauling and construction logistics for the Bay Area and beyond. 24/7 dispatch, dedicated lanes, and a "no excuses" commitment to getting the job done.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/tracking">
                <Button size="lg" className="h-14 px-8 text-base font-bold uppercase tracking-wider w-full sm:w-auto shadow-lg shadow-primary/20">
                  Track Your Load
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="h-14 px-8 text-base font-bold uppercase tracking-wider bg-background/50 backdrop-blur border-primary/50 hover:bg-primary/10 w-full sm:w-auto">
                Request Quote
              </Button>
            </div>
          </div>
          
          {/* Quick Quote Widget - New Addition */}
          <div className="hidden md:block bg-card/95 backdrop-blur p-6 rounded-xl border border-border shadow-2xl animate-in fade-in duration-1000 delay-300 max-w-sm ml-auto">
             <h3 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
               <Truck className="text-primary h-5 w-5" />
               Quick Rate Request
             </h3>
             <div className="space-y-3">
               <div className="grid grid-cols-2 gap-2">
                 <input className="bg-muted px-3 py-2 rounded text-sm border-none" placeholder="Pickup Zip" />
                 <input className="bg-muted px-3 py-2 rounded text-sm border-none" placeholder="Delivery Zip" />
               </div>
               <select className="w-full bg-muted px-3 py-2 rounded text-sm border-none text-muted-foreground">
                 <option>Dry Van</option>
                 <option>Flatbed</option>
                 <option>Refrigerated</option>
               </select>
               <input className="w-full bg-muted px-3 py-2 rounded text-sm border-none" placeholder="Email Address" />
               <Button className="w-full font-bold">Get Estimate</Button>
             </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-secondary border-y border-border py-8">
        <div className="container mx-auto px-4">
           <div className="flex flex-wrap justify-center md:justify-between items-center gap-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
             {/* Simple text logos for trust indicators */}
             <div className="flex items-center gap-2 font-display font-bold text-xl text-white"><BadgeCheck className="text-primary"/> SMARTWAY PARTNER</div>
             <div className="flex items-center gap-2 font-display font-bold text-xl text-white"><BadgeCheck className="text-primary"/> CTPAT CERTIFIED</div>
             <div className="flex items-center gap-2 font-display font-bold text-xl text-white"><BadgeCheck className="text-primary"/> FMCSA COMPLIANT</div>
             <div className="flex items-center gap-2 font-display font-bold text-xl text-white"><BadgeCheck className="text-primary"/> TWIC APPROVED</div>
           </div>
        </div>
      </section>

      {/* Services Section - Updated Content */}
      <section id="services" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-4xl font-display font-bold">SPECIALIZED HAULING SOLUTIONS</h2>
            <p className="text-lg text-muted-foreground">
              We specialize in commercial construction logistics and dedicated freight lanes. Our fleet is equipped to handle everything from raw materials to finished goods.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-card border-none shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
              <CardContent className="p-8 space-y-4">
                <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <HardHat size={28} />
                </div>
                <h3 className="text-xl font-bold font-display">Construction Logistics</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Reliable transport for construction materials, equipment, and aggregate. We understand the tight schedules of job sites and deliver accordingly.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-none shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
              <CardContent className="p-8 space-y-4">
                <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Warehouse size={28} />
                </div>
                <h3 className="text-xl font-bold font-display">Dedicated Lanes</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Consistent, contract-based hauling for manufacturers and distributors. We become an extension of your supply chain with guaranteed capacity.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-none shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
              <CardContent className="p-8 space-y-4">
                <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Clock size={28} />
                </div>
                <h3 className="text-xl font-bold font-display">Expedited & JIT</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Just-In-Time delivery services for time-sensitive cargo. Our 24/7 dispatch team ensures constant communication for high-priority loads.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About / Fleet Section - Updated Content */}
      <section id="about" className="py-24 overflow-hidden">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 order-2 md:order-1">
            <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight">
              MORE THAN JUST<br />
              <span className="text-primary">A TRUCKING COMPANY</span>
            </h2>
            <div className="prose prose-lg text-muted-foreground">
              <p>
                FortyninerTrucking was founded on a simple principle: <strong>No Excuses.</strong> We are a locally owned and operated carrier that brings institutional-grade reliability to every haul.
              </p>
              <p>
                Our drivers are the backbone of our operation. Unlike mega-carriers, we treat every member of our team like family, which translates to better service for our customers. When you call us at 2 AM, you get a real person, not a machine.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="bg-muted/30 p-4 rounded-lg border-l-4 border-primary">
                <h4 className="font-bold font-display text-lg">24/7 Dispatch</h4>
                <p className="text-sm text-muted-foreground">Real-time problem solving, day or night.</p>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg border-l-4 border-primary">
                <h4 className="font-bold font-display text-lg">Financial Guarantee</h4>
                <p className="text-sm text-muted-foreground">Backed by strong institutional partners.</p>
              </div>
            </div>

            <Button size="lg" className="mt-4">
              Drive For Us
            </Button>
          </div>
          
          <div className="relative order-1 md:order-2">
            <div className="aspect-[4/5] rounded-2xl bg-secondary overflow-hidden relative z-10 shadow-2xl">
               {/* Pattern overlay */}
               <div className="absolute inset-0 bg-secondary/80 flex items-center justify-center">
                 {/* This would ideally be another image, using a placeholder/pattern for now */}
                 <div className="text-center p-8">
                   <Shield size={80} className="text-primary mx-auto mb-6 opacity-80" />
                   <h3 className="text-2xl font-bold text-white font-display mb-2">SAFETY EXCELLENCE AWARD 2025</h3>
                   <p className="text-gray-400">Recognized for maintaining a zero-accident record in high-risk construction zones.</p>
                 </div>
               </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary rounded-lg z-0 opacity-20" />
            <div className="absolute -top-6 -right-6 w-32 h-32 border-4 border-primary rounded-lg z-0 opacity-20" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-secondary text-secondary-foreground relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-display font-bold">READY TO PARTNER UP?</h2>
          <p className="text-xl text-secondary-foreground/80 max-w-2xl mx-auto">
            Experience the difference of a carrier that puts your schedule first.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="h-14 px-8 text-lg font-bold">
              Get A Quote
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-bold bg-transparent border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground">
              <Phone className="mr-2 h-5 w-5" />
              (925) 555-0149
            </Button>
          </div>
        </div>
        
        {/* Abstract background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent" />
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
                Premier commercial hauling and logistics for the modern age. Safety first, service always.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Commercial Hauling</a></li>
                <li><a href="#" className="hover:text-primary">Construction Logistics</a></li>
                <li><a href="#" className="hover:text-primary">Dedicated Lanes</a></li>
                <li><a href="#" className="hover:text-primary">Warehousing</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">About Us</a></li>
                <li><a href="#" className="hover:text-primary">Drive For Us</a></li>
                <li><a href="#" className="hover:text-primary">Safety Record</a></li>
                <li><a href="#" className="hover:text-primary">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Contact Dispatch</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <MapPin size={16} className="mt-0.5 text-primary" />
                  <span>123 Industrial Parkway<br/>Pittsburg, CA 94565</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={16} className="text-primary" />
                  <span>(925) 555-0149</span>
                </li>
                <li className="flex items-center gap-2 text-primary font-bold">
                  <Clock size={16} />
                  <span>24/7 Support Available</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">
              © 2026 FortyninerTrucking. All rights reserved.
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
