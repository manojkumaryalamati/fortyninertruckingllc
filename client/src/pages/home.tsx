import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Shield, Clock, Users, ArrowRight, Truck, HardHat, Scale, Menu, X, Globe, Zap, BarChart3, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Footer from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      <Navbar />

      {/* Hero Section */}
      <section className="relative px-4 pt-4 pb-4 bg-background">
        <div className="relative rounded-[2.5rem] overflow-hidden h-[95vh] min-h-[700px] w-full mx-auto max-w-[1920px]">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
             <div className="absolute inset-0 bg-black/30 z-10" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
             <img 
               src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=3270&auto=format&fit=crop" 
               alt="Global Logistics Fleet" 
               className="w-full h-full object-cover"
             />
          </div>

          {/* Hero Content */}
          <div className="relative z-20 container mx-auto px-6 h-full flex flex-col justify-center items-center text-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-6xl space-y-8 mt-16"
            >
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white mb-4 shadow-lg">
                <div className="bg-primary rounded-full p-1">
                  <Star size={12} className="text-white fill-white" />
                </div>
                <span className="text-sm font-semibold tracking-wide uppercase">Your Global Logistics Partner</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight text-white leading-[1.1] drop-shadow-xl">
                Smart Logistics Solutions <br />
                <span className="inline-flex items-center align-middle gap-4 mx-2">
                   <div className="h-[0.8em] w-[1.5em] rounded-full overflow-hidden border-2 border-white/20 relative hidden lg:inline-block">
                     <img src="https://images.unsplash.com/photo-1494412574643-35d324698420?q=80&w=500&auto=format&fit=crop" className="w-full h-full object-cover" />
                   </div>
                   That Move the
                   <div className="h-[0.8em] w-[1.5em] rounded-full overflow-hidden border-2 border-white/20 relative hidden lg:inline-block">
                     <img src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=500&auto=format&fit=crop" className="w-full h-full object-cover" />
                   </div>
                   World.
                </span>
              </h1>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10">
                <Link href="/contact">
                  <Button size="lg" className="rounded-full h-16 px-12 text-lg font-bold bg-[#FF5500] hover:bg-[#FF5500]/90 text-white shadow-xl shadow-orange-900/20 hover:scale-105 transition-all border-none">
                    Get a Quote
                  </Button>
                </Link>
                <Link href="/services">
                  <Button size="lg" variant="outline" className="rounded-full h-16 px-12 text-lg font-bold bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 transition-all">
                    Learn More <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Floating Stats Cards */}
          <div className="absolute bottom-12 left-12 hidden md:block z-20">
             <div className="bg-white p-2 pr-6 rounded-full shadow-2xl flex items-center gap-4">
               <div className="flex -space-x-3">
                 {[1,2,3].map(i => (
                   <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                     <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Client" />
                   </div>
                 ))}
                 <div className="h-10 w-10 rounded-full border-2 border-white bg-black flex items-center justify-center text-white text-xs font-bold">
                   500+
                 </div>
               </div>
               <div className="text-sm font-bold text-black">
                 Business Clients
               </div>
             </div>
          </div>

          <div className="absolute bottom-12 right-12 hidden md:block z-20">
             <div className="bg-white p-3 rounded-2xl shadow-2xl flex items-center gap-4 min-w-[240px]">
               <div className="h-16 w-20 rounded-xl overflow-hidden shrink-0">
                 <img src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2940&auto=format&fit=crop" className="w-full h-full object-cover" />
               </div>
               <div>
                 <p className="text-xl font-extrabold text-black">10,000+</p>
                 <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Successful Shipments</p>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Partners Logos */}
      <section className="py-12 border-b border-border/50">
        <div className="container mx-auto px-6">
           <p className="text-center text-sm font-bold text-muted-foreground uppercase tracking-widest mb-8">Our Trusted Partners</p>
           <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
             {["Construction Corp", "BuildRight", "HeavyHaul Inc", "Global Logistics", "Metro Builders"].map((partner, i) => (
               <div key={i} className="flex items-center gap-2 text-xl font-bold font-display">
                 <div className="h-8 w-8 bg-foreground rounded-full" />
                 {partner}
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* About / Bento Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="mb-16">
            <Badge variant="secondary" className="mb-4">About FortyNiner</Badge>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Your Trusted Partner in <br />Global Logistics</h2>
            <p className="text-xl text-muted-foreground max-w-2xl">
              We deliver more than just shipments—we deliver confidence, precision, and smart technology that moves businesses forward.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1: Dark */}
            <Card className="bg-[#111] text-white border-none rounded-[2rem] overflow-hidden relative md:col-span-1 min-h-[400px]">
              <CardContent className="p-8 flex flex-col h-full justify-between relative z-10">
                 <div className="h-14 w-14 rounded-full bg-white/10 flex items-center justify-center mb-4">
                   <Shield size={28} />
                 </div>
                 <div>
                   <h3 className="text-2xl font-bold mb-2">Delivering Excellence Every Mile</h3>
                   <p className="text-gray-400">
                     We're committed to providing efficient, transparent, and technology-driven logistics services.
                   </p>
                 </div>
              </CardContent>
              {/* Abstract decorative circles */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white/5 rounded-full" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-white/5 rounded-full" />
            </Card>

            {/* Card 2: Light */}
            <Card className="bg-[#F8F9FA] border-none rounded-[2rem] overflow-hidden md:col-span-1 min-h-[400px]">
              <CardContent className="p-8 flex flex-col h-full justify-between">
                 <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                   <Globe size={28} />
                 </div>
                 <div>
                   <h3 className="text-2xl font-bold mb-2">Shaping the Future of Global Logistics</h3>
                   <p className="text-muted-foreground">
                     Our vision is to build a smarter logistics ecosystem powered by innovation and seamless global connectivity.
                   </p>
                 </div>
              </CardContent>
            </Card>

             {/* Card 3: Form/Calculator Style */}
            <Card className="bg-white border shadow-xl rounded-[2rem] overflow-hidden md:col-span-1 min-h-[400px] relative">
               <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2940&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
               <CardContent className="absolute bottom-0 left-0 right-0 p-8 text-white">
                 <h3 className="text-3xl font-bold mb-1">Fleet Ready</h3>
                 <p className="text-white/80">Available for Dispatch Today</p>
                 <Button className="w-full mt-6 rounded-full bg-white text-black hover:bg-white/90">
                   Check Availability
                 </Button>
               </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Delivering Excellence Through<br/>Reliability and Innovation</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Expert Logistics Team", image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2940&auto=format&fit=crop" },
              { title: "Reliable Delivery", image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2940&auto=format&fit=crop" },
              { title: "Smart Tracking", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2940&auto=format&fit=crop" }
            ].map((service, i) => (
              <div key={i} className="group relative rounded-[2rem] overflow-hidden aspect-[4/5] cursor-pointer">
                <img src={service.image} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                  <div className="h-1 w-12 bg-primary rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="bg-[#111] rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="relative z-10 max-w-3xl mx-auto space-y-8">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white">Ready to Move Smarter?</h2>
              <p className="text-xl text-gray-400">
                Get your quote today and experience the difference of a true logistics partnership.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                <Link href="/contact">
                  <Button size="lg" className="rounded-full h-16 px-12 text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground">
                    Get a Quote
                  </Button>
                </Link>
              </div>
            </div>
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
