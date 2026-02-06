import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Truck, CheckCircle2, Clock, Calendar, Package, ArrowRight, AlertCircle, Search, ChevronLeft, MoreHorizontal, Box } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";

// Mock data generator for tracking
const getTrackingData = (id: string) => {
  const states = ["In Transit", "Delivered", "Pending Pickup", "Exception"];
  const randomState = states[Math.floor(Math.random() * states.length)];
  
  return {
    id: id || "FT-849201",
    status: randomState,
    origin: "Sacramento, CA",
    destination: "Denver, CO",
    eta: "Feb 10, 2026 - 2:00 PM",
    carrier: "Fortyniner Fleet #409",
    weight: "42,000 lbs",
    type: "Dry Van - Palletized",
    updates: [
      { date: "Today, 10:30 AM", location: "Salt Lake City, UT", status: "Departed Facility", icon: Truck, active: true },
      { date: "Yesterday, 08:15 AM", location: "Salt Lake City, UT", status: "Arrived at Terminal", icon: MapPin, active: false },
      { date: "Feb 07, 04:20 PM", location: "Reno, NV", status: "In Transit", icon: Truck, active: false },
      { date: "Feb 07, 08:00 AM", location: "Sacramento, CA", status: "Picked Up", icon: Package, active: false },
      { date: "Feb 06, 02:00 PM", location: "Sacramento, CA", status: "Order Processed", icon: CheckCircle2, active: false },
    ]
  };
};

