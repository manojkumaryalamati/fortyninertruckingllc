import { useState, useEffect } from "react";
import { Link } from "wouter";
import { 
  Truck, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  MoreHorizontal, 
  Edit, 
  Trash2,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AdminSidebar, AdminMobileHeader } from "@/components/AdminSidebar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { Truck as TruckType } from "@/lib/types";

import { TruckLoader } from "@/components/TruckLoader";

export default function TrucksManagement() {
  const { toast } = useToast();
  const [trucks, setTrucks] = useState<TruckType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Modal States
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentTruck, setCurrentTruck] = useState<TruckType | null>(null);
  
  // Form States
  const [formData, setFormData] = useState<Partial<TruckType>>({
    truckNo: "",
    vin: "",
    plate: "",
    status: "Active"
  });

  // Fetch Trucks
  useEffect(() => {
    if (!isFirebaseConfigured()) {
      toast({ title: "Configuration Missing", description: "Firebase is not configured.", variant: "destructive" });
      setIsLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(collection(db, "trucks"), (snapshot) => {
      const truckData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as TruckType[];
      setTrucks(truckData);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAddTruck = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!isFirebaseConfigured()) {
        throw new Error("Firebase not configured");
      } else {
        await addDoc(collection(db, "trucks"), {
          ...formData,
          createdAt: serverTimestamp()
        });
      }
      
      toast({ title: "Success", description: "Truck added successfully" });
      setIsAddOpen(false);
      setFormData({ truckNo: "", vin: "", plate: "", status: "Active" });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const handleUpdateTruck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentTruck?.id) return;
    
    try {
      if (!isFirebaseConfigured()) {
        throw new Error("Firebase not configured");
      } else {
        await updateDoc(doc(db, "trucks", currentTruck.id), formData);
      }
      
      toast({ title: "Success", description: "Truck updated successfully" });
      setIsEditOpen(false);
      setCurrentTruck(null);
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const handleDeleteTruck = async (id: string) => {
    if (!confirm("Are you sure you want to delete this truck?")) return;
    
    try {
      if (!isFirebaseConfigured()) {
        throw new Error("Firebase not configured");
      } else {
        await deleteDoc(doc(db, "trucks", id));
      }
      toast({ title: "Success", description: "Truck deleted successfully" });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const openEditModal = (truck: TruckType) => {
    setCurrentTruck(truck);
    setFormData({
      truckNo: truck.truckNo,
      vin: truck.vin,
      plate: truck.plate,
      status: truck.status
    });
    setIsEditOpen(true);
  };

  const filteredTrucks = trucks.filter(t => 
    t.truckNo.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.vin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.plate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminMobileHeader />
        <main className="flex-1 overflow-auto p-6 space-y-8">
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black tracking-tight">Fleet Management</h1>
              <p className="text-muted-foreground mt-1">Manage your trucks and assets.</p>
            </div>
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button className="font-bold bg-primary text-primary-foreground hover:bg-primary/90">
                  <Plus className="mr-2 h-4 w-4" /> Add Truck
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Truck</DialogTitle>
                  <DialogDescription>Enter the vehicle details below.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddTruck} className="space-y-4 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="truckNo">Truck No.</Label>
                      <Input 
                        id="truckNo" 
                        value={formData.truckNo} 
                        onChange={(e) => setFormData({...formData, truckNo: e.target.value})}
                        placeholder="FT-101" 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="plate">License Plate</Label>
                      <Input 
                        id="plate" 
                        value={formData.plate} 
                        onChange={(e) => setFormData({...formData, plate: e.target.value})}
                        placeholder="7W82112" 
                        required 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vin">VIN</Label>
                    <Input 
                      id="vin" 
                      value={formData.vin} 
                      onChange={(e) => setFormData({...formData, vin: e.target.value})}
                      placeholder="1M8GDM9A_HP045821" 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select 
                      value={formData.status} 
                      onValueChange={(val: any) => setFormData({...formData, status: val})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Maintenance">Maintenance</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save Truck</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Card className="border-border shadow-sm border-t-4 border-t-primary">
            <CardContent className="p-0">
              <div className="p-4 border-b border-border flex items-center gap-4 bg-zinc-50/50">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search by truck #, VIN, or plate..." 
                    className="pl-9 bg-white border-zinc-200"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 ml-auto">
                  <Button variant="outline" size="sm" className="bg-white"><Filter className="mr-2 h-4 w-4" /> Filter</Button>
                  <Button variant="outline" size="sm" className="bg-white"><Download className="mr-2 h-4 w-4" /> Export</Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-secondary/30 text-zinc-700 font-bold border-b border-border">
                    <tr>
                      <th className="px-6 py-4">Truck No.</th>
                      <th className="px-6 py-4">VIN</th>
                      <th className="px-6 py-4">Plate</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {isLoading ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-8">
                          <TruckLoader text="Loading trucks..." size="sm" />
                        </td>
                      </tr>
                    ) : filteredTrucks.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                          <div className="flex flex-col items-center gap-2">
                            <Truck className="h-12 w-12 text-muted-foreground/30" />
                            <p>No trucks found matching your criteria.</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredTrucks.map((truck) => (
                        <tr key={truck.id} className="hover:bg-muted/50 transition-colors">
                          <td className="px-6 py-4 font-bold text-foreground">{truck.truckNo}</td>
                          <td className="px-6 py-4 font-mono text-muted-foreground">{truck.vin}</td>
                          <td className="px-6 py-4">{truck.plate}</td>
                          <td className="px-6 py-4">
                            <Badge variant="outline" className={`
                              ${truck.status === "Active" ? "border-green-200 bg-green-50 text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400" : 
                                truck.status === "Maintenance" ? "border-yellow-200 bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-400" : 
                                "border-gray-200 bg-gray-50 text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"}
                            `}>
                              {truck.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" onClick={() => openEditModal(truck)}>
                                <Edit size={16} className="text-muted-foreground hover:text-primary" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => truck.id && handleDeleteTruck(truck.id)}>
                                <Trash2 size={16} className="text-muted-foreground hover:text-destructive" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Edit Modal */}
          <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Truck</DialogTitle>
                <DialogDescription>Update vehicle information.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleUpdateTruck} className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-truckNo">Truck No.</Label>
                    <Input 
                      id="edit-truckNo" 
                      value={formData.truckNo} 
                      onChange={(e) => setFormData({...formData, truckNo: e.target.value})}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-plate">License Plate</Label>
                    <Input 
                      id="edit-plate" 
                      value={formData.plate} 
                      onChange={(e) => setFormData({...formData, plate: e.target.value})}
                      required 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-vin">VIN</Label>
                  <Input 
                    id="edit-vin" 
                    value={formData.vin} 
                    onChange={(e) => setFormData({...formData, vin: e.target.value})}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select 
                    value={formData.status} 
                    onValueChange={(val: any) => setFormData({...formData, status: val})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <DialogFooter>
                  <Button type="submit">Update Truck</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

        </main>
      </div>
    </div>
  );
}