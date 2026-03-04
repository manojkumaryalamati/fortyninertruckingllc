import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Truck, Shield, Award, Gauge, Wrench, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

// Import actual hero images
import heroImage1 from "@/assets/a2a02ae8-e30d-4a34-ad88-64598b4c945f_1772219729261.jpeg";
import heroImage2 from "@/assets/867d8163-e94d-4056-b575-856aa6f68ace_1772219729261.jpeg";

export default function Fleet() {
  return (
    <div className="min-h-screen bg-white text-[var(--text)] font-sans">
      <Navbar />

      {/* Modern Fleet Hero */}
      <section className="relative min-h-[50vh] md:min-h-[70vh] flex flex-col justify-center items-center w-full overflow-hidden mt-[72px] lg:mt-[112px] py-16 md:py-24">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
           <img 
             src={heroImage1} 
             alt="Fleet Hero" 
             className="w-full h-full object-cover object-[20%_center] md:object-[center_35%]"
           />
        </div>

        <div className="relative z-20 w-full max-w-[1200px] mx-auto px-4 flex flex-col justify-center items-center text-center gap-8 md:gap-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-4 md:space-y-6"
          >
            <div className="inline-flex items-center gap-2 text-[var(--primary)] text-xs md:text-sm font-bold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse"></span>
              Power. Precision. Performance.
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
              Our Specialized Fleet
            </h1>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-16">
              <div className="flex flex-col items-center gap-3">
                <Shield size={32} className="text-[var(--primary)]" />
                <span className="text-white font-bold text-xs md:text-sm uppercase tracking-wider">Safety First</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Gauge size={32} className="text-[var(--primary)]" />
                <span className="text-white font-bold text-xs md:text-sm uppercase tracking-wider">CARB Compliant</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Award size={32} className="text-[var(--primary)]" />
                <span className="text-white font-bold text-xs md:text-sm uppercase tracking-wider">Well Maintained</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Fleet Categories */}
      <section className="py-16 md:py-24 bg-[var(--surface-2)]">
        <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8">
           <div className="flex flex-col items-center justify-center text-center space-y-4 mb-12 md:mb-16">
              <h2 className="text-[var(--primary)] font-bold tracking-widest uppercase text-sm">Truck Types Available</h2>
              <h3 className="text-3xl md:text-4xl font-black text-[var(--text)] tracking-tight">Our Diverse Inventory</h3>
              <p className="text-[var(--text-muted)] max-w-2xl mx-auto text-base md:text-lg mt-4 leading-relaxed">
                From tight urban job sites to massive infrastructure projects, our specialized fleet ensures you have the exact equipment needed to maximize payload efficiency and minimize downtime.
              </p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
             {[
               { name: "Super Dumps", desc: "Heavy hauling with high payload capacity.", detail: "Engineered for maximum weight compliance, allowing you to move more tons per trip and slash transportation costs.", highlight: "Maximum Payload" },
               { name: "Super Tags", desc: "Versatile hauling with tag axle stability.", detail: "The perfect balance of capacity and agility. The drop-down tag axle provides exceptional weight distribution on highways.", highlight: "Superior Stability" },
               { name: "Super 10's", desc: "Maneuverable option for tight job sites.", detail: "When space is limited, the Super 10 shines. Outstanding turning radius without sacrificing significant hauling volume.", highlight: "Highly Maneuverable" },
               { name: "Ten Wheelers", desc: "Reliable for construction and aggregates.", detail: "The industry workhorse. Rugged, dependable, and ready to tackle steep grades and rough construction terrain.", highlight: "Rugged Dependability" },
               { name: "End Dumps", desc: "Efficient unloading for bulk materials.", detail: "Ideal for stockpiling large volumes of aggregate, demo debris, or fill dirt with rapid, controlled dumping mechanisms.", highlight: "Rapid Unloading" }
             ].map((truck, i) => (
               <div key={i} className="group p-6 md:p-8 rounded-2xl bg-white border border-[var(--border)] hover:border-[var(--primary)] transition-all duration-300 flex flex-col h-full">
                 <div className="flex justify-between items-start mb-6">
                   <div className="h-12 w-12 md:h-14 md:w-14 bg-[var(--surface-2)] rounded-xl border border-[var(--border)] flex items-center justify-center text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-white transition-all duration-300">
                     <Truck size={24} />
                   </div>
                   <span className="text-[10px] font-bold uppercase tracking-wider bg-[var(--surface-2)] text-[var(--text-muted)] py-1.5 px-3 rounded-full group-hover:bg-[var(--primary)]/10 group-hover:text-[var(--primary)] transition-colors">
                     {truck.highlight}
                   </span>
                 </div>
                 <h4 className="text-xl md:text-2xl font-black text-[var(--text)] mb-2 tracking-tight">{truck.name}</h4>
                 <p className="text-[var(--primary)] font-medium text-sm mb-4">{truck.desc}</p>
                 <p className="text-[var(--text-muted)] leading-relaxed text-sm flex-grow">{truck.detail}</p>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* Fleet Maintenance & Reliability Section */}
      <section className="py-16 md:py-24 bg-white border-t border-[var(--border)]">
        <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-[var(--primary)] font-bold tracking-widest uppercase text-sm">Uncompromising Standards</h2>
                <h3 className="text-3xl md:text-4xl font-black text-[var(--text)] tracking-tight leading-tight">
                  Maintained for Absolute Reliability
                </h3>
              </div>
              <p className="text-[var(--text-muted)] text-base md:text-lg leading-relaxed">
                A delayed truck means a delayed project. That's why Forty Niner Trucking invests heavily in proactive, preventative maintenance. Our in-house service team ensures every vehicle that leaves our yard is operating at peak performance.
              </p>
              
              <ul className="space-y-6">
                {[
                  { title: "Daily Inspections", desc: "Comprehensive pre-trip and post-trip DOT inspections." },
                  { title: "CARB Compliance", desc: "Fully upgraded fleet meeting all California emissions standards." },
                  { title: "GPS Tracking", desc: "Real-time dispatch routing and load tracking technology." },
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="mt-1 h-6 w-6 rounded-full bg-[var(--primary)]/10 flex items-center justify-center shrink-0">
                      <CheckCircle2 size={14} className="text-[var(--primary)]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[var(--text)] text-base md:text-lg">{item.title}</h4>
                      <p className="text-[var(--text-muted)] text-sm md:text-base mt-1">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative mt-8 lg:mt-0">
              <img 
                src={heroImage2} 
                alt="Fleet Maintenance" 
                className="w-full h-auto aspect-[4/3] object-cover rounded-2xl md:rounded-3xl"
              />
              <div className="absolute -bottom-6 -left-6 md:-bottom-8 md:-left-8 bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-lg border border-[var(--border)]">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="h-10 w-10 md:h-12 md:w-12 bg-[var(--text)] text-white rounded-full flex items-center justify-center">
                    <Wrench size={20} />
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-[var(--text-muted)] font-medium">Uptime Rate</p>
                    <p className="text-xl md:text-2xl font-black text-[var(--text)]">99.8%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-[var(--primary)] text-white text-center px-4 md:px-8">
        <div className="max-w-3xl mx-auto space-y-6 md:space-y-8">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight leading-tight">Need specific equipment for your next project?</h2>
          <p className="text-base md:text-xl text-white/90 font-medium max-w-2xl mx-auto leading-relaxed">
            Our dispatch team is ready to match the right trucks to your material requirements and job site constraints.
          </p>
          <div className="pt-6 md:pt-8">
            <Link href="/contact">
              <Button className="h-12 md:h-14 px-8 md:px-10 text-sm md:text-lg font-bold uppercase tracking-widest bg-[var(--text)] hover:bg-[var(--surface-2)] text-white rounded-none border-none">
                Request Fleet Availability
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
