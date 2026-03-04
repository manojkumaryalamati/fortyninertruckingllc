import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Shield, Clock, Users, ArrowRight, Truck, HardHat, Scale, Menu, X, Globe, Zap, BarChart3, Star, ChevronLeft, ChevronRight, Phone, Mail, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Footer from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

import heroImage1 from "@/assets/a2a02ae8-e30d-4a34-ad88-64598b4c945f_1772219729261.jpeg";
import heroImage2 from "@/assets/867d8163-e94d-4056-b575-856aa6f68ace_1772219729261.jpeg";
import heroImage3 from "@/assets/2901750e-cf47-4cc3-af40-fe476f6840bc_1772219729261.jpeg";
import heroImage4 from "@/assets/d04ae16f-4942-46fc-bb1d-ac0c5740543c_1772219729261.jpeg";

const carouselImages = [heroImage1, heroImage2, heroImage3, heroImage4];

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const nextImage = () => setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
  const prevImage = () => setCurrentImageIndex((prevIndex) => (prevIndex - 1 + carouselImages.length) % carouselImages.length);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-[var(--primary)]/20">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[350px] h-[45vh] md:min-h-[500px] md:h-[calc(100vh-72px)] w-full overflow-hidden mt-[72px] lg:h-[calc(100vh-112px)] lg:mt-[112px]">
        {/* Background Image Carousel */}
        <div className="absolute inset-0 z-0 bg-white">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={currentImageIndex}
              src={carouselImages[currentImageIndex]}
              alt="FortyNiner Trucking Fleet"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover object-[20%_center] md:object-[center_25%]"
            />
          </AnimatePresence>
          {/* Very light gradient overlay just at the bottom to ensure buttons are readable without a solid dark box */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent z-10" />
          
        </div>

        {/* Hero Content */}
        <div className="relative z-20 w-full h-full flex flex-col justify-center items-center text-center px-4 md:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-white leading-[1.1] tracking-tight text-shadow-sm">
              The <span className="text-[var(--primary)]">Standard</span> in Hauling
            </h1>
            <p className="text-base md:text-xl text-white/90 font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-md">
              California's premier partner for construction logistics and material transport.
            </p>
          </motion.div>
        </div>

        {/* Bottom Actions - Responsive Alignment */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="absolute bottom-16 left-4 right-4 sm:left-auto sm:right-12 z-20 flex flex-col sm:flex-row items-center gap-4"
        >
          <Link href="/services" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto h-10 px-6 text-sm md:h-12 md:px-8 md:text-base font-bold tracking-wide border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white bg-white/90 backdrop-blur-sm rounded-full min-w-[140px] md:min-w-[160px] shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              Our Services
            </Button>
          </Link>
          <Link href="/contact" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto h-10 px-6 text-sm md:h-12 md:px-8 md:text-base font-bold tracking-wide bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white rounded-full min-w-[140px] md:min-w-[160px] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              Get A Quote
            </Button>
          </Link>
        </motion.div>

        {/* Simple Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-[var(--primary)]/40"
        >
          <div className="w-[1px] h-16 bg-[var(--primary)]/20 overflow-hidden">
            <div className="w-full h-1/2 bg-[var(--primary)] animate-movedown"></div>
          </div>
        </motion.div>
      </section>

      {/* Value Prop Strip */}
      <section className="bg-white py-12 border-b border-[var(--border)]">
        <div className="w-full max-w-[1800px] mx-auto px-4 md:px-8">
           <div className="flex flex-col md:flex-row items-center justify-between gap-8">
             <div className="md:w-1/2">
                <h3 className="text-2xl font-black text-[var(--text)] leading-tight">
                  Safety, Reliability, and <span className="text-[var(--primary)]">Expertise</span> in every load.
                </h3>
             </div>
             <div className="md:w-1/2 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <p className="text-[var(--text-muted)] leading-relaxed">
                  We are committed to operational excellence. Our fleet and team adhere to the strictest safety protocols to ensure your project stays on track and compliant.
                </p>
             </div>
           </div>
        </div>
      </section>

      {/* Who We Are - Split Layout */}
      <section className="py-12 md:py-12 bg-[var(--surface-2)]">
        <div className="w-full max-w-[1800px] mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-sm font-bold tracking-widest text-[var(--primary)]">About Us</h2>
              <h3 className="text-2xl md:text-2xl font-black tracking-tight text-[var(--text)]">
                The <span className="text-[var(--primary)]">Standard</span> in Hauling
              </h3>
            </div>
            <div className="space-y-4 text-base md:text-lg text-[var(--text-muted)] leading-relaxed">
              <p>
                FortyNinerTrucking LLC is a premier logistics provider specializing in construction material transport and heavy hauling. With years of industry experience, we have built a reputation for reliability, safety, and operational precision.
              </p>
              <p>
                We don't just move materials; we build long-term partnerships with contractors, municipalities, and developers. Our commitment to safety and compliance ensures that every job is completed to the highest standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services (Modern Interactive Grid) */}
      <section className="py-12 md:py-12 bg-white overflow-hidden relative">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--primary)]/5 rounded-full blur-[100px] -mr-32 -mt-32 opacity-20" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--primary)]/5 rounded-full blur-[100px] -ml-32 -mb-32 opacity-20" />

        <div className="w-full max-w-[1800px] mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 gap-6">
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-sm font-bold tracking-[0.2em] text-[var(--primary)]">Capabilities</h2>
              <h3 className="text-2xl md:text-2xl font-black tracking-tighter leading-[0.9] text-[var(--text)]">
                Engineered for <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--primary)]/60">Heavy Loads</span>
              </h3>
            </div>
            <Link href="/services">
               <Button variant="outline" className="rounded-full border-[var(--border)] text-[var(--text-muted)] hover:bg-[var(--surface-2)] hover:text-[var(--text)] h-12 px-6 tracking-wider font-bold group w-full md:w-auto">
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
                 image: heroImage2,
                 icon: Truck
               },
               { 
                 title: "Heavy Equipment", 
                 subtitle: "Specialized Transport",
                 desc: "Low-bed and flatbed services for moving excavators, dozers, and heavy machinery.",
                 image: heroImage3,
                 icon: HardHat
               },
               { 
                 title: "Site Services", 
                 subtitle: "Clearing & Grading",
                 desc: "Comprehensive site preparation support including debris removal and grading.",
                 image: heroImage4,
                 icon: Scale
               }
             ].map((service, i) => (
               <div key={i} className="group relative h-[300px] rounded-3xl overflow-hidden cursor-pointer border border-[var(--border)] hover:border-[var(--primary)]/50 transition-all duration-500 bg-[var(--surface-2)]">
                 {/* Content */}
                 <div className="absolute inset-0 p-8 flex flex-col justify-center items-center text-center">
                   <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                     <div className="w-16 h-16 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mb-6 mx-auto group-hover:bg-[var(--primary)] group-hover:text-white transition-all duration-500">
                        <service.icon size={32} />
                     </div>
                     
                     <h4 className="text-2xl font-black text-[var(--text)] mb-2 leading-none">{service.title}</h4>
                     <p className="text-[var(--primary)] font-bold tracking-wider text-xs mb-4 opacity-80">{service.subtitle}</p>
                     
                     <p className="text-[var(--text-muted)] leading-relaxed max-w-sm mx-auto mb-4">
                       {service.desc}
                     </p>
                     
                     <div className="inline-flex items-center gap-2 text-[var(--text)] font-bold tracking-widest text-xs border-b border-[var(--primary)]/0 group-hover:border-[var(--primary)] transition-all pb-1">
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
      <section className="py-12 bg-[var(--surface-2)] border-t border-[var(--border)]">
         <div className="w-full max-w-[1800px] mx-auto px-4 md:px-8">
           <div className="max-w-4xl mx-auto text-center mb-16">
             <h2 className="text-2xl font-black tracking-tight mb-4 text-[var(--text)]">
               Core <span className="text-[var(--primary)]">Values</span>
             </h2>
             <p className="text-xl text-[var(--text-muted)]">The principles that drive every mile we travel.</p>
           </div>
           
           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
               <div className="bg-white p-8 rounded-3xl border border-[var(--border)] hover:border-[var(--primary)]/50 transition-colors group shadow-sm">
                 <div className="h-14 w-14 bg-[var(--primary)]/10 rounded-2xl flex items-center justify-center text-[var(--primary)] mb-6 group-hover:bg-[var(--primary)] group-hover:text-white transition-colors">
                   <Shield size={28} />
                 </div>
                 <h3 className="text-xl font-bold mb-3 text-[var(--text)]">Safety</h3>
                 <p className="text-[var(--text-muted)] leading-relaxed">The foundation of everything we do. We protect our drivers, our partners, and the motoring public.</p>
               </div>

               <div className="bg-white p-8 rounded-3xl border border-[var(--border)] hover:border-[var(--primary)]/50 transition-colors group shadow-sm">
                 <div className="h-14 w-14 bg-[var(--primary)]/10 rounded-2xl flex items-center justify-center text-[var(--primary)] mb-6 group-hover:bg-[var(--primary)] group-hover:text-white transition-colors">
                   <Clock size={28} />
                 </div>
                 <h3 className="text-xl font-bold mb-3 text-[var(--text)]">Reliability</h3>
                 <p className="text-[var(--text-muted)] leading-relaxed">When we say we will be there, we are there. We deliver on our promises, every single time.</p>
               </div>

               <div className="bg-white p-8 rounded-3xl border border-[var(--border)] hover:border-[var(--primary)]/50 transition-colors group shadow-sm">
                 <div className="h-14 w-14 bg-[var(--primary)]/10 rounded-2xl flex items-center justify-center text-[var(--primary)] mb-6 group-hover:bg-[var(--primary)] group-hover:text-white transition-colors">
                   <Star size={28} />
                 </div>
                 <h3 className="text-xl font-bold mb-3 text-[var(--text)]">Expertise</h3>
                 <p className="text-[var(--text-muted)] leading-relaxed">Our team brings deep industry knowledge to solve complex logistical challenges.</p>
               </div>

               <div className="bg-white p-8 rounded-3xl border border-[var(--border)] hover:border-[var(--primary)]/50 transition-colors group shadow-sm">
                 <div className="h-14 w-14 bg-[var(--primary)]/10 rounded-2xl flex items-center justify-center text-[var(--primary)] mb-6 group-hover:bg-[var(--primary)] group-hover:text-white transition-colors">
                   <Check size={28} />
                 </div>
                 <h3 className="text-xl font-bold mb-3 text-[var(--text)]">Accountability</h3>
                 <p className="text-[var(--text-muted)] leading-relaxed">We take ownership of our work and maintain transparent communication at all levels.</p>
               </div>
           </div>
           
           <div className="text-center mt-12">
             <Link href="/contact">
              <Button className="rounded-full bg-[var(--primary)] hover:bg-[var(--primary)]/90 px-10 h-14 font-bold text-white shadow-xl shadow-[var(--primary)]/20">
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
