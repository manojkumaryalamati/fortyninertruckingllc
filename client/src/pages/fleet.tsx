import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Filter, X, ChevronRight, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";

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
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="text-white font-bold text-lg">49</span>
              </div>
              <div className="flex flex-col text-foreground">
                <span className="font-bold text-lg tracking-tight leading-none">Fortyniner</span>
                <span className="text-xs font-medium opacity-80 uppercase tracking-widest">Trucking</span>
              </div>
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
            <Link href="/tracking">
               <Button className="font-semibold shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 text-white rounded-full px-6 transition-all hover:scale-105 active:scale-95">
                 Track Load
               </Button>
            </Link>
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
              <Link href="/tracking">
                 <Button className="w-full font-bold bg-primary text-white rounded-xl h-12 shadow-lg shadow-primary/20 mt-2">
                   Track Load
                 </Button>
              </Link>
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
