import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Shield, Clock, MapPin, Truck, Phone, HardHat, Warehouse, BadgeCheck, ChevronRight, ArrowRight } from "lucide-react";
import Logo from "@/assets/logo.png";
import HeroSlide1 from "@/assets/hero-slide-1.jpg";
import HeroSlide2 from "@/assets/hero-slide-2.jpg";
import HeroSlide3 from "@/assets/hero-slide-3.jpg";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 20 }, [Autoplay({ delay: 6000 })]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

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
      link: "#fleet"
    },
    {
      image: HeroSlide3,
      title: "Supply Chain Precision",
      subtitle: "Advanced warehousing and distribution solutions that keep your business moving forward.",
      cta: "Get Quote",
      link: "#contact"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-primary selection:text-black">
      {/* Cinematic Navigation - Transparent until scrolled (simplified for this mockup) */}
      <nav className="absolute top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-6 h-24 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <div className="absolute inset-0 bg-primary blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
                <img src={Logo} alt="FortyninerTrucking Logo" className="h-12 w-12 object-contain relative z-10" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-2xl font-bold tracking-tight text-white leading-none">
                  FORTYNINER
                </span>
                <span className="font-display text-sm font-bold tracking-[0.2em] text-primary leading-none">
                  TRUCKING
                </span>
              </div>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center gap-10">
            {["Services", "Fleet", "Safety", "Careers"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-bold uppercase tracking-widest text-white/80 hover:text-primary transition-colors relative group">
                {item}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <Link href="/tracking">
               <Button className="font-bold bg-primary hover:bg-primary/90 text-black border-none rounded-none px-6 h-10 clip-path-slant uppercase tracking-wider">
                 Track Load
               </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Immersive Hero Slider */}
      <section className="relative h-screen min-h-[700px] bg-black overflow-hidden group">
        <div className="absolute inset-0 z-0" ref={emblaRef}>
          <div className="flex h-full">
            {slides.map((slide, index) => (
              <div key={index} className="flex-[0_0_100%] min-w-0 relative h-full">
                {/* Image with Parallax-like scale effect on active */}
                <div className="absolute inset-0">
                  <motion.img 
                    src={slide.image} 
                    alt={slide.title}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: index === selectedIndex ? 1 : 1.1 }}
                    transition={{ duration: 6, ease: "easeOut" }}
                    className="w-full h-full object-cover opacity-60"
                  />
                  {/* Cinematic Grading Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Content Layer */}
        <div className="absolute inset-0 z-10 flex items-center">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl space-y-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedIndex}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.5, ease: "circOut" }}
                  className="space-y-6"
                >
                  <div className="inline-flex items-center gap-3 border-l-4 border-primary pl-4">
                    <span className="text-primary font-bold tracking-widest uppercase text-sm">Since 1849</span>
                    <span className="text-white/60 font-medium text-sm">Legacy of Excellence</span>
                  </div>
                  
                  <h1 className="text-6xl md:text-8xl font-display font-bold leading-[0.9] text-white uppercase tracking-tight drop-shadow-2xl">
                    {slides[selectedIndex].title.split(" ").map((word, i) => (
                      <span key={i} className={i === 1 ? "text-stroke-white text-transparent block" : "block"}>
                        {word}{" "}
                      </span>
                    ))}
                  </h1>
                  
                  <p className="text-xl text-white/80 max-w-xl font-light leading-relaxed border-l border-white/20 pl-6 py-2">
                    {slides[selectedIndex].subtitle}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 pt-4">
                    <Link href={slides[selectedIndex].link}>
                      <Button size="lg" className="h-16 px-10 text-lg font-bold uppercase tracking-widest rounded-none bg-primary text-black hover:bg-white hover:text-black transition-all duration-300">
                        {slides[selectedIndex].cta} <ChevronRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                    <Button size="lg" variant="outline" className="h-16 px-10 text-lg font-bold uppercase tracking-widest rounded-none border-white/30 text-white hover:bg-white hover:text-black backdrop-blur-sm transition-all duration-300">
                      Contact Us
                    </Button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-12 right-12 z-20 flex gap-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`h-1 transition-all duration-500 ${
                index === selectedIndex ? "w-16 bg-primary" : "w-8 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 pb-8 animate-bounce hidden md:block">
           <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-primary to-transparent" />
        </div>
      </section>

      {/* Quick Stats Strip */}
      <section className="bg-primary text-black py-12 relative z-20 -mt-2">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-black/10">
            {[
              { label: "Loads Delivered", value: "50K+" },
              { label: "Safety Rating", value: "A+" },
              { label: "Fleet Size", value: "120+" },
              { label: "States Covered", value: "48" }
            ].map((stat, i) => (
              <div key={i} className="text-center px-4">
                <h3 className="text-4xl md:text-5xl font-display font-bold leading-none mb-1">{stat.value}</h3>
                <p className="text-sm font-bold uppercase tracking-widest opacity-80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-32 bg-background relative overflow-hidden">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-primary font-bold tracking-widest uppercase mb-4 block">Our Expertise</span>
              <h2 className="text-5xl md:text-6xl font-display font-bold text-secondary uppercase leading-[0.9]">
                Logistics <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-secondary/50">Redefined</span>
              </h2>
            </div>
            <Button variant="outline" className="h-14 px-8 rounded-none border-secondary text-secondary hover:bg-secondary hover:text-white uppercase font-bold tracking-widest">
              View All Services
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: HardHat, 
                title: "Construction Logistics", 
                desc: "Heavy-duty transport for raw materials and equipment. We handle the weight so you can build the future.",
                bg: "bg-neutral-100"
              },
              { 
                icon: Warehouse, 
                title: "Dedicated Supply Chain", 
                desc: "Integrated fleet solutions acting as an extension of your business. Guaranteed capacity, fixed rates.",
                bg: "bg-neutral-100"
              },
              { 
                icon: Clock, 
                title: "Expedited Freight", 
                desc: "Time-critical delivery services with 24/7 monitoring. When tomorrow is too late, we deliver today.",
                bg: "bg-neutral-100"
              }
            ].map((service, i) => (
              <div key={i} className="group relative bg-white border border-border p-8 md:p-12 hover:border-primary transition-colors duration-500 shadow-sm hover:shadow-xl">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-500 transform group-hover:scale-110">
                  <service.icon size={120} />
                </div>
                
                <div className="relative z-10 h-full flex flex-col">
                  <div className="h-16 w-16 bg-secondary text-primary flex items-center justify-center mb-8">
                    <service.icon size={32} />
                  </div>
                  
                  <h3 className="text-2xl font-display font-bold uppercase mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-8 flex-grow">
                    {service.desc}
                  </p>
                  
                  <a href="#" className="inline-flex items-center text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors mt-auto group/link">
                    Learn More <ArrowRight className="ml-2 h-4 w-4 transform group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
                
                <div className="absolute bottom-0 left-0 w-full h-1 bg-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Dark Mode style */}
      <section className="py-32 bg-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center opacity-10 grayscale mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/80 to-transparent" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 uppercase tracking-tight">
            Ready to <span className="text-primary">Move?</span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto mb-12 font-light">
            Join the hundreds of businesses that trust FortyninerTrucking for their critical logistics needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button size="lg" className="h-16 px-12 text-lg font-bold uppercase tracking-widest rounded-none bg-primary text-black hover:bg-white transition-all w-full sm:w-auto">
              Get A Quote
            </Button>
            <div className="flex items-center gap-3 text-white">
              <div className="h-12 w-12 border border-white/20 flex items-center justify-center rounded-full">
                <Phone className="h-5 w-5" />
              </div>
              <div className="text-left">
                <p className="text-xs uppercase tracking-widest text-white/50">24/7 Dispatch</p>
                <p className="text-xl font-display font-bold tracking-wide">(800) 555-0149</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="bg-black text-white py-16 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div>
              <img src={Logo} alt="Logo" className="h-10 w-10 object-contain mb-6 opacity-80" />
              <p className="text-white/40 max-w-xs text-sm leading-relaxed">
                FortyninerTrucking is a premier logistics provider committed to safety, reliability, and innovation in the freight industry.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-sm">
              <div className="space-y-4">
                <h4 className="font-bold text-primary uppercase tracking-widest">Navigation</h4>
                <ul className="space-y-2 text-white/60">
                  <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Services</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Fleet</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Tracking</a></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold text-primary uppercase tracking-widest">Legal</h4>
                <ul className="space-y-2 text-white/60">
                  <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-16 pt-8 flex justify-between items-center text-xs text-white/30 uppercase tracking-widest">
            <p>© 2026 FortyninerTrucking.</p>
            <p>Designed with Precision.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
