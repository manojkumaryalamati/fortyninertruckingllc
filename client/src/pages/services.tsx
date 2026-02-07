import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Check, Truck, HardHat, Briefcase, ArrowRight } from "lucide-react";
import Footer from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export default function Services() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden mt-20">
        <div className="absolute inset-0 z-0">
           <img 
             src="https://images.unsplash.com/photo-1590496793907-71876d7dd545?q=80&w=2800&auto=format&fit=crop" 
             alt="Services Hero" 
             className="w-full h-full object-cover"
           />
           <div className="absolute inset-0 bg-black/60 z-10" />
        </div>
        <div className="relative z-20 container mx-auto px-6 h-full flex flex-col justify-center">
           <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase leading-[0.9]">
            SPECIALIZED <br/>
            <span className="text-primary">HAULING SOLUTIONS</span>
           </h1>
        </div>
      </section>

      <div className="bg-[#FDFBF7] py-24">
        <div className="container mx-auto px-6">
          <div className="grid gap-16">
             {/* Service 1 */}
             <div className="bg-white p-8 md:p-12 shadow-xl flex flex-col md:flex-row gap-12 items-center">
               <div className="md:w-1/2 space-y-6">
                 <div className="h-16 w-16 bg-primary/10 flex items-center justify-center text-primary">
                   <HardHat size={32} />
                 </div>
                 <h3 className="text-3xl font-black uppercase">Construction Material Hauling</h3>
                 <p className="text-lg text-muted-foreground leading-relaxed">
                   Reliable transport for aggregates, asphalt, sand, and gravel. We ensure a steady flow of materials to keep your job site operational and on schedule.
                 </p>
                 <ul className="space-y-3 pt-4">
                   {["End Dump Services", "Aggregate Delivery", "Site Clearing Support", "Permit Compliant Routing"].map(item => (
                     <li key={item} className="flex items-center gap-3 font-bold uppercase text-sm">
                       <Check size={18} className="text-primary" /> {item}
                     </li>
                   ))}
                 </ul>
                 <Button className="rounded-full bg-primary hover:bg-primary/90 px-8 h-12 uppercase font-bold text-white mt-4">
                   Book This Service
                 </Button>
               </div>
               <div className="md:w-1/2 h-[400px] w-full">
                 <img src="https://images.unsplash.com/photo-1617135002770-65c7f9392943?q=80&w=2940&auto=format&fit=crop" className="w-full h-full object-cover shadow-2xl border-4 border-white" alt="Construction Hauling" />
               </div>
             </div>

             {/* Service 2 */}
             <div className="bg-white p-8 md:p-12 shadow-xl flex flex-col md:flex-row-reverse gap-12 items-center">
               <div className="md:w-1/2 space-y-6">
                 <div className="h-16 w-16 bg-primary/10 flex items-center justify-center text-primary">
                   <Truck size={32} />
                 </div>
                 <h3 className="text-3xl font-black uppercase">Dump Truck Services</h3>
                 <p className="text-lg text-muted-foreground leading-relaxed">
                   Our fleet includes Super Dumps and Standard 10-Wheelers ready for heavy loads. Perfect for excavation projects, paving operations, and dirt removal.
                 </p>
                 <ul className="space-y-3 pt-4">
                   {["Super Dump Capabilities", "High-Volume Dirt Removal", "Paving Support", "Precision Dumping"].map(item => (
                     <li key={item} className="flex items-center gap-3 font-bold uppercase text-sm">
                       <Check size={18} className="text-primary" /> {item}
                     </li>
                   ))}
                 </ul>
                 <Button className="rounded-full bg-primary hover:bg-primary/90 px-8 h-12 uppercase font-bold text-white mt-4">
                   Book This Service
                 </Button>
               </div>
               <div className="md:w-1/2 h-[400px] w-full">
                 <img src="https://images.unsplash.com/photo-1591768793355-74d04bb6608f?q=80&w=2940&auto=format&fit=crop" className="w-full h-full object-cover shadow-2xl border-4 border-white" alt="Dump Truck" />
               </div>
             </div>
          </div>
        </div>
      </div>
      
      <div className="bg-primary py-24 text-center text-white">
        <div className="container mx-auto px-6 max-w-2xl space-y-8">
          <h2 className="text-4xl font-black uppercase">Have a specialized hauling need?</h2>
          <p className="text-white/90 text-xl font-medium">We adapt to your project requirements. Let's discuss your logistics plan.</p>
          <div className="flex justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="rounded-full h-14 px-10 font-bold bg-white text-primary hover:bg-gray-100 uppercase">Contact Sales</Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
