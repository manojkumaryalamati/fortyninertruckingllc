import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Truck, HardHat, Warehouse, Clock, MapPin, ArrowRight, Shield } from "lucide-react";

export default function Services() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans pt-24">
      <div className="container mx-auto px-6 mb-16">
        <div className="max-w-3xl space-y-4">
           <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
            Precision Logistics for <br/>
            <span className="text-primary">Every Mile.</span>
           </h1>
           <p className="text-xl text-muted-foreground leading-relaxed">
             We deliver comprehensive freight solutions tailored to the unique demands of construction, manufacturing, and retail supply chains.
           </p>
        </div>
      </div>

      <div className="bg-secondary/30 py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
             {/* Service 1 */}
             <div className="space-y-6">
               <div className="h-14 w-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary">
                 <HardHat size={28} />
               </div>
               <h3 className="text-3xl font-bold">Construction Logistics</h3>
               <p className="text-lg text-muted-foreground leading-relaxed">
                 From raw aggregate to finished structural steel, we understand the critical timeline of a job site. Our fleet is equipped for heavy haul and specialized deliveries.
               </p>
               <ul className="space-y-3">
                 {["End Dump & Super Dump", "Flatbed & Step Deck", "Job Site Coordination", "Permit Management"].map(item => (
                   <li key={item} className="flex items-center gap-3 font-medium">
                     <Check size={18} className="text-primary" /> {item}
                   </li>
                 ))}
               </ul>
             </div>
             <div className="rounded-3xl overflow-hidden shadow-2xl h-[400px]">
               <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2940&auto=format&fit=crop" className="w-full h-full object-cover" alt="Construction Site" />
             </div>

             {/* Service 2 */}
             <div className="rounded-3xl overflow-hidden shadow-2xl h-[400px] md:order-last">
               <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2940&auto=format&fit=crop" className="w-full h-full object-cover" alt="Warehouse" />
             </div>
             <div className="space-y-6">
               <div className="h-14 w-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary">
                 <Warehouse size={28} />
               </div>
               <h3 className="text-3xl font-bold">Dedicated Supply Chain</h3>
               <p className="text-lg text-muted-foreground leading-relaxed">
                 Secure guaranteed capacity and consistent rates with our dedicated fleet program. We become a seamless extension of your operation.
               </p>
               <ul className="space-y-3">
                 {["Fixed Contract Rates", "Branded Fleet Options", "Priority Dispatch", "KPI Reporting"].map(item => (
                   <li key={item} className="flex items-center gap-3 font-medium">
                     <Check size={18} className="text-primary" /> {item}
                   </li>
                 ))}
               </ul>
             </div>
          </div>
        </div>
      </div>

      <div className="py-24 container mx-auto px-6">
         <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-primary text-primary-foreground border-none">
              <CardContent className="p-8 space-y-4">
                <Shield size={48} />
                <h3 className="text-2xl font-bold">Safety First</h3>
                <p className="opacity-90">Maintained FMCSA safety rating in top 5% of carriers nationwide.</p>
              </CardContent>
            </Card>
            <Card className="bg-foreground text-background border-none">
              <CardContent className="p-8 space-y-4">
                <Clock size={48} />
                <h3 className="text-2xl font-bold">On-Time Guarantee</h3>
                <p className="opacity-80">99.9% on-time delivery rate across all service lanes.</p>
              </CardContent>
            </Card>
            <Card className="bg-secondary text-foreground border-none">
              <CardContent className="p-8 space-y-4">
                <MapPin size={48} className="text-primary" />
                <h3 className="text-2xl font-bold">Nationwide</h3>
                <p className="text-muted-foreground">Serving all 48 contiguous states with regional expertise.</p>
              </CardContent>
            </Card>
         </div>
      </div>
      
      <div className="bg-secondary/50 py-24 text-center">
        <div className="container mx-auto px-6 max-w-2xl space-y-8">
          <h2 className="text-4xl font-bold">Ready to streamline your logistics?</h2>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="rounded-full h-14 px-8">Get A Quote</Button>
            <Button size="lg" variant="outline" className="rounded-full h-14 px-8">Contact Sales</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
