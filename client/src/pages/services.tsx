import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Check, Truck, HardHat, Briefcase, ArrowRight, ShieldCheck, Clock, MapPin } from "lucide-react";
import Footer from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";

import heroImage3 from "@/assets/2901750e-cf47-4cc3-af40-fe476f6840bc_1772219729261.jpeg";
import heroImage4 from "@/assets/d04ae16f-4942-46fc-bb1d-ac0c5740543c_1772219729261.jpeg";

export default function Services() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[55vh] md:h-[70vh] min-h-[400px] w-full overflow-hidden flex items-center justify-center mt-[72px] lg:mt-[112px]">
        <div className="absolute inset-0 z-0">
           <img 
             src={heroImage3} 
             alt="Services Hero" 
             className="w-full h-full object-cover object-[70%_center] md:object-[center_25%] opacity-60"
           />
           <div className="absolute inset-0 bg-black/60 z-10" />
        </div>
        
        <div className="relative z-20 w-full max-w-[1800px] mx-auto px-4 md:px-8 text-center space-y-10">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6 }}
             className="space-y-8"
           >
             <h2 className="text-[var(--primary)] font-bold tracking-widest text-sm mb-6">Our Expertise</h2>
             <h1 className="text-2xl md:text-3xl lg:text-2xl font-black tracking-tighter text-white leading-none mb-8">
              Specialized <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-orange-400">Hauling Solutions</span>
             </h1>
             <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed mt-8">
               Comprehensive logistics and transport services tailored for the modern construction industry.
             </p>
           </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 bg-[var(--surface-2)] relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
        
        <div className="w-full max-w-[1800px] mx-auto px-4 md:px-8">
          <div className="space-y-32">
             {/* Service 1 */}
             <motion.div 
               initial={{ opacity: 0, y: 40 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="grid md:grid-cols-2 gap-16 items-center"
             >
               
               <div className="order-1 md:order-2 space-y-8 col-span-2 md:col-span-2">
                 <div className="h-16 w-16 bg-[var(--primary)]/10 rounded-2xl flex items-center justify-center text-[var(--primary)] border border-[var(--primary)]/20">
                   <HardHat size={32} />
                 </div>
                 <div>
                   <h3 className="text-2xl font-black text-[var(--text)] mb-4">Construction Material Hauling</h3>
                   <p className="text-lg text-[var(--text-muted)] leading-relaxed">
                     We provide reliable transport solutions for all types of construction materials. From aggregates and sand to asphalt and gravel, our fleet ensures a consistent supply chain for your job site.
                   </p>
                 </div>
                 
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   {["Consistent Material Flow", "Job Site Coordination", "Diverse Material Handling", "Schedule Adherence"].map(item => (
                     <div key={item} className="flex items-center gap-3 p-3 rounded-xl bg-white border border-[var(--border)] shadow-sm">
                       <Check size={16} className="text-[var(--primary)]" /> 
                       <span className="text-sm font-bold text-[var(--text-muted)]">{item}</span>
                     </div>
                   ))}
                 </div>
                 
                 <Link href="/contact">
                   <Button className="rounded-full bg-[var(--primary)] hover:bg-[var(--primary)]/90 px-8 h-12 font-bold text-white mt-4 group">
                     Request Service <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                   </Button>
                 </Link>
               </div>
             </motion.div>

             {/* Service 2 */}
             <motion.div 
               initial={{ opacity: 0, y: 40 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="grid md:grid-cols-2 gap-16 items-center"
             >
               <div className="space-y-8">
                 <div className="h-16 w-16 bg-[var(--primary)]/10 rounded-2xl flex items-center justify-center text-[var(--primary)] border border-[var(--primary)]/20">
                   <Truck size={32} />
                 </div>
                 <div>
                   <h3 className="text-2xl font-black text-[var(--text)] mb-4">Dump Truck Services</h3>
                   <p className="text-lg text-[var(--text-muted)] leading-relaxed">
                     Our fleet of high-capacity dump trucks is equipped to handle heavy loads with ease. We support excavation, grading, and paving projects with precision dumping and rapid turnaround times.
                   </p>
                 </div>
                 
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   {["Excavation Support", "Site Grading", "Paving Operations", "Debris Removal"].map(item => (
                     <div key={item} className="flex items-center gap-3 p-3 rounded-xl bg-white border border-[var(--border)] shadow-sm">
                       <Check size={16} className="text-[var(--primary)]" /> 
                       <span className="text-sm font-bold text-[var(--text-muted)]">{item}</span>
                     </div>
                   ))}
                 </div>
                 
                 <Link href="/contact">
                   <Button className="rounded-full bg-[var(--primary)] hover:bg-[var(--primary)]/90 px-8 h-12 font-bold text-white mt-4 group">
                     Request Service <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                   </Button>
                 </Link>
               </div>
               
               <div className="relative">
                 <div className="absolute -inset-4 bg-[var(--primary)]/10 rounded-3xl blur-2xl opacity-50" />
                 <img 
                   src={heroImage4} 
                   className="relative rounded-3xl w-full h-[500px] object-cover shadow-2xl border border-white/50" 
                   alt="Dump Truck" 
                 />
                 <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl border border-[var(--border)] shadow-xl hidden lg:block">
                   <div className="flex items-center gap-4">
                     <div className="h-12 w-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)]">
                       <Clock size={24} />
                     </div>
                     <div>
                       <p className="text-xs text-muted-foreground font-bold">Availability</p>
                       <p className="font-bold text-[var(--text)]">24/7 Dispatch</p>
                     </div>
                   </div>
                 </div>
               </div>
             </motion.div>

          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-white border-t border-[var(--border)] py-12 text-center">
        <div className="w-full max-w-[1800px] mx-auto px-4 md:px-8 max-w-3xl space-y-8">
          <h2 className="text-2xl font-black text-[var(--text)]">Have a specialized hauling need?</h2>
          <p className="text-[var(--text-muted)] text-xl font-medium">We adapt to your project requirements. Let's discuss your logistics plan.</p>
          <div className="flex justify-center gap-4 pt-4">
            <Link href="/contact">
              <Button size="lg" className="rounded-full h-14 px-10 font-bold bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90 text-lg shadow-xl shadow-[var(--primary)]/20">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
