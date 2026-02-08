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
  Search, 
  Filter, 
  Download, 
  AlertTriangle,
  CheckCircle2,
  Clock,
  MoreVertical,
  Upload,
  BarChart3,
  LogOut,
  Loader2,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AdminSidebar, AdminMobileHeader } from "@/components/AdminSidebar";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

import { uploadFile } from "@/lib/storage-utils";

export default function DocumentsCenter() {
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [documents, setDocuments] = useState<any[]>([]);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Fetch Documents
  useEffect(() => {
    if (!isFirebaseConfigured()) {
      toast({ title: "Configuration Missing", description: "Firebase is not configured.", variant: "destructive" });
      setIsLoading(false);
      return;
    }

    const q = query(collection(db, "documents"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDocuments(docs);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredDocs = documents.filter(doc => {
    const matchesFilter = filter === "All" || doc.category === filter;
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doc.entity.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile && isFirebaseConfigured()) {
       toast({ title: "Error", description: "Please select a file to upload.", variant: "destructive" });
       return;
    }

    setIsSubmitting(true);
    const formData = new FormData(e.target as HTMLFormElement);
    
    // Determine status based on expiration date
    const expiryDate = new Date(formData.get("expiry") as string);
    const today = new Date();
    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(today.getMonth() + 3);
    
    let status = "Valid";
    if (expiryDate < today) status = "Expired";
    else if (expiryDate < threeMonthsFromNow) status = "Expiring Soon";

    try {
      let fileUrl = "";
      if (selectedFile) {
        // Upload to "documents/{category}/"
        const category = formData.get("category") as string;
        fileUrl = await uploadFile(selectedFile, `documents/${category.toLowerCase()}`);
      }

      const newDoc = {
        name: formData.get("fileName") as string,
        type: formData.get("docType") as string,
        entity: formData.get("entity") as string,
        expiry: expiryDate.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        status: status,
        category: formData.get("category") as string,
        fileUrl: fileUrl,
        createdAt: serverTimestamp()
      };

      if (isFirebaseConfigured()) {
        await addDoc(collection(db, "documents"), newDoc);
        toast({ title: "Document Uploaded", description: "File record created successfully." });
      } else {
         throw new Error("Firebase not configured");
      }
      setIsUploadModalOpen(false);
      setSelectedFile(null);
    } catch (error) {
      console.error("Error adding document:", error);
      toast({ title: "Error", description: "Failed to upload document record.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };


  const handleDeleteDoc = async (id: string) => {
    if (!confirm("Delete this document record?")) return;
    try {
      if (isFirebaseConfigured()) {
        await deleteDoc(doc(db, "documents", id));
        toast({ title: "Document Deleted", description: "Record removed." });
      }
    } catch (error) {
      console.error("Error deleting document:", error);
      toast({ title: "Error", description: "Failed to delete document.", variant: "destructive" });
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
              <h1 className="text-3xl font-bold tracking-tight">Documents Center</h1>
              <p className="text-muted-foreground">Manage compliance, expirations, and digital records.</p>
            </div>
            <div className="flex gap-3">
               <Link href="/admin">
                 <Button variant="outline">Back to Dashboard</Button>
               </Link>
               
               <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
                 <DialogTrigger asChild>
                   <Button className="gap-2"><Upload size={16} /> Upload Document</Button>
                 </DialogTrigger>
                 <DialogContent className="sm:max-w-[600px]">
                   <DialogHeader>
                     <DialogTitle>Upload New Document</DialogTitle>
                   </DialogHeader>
                   <form onSubmit={handleUpload} className="space-y-6 py-4">
                     <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-2">
                         <Label htmlFor="category">Category</Label>
                         <Select name="category" defaultValue="Driver">
                           <SelectTrigger>
                             <SelectValue placeholder="Select category" />
                           </SelectTrigger>
                           <SelectContent>
                             <SelectItem value="Driver">Driver</SelectItem>
                             <SelectItem value="Truck">Truck</SelectItem>
                             <SelectItem value="Trip">Trip</SelectItem>
                             <SelectItem value="Company">Company</SelectItem>
                           </SelectContent>
                         </Select>
                       </div>
                       <div className="space-y-2">
                         <Label htmlFor="docType">Document Type</Label>
                         <Select name="docType" defaultValue="License">
                           <SelectTrigger>
                             <SelectValue placeholder="Select type" />
                           </SelectTrigger>
                           <SelectContent>
                             <SelectItem value="License">License / CDL</SelectItem>
                             <SelectItem value="Medical">Medical Cert</SelectItem>
                             <SelectItem value="Insurance">Insurance</SelectItem>
                             <SelectItem value="Registration">Registration</SelectItem>
                             <SelectItem value="Permit">Permit</SelectItem>
                             <SelectItem value="BOL">Bill of Lading</SelectItem>
                           </SelectContent>
                         </Select>
                       </div>
                     </div>

                     <div className="space-y-2">
                       <Label htmlFor="fileName">Document Name</Label>
                       <Input id="fileName" name="fileName" placeholder="e.g. CDL - John Doe" required />
                     </div>

                     <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-2">
                         <Label htmlFor="entity">Associated Entity</Label>
                         <Input id="entity" name="entity" placeholder="e.g. Driver Name or Truck #" required />
                       </div>
                       <div className="space-y-2">
                         <Label htmlFor="expiry">Expiration Date</Label>
                         <Input id="expiry" name="expiry" type="date" required />
                       </div>
                     </div>

                     <div className="space-y-2">
                       <Label>File Upload</Label>
                       <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:bg-secondary/50 transition-colors cursor-pointer relative">
                         <input 
                           type="file" 
                           className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                           onChange={handleFileChange}
                           accept=".pdf,.jpg,.jpeg,.png"
                         />
                         <Upload className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
                         <p className="text-sm font-medium">
                           {selectedFile ? selectedFile.name : "Drag & Drop or Click to Upload"}
                         </p>
                         <p className="text-xs text-muted-foreground mt-1">Supported: PDF, JPG, PNG (Max 15MB)</p>
                       </div>
                     </div>

                     <DialogFooter>
                       <Button type="button" variant="outline" onClick={() => setIsUploadModalOpen(false)}>Cancel</Button>
                       <Button type="submit" disabled={isSubmitting}>
                         {isSubmitting ? <Loader2 className="animate-spin" /> : "Upload & Save"}
                       </Button>
                     </DialogFooter>
                   </form>
                 </DialogContent>
               </Dialog>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <Card className="bg-green-50 border-green-200">
               <CardContent className="p-4 flex items-center justify-between">
                 <div>
                   <p className="text-xs font-bold uppercase text-green-700 mb-1">Compliant</p>
                   <p className="text-2xl font-bold text-green-800">{documents.filter(d => d.status === "Valid").length}</p>
                 </div>
                 <div className="h-8 w-8 rounded-full bg-green-200 flex items-center justify-center text-green-700"><CheckCircle2 size={16} /></div>
               </CardContent>
             </Card>
             <Card className="bg-yellow-50 border-yellow-200">
               <CardContent className="p-4 flex items-center justify-between">
                 <div>
                   <p className="text-xs font-bold uppercase text-yellow-700 mb-1">Expiring Soon</p>
                   <p className="text-2xl font-bold text-yellow-800">{documents.filter(d => d.status === "Expiring Soon").length}</p>
                 </div>
                 <div className="h-8 w-8 rounded-full bg-yellow-200 flex items-center justify-center text-yellow-700"><Clock size={16} /></div>
               </CardContent>
             </Card>
             <Card className="bg-red-50 border-red-200">
               <CardContent className="p-4 flex items-center justify-between">
                 <div>
                   <p className="text-xs font-bold uppercase text-red-700 mb-1">Expired</p>
                   <p className="text-2xl font-bold text-red-800">{documents.filter(d => d.status === "Expired").length}</p>
                 </div>
                 <div className="h-8 w-8 rounded-full bg-red-200 flex items-center justify-center text-red-700"><AlertTriangle size={16} /></div>
               </CardContent>
             </Card>
             <Card className="bg-primary/5 border-primary/20">
               <CardContent className="p-4 flex items-center justify-between">
                 <div>
                   <p className="text-xs font-bold uppercase text-primary mb-1">Total Docs</p>
                   <p className="text-2xl font-bold">{documents.length}</p>
                 </div>
                 <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary"><FileText size={16} /></div>
               </CardContent>
             </Card>
          </div>

          {/* Documents Table */}
          <Card className="shadow-sm">
             <div className="p-4 border-b border-border flex items-center gap-4">
               <div className="relative flex-1 max-w-sm">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                 <Input 
                   placeholder="Search documents..." 
                   className="pl-9" 
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                 />
               </div>
               <div className="flex gap-2">
                 {["All", "Driver", "Truck", "Trip", "Company"].map(cat => (
                   <Button 
                     key={cat} 
                     variant={filter === cat ? "secondary" : "ghost"} 
                     size="sm"
                     onClick={() => setFilter(cat)}
                   >
                     {cat}
                   </Button>
                 ))}
               </div>
               <Button variant="outline" size="sm" className="ml-auto"><Filter className="mr-2 h-4 w-4" /> Filter</Button>
             </div>
             
             {isLoading ? (
               <div className="p-12 flex justify-center"><Loader2 className="animate-spin text-primary" /></div>
             ) : (
             <div className="overflow-x-auto">
               <table className="w-full text-sm text-left">
                 <thead className="bg-secondary/30 text-muted-foreground font-medium border-b border-border">
                   <tr>
                     <th className="px-6 py-4">Document Name</th>
                     <th className="px-6 py-4">Entity</th>
                     <th className="px-6 py-4">Type</th>
                     <th className="px-6 py-4">Expiration</th>
                     <th className="px-6 py-4">Status</th>
                     <th className="px-6 py-4">Category</th>
                     <th className="px-6 py-4"></th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-border">
                   {filteredDocs.map(doc => (
                     <tr key={doc.id} className="hover:bg-secondary/20 transition-colors group">
                       <td className="px-6 py-4 font-bold flex items-center gap-2">
                         <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                           <FileText size={14} />
                         </div>
                         {doc.name}
                       </td>
                       <td className="px-6 py-4">{doc.entity}</td>
                       <td className="px-6 py-4">{doc.type}</td>
                       <td className="px-6 py-4 font-mono text-muted-foreground">{doc.expiry}</td>
                       <td className="px-6 py-4">
                         <Badge variant="outline" className={`
                           ${doc.status === "Valid" ? "border-green-200 bg-green-50 text-green-700" : 
                             doc.status === "Expiring Soon" ? "border-yellow-200 bg-yellow-50 text-yellow-700" : 
                             "border-red-200 bg-red-50 text-red-700"}
                         `}>
                           {doc.status}
                         </Badge>
                       </td>
                       <td className="px-6 py-4">
                          <Badge variant="secondary">{doc.category}</Badge>
                       </td>
                       <td className="px-6 py-4 text-right">
                         <div className="flex items-center justify-end gap-2">
                           <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                             <Download size={16} />
                           </Button>
                           <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => handleDeleteDoc(doc.id)}>
                             <Trash2 size={16} />
                           </Button>
                         </div>
                       </td>
                     </tr>
                   ))}
                   {filteredDocs.length === 0 && (
                     <tr>
                       <td colSpan={7} className="text-center p-8 text-muted-foreground">No documents found</td>
                     </tr>
                   )}
                 </tbody>
               </table>
             </div>
             )}
          </Card>
        </div>
        </main>
      </div>
    </div>
  );
}
