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
  MoreHorizontal, 
  Phone, 
  Mail, 
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AdminSidebar, AdminMobileHeader } from "@/components/AdminSidebar";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { createDriverWithDocs, updateDriverWithDocs } from "@/services/driverRegistration";

import { uploadFile } from "@/lib/storage-utils";

import { TruckLoader } from "@/components/TruckLoader";

export default function DriversManagement() {
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [drivers, setDrivers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // View Profile Modal State
  const [selectedDriver, setSelectedDriver] = useState<any>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [medicalFile, setMedicalFile] = useState<File | null>(null);

  // Delete Confirmation State
  const [driverToDelete, setDriverToDelete] = useState<string | null>(null);

  // Fetch Drivers from Firestore
  useEffect(() => {
    if (!isFirebaseConfigured()) {
      toast({ title: "Configuration Missing", description: "Firebase is not configured.", variant: "destructive" });
      setIsLoading(false);
      return;
    }

    const q = query(collection(db, "drivers"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const driverList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDrivers(driverList);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredDrivers = drivers.filter(driver => 
    driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'dl' | 'medical') => {
    if (e.target.files && e.target.files[0]) {
      if (type === 'dl') setSelectedFile(e.target.files[0]);
      if (type === 'medical') setMedicalFile(e.target.files[0]);
    }
  };

  const handleEditDriver = (driver: any) => {
    setSelectedDriver(driver);
    setIsViewModalOpen(false); // Close view modal if open
    setIsEditModalOpen(true);
  };

  const handleUpdateDriver = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDriver) return;

    setIsSubmitting(true);
    const formData = new FormData(e.target as HTMLFormElement);

    try {
      if (isFirebaseConfigured()) {
        await updateDriverWithDocs(
          selectedDriver.id,
          {
            name: formData.get("name") as string,
            phone: formData.get("phone") as string,
            email: formData.get("email") as string,
            license: formData.get("license") as string,
            status: formData.get("status") as string,
            truck: formData.get("truck") as string,
          },
          selectedFile || undefined,
          medicalFile || undefined
        );
        toast({ title: "Profile Updated", description: "Driver details saved successfully." });
      } else {
        throw new Error("Firebase not configured");
      }
      setIsEditModalOpen(false);
      setSelectedFile(null);
      setMedicalFile(null);
      setSelectedDriver(null);
    } catch (error) {
      console.error("Error updating driver:", error);
      toast({ title: "Error", description: "Failed to update driver.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddDriver = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target as HTMLFormElement);
    
    try {
      if (isFirebaseConfigured()) {
        await createDriverWithDocs(
          {
            name: formData.get("name") as string,
            status: formData.get("status") as string,
            phone: formData.get("phone") as string,
            email: formData.get("email") as string,
            license: formData.get("license") as string,
            joinDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
          },
          selectedFile || undefined // dlFile
          // Add medicalFile if we have a second input for it
        );
        toast({ title: "Driver Added", description: "New driver profile created successfully." });
      } else {
        throw new Error("Firebase not configured");
      }
      setIsAddModalOpen(false);
      setSelectedFile(null);
    } catch (error) {
      console.error("Error adding driver:", error);
      toast({ title: "Error", description: "Failed to add driver.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteDriver = (id: string) => {
    setDriverToDelete(id);
  };

  const confirmDeleteDriver = async () => {
    if (!driverToDelete) return;
    
    try {
      if (isFirebaseConfigured()) {
        await deleteDoc(doc(db, "drivers", driverToDelete));
        toast({ title: "Driver Deleted", description: "Driver profile removed." });
      }
    } catch (error) {
      console.error("Error deleting driver:", error);
      toast({ title: "Error", description: "Failed to delete driver.", variant: "destructive" });
    } finally {
      setDriverToDelete(null);
    }
  };

  const handleViewProfile = (driver: any) => {
    setSelectedDriver(driver);
    setIsViewModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminMobileHeader />
        <main className="flex-1 overflow-auto">
          <div className="p-8 max-w-[1600px] mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Drivers</h1>
            <p className="text-muted-foreground">Manage driver profiles, assignments, and compliance.</p>
          </div>
          <div className="flex gap-3">
             <Link href="/admin">
               <Button variant="outline">Back to Dashboard</Button>
             </Link>
             
             <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
               <DialogTrigger asChild>
                 <Button className="gap-2"><Plus size={16} /> Add Driver</Button>
               </DialogTrigger>
               <DialogContent className="sm:max-w-[600px]">
                 <DialogHeader>
                   <DialogTitle>Add New Driver</DialogTitle>
                 </DialogHeader>
                 <form onSubmit={handleAddDriver} className="space-y-6 py-4">
                   <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                       <Label htmlFor="name">Full Name</Label>
                       <Input id="name" name="name" placeholder="John Doe" required />
                     </div>
                     <div className="space-y-2">
                       <Label htmlFor="phone">Phone Number</Label>
                       <Input id="phone" name="phone" placeholder="(555) 000-0000" required />
                     </div>
                   </div>
                   
                   <div className="space-y-2">
                     <Label htmlFor="email">Email Address</Label>
                     <Input id="email" name="email" type="email" placeholder="john@49trucking.com" required />
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                       <Label htmlFor="license">CDL Number</Label>
                       <Input id="license" name="license" placeholder="CDL-A 123456" required />
                     </div>
                     <div className="space-y-2">
                       <Label htmlFor="status">Initial Status</Label>
                       <Select name="status" defaultValue="Active">
                         <SelectTrigger>
                           <SelectValue placeholder="Select status" />
                         </SelectTrigger>
                         <SelectContent>
                           <SelectItem value="Active">Active</SelectItem>
                           <SelectItem value="On Leave">On Leave</SelectItem>
                           <SelectItem value="Suspended">Suspended</SelectItem>
                         </SelectContent>
                       </Select>
                     </div>
                   </div>

                     <div className="space-y-2">
                     <Label>Upload Documents</Label>
                     <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:bg-secondary/50 transition-colors cursor-pointer relative">
                       <input 
                         type="file" 
                         className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                         onChange={(e) => handleFileChange(e, 'dl')}
                         accept=".pdf,.jpg,.jpeg,.png"
                       />
                       <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                       <p className="text-sm font-medium">
                         {selectedFile ? selectedFile.name : "Click to upload CDL"}
                       </p>
                       <p className="text-xs text-muted-foreground">PDF, JPG up to 10MB</p>
                     </div>
                   </div>

                   <DialogFooter>
                     <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
                     <Button type="submit" disabled={isSubmitting}>
                       {isSubmitting ? <Loader2 className="animate-spin" /> : "Create Profile"}
                     </Button>
                   </DialogFooter>
                 </form>
               </DialogContent>
             </Dialog>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 bg-card p-4 rounded-xl border border-border shadow-sm">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search by name or ID..." 
              className="pl-9 bg-background border-border" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Active</Button>
            <Button variant="outline" size="sm">On Leave</Button>
            <Button variant="outline" size="sm">Suspended</Button>
          </div>
        </div>

        {/* Drivers Grid */}
        {isLoading ? (
          <TruckLoader text="Loading drivers..." />
        ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredDrivers.map(driver => (
            <Card key={driver.id} className="shadow-sm hover:shadow-md transition-shadow group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border border-border">
                    <AvatarFallback className="bg-[var(--primary)]/10 text-[var(--primary)] font-bold">{driver.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base font-bold">{driver.name}</CardTitle>
                    <p className="text-xs text-muted-foreground font-mono truncate w-24">#{driver.id.slice(0, 6)}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => handleDeleteDriver(driver.id)}>
                    <Trash2 size={16} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground font-medium uppercase">Status</p>
                    <Badge variant="outline" className={`
                      ${driver.status === "Active" ? "bg-green-50 text-green-700 border-green-200" : 
                        driver.status === "On Leave" ? "bg-yellow-50 text-yellow-700 border-yellow-200" : 
                        "bg-red-50 text-red-700 border-red-200"}
                    `}>
                      {driver.status}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground font-medium uppercase">Assigned Truck</p>
                    <div className="flex items-center gap-1 font-medium">
                      <Truck size={14} className="text-muted-foreground" />
                      {driver.truck}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    <Phone size={14} /> {driver.phone}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    <Mail size={14} /> {driver.email}
                  </div>
                   <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    <FileText size={14} /> {driver.license}
                  </div>
                </div>

                <div className="pt-4 flex gap-2">
                   <Button variant="outline" size="sm" className="flex-1" onClick={() => handleViewProfile(driver)}>View Profile</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        )}
             
             {/* View Profile Modal */}
             <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
               <DialogContent className="sm:max-w-[600px]">
                 <DialogHeader>
                   <DialogTitle>Driver Profile</DialogTitle>
                 </DialogHeader>
                 {selectedDriver && (
                   <div className="space-y-6 py-4">
                     <div className="flex items-center gap-4">
                       <Avatar className="h-20 w-20 border-2 border-border">
                         <AvatarFallback className="bg-[var(--primary)]/10 text-[var(--primary)] text-2xl font-bold">
                           {selectedDriver.name?.charAt(0)}
                         </AvatarFallback>
                       </Avatar>
                       <div>
                         <h2 className="text-2xl font-bold">{selectedDriver.name}</h2>
                         <div className="flex items-center gap-2 mt-1">
                           <Badge variant="outline" className={`
                             ${selectedDriver.status === "Active" ? "bg-green-50 text-green-700 border-green-200" : 
                               selectedDriver.status === "On Leave" ? "bg-yellow-50 text-yellow-700 border-yellow-200" : 
                               "bg-red-50 text-red-700 border-red-200"}
                           `}>
                             {selectedDriver.status}
                           </Badge>
                           <span className="text-sm text-muted-foreground font-mono">ID: {selectedDriver.id}</span>
                         </div>
                       </div>
                     </div>

                     <div className="grid grid-cols-2 gap-6">
                       <div className="space-y-1">
                         <Label className="text-muted-foreground">Email Address</Label>
                         <div className="flex items-center gap-2 font-medium">
                           <Mail size={16} /> {selectedDriver.email}
                         </div>
                       </div>
                       <div className="space-y-1">
                         <Label className="text-muted-foreground">Phone Number</Label>
                         <div className="flex items-center gap-2 font-medium">
                           <Phone size={16} /> {selectedDriver.phone}
                         </div>
                       </div>
                       <div className="space-y-1">
                         <Label className="text-muted-foreground">CDL Number</Label>
                         <div className="flex items-center gap-2 font-medium">
                           <FileText size={16} /> {selectedDriver.license}
                         </div>
                       </div>
                       <div className="space-y-1">
                         <Label className="text-muted-foreground">Assigned Truck</Label>
                         <div className="flex items-center gap-2 font-medium">
                           <Truck size={16} /> {selectedDriver.truck}
                         </div>
                       </div>
                       <div className="space-y-1">
                         <Label className="text-muted-foreground">Join Date</Label>
                         <div className="font-medium">{selectedDriver.joinDate}</div>
                       </div>
                     </div>

                     <div className="space-y-3 pt-4 border-t border-border">
                       <Label className="text-lg font-bold">Documents</Label>
                       <div className="grid grid-cols-2 gap-4">
                         <div className="p-3 border rounded-lg bg-secondary/20 flex items-center justify-between">
                            <span className="text-sm font-medium">Driver's License</span>
                            {selectedDriver.dlUploaded ? (
                              <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">Uploaded</Badge>
                            ) : (
                              <Badge variant="outline" className="text-muted-foreground">Pending</Badge>
                            )}
                         </div>
                         <div className="p-3 border rounded-lg bg-secondary/20 flex items-center justify-between">
                            <span className="text-sm font-medium">Medical Card</span>
                            {selectedDriver.medicalUploaded ? (
                              <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">Uploaded</Badge>
                            ) : (
                              <Badge variant="outline" className="text-muted-foreground">Pending</Badge>
                            )}
                         </div>
                       </div>
                     </div>

                     <DialogFooter>
                       <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>Close</Button>
                       <Button onClick={() => handleEditDriver(selectedDriver)}>Edit Profile</Button>
                     </DialogFooter>
                   </div>
                 )}
               </DialogContent>
             </Dialog>

             {/* Edit Profile Modal */}
             <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
               <DialogContent className="sm:max-w-[600px]">
                 <DialogHeader>
                   <DialogTitle>Edit Driver Profile</DialogTitle>
                 </DialogHeader>
                 {selectedDriver && (
                   <form onSubmit={handleUpdateDriver} className="space-y-6 py-4">
                     <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-2">
                         <Label htmlFor="edit-name">Full Name</Label>
                         <Input id="edit-name" name="name" defaultValue={selectedDriver.name} required />
                       </div>
                       <div className="space-y-2">
                         <Label htmlFor="edit-phone">Phone Number</Label>
                         <Input id="edit-phone" name="phone" defaultValue={selectedDriver.phone} required />
                       </div>
                     </div>
                     
                     <div className="space-y-2">
                       <Label htmlFor="edit-email">Email Address</Label>
                       <Input id="edit-email" name="email" type="email" defaultValue={selectedDriver.email} required />
                     </div>

                     <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-2">
                         <Label htmlFor="edit-license">CDL Number</Label>
                         <Input id="edit-license" name="license" defaultValue={selectedDriver.license} required />
                       </div>
                       <div className="space-y-2">
                         <Label htmlFor="edit-status">Status</Label>
                         <Select name="status" defaultValue={selectedDriver.status}>
                           <SelectTrigger>
                             <SelectValue placeholder="Select status" />
                           </SelectTrigger>
                           <SelectContent>
                             <SelectItem value="Active">Active</SelectItem>
                             <SelectItem value="On Leave">On Leave</SelectItem>
                             <SelectItem value="Suspended">Suspended</SelectItem>
                           </SelectContent>
                         </Select>
                       </div>
                     </div>
                     
                     <div className="space-y-2">
                        <Label htmlFor="edit-truck">Assigned Truck</Label>
                        <Select name="truck" defaultValue={selectedDriver.truck || "Unassigned"}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select truck" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Unassigned">Unassigned</SelectItem>
                            <SelectItem value="TRK-409">TRK-409</SelectItem>
                            <SelectItem value="TRK-410">TRK-410</SelectItem>
                            <SelectItem value="TRK-205">TRK-205</SelectItem>
                          </SelectContent>
                        </Select>
                     </div>

                     <div className="space-y-4 pt-2 border-t border-border">
                       <Label className="font-bold">Update Documents</Label>
                       
                       <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-2">
                            <Label className="text-xs text-muted-foreground">Driver's License (Update)</Label>
                            <Input type="file" onChange={(e) => handleFileChange(e, 'dl')} accept=".pdf,.jpg,.png" />
                         </div>
                         <div className="space-y-2">
                            <Label className="text-xs text-muted-foreground">Medical Card (Update/Add)</Label>
                            <Input type="file" onChange={(e) => handleFileChange(e, 'medical')} accept=".pdf,.jpg,.png" />
                         </div>
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

             {/* Delete Confirmation Dialog */}
             <Dialog open={!!driverToDelete} onOpenChange={(open) => !open && setDriverToDelete(null)}>
               <DialogContent>
                 <DialogHeader>
                   <DialogTitle>Delete Driver</DialogTitle>
                   <DialogDescription>
                     Are you sure you want to delete this driver? This action cannot be undone.
                   </DialogDescription>
                 </DialogHeader>
                 <DialogFooter>
                   <Button variant="outline" onClick={() => setDriverToDelete(null)}>Cancel</Button>
                   <Button variant="destructive" onClick={confirmDeleteDriver}>Delete</Button>
                 </DialogFooter>
               </DialogContent>
             </Dialog>

          </div>
        </main>
      </div>
    </div>
  );
}
