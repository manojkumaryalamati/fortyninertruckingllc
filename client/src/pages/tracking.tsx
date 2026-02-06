import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Truck, CheckCircle2, Clock, Calendar, Package, ArrowRight, AlertCircle, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Mock data generator for tracking
const getTrackingData = (id: string) => {
  // Simulate different states based on ID
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
      { date: "Feb 08, 10:30 AM", location: "Salt Lake City, UT", status: "Departed Facility", icon: Truck },
      { date: "Feb 08, 08:15 AM", location: "Salt Lake City, UT", status: "Arrived at Terminal", icon: MapPin },
      { date: "Feb 07, 04:20 PM", location: "Reno, NV", status: "In Transit", icon: Truck },
      { date: "Feb 07, 08:00 AM", location: "Sacramento, CA", status: "Picked Up", icon: Package },
      { date: "Feb 06, 02:00 PM", location: "Sacramento, CA", status: "Order Processed", icon: CheckCircle2 },
    ]
  };
};

export default function Tracking() {
  const [trackingId, setTrackingId] = useState("");
  const [trackingData, setTrackingData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId) return;
    
    setLoading(true);
    setHasSearched(true);
    
    // Simulate API call
    setTimeout(() => {
      setTrackingData(getTrackingData(trackingId));
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-muted/20 font-sans pb-20">
      {/* Header */}
      <div className="bg-primary/5 border-b border-primary/10">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-display font-bold">TRACK YOUR SHIPMENT</h1>
            <p className="text-muted-foreground">
              Enter your tracking number or BOL ID to get real-time status updates on your freight.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8">
        <Card className="max-w-3xl mx-auto shadow-xl border-primary/20">
          <CardContent className="p-6 md:p-8">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input 
                  placeholder="Enter Tracking ID (e.g. FT-849201)" 
                  className="pl-10 h-12 text-lg"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                />
              </div>
              <Button type="submit" size="lg" className="h-12 px-8 font-bold uppercase" disabled={loading}>
                {loading ? "Locating..." : "Track Load"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Results Area */}
        <AnimatePresence>
          {hasSearched && trackingData && !loading && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-4xl mx-auto mt-12 grid md:grid-cols-3 gap-8"
            >
              {/* Main Status Column */}
              <div className="md:col-span-2 space-y-6">
                <Card>
                  <CardHeader className="pb-4 border-b border-border/50">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-2xl font-display text-primary">
                          {trackingData.id}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          Carrier: {trackingData.carrier}
                        </CardDescription>
                      </div>
                      <Badge className={`text-base px-4 py-1 ${
                        trackingData.status === "Delivered" ? "bg-green-600 hover:bg-green-700" : 
                        trackingData.status === "Exception" ? "bg-destructive hover:bg-destructive" :
                        "bg-primary hover:bg-primary/90"
                      }`}>
                        {trackingData.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-8">
                    {/* Visual Progress Bar */}
                    <div className="relative mb-12 px-4">
                      <div className="absolute top-1/2 left-0 w-full h-1 bg-muted -translate-y-1/2 rounded-full" />
                      <div className="absolute top-1/2 left-0 w-3/4 h-1 bg-primary -translate-y-1/2 rounded-full" />
                      
                      <div className="relative flex justify-between">
                        {/* Steps */}
                        {["Ordered", "Picked Up", "In Transit", "Delivered"].map((step, i) => (
                          <div key={step} className="flex flex-col items-center gap-2 relative z-10 bg-card p-1">
                            <div className={`h-4 w-4 rounded-full border-2 ${i < 3 ? "bg-primary border-primary" : "bg-card border-muted-foreground"}`} />
                            <span className={`text-xs font-bold uppercase ${i < 3 ? "text-primary" : "text-muted-foreground"}`}>{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Timeline Updates */}
                    <div className="space-y-8 relative pl-6 border-l-2 border-muted ml-3">
                      {trackingData.updates.map((update: any, i: number) => (
                        <div key={i} className="relative">
                          <div className="absolute -left-[31px] top-1 h-6 w-6 rounded-full bg-background border-2 border-primary flex items-center justify-center text-primary">
                            <update.icon size={12} />
                          </div>
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                            <div>
                              <h4 className="font-bold text-foreground">{update.status}</h4>
                              <p className="text-sm text-muted-foreground">{update.location}</p>
                            </div>
                            <span className="text-xs font-mono bg-muted/50 px-2 py-1 rounded text-muted-foreground">
                              {update.date}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar Details */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-display">SHIPMENT DETAILS</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="text-primary mt-1 h-5 w-5" />
                      <div>
                        <p className="text-xs font-bold uppercase text-muted-foreground">Origin</p>
                        <p className="font-medium">{trackingData.origin}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <ArrowRight className="text-muted-foreground mt-1 h-5 w-5 rotate-90 md:rotate-0" />
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="text-primary mt-1 h-5 w-5" />
                      <div>
                        <p className="text-xs font-bold uppercase text-muted-foreground">Destination</p>
                        <p className="font-medium">{trackingData.destination}</p>
                      </div>
                    </div>
                    
                    <div className="my-4 border-t border-border" />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-bold uppercase text-muted-foreground">Weight</p>
                        <p className="font-medium">{trackingData.weight}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase text-muted-foreground">Type</p>
                        <p className="font-medium truncate" title={trackingData.type}>{trackingData.type}</p>
                      </div>
                    </div>

                    <div className="bg-primary/10 rounded-lg p-4 mt-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="h-4 w-4 text-primary" />
                        <p className="text-xs font-bold uppercase text-primary">Estimated Delivery</p>
                      </div>
                      <p className="font-bold text-lg">{trackingData.eta}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-secondary text-secondary-foreground border-none">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <AlertCircle className="h-6 w-6 text-primary flex-shrink-0" />
                      <div className="space-y-2">
                        <h4 className="font-bold">Need Help?</h4>
                        <p className="text-sm text-secondary-foreground/80">
                          Contact our 24/7 dispatch team for detailed updates.
                        </p>
                        <p className="font-bold text-lg text-primary">(800) 555-0149</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