export default function Tracking() {
  const [trackingId, setTrackingId] = useState("");
  const [trackingData, setTrackingData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Auto-fill mock data for demo purposes if empty
  useEffect(() => {
    if (!hasSearched) {
      setTrackingId("FT-849201");
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId) return;
    
    setLoading(true);
    setHasSearched(true);
    
    // Simulate API call
    setTimeout(() => {
      setTrackingData(getTrackingData(trackingId));
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-secondary/30 font-sans pb-20 text-foreground selection:bg-primary/20">
      
      {/* Navbar Minimal */}
      <nav className="bg-background border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer text-muted-foreground hover:text-foreground transition-colors font-medium text-sm">
              <ChevronLeft size={16} />
              Back to Home
            </div>
          </Link>
          <div className="font-bold text-lg tracking-tight">Track Shipment</div>
          <Link href="/admin">
             <Button variant="ghost" size="sm" className="font-medium text-muted-foreground hover:text-foreground">
               Login
             </Button>
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12 max-w-5xl">
        
        {/* Search Hero */}
        <div className="text-center space-y-6 mb-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Where is your freight?
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Real-time visibility into your supply chain. Enter your BOL, Load ID, or Reference Number.
          </p>
          
          <Card className="max-w-xl mx-auto shadow-xl shadow-black/5 border-border overflow-hidden">
            <CardContent className="p-2">
              <form onSubmit={handleSearch} className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input 
                    placeholder="Enter Tracking ID..." 
                    className="pl-12 h-14 text-lg border-transparent bg-transparent shadow-none focus-visible:ring-0"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                  />
                </div>
                <Button 
                  type="submit" 
                  size="lg" 
                  className="h-14 px-8 font-semibold bg-primary hover:bg-primary/90 text-white rounded-xl shadow-md transition-all" 
                  disabled={loading}
                >
                  {loading ? (
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    "Track"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Results Area */}
        <AnimatePresence mode="wait">
          {hasSearched && trackingData && !loading && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid lg:grid-cols-3 gap-8"
            >
              {/* Main Status Column */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="shadow-sm border-border overflow-hidden">
                  <div className="h-2 bg-gradient-to-r from-primary to-orange-500 w-full" />
                  <CardHeader className="pb-6 border-b border-border/50">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <CardTitle className="text-2xl font-bold tracking-tight">
                            {trackingData.id}
                          </CardTitle>
                          <Badge variant="outline" className="font-mono text-xs text-muted-foreground border-border bg-secondary/50">
                            BOL-29384
                          </Badge>
                        </div>
                        <CardDescription className="flex items-center gap-2">
                          <Truck size={14} />
                          {trackingData.carrier}
                        </CardDescription>
                      </div>
                      
                      <div className={`px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2 ${
                        trackingData.status === "Delivered" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : 
                        trackingData.status === "Exception" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" :
                        "bg-primary/10 text-primary-foreground dark:text-primary"
                      }`}>
                        <div className={`h-2 w-2 rounded-full ${
                          trackingData.status === "Delivered" ? "bg-green-500" : 
                          trackingData.status === "Exception" ? "bg-red-500" :
                          "bg-primary animate-pulse"
                        }`} />
                        {trackingData.status}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-8 pb-8">
                    {/* Progress Bar Visual */}
                    <div className="mb-10 px-2">
                       <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                         <span>Ordered</span>
                         <span>Picked Up</span>
                         <span className="text-primary">In Transit</span>
                         <span>Delivered</span>
                       </div>
                       <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
                         <motion.div 
                           className="absolute top-0 left-0 h-full bg-primary"
                           initial={{ width: "0%" }}
                           animate={{ width: "65%" }}
                           transition={{ duration: 1, delay: 0.2 }}
                         />
                       </div>
                    </div>

                    {/* Timeline Updates */}
                    <div className="relative pl-8 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-border">
                      {trackingData.updates.map((update: any, i: number) => (
                        <motion.div 
                          key={i} 
                          className="relative"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <div className={`absolute -left-[29px] top-1 h-6 w-6 rounded-full border-2 flex items-center justify-center bg-background z-10 ${
                            i === 0 ? "border-primary text-primary shadow-[0_0_0_4px_rgba(var(--primary),0.1)]" : "border-muted-foreground/30 text-muted-foreground"
                          }`}>
                            <div className={`h-2 w-2 rounded-full ${i === 0 ? "bg-primary" : "bg-muted-foreground/30"}`} />
                          </div>
                          
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 p-4 rounded-xl hover:bg-secondary/40 transition-colors border border-transparent hover:border-border/50">
                            <div>
                              <h4 className={`font-semibold text-base ${i === 0 ? "text-foreground" : "text-muted-foreground"}`}>
                                {update.status}
                              </h4>
                              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                <MapPin size={12} /> {update.location}
                              </p>
                            </div>
                            <span className="text-xs font-medium text-muted-foreground/70 bg-secondary px-2 py-1 rounded-md self-start sm:self-center">
                              {update.date}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar Details */}
              <div className="space-y-6">
                <Card className="shadow-sm border-border">
                  <CardHeader>
                    <CardTitle className="text-base font-semibold">Shipment Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="relative pl-6 pb-6 border-l border-border last:pb-0 last:border-0">
                        <div className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full border-2 border-primary bg-background" />
                        <p className="text-xs font-bold uppercase text-muted-foreground mb-1">Origin</p>
                        <p className="font-medium text-foreground">{trackingData.origin}</p>
                      </div>
                      <div className="relative pl-6">
                        <div className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full border-2 border-foreground bg-foreground" />
                        <p className="text-xs font-bold uppercase text-muted-foreground mb-1">Destination</p>
                        <p className="font-medium text-foreground">{trackingData.destination}</p>
                      </div>
                    </div>
                    
                    <div className="h-px bg-border w-full" />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-bold uppercase text-muted-foreground mb-1">Weight</p>
                        <p className="font-medium">{trackingData.weight}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase text-muted-foreground mb-1">Type</p>
                        <p className="font-medium truncate" title={trackingData.type}>Dry Van</p>
                      </div>
                      <div>
                         <p className="text-xs font-bold uppercase text-muted-foreground mb-1">Pieces</p>
                         <p className="font-medium">24 Plts</p>
                      </div>
                      <div>
                         <p className="text-xs font-bold uppercase text-muted-foreground mb-1">Reference</p>
                         <p className="font-medium">#PO-9921</p>
                      </div>
                    </div>

                    <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <p className="text-xs font-bold uppercase text-primary">Estimated Delivery</p>
                      </div>
                      <p className="font-bold text-xl tracking-tight text-foreground">{trackingData.eta}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-foreground to-gray-800 text-white border-none shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                        <AlertCircle className="h-5 w-5 text-white" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-sm">Need Assistance?</h4>
                        <p className="text-xs text-white/70 leading-relaxed">
                          Contact our 24/7 dispatch team for detailed updates regarding this shipment.
                        </p>
                        <Button variant="link" className="text-white p-0 h-auto font-semibold text-sm mt-2 hover:text-primary">
                          Call Dispatch &rarr;
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State / Features */}
        {!hasSearched && (
           <div className="mt-20 grid md:grid-cols-3 gap-8">
              {[
                { icon: MapPin, title: "Real-time Visibility", desc: "Track your freight's exact location with GPS precision." },
                { icon: Clock, title: "Predictive ETAs", desc: "AI-powered arrival estimates updated every 15 minutes." },
                { icon: CheckCircle2, title: "Proof of Delivery", desc: "Instant access to digital BOLs and signed receipts." }
              ].map((feature, i) => (
                <div key={i} className="text-center p-6 rounded-2xl bg-background border border-border/50 hover:border-border transition-colors">
                  <div className="h-12 w-12 mx-auto bg-secondary rounded-xl flex items-center justify-center text-foreground mb-4">
                    <feature.icon size={24} />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              ))}
           </div>
        )}
      </main>
    </div>
  );
}
