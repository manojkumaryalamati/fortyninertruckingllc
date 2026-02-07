import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Shield, Clock, Users, ArrowRight, Truck, HardHat, Scale, Menu, X, Globe, Zap, BarChart3, Star, ChevronLeft, ChevronRight, Phone, Mail, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Footer from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
           <img 
             src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=3270&auto=format&fit=crop" 
             alt="Global Logistics Fleet" 
             className="w-full h-full object-cover"
           />
           {/* Dark Overlay for text readability */}
           <div className="absolute inset-0 bg-black/40 z-10" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 container mx-auto px-6 h-full flex flex-col justify-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl space-y-6"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white uppercase leading-[0.9]">
              BUILDING <br />
              <span className="text-primary">AMERICA'S</span> <br />
              FUTURE
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-xl font-medium border-l-4 border-primary pl-6">
              FortyNinerTrucking LLC delivers premier construction hauling and logistics solutions for major infrastructure projects across the nation.
            </p>
            
            <div className="pt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button size="lg" className="rounded-full h-14 px-10 text-lg font-bold bg-primary hover:bg-primary/90 text-white shadow-xl hover:scale-105 transition-all border-none uppercase tracking-wide">
                  Request a Quote <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                 <Button size="lg" variant="outline" className="rounded-full h-14 px-10 text-lg font-bold bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-md uppercase tracking-wide">
                   Talk to Dispatch
                 </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Value Prop Strip */}
      <section className="bg-[#FDFBF7] py-16 border-b border-border/10">
        <div className="container mx-auto px-6">
           <div className="flex flex-col md:flex-row items-center justify-between gap-8">
             <div className="md:w-1/2">
                <h3 className="text-3xl font-black uppercase text-foreground leading-tight">
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
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-sm font-bold uppercase tracking-widest text-primary">About Us</h2>
                <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-foreground">
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
              <Link href="/about">
                <Button className="rounded-full bg-primary hover:bg-primary/90 px-8 h-12 uppercase font-bold text-white shadow-lg">
                  Read More
                </Button>
              </Link>
            </div>
            
            <div className="relative p-6">
              {/* Decorative Border */}
              <div className="absolute inset-0 border-2 border-primary/20 rounded-3xl translate-x-4 translate-y-4 z-0" />
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
                 <img 
                   src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2940&auto=format&fit=crop" 
                   alt="Trucking Operations" 
                   className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700"
                 />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services (Carousel Style) */}
      <section className="py-24 bg-[#FDFBF7]">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-black uppercase tracking-tight mb-2">
                Our Featured <span className="text-primary">Services</span>
              </h2>
              <p className="text-muted-foreground">We offer a wide selection of logistics solutions for every requirement.</p>
            </div>
            <div className="flex gap-2">
              <Button size="icon" variant="outline" className="rounded-full border-2 hover:bg-primary hover:text-white hover:border-primary transition-colors">
                <ChevronLeft size={20} />
              </Button>
              <Button size="icon" variant="outline" className="rounded-full border-2 bg-primary text-white border-primary hover:bg-primary/90">
                <ChevronRight size={20} />
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
             {[
               { 
                 title: "Construction Material Hauling", 
                 desc: "Efficient transport of aggregates, sand, gravel, and asphalt for job sites of all sizes.",
                 image: "https://images.unsplash.com/photo-1617135002770-65c7f9392943?q=80&w=2940&auto=format&fit=crop"
               },
               { 
                 title: "Dump Truck Services", 
                 desc: "High-capacity removal and delivery with our fleet of Super Dumps and End Dumps.",
                 image: "https://images.unsplash.com/photo-1591768793355-74d04bb6608f?q=80&w=2940&auto=format&fit=crop"
               },
               { 
                 title: "Project-Based Solutions", 
                 desc: "Comprehensive logistics planning and execution for large-scale infrastructure projects.",
                 image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2940&auto=format&fit=crop"
               }
             ].map((service, i) => (
               <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg group hover:shadow-2xl transition-all duration-300">
                 <div className="h-64 overflow-hidden relative">
                   <img src={service.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                   <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                 </div>
                 <div className="p-8 text-center space-y-4">
                   <h3 className="text-xl font-black uppercase">{service.title}</h3>
                   <div className="h-1 w-10 bg-primary mx-auto" />
                   <p className="text-muted-foreground text-sm leading-relaxed">
                     {service.desc}
                   </p>
                   <Link href="/services">
                    <Button className="w-full rounded-full bg-primary hover:bg-primary/90 text-white font-bold uppercase mt-4">
                      Learn More
                    </Button>
                   </Link>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Easy Process Section */}
      <section className="py-24 bg-white">
         <div className="container mx-auto px-6">
           <div className="grid lg:grid-cols-2 gap-16 items-center">
             <div className="grid grid-cols-2 gap-4">
               <img src="https://images.unsplash.com/photo-1616432043562-3671ea2e5242?q=80&w=2940&auto=format&fit=crop" className="rounded-2xl shadow-lg mt-12" />
               <img src="https://images.unsplash.com/photo-1605218427306-635ba2439af2?q=80&w=2940&auto=format&fit=crop" className="rounded-2xl shadow-lg" />
             </div>
             <div className="space-y-6">
               <h2 className="text-4xl font-black uppercase tracking-tight">
                 Core <span className="text-primary">Values</span>
               </h2>
               <div className="space-y-6">
                 <div>
                   <h3 className="text-xl font-bold uppercase mb-2">Safety</h3>
                   <p className="text-muted-foreground">The foundation of everything we do. We protect our drivers, our partners, and the motoring public.</p>
                 </div>
                 <div>
                   <h3 className="text-xl font-bold uppercase mb-2">Reliability</h3>
                   <p className="text-muted-foreground">When we say we will be there, we are there. We deliver on our promises, every single time.</p>
                 </div>
                 <div>
                   <h3 className="text-xl font-bold uppercase mb-2">Expertise</h3>
                   <p className="text-muted-foreground">Our team brings deep industry knowledge to solve complex logistical challenges.</p>
                 </div>
                 <div>
                   <h3 className="text-xl font-bold uppercase mb-2">Accountability</h3>
                   <p className="text-muted-foreground">We take ownership of our work and maintain transparent communication at all levels.</p>
                 </div>
               </div>
               <Link href="/contact">
                <Button className="rounded-full bg-primary hover:bg-primary/90 px-10 h-14 uppercase font-bold text-white shadow-xl shadow-primary/20">
                  Partner With Us
                </Button>
               </Link>
             </div>
           </div>
         </div>
      </section>

      {/* Red CTA / Quote Section */}
      <section className="bg-primary py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
             <div className="space-y-8 text-white">
               <div className="space-y-2">
                 <h2 className="text-4xl md:text-5xl font-black uppercase">Need a Quick Quote?</h2>
                 <p className="text-xl font-medium opacity-90">We're just a call away.</p>
               </div>
               
               <div className="bg-white rounded-3xl p-8 text-foreground shadow-2xl space-y-6 max-w-md">
                 <div className="flex items-center gap-4">
                   <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                     <Phone size={24} />
                   </div>
                   <div>
                     <p className="text-xs font-bold text-muted-foreground uppercase">Phone</p>
                     <p className="text-lg font-bold">123-456-7890</p>
                   </div>
                 </div>
                 
                 <div className="flex items-center gap-4">
                   <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                     <Mail size={24} />
                   </div>
                   <div>
                     <p className="text-xs font-bold text-muted-foreground uppercase">Email</p>
                     <p className="text-lg font-bold">support@fortyniner.com</p>
                   </div>
                 </div>

                 <div className="flex items-center gap-4">
                   <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                     <MapPin size={24} />
                   </div>
                   <div>
                     <p className="text-xs font-bold text-muted-foreground uppercase">Office</p>
                     <p className="text-lg font-bold">123 Logistics Way, CA</p>
                   </div>
                 </div>
               </div>
             </div>

             <div className="hidden lg:block relative">
               <img 
                 src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=3270&auto=format&fit=crop" 
                 className="rounded-3xl shadow-2xl border-4 border-white/20 transform rotate-2 hover:rotate-0 transition-transform duration-500" 
                 alt="Truck"
               />
             </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white text-center">
        <div className="container mx-auto px-6 max-w-4xl">
           <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">Testimonials</h2>
           <h3 className="text-4xl font-black uppercase mb-16">
             Trusted by hundreds of <br/> <span className="text-primary">Happy Customers</span>
           </h3>

           <div className="bg-[#FDFBF7] p-12 rounded-[3rem] relative">
             <div className="flex flex-col md:flex-row items-center gap-8">
               <img 
                 src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2940&auto=format&fit=crop" 
                 className="w-24 h-24 rounded-full object-cover shadow-xl border-4 border-white"
               />
               <div className="text-left space-y-4">
                 <p className="text-xl font-medium italic text-muted-foreground">
                   "I rented a cargo trailer for moving my office equipment, and the experience was seamless. The trailer was clean, sturdy, and the booking process was so simple. Highly recommend!"
                 </p>
                 <div>
                   <p className="text-lg font-bold text-foreground">Nathalie Gibson</p>
                   <p className="text-sm text-primary font-bold">Business Owner</p>
                 </div>
               </div>
             </div>
           </div>
           
           <div className="mt-12">
             <Link href="/contact">
              <Button className="rounded-full bg-primary hover:bg-primary/90 px-10 h-14 uppercase font-bold text-white shadow-xl shadow-primary/20">
                View All Reviews
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
