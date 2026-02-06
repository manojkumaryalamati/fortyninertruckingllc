import { useState } from "react";
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
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock Documents Data
const initialDocs = [
  { id: "DOC-101", name: "CDL License - M. Rodriguez", type: "Driver License", entity: "Michael Rodriguez", expiry: "Mar 15, 2026", status: "Valid", category: "Driver" },
  { id: "DOC-102", name: "Medical Card - S. Jenkins", type: "Medical Cert", entity: "Sarah Jenkins", expiry: "Feb 28, 2026", status: "Expiring Soon", category: "Driver" },
  { id: "DOC-103", name: "Registration - TRK-409", type: "Vehicle Reg", entity: "TRK-409", expiry: "Jun 30, 2026", status: "Valid", category: "Truck" },
  { id: "DOC-104", name: "Insurance Cert - Fleet", type: "Insurance", entity: "All Fleet", expiry: "Jan 01, 2027", status: "Valid", category: "Company" },
  { id: "DOC-105", name: "IFTA Permit 2025", type: "Permit", entity: "TRK-205", expiry: "Dec 31, 2025", status: "Expired", category: "Truck" },
  { id: "DOC-106", name: "CDL License - D. Chen", type: "Driver License", entity: "David Chen", expiry: "Apr 10, 2026", status: "Valid", category: "Driver" },
];

export default function DocumentsCenter() {
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const [documents, setDocuments] = useState(initialDocs);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const filteredDocs = documents.filter(doc => {
    const matchesFilter = filter === "All" || doc.category === filter;
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doc.entity.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newDoc = {
      id: `DOC-${Math.floor(Math.random() * 900) + 100}`,
      name: formData.get("fileName") as string,
      type: formData.get("docType") as string,
      entity: formData.get("entity") as string,
      expiry: new Date(formData.get("expiry") as string).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      status: "Valid",
      category: formData.get("category") as string
    };
    setDocuments([newDoc, ...documents]);
    setIsUploadModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card hidden md:flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b border-border">
          <Link href="/admin">
            <div className="flex items-center gap-2 font-bold text-xl tracking-tight cursor-pointer">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">49</div>
              <span>Admin</span>
            </div>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <Link href="/admin">
            <Button variant={location === "/admin" ? "secondary" : "ghost"} className="w-full justify-start gap-3 mb-1">
              <LayoutDashboard size={18} /> Overview
            </Button>
          </Link>
          <Link href="/admin/trips">
            <Button variant={location === "/admin/trips" ? "secondary" : "ghost"} className="w-full justify-start gap-3 mb-1">
              <Package size={18} /> Trips & Loads
            </Button>
          </Link>
          <Link href="/admin/trucks">
            <Button variant={location === "/admin/trucks" ? "secondary" : "ghost"} className="w-full justify-start gap-3 mb-1">
              <Truck size={18} /> Fleet Management
            </Button>
          </Link>
          <Link href="/admin/drivers">
            <Button variant={location === "/admin/drivers" ? "secondary" : "ghost"} className="w-full justify-start gap-3 mb-1">
              <Users size={18} /> Drivers
            </Button>
          </Link>
          <Link href="/admin/documents">
            <Button variant="secondary" className="w-full justify-start gap-3 mb-1 font-bold">
              <FileText size={18} /> Documents
            </Button>
          </Link>
          <Button variant="ghost" className="w-full justify-start gap-3 mb-1">
            <BarChart3 size={18} /> Analytics
          </Button>
        </nav>

        <div className="p-4 border-t border-border">
          <Button variant="ghost" className="w-full justify-start gap-3 mb-2">
            <Settings size={18} /> Settings
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 mb-4"
            onClick={logout}
          >
            <LogOut size={18} /> Logout
          </Button>
          
          <div className="flex items-center gap-3 px-2 pt-2 border-t border-border">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-sm overflow-hidden">
              <span className="font-semibold truncate">{user?.name || "Admin User"}</span>
              <span className="text-muted-foreground text-xs truncate" title={user?.email}>{user?.email || "admin@49trucking.com"}</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
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
                       <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:bg-secondary/50 transition-colors cursor-pointer">
                         <Upload className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
                         <p className="text-sm font-medium">Drag & Drop or Click to Upload</p>
                         <p className="text-xs text-muted-foreground mt-1">Supported: PDF, JPG, PNG (Max 15MB)</p>
                       </div>
                     </div>

                     <DialogFooter>
                       <Button type="button" variant="outline" onClick={() => setIsUploadModalOpen(false)}>Cancel</Button>
                       <Button type="submit">Upload & Save</Button>
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
                   <p className="text-2xl font-bold text-green-800">42</p>
                 </div>
                 <div className="h-8 w-8 rounded-full bg-green-200 flex items-center justify-center text-green-700"><CheckCircle2 size={16} /></div>
               </CardContent>
             </Card>
             <Card className="bg-yellow-50 border-yellow-200">
               <CardContent className="p-4 flex items-center justify-between">
                 <div>
                   <p className="text-xs font-bold uppercase text-yellow-700 mb-1">Expiring Soon</p>
                   <p className="text-2xl font-bold text-yellow-800">5</p>
                 </div>
                 <div className="h-8 w-8 rounded-full bg-yellow-200 flex items-center justify-center text-yellow-700"><Clock size={16} /></div>
               </CardContent>
             </Card>
             <Card className="bg-red-50 border-red-200">
               <CardContent className="p-4 flex items-center justify-between">
                 <div>
                   <p className="text-xs font-bold uppercase text-red-700 mb-1">Expired</p>
                   <p className="text-2xl font-bold text-red-800">1</p>
                 </div>
                 <div className="h-8 w-8 rounded-full bg-red-200 flex items-center justify-center text-red-700"><AlertTriangle size={16} /></div>
               </CardContent>
             </Card>
             <Card className="bg-primary/5 border-primary/20">
               <CardContent className="p-4 flex items-center justify-between">
                 <div>
                   <p className="text-xs font-bold uppercase text-primary mb-1">Total Docs</p>
                   <p className="text-2xl font-bold">48</p>
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
                     <tr key={doc.id} className="hover:bg-secondary/20 transition-colors">
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
                           <Button variant="ghost" size="icon" className="h-8 w-8">
                             <Download size={16} />
                           </Button>
                           <Button variant="ghost" size="icon" className="h-8 w-8">
                             <MoreVertical size={16} />
                           </Button>
                         </div>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
