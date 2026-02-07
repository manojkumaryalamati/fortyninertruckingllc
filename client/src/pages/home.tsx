import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Shield, Clock, Users, ArrowRight, Truck, HardHat, Scale, Menu, X, Globe, Zap, BarChart3, Star, ChevronLeft, ChevronRight, Phone, Mail, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Footer from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

import heroImage from "@/assets/hero-truck-main.jpg";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen min-h-[800px] w-full overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div className="absolute inset-0 z-0">
           <motion.img 
             initial={{ scale: 1.1 }}
             animate={{ scale: 1 }}
             transition={{ duration: 10, ease: "easeOut" }}
             src={heroImage}
             alt="FortyNiner Trucking Fleet" 
             className="w-full h-full object-cover object-center"
           />
           {/* Sophisticated Gradient Overlay */}
           <div className="absolute inset-0 bg-gradient-to-r from-[#0F3F40]/90 via-[#0F3F40]/40 to-transparent z-10" />
           <div className="absolute inset-0 bg-gradient-to-t from-[#0F3F40] via-transparent to-transparent z-10" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 w-full max-w-[1800px] mx-auto px-4 md:px-8 h-full flex items-center">
          <div className="grid lg:grid-cols-2 gap-12 items-center w-full pt-20">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold tracking-widest text-sm uppercase shadow-lg">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </span>
                Serving All of California
              </div>
              
              
              <p className="text-xl md:text-2xl text-white/90 max-w-xl font-medium leading-relaxed border-l-4 border-primary pl-6">
                The premier partner for heavy hauling and construction logistics. Precision, power, and safety in every mile.
              </p>
              
              <div className="pt-8 flex flex-col sm:flex-row gap-5">
                <Link href="/contact">
                  <Button className="rounded-none skew-x-[-12deg] bg-primary hover:bg-primary/90 px-10 h-16 text-lg font-black text-white shadow-[0_0_30px_rgba(var(--primary),0.4)] transition-all hover:skew-x-0 hover:scale-105 border-2 border-primary">
                    <span className="skew-x-[12deg] inline-flex items-center gap-3">
                      GET A QUOTE <ArrowRight className="w-6 h-6" />
                    </span>
                  </Button>
                </Link>
                <Link href="/services">
                  <Button variant="outline" className="rounded-none skew-x-[-12deg] border-2 border-white/30 text-white hover:bg-white hover:text-[#0F3F40] h-16 px-10 text-lg font-black backdrop-blur-sm bg-white/5 transition-all hover:skew-x-0 hover:scale-105">
                    <span className="skew-x-[12deg]">
                      EXPLORE SERVICES
                    </span>
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-12 flex items-center gap-8 text-white/60">
                <div className="flex flex-col">
                   <span className="text-3xl font-black text-white">15+</span>
                   <span className="text-xs uppercase tracking-wider">Years Active</span>
                </div>
                <div className="w-px h-10 bg-white/20"></div>
                <div className="flex flex-col">
                   <span className="text-3xl font-black text-white">5k+</span>
                   <span className="text-xs uppercase tracking-wider">Successful Loads</span>
                </div>
                <div className="w-px h-10 bg-white/20"></div>
                <div className="flex flex-col">
                   <span className="text-3xl font-black text-white">100%</span>
                   <span className="text-xs uppercase tracking-wider">Safety Record</span>
                </div>
              </div>
            </motion.div>

            {/* Right side - decorative glass card or just space for the truck image to shine */}
            <div className="hidden lg:block relative h-full">
               {/* This space is intentionally left clear to show the truck from the background image */}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white/50 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll Down</span>
          <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent"></div>
        </motion.div>
      </section>

      {/* Value Prop Strip */}
      <section className="bg-card py-16 border-b border-white/10">
        <div className="w-full max-w-[1800px] mx-auto px-4 md:px-8">
           <div className="flex flex-col md:flex-row items-center justify-between gap-8">
             <div className="md:w-1/2">
                <h3 className="text-3xl font-black text-foreground leading-tight">
                  Safety, Reliability, and <span className="text-primary">Expertise</span> in every load.
                </h3>
             </div>
             <div className="md:w-1/2 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <p className="text-muted-foreground leading-relaxed">
                  We are committed to operational excellence. Our fleet and team adhere to the strictest safety protocols to ensure your project stays on track and compliant.
                </p>
             </div>
           </div>
        </div>
      </section>

      {/* Who We Are - Split Layout */}
      <section className="py-24 bg-background">
        <div className="w-full max-w-[1800px] mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-sm font-bold tracking-widest text-primary">About Us</h2>
              <h3 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
                The <span className="text-primary">Standard</span> in Hauling
              </h3>
            </div>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                FortyNinerTrucking LLC is a premier logistics provider specializing in construction material transport and heavy hauling. With years of industry experience, we have built a reputation for reliability, safety, and operational precision.
              </p>
              <p>
                We don't just move materials; we build long-term partnerships with contractors, municipalities, and developers. Our commitment to safety and compliance ensures that every job is completed to the highest standards.
              </p>
            </div>
            <div className="pt-8 grid grid-cols-3 gap-8 border-t border-white/10">
              <div className="space-y-1">
                <h4 className="text-4xl font-black text-primary">15+</h4>
                <p className="text-sm font-bold tracking-wider text-muted-foreground">Years Experience</p>
              </div>
              <div className="space-y-1">
                <h4 className="text-4xl font-black text-primary">5k+</h4>
                <p className="text-sm font-bold tracking-wider text-muted-foreground">Loads Delivered</p>
              </div>
              <div className="space-y-1">
                <h4 className="text-4xl font-black text-primary">100%</h4>
                <p className="text-sm font-bold tracking-wider text-muted-foreground">Safety Record</p>
              </div>
            </div>
            <div className="pt-8">
              <Link href="/about">
                <Button className="rounded-full bg-primary hover:bg-primary/90 px-10 h-14 font-bold text-white shadow-lg">
                  Read More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services (Modern Interactive Grid) */}
      <section className="py-24 bg-background overflow-hidden relative">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -mr-32 -mt-32 opacity-20" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -ml-32 -mb-32 opacity-20" />

        <div className="w-full max-w-[1800px] mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-sm font-bold tracking-[0.2em] text-primary">Capabilities</h2>
              <h3 className="text-4xl md:text-5xl font-black tracking-tighter leading-[0.9] text-white">
                Engineered for <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">Heavy Loads</span>
              </h3>
            </div>
            <Link href="/services">
               <Button variant="outline" className="rounded-full border-white/20 text-white hover:bg-white hover:text-background h-12 px-6 tracking-wider font-bold group">
                 View All Services <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
               </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
             {[
               { 
                 title: "Construction Hauling", 
                 subtitle: "Aggregates & Materials",
                 desc: "Reliable transport of sand, gravel, rock, and asphalt for projects of any scale.",
                 image: "https://images.unsplash.com/photo-1617135002770-65c7f9392943?q=80&w=2940&auto=format&fit=crop",
                 icon: Truck
               },
               { 
                 title: "Heavy Equipment", 
                 subtitle: "Specialized Transport",
                 desc: "Low-bed and flatbed services for moving excavators, dozers, and heavy machinery.",
                 image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2940&auto=format&fit=crop",
                 icon: HardHat
               },
               { 
                 title: "Site Services", 
                 subtitle: "Clearing & Grading",
                 desc: "Comprehensive site preparation support including debris removal and grading.",
                 image: "https://images.unsplash.com/photo-1591768793355-74d04bb6608f?q=80&w=2940&auto=format&fit=crop",
                 icon: Scale
               }
             ].map((service, i) => (
               <div key={i} className="group relative h-[300px] rounded-3xl overflow-hidden cursor-pointer border border-white/10 hover:border-primary/50 transition-all duration-500 bg-black/20">
                 {/* Content */}
                 <div className="absolute inset-0 p-8 flex flex-col justify-center items-center text-center">
                   <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                     <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary mb-6 mx-auto group-hover:bg-primary group-hover:text-white transition-all duration-500">
                        <service.icon size={32} />
                     </div>
                     
                     <h4 className="text-2xl font-black text-white mb-2 leading-none">{service.title}</h4>
                     <p className="text-primary font-bold tracking-wider text-xs mb-4 opacity-80">{service.subtitle}</p>
                     
                     <p className="text-white/70 leading-relaxed max-w-sm mx-auto mb-4">
                       {service.desc}
                     </p>
                     
                     <div className="inline-flex items-center gap-2 text-white font-bold tracking-widest text-xs border-b border-primary/0 group-hover:border-primary transition-all pb-1">
                       Details <ArrowRight size={14} />
                     </div>
                   </div>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Easy Process Section */}
      <section className="py-24 bg-card border-t border-white/5">
         <div className="w-full max-w-[1800px] mx-auto px-4 md:px-8">
           <div className="max-w-4xl mx-auto text-center mb-16">
             <h2 className="text-4xl font-black tracking-tight mb-4 text-foreground">
               Core <span className="text-primary">Values</span>
             </h2>
             <p className="text-xl text-muted-foreground">The principles that drive every mile we travel.</p>
           </div>
           
           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
               <div className="bg-background p-8 rounded-3xl border border-white/5 hover:border-primary/50 transition-colors group">
                 <div className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                   <Shield size={28} />
                 </div>
                 <h3 className="text-xl font-bold mb-3 text-foreground">Safety</h3>
                 <p className="text-muted-foreground leading-relaxed">The foundation of everything we do. We protect our drivers, our partners, and the motoring public.</p>
               </div>

               <div className="bg-background p-8 rounded-3xl border border-white/5 hover:border-primary/50 transition-colors group">
                 <div className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                   <Clock size={28} />
                 </div>
                 <h3 className="text-xl font-bold mb-3 text-foreground">Reliability</h3>
                 <p className="text-muted-foreground leading-relaxed">When we say we will be there, we are there. We deliver on our promises, every single time.</p>
               </div>

               <div className="bg-background p-8 rounded-3xl border border-white/5 hover:border-primary/50 transition-colors group">
                 <div className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                   <Star size={28} />
                 </div>
                 <h3 className="text-xl font-bold mb-3 text-foreground">Expertise</h3>
                 <p className="text-muted-foreground leading-relaxed">Our team brings deep industry knowledge to solve complex logistical challenges.</p>
               </div>

               <div className="bg-background p-8 rounded-3xl border border-white/5 hover:border-primary/50 transition-colors group">
                 <div className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                   <Check size={28} />
                 </div>
                 <h3 className="text-xl font-bold mb-3 text-foreground">Accountability</h3>
                 <p className="text-muted-foreground leading-relaxed">We take ownership of our work and maintain transparent communication at all levels.</p>
               </div>
           </div>
           
           <div className="text-center mt-12">
             <Link href="/contact">
              <Button className="rounded-full bg-primary hover:bg-primary/90 px-10 h-14 font-bold text-white shadow-xl shadow-primary/20">
                Partner With Us
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
