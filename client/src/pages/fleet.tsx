import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Truck, ArrowDown, Shield, Award, Gauge, Wrench, Clock, CheckCircle2 } from "lucide-react";
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
      <section className="relative min-h-[85vh] w-full overflow-hidden bg-[var(--text)] py-16 mt-[72px] lg:mt-[112px]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
           <img 
             src={heroImage1} 
             alt="Fleet Hero" 
             className="w-full h-full object-cover object-[center_35%] opacity-40"
           />
           {/* Overlay */}
           <div 
             className="absolute inset-0 z-10" 
             style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.85), rgba(0,0,0,0.30))' }}
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
              <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse"></span>
              Power. Precision. Performance.
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight">
              The Heavy-Duty <br/>
              <span className="text-[var(--primary)]">Powerhouse</span>
            </h1>
            
            <p className="text-[var(--text-muted)] font-light leading-relaxed text-lg md:text-xl max-w-[600px]">
              When the job demands serious muscle, Forty Niner Trucking delivers. Our state-of-the-art, meticulously maintained fleet is engineered to handle California’s toughest construction and logistics challenges with uncompromising reliability.
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-8 border-t border-white/10 max-w-3xl">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[var(--primary)] font-bold">
                  <Shield size={20} />
                  <span>Safety First</span>
                </div>
                <p className="text-sm text-[var(--text-muted)]">Advanced safety systems</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[var(--primary)] font-bold">
                  <Gauge size={20} />
                  <span>CARB Compliant</span>
                </div>
                <p className="text-sm text-[var(--text-muted)]">Eco-friendly & green fleet</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[var(--primary)] font-bold">
                  <Award size={20} />
                  <span>Well Maintained</span>
                </div>
                <p className="text-sm text-[var(--text-muted)]">Rigorous service schedule</p>
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
      <section className="py-24 bg-[var(--surface-2)] relative overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--primary)]/5 rounded-full blur-[120px] -mr-40 -mt-40 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[var(--border)]/50 rounded-full blur-[120px] -ml-40 -mb-40 pointer-events-none" />

        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
           <div className="flex flex-col items-center justify-center text-center space-y-6 mb-16">
             <div className="space-y-4">
                <h2 className="text-[var(--primary)] font-bold tracking-widest uppercase text-sm">Truck Types Available</h2>
                <h3 className="text-4xl md:text-5xl font-black text-[var(--text)] tracking-tight">Our Specialized Fleet</h3>
                <p className="text-[var(--text-muted)] max-w-2xl mx-auto text-lg leading-relaxed mt-4">
                  From tight urban job sites to massive infrastructure projects, our diverse inventory of heavy-duty trucks ensures you have the exact equipment needed to maximize payload efficiency and minimize downtime.
                </p>
             </div>
           </div>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
             {[
               { name: "Super Dumps", desc: "Heavy hauling with high payload capacity.", detail: "Engineered for maximum weight compliance, allowing you to move more tons per trip and slash transportation costs.", highlight: "Maximum Payload" },
               { name: "Super Tags", desc: "Versatile hauling with tag axle stability.", detail: "The perfect balance of capacity and agility. The drop-down tag axle provides exceptional weight distribution on highways.", highlight: "Superior Stability" },
               { name: "Super 10's", desc: "Maneuverable option for tight job sites.", detail: "When space is limited, the Super 10 shines. Outstanding turning radius without sacrificing significant hauling volume.", highlight: "Highly Maneuverable" },
               { name: "Ten Wheelers", desc: "Reliable for construction and aggregates.", detail: "The industry workhorse. Rugged, dependable, and ready to tackle steep grades and rough construction terrain.", highlight: "Rugged Dependability" },
               { name: "End Dumps", desc: "Efficient unloading for bulk materials.", detail: "Ideal for stockpiling large volumes of aggregate, demo debris, or fill dirt with rapid, controlled dumping mechanisms.", highlight: "Rapid Unloading" }
             ].map((truck, i) => (
               <div key={i} className="group p-8 rounded-3xl bg-white border border-[var(--border)] hover:border-[var(--primary)] transition-all duration-300 hover:shadow-xl hover:shadow-[var(--primary)]/5 flex flex-col h-full">
                 <div className="flex justify-between items-start mb-6">
                   <div className="h-14 w-14 bg-[var(--surface-2)] rounded-2xl border border-[var(--border)] flex items-center justify-center text-[var(--primary)] group-hover:scale-110 group-hover:bg-[var(--primary)] group-hover:text-white transition-all duration-300">
                     <Truck size={28} />
                   </div>
                   <span className="text-[10px] font-bold uppercase tracking-wider bg-[var(--border)] text-[var(--text-muted)] py-1.5 px-3 rounded-full group-hover:bg-[var(--primary)]/10 group-hover:text-[var(--primary)] transition-colors">
                     {truck.highlight}
                   </span>
                 </div>
                 <h4 className="text-2xl font-black text-[var(--text)] mb-3 tracking-tight">{truck.name}</h4>
                 <p className="text-[var(--primary)] font-medium text-sm mb-4">{truck.desc}</p>
                 <p className="text-[var(--text-muted)] leading-relaxed text-sm flex-grow">{truck.detail}</p>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* Fleet Maintenance & Reliability Section */}
      <section className="py-24 bg-white border-t border-[var(--border)]">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-[var(--primary)] font-bold tracking-widest uppercase text-sm">Uncompromising Standards</h2>
                <h3 className="text-3xl md:text-5xl font-black text-[var(--text)] tracking-tight leading-[1.1]">
                  Maintained for <br/> Absolute Reliability
                </h3>
              </div>
              <p className="text-[var(--text-muted)] text-lg leading-relaxed">
                A delayed truck means a delayed project. That's why Forty Niner Trucking invests heavily in proactive, preventative maintenance. Our in-house service team ensures every vehicle that leaves our yard is operating at peak performance.
              </p>
              
              <ul className="space-y-5">
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
                      <h4 className="font-bold text-[var(--text)]">{item.title}</h4>
                      <p className="text-[var(--text-muted)] text-sm mt-1">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-[var(--border)] rounded-3xl transform rotate-3 scale-105 -z-10 transition-transform hover:rotate-6 duration-500"></div>
              <img 
                src={heroImage2} 
                alt="Fleet Maintenance" 
                className="w-full h-auto aspect-square object-cover rounded-3xl shadow-xl grayscale-[20%] hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl border border-[var(--border)] hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-[var(--text)] text-white rounded-full flex items-center justify-center">
                    <Wrench size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-muted)] font-medium">Uptime Rate</p>
                    <p className="text-2xl font-black text-[var(--text)]">99.8%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[var(--primary)] text-white text-center px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">Need specific equipment for your next project?</h2>
          <p className="text-xl text-white/80 font-medium max-w-2xl mx-auto">
            Our dispatch team is ready to match the right trucks to your material requirements and job site constraints.
          </p>
          <div className="pt-4">
            <Link href="/contact">
              <Button className="h-14 px-10 text-lg font-bold uppercase tracking-widest bg-[var(--text)] hover:bg-[var(--surface-2)] text-white rounded-none border-none shadow-xl shadow-[var(--shadow)]/20">
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
