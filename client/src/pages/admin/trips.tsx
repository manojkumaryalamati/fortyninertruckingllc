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
  Trash2,
  Edit
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
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

import { uploadFile } from "@/lib/storage-utils";

import { TruckLoader } from "@/components/TruckLoader";

export default function TripsManagement() {
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [trips, setTrips] = useState<any[]>([]);
  const [drivers, setDrivers] = useState<any[]>([]);
  const [trucks, setTrucks] = useState<any[]>([]);
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentTrip, setCurrentTrip] = useState<any>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Fetch Trips, Drivers, Trucks
  useEffect(() => {
    if (!isFirebaseConfigured()) {
      toast({ title: "Configuration Missing", description: "Firebase is not configured.", variant: "destructive" });
      setIsLoading(false);
      return;
    }

    const unsubscribeTrips = onSnapshot(query(collection(db, "trips"), orderBy("createdAt", "desc")), (snapshot) => {
      const tripsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTrips(tripsList);
      setIsLoading(false);
    });

    const unsubscribeDrivers = onSnapshot(query(collection(db, "drivers")), (snapshot) => {
        setDrivers(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    const unsubscribeTrucks = onSnapshot(query(collection(db, "trucks")), (snapshot) => {
        setTrucks(snapshot.docs.map(t => ({ id: t.id, ...t.data() })));
    });

    return () => {
        unsubscribeTrips();
        unsubscribeDrivers();
        unsubscribeTrucks();
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleAddTrip = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target as HTMLFormElement);
    
    try {
      let fileUrl = "";
      if (selectedFile) {
        fileUrl = await uploadFile(selectedFile, "trips/bol");
      }

      const newTrip = {
        date: formData.get("date") as string,
        customer: formData.get("customer") as string,
        route: `${formData.get("pickup")} → ${formData.get("dropoff")}`,
        pickup: formData.get("pickup") as string,
        dropoff: formData.get("dropoff") as string,
        driver: formData.get("driver") as string,
        truck: formData.get("truck") as string,
        status: "Scheduled",
        rate: `$${formData.get("rate")}`,
        weight: formData.get("weight") as string,
        material: formData.get("material") as string,
        bolUrl: fileUrl,
        createdAt: serverTimestamp()
      };

      if (isFirebaseConfigured()) {
        await addDoc(collection(db, "trips"), newTrip);
        toast({ title: "Trip Dispatched", description: "Load assignment created successfully." });
      } else {
        throw new Error("Firebase not configured");
      }
      setIsAddModalOpen(false);
      setSelectedFile(null);
    } catch (error) {
      console.error("Error adding trip:", error);
      toast({ title: "Error", description: "Failed to dispatch trip.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditClick = (trip: any) => {
    setCurrentTrip(trip);
    // Parse route back to pickup/dropoff if needed, or use stored fields
    // Assuming we store pickup/dropoff separately now (added above), or parsing:
    let pickup = trip.pickup;
    let dropoff = trip.dropoff;
    
    if (!pickup && trip.route) {
        const parts = trip.route.split("→");
        if (parts.length === 2) {
            pickup = parts[0].trim();
            dropoff = parts[1].trim();
        }
    }

    setCurrentTrip({
        ...trip,
        pickup,
        dropoff,
        rate: trip.rate?.replace('$', '')
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateTrip = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentTrip) return;
    setIsSubmitting(true);
    const formData = new FormData(e.target as HTMLFormElement);

    try {
        let fileUrl = currentTrip.bolUrl;
        if (selectedFile) {
            fileUrl = await uploadFile(selectedFile, "trips/bol");
        }

        const updatedTrip = {
            date: formData.get("date") as string,
            customer: formData.get("customer") as string,
            route: `${formData.get("pickup")} → ${formData.get("dropoff")}`,
            pickup: formData.get("pickup") as string,
            dropoff: formData.get("dropoff") as string,
            driver: formData.get("driver") as string,
            truck: formData.get("truck") as string,
            status: formData.get("status") as string,
            rate: `$${formData.get("rate")}`,
            weight: formData.get("weight") as string,
            material: formData.get("material") as string,
            bolUrl: fileUrl,
            updatedAt: serverTimestamp()
        };

        if (isFirebaseConfigured()) {
            await updateDoc(doc(db, "trips", currentTrip.id), updatedTrip);
            toast({ title: "Trip Updated", description: "Load details updated successfully." });
        }
        setIsEditModalOpen(false);
        setCurrentTrip(null);
        setSelectedFile(null);
    } catch (error) {
        console.error("Error updating trip:", error);
        toast({ title: "Error", description: "Failed to update trip.", variant: "destructive" });
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
                             <SelectItem value="Unassigned">Unassigned</SelectItem>
                             {drivers.map(driver => (
                               <SelectItem key={driver.id} value={driver.name}>
                                 {driver.name}
                               </SelectItem>
                             ))}
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
                             <SelectItem value="Unassigned">Unassigned</SelectItem>
                             {trucks.map(truck => (
                               <SelectItem key={truck.id} value={truck.truckNumber}>
                                 {truck.truckNumber} ({truck.type})
                               </SelectItem>
                             ))}
                           </SelectContent>
                         </Select>
                       </div>
                     </div>
                   </div>

                   <div className="space-y-2">
                     <Label>Upload BOL / Rate Confirmation</Label>
                     <div className="border-2 border-dashed border-border rounded-xl p-4 text-center hover:bg-secondary/50 transition-colors cursor-pointer relative">
                       <input 
                         type="file" 
                         className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                         onChange={handleFileChange}
                         accept=".pdf,.jpg,.jpeg,.png"
                       />
                       <Upload className="mx-auto h-6 w-6 text-muted-foreground mb-1" />
                       <p className="text-sm font-medium">
                         {selectedFile ? selectedFile.name : "Upload Documents"}
                       </p>
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
             {/* Edit Modal */}
             <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
               <DialogContent className="sm:max-w-[700px]">
                 <DialogHeader>
                   <DialogTitle>Edit Trip Details</DialogTitle>
                 </DialogHeader>
                 {currentTrip && (
                 <form onSubmit={handleUpdateTrip} className="space-y-6 py-4">
                   <div className="space-y-4">
                     <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Load Details</h3>
                     <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-2">
                         <Label htmlFor="edit-customer">Customer Name</Label>
                         <Input id="edit-customer" name="customer" defaultValue={currentTrip.customer} required />
                       </div>
                       <div className="space-y-2">
                         <Label htmlFor="edit-material">Material/Cargo</Label>
                         <Input id="edit-material" name="material" defaultValue={currentTrip.material} required />
                       </div>
                     </div>
                     <div className="grid grid-cols-3 gap-4">
                       <div className="space-y-2">
                         <Label htmlFor="edit-rate">Rate ($)</Label>
                         <Input id="edit-rate" name="rate" defaultValue={currentTrip.rate} type="number" required />
                       </div>
                       <div className="space-y-2">
                         <Label htmlFor="edit-weight">Weight (lbs)</Label>
                         <Input id="edit-weight" name="weight" defaultValue={currentTrip.weight} />
                       </div>
                       <div className="space-y-2">
                         <Label htmlFor="edit-date">Pickup Date</Label>
                         <Input id="edit-date" name="date" type="date" defaultValue={currentTrip.date} required />
                       </div>
                     </div>
                   </div>

                   <div className="space-y-4">
                     <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Routing</h3>
                     <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-2">
                         <Label htmlFor="edit-pickup">Pickup Location</Label>
                         <Input id="edit-pickup" name="pickup" defaultValue={currentTrip.pickup} placeholder="City, State" required />
                       </div>
                       <div className="space-y-2">
                         <Label htmlFor="edit-dropoff">Dropoff Location</Label>
                         <Input id="edit-dropoff" name="dropoff" defaultValue={currentTrip.dropoff} placeholder="City, State" required />
                       </div>
                     </div>
                   </div>

                   <div className="space-y-4">
                     <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Assignment & Status</h3>
                     <div className="grid grid-cols-3 gap-4">
                       <div className="space-y-2">
                         <Label htmlFor="edit-driver">Assign Driver</Label>
                         <Select name="driver" defaultValue={currentTrip.driver}>
                           <SelectTrigger>
                             <SelectValue placeholder="Select driver" />
                           </SelectTrigger>
                           <SelectContent>
                             <SelectItem value="Unassigned">Unassigned</SelectItem>
                             {drivers.map(driver => (
                               <SelectItem key={driver.id} value={driver.name}>
                                 {driver.name}
                               </SelectItem>
                             ))}
                           </SelectContent>
                         </Select>
                       </div>
                       <div className="space-y-2">
                         <Label htmlFor="edit-truck">Assign Truck</Label>
                         <Select name="truck" defaultValue={currentTrip.truck}>
                           <SelectTrigger>
                             <SelectValue placeholder="Select truck" />
                           </SelectTrigger>
                           <SelectContent>
                             <SelectItem value="Unassigned">Unassigned</SelectItem>
                             {trucks.map(truck => (
                               <SelectItem key={truck.id} value={truck.truckNumber}>
                                 {truck.truckNumber} ({truck.type})
                               </SelectItem>
                             ))}
                           </SelectContent>
                         </Select>
                       </div>
                       <div className="space-y-2">
                         <Label htmlFor="edit-status">Status</Label>
                         <Select name="status" defaultValue={currentTrip.status}>
                           <SelectTrigger>
                             <SelectValue placeholder="Status" />
                           </SelectTrigger>
                           <SelectContent>
                             <SelectItem value="Scheduled">Scheduled</SelectItem>
                             <SelectItem value="In Progress">In Progress</SelectItem>
                             <SelectItem value="Completed">Completed</SelectItem>
                             <SelectItem value="Cancelled">Cancelled</SelectItem>
                           </SelectContent>
                         </Select>
                       </div>
                     </div>
                   </div>

                   <div className="space-y-2">
                     <Label>Update BOL (Optional)</Label>
                     <div className="border-2 border-dashed border-border rounded-xl p-4 text-center hover:bg-secondary/50 transition-colors cursor-pointer relative">
                       <input 
                         type="file" 
                         className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                         onChange={handleFileChange}
                         accept=".pdf,.jpg,.jpeg,.png"
                       />
                       <Upload className="mx-auto h-6 w-6 text-muted-foreground mb-1" />
                       <p className="text-sm font-medium">
                         {selectedFile ? selectedFile.name : (currentTrip.bolUrl ? "Replace uploaded BOL" : "Upload Documents")}
                       </p>
                     </div>
                   </div>

                   <DialogFooter>
                     <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
                     <Button type="submit" disabled={isSubmitting}>
                       {isSubmitting ? <Loader2 className="animate-spin" /> : "Save Changes"}
                     </Button>
                   </DialogFooter>
                 </form>
                 )}
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
                  <TruckLoader text="Loading trips..." />
                ) : (
                <div className="divide-y divide-border">
                  {trips.map(trip => (
                     <div key={trip.id} className="p-4 hover:bg-secondary/20 transition-colors flex flex-col md:flex-row gap-4 justify-between items-start md:items-center group">
                        <div className="space-y-2">
                           <div className="flex items-center gap-2">
                              <span className="font-mono text-xs text-muted-foreground font-bold truncate w-20">#{trip.id.substring(0, 8)}</span>
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
                           <Button size="sm" variant="secondary" onClick={() => handleEditClick(trip)}>
                              <Edit size={14} className="mr-1"/> Edit
                           </Button>
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
                          <Button size="icon" variant="ghost" className="h-6 w-6 text-muted-foreground hover:text-foreground" onClick={() => handleEditClick(trip)}><Edit size={12} /></Button>
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
