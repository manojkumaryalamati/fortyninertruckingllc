import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Truck, ArrowDown, Shield, Award, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Fleet() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans">
      <Navbar />

      {/* Modern Fleet Hero */}
      <section className="relative min-h-[85vh] w-full overflow-hidden bg-zinc-900 py-16 mt-[72px] lg:mt-[112px]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
           <img 
             src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2940&auto=format&fit=crop" 
             alt="Fleet Hero" 
             className="w-full h-full object-cover object-center opacity-40"
           />
           {/* Overlay */}
           <div 
             className="absolute inset-0 z-10" 
             style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.70), rgba(0,0,0,0.20))' }}
           />
        </div>

        <div className="relative z-20 h-full w-full max-w-[1200px] mx-auto px-4 flex flex-col justify-center items-start">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-[800px] space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm text-white/80 text-sm font-bold tracking-wider uppercase mb-4">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              Modern Fleet Technology
            </div>
            
            
            <p className="text-zinc-300 font-light leading-relaxed" style={{ fontSize: 'clamp(16px, 2vw, 20px)', maxWidth: '560px' }}>
              Our diverse fleet of specialized haulers is maintained to the highest industry standards, ensuring reliable delivery for every load.
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-8 border-t border-white/10 max-w-3xl">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-primary font-bold">
                  <Shield size={20} />
                  <span>Safety First</span>
                </div>
                <p className="text-sm text-zinc-400">Advanced safety systems</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-primary font-bold">
                  <Gauge size={20} />
                  <span>CARB Compliant</span>
                </div>
                <p className="text-sm text-zinc-400">Eco-friendly fleet</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-primary font-bold">
                  <Award size={20} />
                  <span>Well Maintained</span>
                </div>
                <p className="text-sm text-zinc-400">Rigorous service schedule</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-8 md:left-12 z-20"
        >
          <div className="flex items-center gap-4 text-white/40">
            <div className="h-[1px] w-12 bg-white/20"></div>
            <span className="text-xs uppercase tracking-widest font-bold">Scroll to Explore</span>
          </div>
        </motion.div>
      </section>

      {/* Fleet Categories */}
      <section className="py-24 bg-white">
        <div className="w-full max-w-[1800px] mx-auto px-4 md:px-8">
           <div className="flex flex-col items-center justify-center text-center space-y-12">
             <div className="space-y-4">
                <h2 className="text-primary font-bold tracking-widest uppercase text-sm">Our Inventory</h2>
                <h3 className="text-4xl md:text-5xl font-black text-zinc-900">Ready for Any Job</h3>
                <p className="text-zinc-500 max-w-2xl mx-auto text-lg">
                  While our full gallery is being updated, rest assured we have the equipment you need.
                </p>
             </div>
             
             <div className="grid md:grid-cols-3 gap-8 w-full">
               {[
                 { name: "Super Dumps", desc: "Maximum payload efficiency for aggregate transport." },
                 { name: "End Dumps", desc: "Versatile unloading for difficult job sites." },
                 { name: "High Sides", desc: "High volume capacity for lighter materials." }
               ].map((truck, i) => (
                 <div key={i} className="group p-8 rounded-3xl bg-zinc-50 border border-zinc-100 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                   <div className="h-16 w-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary mb-6 mx-auto group-hover:scale-110 transition-transform">
                     <Truck size={32} />
                   </div>
                   <h4 className="text-xl font-bold text-zinc-900 mb-2">{truck.name}</h4>
                   <p className="text-zinc-500">{truck.desc}</p>
                 </div>
               ))}
             </div>
           </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
