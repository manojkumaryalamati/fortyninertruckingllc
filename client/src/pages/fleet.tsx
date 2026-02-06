import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Filter, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const fleetData = [
  { id: 1, name: "Kenworth T680", type: "Long Haul", specs: "PACCAR MX-13, 455HP", image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2940&auto=format&fit=crop", category: "Tractors" },
  { id: 2, name: "Peterbilt 389", type: "Heavy Haul", specs: "Cummins X15, 605HP", image: "https://images.unsplash.com/photo-1591768793355-74d04bb6608f?q=80&w=2940&auto=format&fit=crop", category: "Tractors" },
  { id: 3, name: "Great Dane Champion", type: "Dry Van", specs: "53' Air Ride", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2940&auto=format&fit=crop", category: "Trailers" },
  { id: 4, name: "Super Dump", type: "Construction", specs: "20 Ton Capacity", image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2940&auto=format&fit=crop", category: "Construction" },
  { id: 5, name: "Flatbed Step Deck", type: "Specialized", specs: "48' Spread Axle", image: "https://images.unsplash.com/photo-1592861956120-e524fc739696?q=80&w=2940&auto=format&fit=crop", category: "Trailers" },
  { id: 6, name: "Volvo VNL 860", type: "Regional", specs: "Volvo D13, 425HP", image: "https://images.unsplash.com/photo-1616432043562-3671ea2e5242?q=80&w=2940&auto=format&fit=crop", category: "Tractors" },
];

const categories = ["All", "Tractors", "Trailers", "Construction"];

export default function Fleet() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedTruck, setSelectedTruck] = useState<any>(null);

  const filteredFleet = activeCategory === "All" 
    ? fleetData 
    : fleetData.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans pt-24 pb-24">
      <div className="container mx-auto px-6">
        <div className="mb-12">
           <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Our Modern Fleet</h1>
           <p className="text-xl text-muted-foreground max-w-2xl">
             We operate one of the youngest fleets in the industry. Every vehicle is maintained to the highest standards for safety and reliability.
           </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map(cat => (
            <Button 
              key={cat} 
              variant={activeCategory === cat ? "default" : "outline"}
              onClick={() => setActiveCategory(cat)}
              className="rounded-full"
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
                className="group cursor-pointer"
                onClick={() => setSelectedTruck(truck)}
              >
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-4 shadow-lg group-hover:shadow-xl transition-all">
                  <img src={truck.image} alt={truck.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button variant="secondary" className="rounded-full">View Details</Button>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="backdrop-blur-md bg-white/80">{truck.category}</Badge>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold">{truck.name}</h3>
                  <p className="text-muted-foreground">{truck.type}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox Modal */}
      <Dialog open={!!selectedTruck} onOpenChange={() => setSelectedTruck(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-background border-none rounded-3xl">
           {selectedTruck && (
             <div className="grid md:grid-cols-2">
               <div className="relative h-[300px] md:h-full bg-black">
                 <img src={selectedTruck.image} alt={selectedTruck.name} className="w-full h-full object-cover" />
               </div>
               <div className="p-8 md:p-12 space-y-6">
                 <div>
                   <Badge className="mb-4">{selectedTruck.category}</Badge>
                   <DialogTitle className="text-3xl font-bold mb-2">{selectedTruck.name}</DialogTitle>
                   <p className="text-xl text-muted-foreground">{selectedTruck.type}</p>
                 </div>
                 
                 <div className="space-y-4 py-6 border-t border-border">
                   <div>
                     <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">Specifications</p>
                     <p className="font-medium text-lg">{selectedTruck.specs}</p>
                   </div>
                   <div>
                     <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">Maintenance Status</p>
                     <div className="flex items-center gap-2 text-green-600 font-medium">
                       <div className="h-2 w-2 rounded-full bg-green-500" /> Active Service
                     </div>
                   </div>
                 </div>

                 <Button className="w-full rounded-full h-12">Request This Equipment</Button>
               </div>
             </div>
           )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
