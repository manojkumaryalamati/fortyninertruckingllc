import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Check, Truck, HardHat, Briefcase, ArrowRight, ShieldCheck, Clock, MapPin } from "lucide-react";
import Footer from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";

export default function Services() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
           <img 
             src="https://images.unsplash.com/photo-1590496793907-71876d7dd545?q=80&w=2800&auto=format&fit=crop" 
             alt="Services Hero" 
             className="w-full h-full object-cover opacity-60"
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
             <h2 className="text-primary font-bold tracking-widest text-sm mb-6">Our Expertise</h2>
             <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-none mb-8">
              Specialized <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">Hauling Solutions</span>
             </h1>
             <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed mt-8">
               Comprehensive logistics and transport services tailored for the modern construction industry.
             </p>
           </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-zinc-50 relative overflow-hidden">
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
               <div className="order-2 md:order-1 relative">
                 <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl opacity-50" />
                 <img 
                   src="https://images.unsplash.com/photo-1617135002770-65c7f9392943?q=80&w=2940&auto=format&fit=crop" 
                   className="relative rounded-3xl w-full h-[500px] object-cover shadow-2xl border border-white/50" 
                   alt="Construction Hauling" 
                 />
                 <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl border border-zinc-100 shadow-xl hidden lg:block">
                   <div className="flex items-center gap-4">
                     <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                       <ShieldCheck size={24} />
                     </div>
                     <div>
                       <p className="text-xs text-muted-foreground font-bold">Compliance</p>
                       <p className="font-bold text-zinc-900">100% Certified</p>
                     </div>
                   </div>
                 </div>
               </div>
               
               <div className="order-1 md:order-2 space-y-8">
                 <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20">
                   <HardHat size={32} />
                 </div>
                 <div>
                   <h3 className="text-4xl font-black text-zinc-900 mb-4">Construction Material Hauling</h3>
                   <p className="text-lg text-zinc-600 leading-relaxed">
                     We provide reliable transport solutions for all types of construction materials. From aggregates and sand to asphalt and gravel, our fleet ensures a consistent supply chain for your job site.
                   </p>
                 </div>
                 
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   {["Consistent Material Flow", "Job Site Coordination", "Diverse Material Handling", "Schedule Adherence"].map(item => (
                     <div key={item} className="flex items-center gap-3 p-3 rounded-xl bg-white border border-zinc-200 shadow-sm">
                       <Check size={16} className="text-primary" /> 
                       <span className="text-sm font-bold text-zinc-700">{item}</span>
                     </div>
                   ))}
                 </div>
                 
                 <Link href="/contact">
                   <Button className="rounded-full bg-primary hover:bg-primary/90 px-8 h-12 font-bold text-white mt-4 group">
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
                 <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20">
                   <Truck size={32} />
                 </div>
                 <div>
                   <h3 className="text-4xl font-black text-zinc-900 mb-4">Dump Truck Services</h3>
                   <p className="text-lg text-zinc-600 leading-relaxed">
                     Our fleet of high-capacity dump trucks is equipped to handle heavy loads with ease. We support excavation, grading, and paving projects with precision dumping and rapid turnaround times.
                   </p>
                 </div>
                 
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   {["Excavation Support", "Site Grading", "Paving Operations", "Debris Removal"].map(item => (
                     <div key={item} className="flex items-center gap-3 p-3 rounded-xl bg-white border border-zinc-200 shadow-sm">
                       <Check size={16} className="text-primary" /> 
                       <span className="text-sm font-bold text-zinc-700">{item}</span>
                     </div>
                   ))}
                 </div>
                 
                 <Link href="/contact">
                   <Button className="rounded-full bg-primary hover:bg-primary/90 px-8 h-12 font-bold text-white mt-4 group">
                     Request Service <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                   </Button>
                 </Link>
               </div>
               
               <div className="relative">
                 <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl opacity-50" />
                 <img 
                   src="https://images.unsplash.com/photo-1591768793355-74d04bb6608f?q=80&w=2940&auto=format&fit=crop" 
                   className="relative rounded-3xl w-full h-[500px] object-cover shadow-2xl border border-white/50" 
                   alt="Dump Truck" 
                 />
                 <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl border border-zinc-100 shadow-xl hidden lg:block">
                   <div className="flex items-center gap-4">
                     <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                       <Clock size={24} />
                     </div>
                     <div>
                       <p className="text-xs text-muted-foreground font-bold">Availability</p>
                       <p className="font-bold text-zinc-900">24/7 Dispatch</p>
                     </div>
                   </div>
                 </div>
               </div>
             </motion.div>

             {/* Service 3 */}
             <motion.div 
               initial={{ opacity: 0, y: 40 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="grid md:grid-cols-2 gap-16 items-center"
             >
               <div className="order-2 md:order-1 relative">
                 <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl opacity-50" />
                 <img 
                   src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2940&auto=format&fit=crop" 
                   className="relative rounded-3xl w-full h-[500px] object-cover shadow-2xl border border-white/50" 
                   alt="Project Logistics" 
                 />
                 <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl border border-zinc-100 shadow-xl hidden lg:block">
                   <div className="flex items-center gap-4">
                     <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                       <MapPin size={24} />
                     </div>
                     <div>
                       <p className="text-xs text-muted-foreground font-bold">Coverage</p>
                       <p className="font-bold text-zinc-900">Statewide CA</p>
                     </div>
                   </div>
                 </div>
               </div>
               
               <div className="order-1 md:order-2 space-y-8">
                 <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20">
                   <Briefcase size={32} />
                 </div>
                 <div>
                   <h3 className="text-4xl font-black text-zinc-900 mb-4">Project Logistics</h3>
                   <p className="text-lg text-zinc-600 leading-relaxed">
                     For large-scale infrastructure and development projects, we offer comprehensive logistics planning. We coordinate fleet movements to maximize efficiency and minimize downtime.
                   </p>
                 </div>
                 
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   {["Route Planning", "Fleet Management", "On-Site Coordination", "Efficiency Optimization"].map(item => (
                     <div key={item} className="flex items-center gap-3 p-3 rounded-xl bg-white border border-zinc-200 shadow-sm">
                       <Check size={16} className="text-primary" /> 
                       <span className="text-sm font-bold text-zinc-700">{item}</span>
                     </div>
                   ))}
                 </div>
                 
                 <Link href="/contact">
                   <Button className="rounded-full bg-primary hover:bg-primary/90 px-8 h-12 font-bold text-white mt-4 group">
                     Request Service <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                   </Button>
                 </Link>
               </div>
             </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-white border-t border-zinc-200 py-24 text-center">
        <div className="w-full max-w-[1800px] mx-auto px-4 md:px-8 max-w-3xl space-y-8">
          <h2 className="text-4xl font-black text-zinc-900">Have a specialized hauling need?</h2>
          <p className="text-zinc-600 text-xl font-medium">We adapt to your project requirements. Let's discuss your logistics plan.</p>
          <div className="flex justify-center gap-4 pt-4">
            <Link href="/contact">
              <Button size="lg" className="rounded-full h-14 px-10 font-bold bg-primary text-white hover:bg-primary/90 text-lg shadow-xl shadow-primary/20">
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
