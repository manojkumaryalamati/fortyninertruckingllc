import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Filter, X, ChevronRight, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";

import Footer from "@/components/Footer";
import { Logo } from "@/components/Logo";

const fleetData = [
  { id: 1, name: "10-Wheel Dump Truck", type: "Standard Haul", specs: "16-18 Ton Capacity", image: "https://images.unsplash.com/photo-1617135002770-65c7f9392943?q=80&w=2940&auto=format&fit=crop", category: "Construction" },
  { id: 2, name: "Super Dump", type: "Heavy Haul", specs: "20-22 Ton Capacity", image: "https://images.unsplash.com/photo-1591768793355-74d04bb6608f?q=80&w=2940&auto=format&fit=crop", category: "Construction" },
  { id: 3, name: "End Dump Trailer", type: "Material Transport", specs: "High Volume, Rapid Unload", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2940&auto=format&fit=crop", category: "Trailers" },
  { id: 4, name: "Transfer Truck", type: "Aggregates", specs: "Max Payload Efficiency", image: "https://images.unsplash.com/photo-1605218427306-635ba2439af2?q=80&w=2940&auto=format&fit=crop", category: "Construction" },
];

const categories = ["All", "Construction", "Trailers"];

export default function Fleet() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedTruck, setSelectedTruck] = useState<any>(null);
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "/services" },
    { name: "Fleet", href: "/fleet" },
    { name: "Careers", href: "/careers" },
    { name: "Subhaulers", href: "/subhaulers" },
    { name: "Contact", href: "/contact" }
  ];

  const filteredFleet = activeCategory === "All" 
    ? fleetData 
    : fleetData.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans pt-24 pb-24">
      {/* Shared Navbar */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border/50 py-3 shadow-sm" : "bg-background/80 backdrop-blur-md py-4 border-b border-border/20"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <Logo className="h-24 md:h-32 lg:h-36" />
            </div>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => (
              <Link key={item.name} href={item.href}>
                <a className="text-sm font-medium transition-colors text-muted-foreground hover:text-foreground cursor-pointer">
                  {item.name}
                </a>
              </Link>
            ))}
            <Link href="/admin">
               <Button variant="ghost" className="font-medium text-muted-foreground hover:text-foreground">
                 Login
               </Button>
            </Link>
          </div>

          <button 
            className="md:hidden p-2 rounded-full transition-colors text-foreground hover:bg-secondary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 bg-background border-b border-border shadow-2xl p-6 md:hidden flex flex-col gap-4"
            >
              {navLinks.map((item) => (
                <Link key={item.name} href={item.href}>
                  <a className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2 border-b border-border/50 last:border-0" onClick={() => setIsMobileMenuOpen(false)}>
                    {item.name}
                  </a>
                </Link>
              ))}
              <Link href="/admin">
                 <Button variant="outline" className="w-full font-bold rounded-xl h-12 mt-2">
                   Portal Login
                 </Button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <div className="container mx-auto px-6">
        <div className="mb-12">
           <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Our Fleet</h1>
           <p className="text-xl text-muted-foreground max-w-2xl">
             We operate a diverse, well-maintained fleet ready for small and large-scale projects. Every truck undergoes regular inspections to ensure safety and compliance.
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
                     <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">Capabilities</p>
                     <p className="font-medium text-lg">{selectedTruck.specs}</p>
                   </div>
                   <div>
                     <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">Availability</p>
                     <div className="flex items-center gap-2 text-green-600 font-medium">
                       <div className="h-2 w-2 rounded-full bg-green-500" /> Operational
                     </div>
                   </div>
                 </div>

                 <Button className="w-full rounded-full h-12">Request This Equipment</Button>
               </div>
             </div>
           )}
        </DialogContent>
      </Dialog>
      <Footer />
    </div>
  );
}
