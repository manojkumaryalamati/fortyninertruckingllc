import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

const fleetData = [
  { id: 1, name: "10-Wheel Dump Truck", type: "Standard Haul", specs: "Versatile maneuverability for urban sites", image: "https://images.unsplash.com/photo-1617135002770-65c7f9392943?q=80&w=2940&auto=format&fit=crop", category: "Construction" },
  { id: 2, name: "Super Dump", type: "Heavy Haul", specs: "Maximized payload with trailing axle", image: "https://images.unsplash.com/photo-1591768793355-74d04bb6608f?q=80&w=2940&auto=format&fit=crop", category: "Construction" },
  { id: 3, name: "End Dump Trailer", type: "Material Transport", specs: "Rapid unloading for stockpiling", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2940&auto=format&fit=crop", category: "Trailers" },
  { id: 4, name: "Transfer Truck", type: "Aggregates", specs: "Double trailer efficiency", image: "https://images.unsplash.com/photo-1605218427306-635ba2439af2?q=80&w=2940&auto=format&fit=crop", category: "Construction" },
];

const categories = ["All", "Construction", "Trailers"];

export default function Fleet() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedTruck, setSelectedTruck] = useState<any>(null);

  const filteredFleet = activeCategory === "All" 
    ? fleetData 
    : fleetData.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] w-full overflow-hidden mt-20">
        <div className="absolute inset-0 z-0">
           <img 
             src="https://images.unsplash.com/photo-1605218427306-635ba2439af2?q=80&w=2940&auto=format&fit=crop" 
             alt="Fleet Hero" 
             className="w-full h-full object-cover"
           />
           <div className="absolute inset-0 bg-black/60 z-10" />
        </div>
        <div className="relative z-20 container mx-auto px-6 h-full flex flex-col justify-center">
           <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase leading-[0.9]">
            OUR <br/>
            <span className="text-primary">FLEET</span>
           </h1>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-12 justify-center">
          {categories.map(cat => (
            <Button 
              key={cat} 
              variant={activeCategory === cat ? "default" : "outline"}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-8 uppercase font-bold ${activeCategory === cat ? 'bg-primary hover:bg-primary/90' : 'hover:text-primary hover:border-primary'}`}
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredFleet.map(truck => (
              <motion.div 
                key={truck.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group cursor-pointer bg-white shadow-xl hover:shadow-2xl transition-all"
                onClick={() => setSelectedTruck(truck)}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={truck.image} alt={truck.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-primary text-white uppercase rounded-none px-3 py-1 text-xs">{truck.category}</Badge>
                  </div>
                </div>
                <div className="p-6 border-b-4 border-transparent group-hover:border-primary transition-colors">
                  <h3 className="text-2xl font-black uppercase mb-1">{truck.name}</h3>
                  <p className="text-muted-foreground font-medium">{truck.type}</p>
                  <Button className="w-full mt-4 bg-black text-white hover:bg-primary uppercase font-bold rounded-none">
                    View Specs
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox Modal */}
      <Dialog open={!!selectedTruck} onOpenChange={() => setSelectedTruck(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-background border-none rounded-none">
           {selectedTruck && (
             <div className="grid md:grid-cols-2">
               <div className="relative h-[300px] md:h-full bg-black">
                 <img src={selectedTruck.image} alt={selectedTruck.name} className="w-full h-full object-cover" />
               </div>
               <div className="p-8 md:p-12 space-y-6">
                 <div>
                   <Badge className="mb-4 bg-primary rounded-none uppercase">{selectedTruck.category}</Badge>
                   <DialogTitle className="text-3xl font-black uppercase mb-2">{selectedTruck.name}</DialogTitle>
                   <p className="text-xl text-muted-foreground font-medium">{selectedTruck.type}</p>
                 </div>
                 
                 <div className="space-y-4 py-6 border-t border-border">
                   <div>
                     <p className="text-sm font-bold text-black uppercase tracking-wider mb-1">Capabilities</p>
                     <p className="font-medium text-lg text-muted-foreground">{selectedTruck.specs}</p>
                   </div>
                   <div>
                     <p className="text-sm font-bold text-black uppercase tracking-wider mb-1">Availability</p>
                     <div className="flex items-center gap-2 text-green-600 font-bold uppercase">
                       <div className="h-2 w-2 rounded-full bg-green-500" /> Operational
                     </div>
                   </div>
                 </div>

                 <Button className="w-full h-14 bg-primary hover:bg-primary/90 text-white uppercase font-bold text-lg rounded-none">Request Equipment</Button>
               </div>
             </div>
           )}
        </DialogContent>
      </Dialog>
      <Footer />
    </div>
  );
}
