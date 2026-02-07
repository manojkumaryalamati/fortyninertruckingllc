import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { 
  LayoutDashboard, 
  Truck, 
  Package, 
  Users, 
  Settings, 
  FileText,
  BarChart3,
  LogOut,
  Search, 
  Plus, 
  Calendar, 
  MapPin, 
  User, 
  DollarSign, 
  Upload,
  Loader2,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AdminSidebar, AdminMobileHeader } from "@/components/AdminSidebar";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

export default function TripsManagement() {
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [trips, setTrips] = useState<any[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Trips
  useEffect(() => {
    if (!isFirebaseConfigured()) {
      setTrips([
        { id: "mock-1", date: "Feb 09, 2026", customer: "Tesla Gigafactory", route: "Sacramento → Austin", driver: "M. Rodriguez", truck: "TRK-409", status: "In Progress", rate: "$4,200", material: "Steel Coils" },
        { id: "mock-2", date: "Feb 09, 2026", customer: "Amazon", route: "Reno → Salt Lake City", driver: "S. Jenkins", truck: "TRK-410", status: "Scheduled", rate: "$1,850", material: "Palletized Goods" },
      ]);
      setIsLoading(false);
      return;
    }

    const q = query(collection(db, "trips"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tripsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTrips(tripsData);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAddTrip = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target as HTMLFormElement);
    
    const newTrip = {
      date: formData.get("date") as string,
      customer: formData.get("customer") as string,
      route: `${formData.get("pickup")} → ${formData.get("dropoff")}`,
      driver: formData.get("driver") as string,
      truck: formData.get("truck") as string,
      status: "Scheduled",
      rate: `$${formData.get("rate")}`,
      material: formData.get("material") as string,
      createdAt: serverTimestamp()
    };

    try {
      if (isFirebaseConfigured()) {
        await addDoc(collection(db, "trips"), newTrip);
        toast({ title: "Trip Dispatched", description: "Load assignment created successfully." });
      } else {
        setTrips([{ id: `mock-${Date.now()}`, ...newTrip }, ...trips]);
        toast({ title: "Trip Dispatched (Mock)", description: "Firebase not configured." });
      }
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Error adding trip:", error);
      toast({ title: "Error", description: "Failed to dispatch trip.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteTrip = async (id: string) => {
    if (!confirm("Delete this trip?")) return;
    try {
      if (isFirebaseConfigured()) {
        await deleteDoc(doc(db, "trips", id));
        toast({ title: "Trip Deleted", description: "Trip removed from board." });
      } else {
        setTrips(trips.filter(t => t.id !== id));
      }
    } catch (error) {
      console.error("Error deleting trip:", error);
      toast({ title: "Error", description: "Failed to delete trip.", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminMobileHeader />
        <main className="flex-1 overflow-auto">
          <div className="p-8 max-w-[1600px] mx-auto space-y-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Trip Management</h1>
            <p className="text-muted-foreground">Dispatch board, routing, and load details.</p>
          </div>
          <div className="flex gap-3">
             <Link href="/admin">
               <Button variant="outline">Back to Dashboard</Button>
             </Link>
             
             <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
               <DialogTrigger asChild>
                 <Button className="gap-2"><Plus size={16} /> New Trip</Button>
               </DialogTrigger>
               <DialogContent className="sm:max-w-[700px]">
                 <DialogHeader>
                   <DialogTitle>Dispatch New Load</DialogTitle>
                 </DialogHeader>
                 <form onSubmit={handleAddTrip} className="space-y-6 py-4">
                   <div className="space-y-4">
                     <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Load Details</h3>
                     <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-2">
                         <Label htmlFor="customer">Customer Name</Label>
                         <Input id="customer" name="customer" placeholder="e.g. Tesla Inc." required />
                       </div>
                       <div className="space-y-2">
                         <Label htmlFor="material">Material/Cargo</Label>
                         <Input id="material" name="material" placeholder="e.g. Steel Coils" required />
                       </div>
                     </div>
                     <div className="grid grid-cols-3 gap-4">
                       <div className="space-y-2">
                         <Label htmlFor="rate">Rate ($)</Label>
                         <Input id="rate" name="rate" placeholder="1200" type="number" required />
                       </div>
                       <div className="space-y-2">
                         <Label htmlFor="weight">Weight (lbs)</Label>
                         <Input id="weight" name="weight" placeholder="42,000" />
                       </div>
                       <div className="space-y-2">
                         <Label htmlFor="date">Pickup Date</Label>
                         <Input id="date" name="date" type="date" required />
                       </div>
                     </div>
                   </div>

                   <div className="space-y-4">
                     <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Routing</h3>
                     <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-2">
                         <Label htmlFor="pickup">Pickup Location</Label>
                         <Input id="pickup" name="pickup" placeholder="City, State" required />
                       </div>
                       <div className="space-y-2">
                         <Label htmlFor="dropoff">Dropoff Location</Label>
                         <Input id="dropoff" name="dropoff" placeholder="City, State" required />
                       </div>
                     </div>
                   </div>

                   <div className="space-y-4">
                     <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Assignment</h3>
                     <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-2">
                         <Label htmlFor="driver">Assign Driver</Label>
                         <Select name="driver">
                           <SelectTrigger>
                             <SelectValue placeholder="Select driver" />
                           </SelectTrigger>
                           <SelectContent>
                             <SelectItem value="M. Rodriguez">M. Rodriguez</SelectItem>
                             <SelectItem value="S. Jenkins">S. Jenkins</SelectItem>
                             <SelectItem value="D. Chen">D. Chen</SelectItem>
                             <SelectItem value="Unassigned">Unassigned</SelectItem>
                           </SelectContent>
                         </Select>
                       </div>
                       <div className="space-y-2">
                         <Label htmlFor="truck">Assign Truck</Label>
                         <Select name="truck">
                           <SelectTrigger>
                             <SelectValue placeholder="Select truck" />
                           </SelectTrigger>
                           <SelectContent>
                             <SelectItem value="TRK-409">TRK-409</SelectItem>
                             <SelectItem value="TRK-410">TRK-410</SelectItem>
                             <SelectItem value="TRK-205">TRK-205</SelectItem>
                             <SelectItem value="Unassigned">Unassigned</SelectItem>
                           </SelectContent>
                         </Select>
                       </div>
                     </div>
                   </div>

                   <div className="space-y-2">
                     <Label>Upload BOL / Rate Confirmation</Label>
                     <div className="border-2 border-dashed border-border rounded-xl p-4 text-center hover:bg-secondary/50 transition-colors cursor-pointer">
                       <Upload className="mx-auto h-6 w-6 text-muted-foreground mb-1" />
                       <p className="text-sm font-medium">Upload Documents</p>
                     </div>
                   </div>

                   <DialogFooter>
                     <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
                     <Button type="submit" disabled={isSubmitting}>
                       {isSubmitting ? <Loader2 className="animate-spin" /> : "Dispatch Load"}
                     </Button>
                   </DialogFooter>
                 </form>
               </DialogContent>
             </Dialog>
          </div>
        </div>

        {/* Dispatch Board Layout */}
        <div className="grid lg:grid-cols-3 gap-6">
           {/* Active Trips Column */}
           <div className="lg:col-span-2 space-y-6">
              <Card>
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <h3 className="font-bold">Active & Scheduled</h3>
                  <div className="flex items-center gap-2">
                     <Search size={16} className="text-muted-foreground" />
                     <Input placeholder="Search trips..." className="h-8 w-48" />
                  </div>
                </div>
                {isLoading ? (
                  <div className="p-12 flex justify-center"><Loader2 className="animate-spin text-primary" /></div>
                ) : (
                <div className="divide-y divide-border">
                  {trips.filter(t => t.status !== "Completed").map(trip => (
                     <div key={trip.id} className="p-4 hover:bg-secondary/20 transition-colors flex flex-col md:flex-row gap-4 justify-between items-start md:items-center group">
                        <div className="space-y-2">
                           <div className="flex items-center gap-2">
                              <span className="font-mono text-xs text-muted-foreground font-bold truncate w-20">#{trip.id}</span>
                              <Badge variant={trip.status === "In Progress" ? "default" : "outline"}>{trip.status}</Badge>
                              <span className="text-xs text-muted-foreground flex items-center gap-1"><Calendar size={12} /> {trip.date}</span>
                           </div>
                           <h4 className="font-bold text-lg">{trip.customer}</h4>
                           <div className="flex items-center gap-2 text-sm">
                              <MapPin size={14} className="text-primary" />
                              <span>{trip.route}</span>
                           </div>
                           <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1"><Truck size={12} /> {trip.truck}</span>
                              <span className="flex items-center gap-1"><User size={12} /> {trip.driver}</span>
                              <span className="flex items-center gap-1"><DollarSign size={12} /> {trip.rate}</span>
                           </div>
                        </div>
                        <div className="flex flex-col gap-2">
                           <Button size="sm" variant="secondary">View Details</Button>
                           <Button size="sm" variant="ghost" className="text-destructive hover:bg-destructive/10" onClick={() => handleDeleteTrip(trip.id)}><Trash2 size={14} className="mr-1"/> Delete</Button>
                        </div>
                     </div>
                  ))}
                  {trips.filter(t => t.status !== "Completed").length === 0 && (
                    <div className="p-8 text-center text-muted-foreground">No active trips</div>
                  )}
                </div>
                )}
              </Card>

              <Card>
                <div className="p-4 border-b border-border">
                  <h3 className="font-bold text-muted-foreground">Recently Completed</h3>
                </div>
                <div className="divide-y divide-border opacity-80">
                  {trips.filter(t => t.status === "Completed").map(trip => (
                     <div key={trip.id} className="p-4 flex justify-between items-center">
                        <div>
                           <p className="font-bold">{trip.customer}</p>
                           <p className="text-xs text-muted-foreground">{trip.route}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="bg-green-100 text-green-700">Completed</Badge>
                          <Button size="icon" variant="ghost" className="h-6 w-6 text-destructive" onClick={() => handleDeleteTrip(trip.id)}><Trash2 size={12} /></Button>
                        </div>
                     </div>
                  ))}
                </div>
              </Card>
           </div>

           {/* Quick Actions & Calendar Placeholder */}
           <div className="space-y-6">
              <Card className="bg-primary text-primary-foreground border-none">
                 <CardContent className="p-6 space-y-4">
                    <h3 className="font-bold text-xl">Quick Dispatch</h3>
                    <p className="text-primary-foreground/80 text-sm">Create a new load assignment instantly.</p>
                    <div className="space-y-3">
                       <Input placeholder="Customer Name" className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50" />
                       <Input placeholder="Pickup Location" className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50" />
                       <Input placeholder="Dropoff Location" className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50" />
                       <Button variant="secondary" className="w-full font-bold">Create Assignment</Button>
                    </div>
                 </CardContent>
              </Card>

              <Card>
                 <CardContent className="p-6">
                    <h3 className="font-bold mb-4">Unassigned Drivers</h3>
                    <div className="space-y-3">
                       {["David Chen", "Emily Davis"].map((driver, i) => (
                          <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary">
                             <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold">{driver.charAt(0)}</div>
                                <span className="text-sm font-medium">{driver}</span>
                             </div>
                             <Button size="sm" variant="ghost">Assign</Button>
                          </div>
                       ))}
                    </div>
                 </CardContent>
              </Card>
           </div>
        </div>
      </div>
      </main>
      </div>
    </div>
  );
}
