import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Shield, Clock, MapPin, Truck, Phone, HardHat, Warehouse, ChevronRight, ArrowRight, Menu, X, Star } from "lucide-react";
import Logo from "@/assets/logo.png";
import HeroSlide1 from "@/assets/hero-slide-1.jpg";
import HeroSlide2 from "@/assets/hero-slide-2.jpg";
import HeroSlide3 from "@/assets/hero-slide-3.jpg";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 25 }, [Autoplay({ delay: 6000 })]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  // Handle scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const slides = [
    {
      image: HeroSlide1,
      title: "Logistics Without Limits",
      subtitle: "Connecting coasts, communities, and commerce with 99.9% on-time reliability.",
      cta: "Track Shipment",
      link: "/tracking"
    },
    {
      image: HeroSlide2,
      title: "Built for the Heavy Haul",
      subtitle: "Specialized construction transport and aggregate logistics for major infrastructure.",
      cta: "Our Fleet",
      link: "/fleet"
    },
    {
      image: HeroSlide3,
      title: "Supply Chain Precision",
      subtitle: "Advanced warehousing and distribution solutions that keep your business moving forward.",
      cta: "Get Quote",
      link: "/contact"
    }
  ];

  const navLinks = [
    { name: "Services", href: "/services" },
    { name: "Fleet", href: "/fleet" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-primary/20 selection:text-foreground">
      
      {/* Navbar - Premium Glassmorphism */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border/50 py-3 shadow-sm" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="text-white font-bold text-lg">49</span>
              </div>
              <div className={`flex flex-col transition-colors duration-300 ${scrolled ? "text-foreground" : "text-white"}`}>
                <span className="font-bold text-lg tracking-tight leading-none">Fortyniner</span>
                <span className="text-xs font-medium opacity-80 uppercase tracking-widest">Trucking</span>
              </div>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                className={`text-sm font-medium transition-colors hover:opacity-100 ${
                  scrolled ? "text-muted-foreground hover:text-foreground" : "text-white/80 hover:text-white"
                }`}
              >
                {item.name}
              </a>
            ))}
            <Link href="/tracking">
               <Button className="font-semibold shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 text-white rounded-full px-6 transition-all hover:scale-105 active:scale-95">
                 Track Load
               </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className={`md:hidden p-2 rounded-full transition-colors ${
              scrolled ? "text-foreground hover:bg-secondary" : "text-white hover:bg-white/10"
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
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
                <a 
                  key={item.name} 
                  href={item.href} 
                  className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2 border-b border-border/50 last:border-0"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <Link href="/tracking">
                 <Button className="w-full font-bold bg-primary text-white rounded-xl h-12 shadow-lg shadow-primary/20 mt-2">
                   Track Load
                 </Button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section - Apple/Stripe Style Slider */}
      <section className="relative h-screen min-h-[700px] w-full overflow-hidden bg-black">
        <div className="absolute inset-0 z-0" ref={emblaRef}>
          <div className="flex h-full">
            {slides.map((slide, index) => (
              <div key={index} className="flex-[0_0_100%] min-w-0 relative h-full">
                <motion.div 
                   className="absolute inset-0"
                   initial={{ scale: 1.1 }}
                   animate={{ scale: index === selectedIndex ? 1 : 1.1 }}
                   transition={{ duration: 10, ease: "easeOut" }}
                >
                  <img 
                    src={slide.image} 
                    alt={slide.title}
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80" />
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute inset-0 z-10 flex items-center justify-center text-center">
          <div className="container mx-auto px-6 max-w-5xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedIndex}
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="space-y-8"
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mx-auto">
                  <Star size={14} className="text-primary fill-primary" />
                  <span>Trusted by 500+ Enterprise Clients</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.1] text-balance">
                  {slides[selectedIndex].title}
                </h1>
                
                <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed text-balance">
                  {slides[selectedIndex].subtitle}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                  <Link href={slides[selectedIndex].link}>
                    <Button size="lg" className="h-14 px-8 text-base font-semibold bg-white text-black hover:bg-white/90 rounded-full transition-all hover:scale-105 active:scale-95 shadow-xl">
                      {slides[selectedIndex].cta} <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline" className="h-14 px-8 text-base font-semibold bg-white/5 backdrop-blur-sm border-white/20 text-white hover:bg-white/10 rounded-full transition-all hover:scale-105 active:scale-95">
                    Contact Sales
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-12 left-0 right-0 z-20 flex justify-center gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                index === selectedIndex ? "w-8 bg-white" : "w-2 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Stats - Floating Card Style */}
      <section className="relative z-20 -mt-24 pb-24 px-6 pointer-events-none">
        <div className="container mx-auto">
          <div className="bg-background/80 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl rounded-3xl p-8 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-8 pointer-events-auto">
            {[
              { label: "Loads Delivered", value: "50K+" },
              { label: "On-Time Rate", value: "99.9%" },
              { label: "Active Fleet", value: "120+" },
              { label: "Coverage", value: "Nationwide" }
            ].map((stat, i) => (
              <div key={i} className="text-center space-y-2 group cursor-default">
                <p className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 origin-center">
                  {stat.value}
                </p>
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section - Minimal Grid */}
      <section id="services" className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="space-y-4 max-w-2xl">
              <span className="text-primary font-semibold tracking-wider uppercase text-sm">Our Expertise</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground text-balance">
                Logistics engineered for <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">
                  maximum efficiency.
                </span>
              </h2>
            </div>
            <Link href="#contact">
              <Button variant="outline" className="rounded-full px-6 font-medium group">
                View All Services <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: HardHat, 
                title: "Construction Logistics", 
                desc: "Specialized heavy haul for raw materials and equipment. We keep your job site moving on schedule."
              },
              { 
                icon: Warehouse, 
                title: "Dedicated Supply Chain", 
                desc: "Integrated fleet solutions acting as an extension of your business with guaranteed capacity."
              },
              { 
                icon: Clock, 
                title: "Expedited Freight", 
                desc: "Time-critical delivery services with 24/7 monitoring for high-value and urgent shipments."
              }
            ].map((service, i) => (
              <div 
                key={i} 
                className="group p-8 rounded-3xl bg-secondary/30 hover:bg-secondary/60 border border-transparent hover:border-border transition-all duration-300"
              >
                <div className="h-14 w-14 rounded-2xl bg-white dark:bg-white/10 shadow-sm flex items-center justify-center text-foreground mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon size={28} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {service.desc}
                </p>
                <div className="flex items-center text-sm font-semibold text-foreground group-hover:text-primary transition-colors cursor-pointer">
                  Learn More <ChevronRight className="ml-1 h-4 w-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet Section - Immersive Split Layout */}
      <section id="fleet" className="py-24 bg-foreground text-background overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 rounded-l-[100px] hidden md:block" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] group">
               <img 
                 src={HeroSlide2} 
                 alt="Fleet Truck" 
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
               <div className="absolute bottom-6 left-6 text-white">
                 <p className="font-bold text-lg">Kenworth T680</p>
                 <p className="text-sm opacity-80">Latest Addition to Fleet</p>
               </div>
            </div>
            
            <div className="order-1 md:order-2 space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-medium text-white">
                <Truck size={12} />
                <span>Modern Fleet Technology</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                Reliability isn't an accident.<br/>
                It's engineered.
              </h2>
              <p className="text-lg text-white/70 leading-relaxed font-light">
                Our fleet of late-model Kenworth and Peterbilt trucks ensures uptime on every mile. Equipped with the latest collision mitigation and GPS telematics, we deliver safety and visibility.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                 {[
                   "Real-time GPS Tracking", 
                   "Collision Mitigation", 
                   "EPA SmartWay Certified", 
                   "Avg Age < 3 Years"
                 ].map((item, i) => (
                   <div key={i} className="flex items-center gap-3 text-white/90">
                     <div className="h-2 w-2 rounded-full bg-primary" />
                     <span className="font-medium">{item}</span>
                   </div>
                 ))}
              </div>
              
              <Button className="mt-4 rounded-full bg-white text-black hover:bg-white/90 font-semibold px-8 h-12">
                Explore Our Fleet
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action - Clean & Minimal */}
      <section id="contact" className="py-32 bg-background relative">
        <div className="container mx-auto px-6 max-w-4xl text-center space-y-8">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground">
            Ready to move?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
            Join hundreds of enterprise shippers who trust FortyninerTrucking for their critical logistics needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button size="lg" className="h-14 px-10 text-base font-semibold rounded-full bg-foreground text-background hover:bg-foreground/90 shadow-xl w-full sm:w-auto">
              Get A Quote
            </Button>
            <div className="h-14 px-10 flex items-center justify-center rounded-full border border-border hover:bg-secondary transition-colors cursor-pointer w-full sm:w-auto gap-2 text-foreground font-medium">
              <Phone size={18} />
              (800) 555-0149
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Minimalist */}
      <footer className="bg-background border-t border-border py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-foreground text-background flex items-center justify-center font-bold text-sm">49</div>
                <span className="font-bold text-lg tracking-tight">Fortyniner</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                Premier logistics provider committed to safety, reliability, and innovation in the freight industry.
              </p>
            </div>
            
            <div className="col-span-2 md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-semibold mb-4 text-foreground">Services</h4>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-primary transition-colors">Construction Logistics</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Dedicated Fleet</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Expedited Freight</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Warehousing</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-foreground">Company</h4>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Safety Record</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-foreground">Legal</h4>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2026 FortyninerTrucking Inc.</p>
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-green-500"></div> Systems Operational</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
