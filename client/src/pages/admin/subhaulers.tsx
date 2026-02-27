import { useState, useEffect } from "react";
import { AdminSidebar, AdminMobileHeader } from "@/components/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Truck, 
  Search, 
  Download, 
  Eye, 
  Phone, 
  Mail, 
  User,
  CheckCircle,
  XCircle,
  Loader2,
  Building2,
  Calendar
} from "lucide-react";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy, doc, updateDoc, serverTimestamp, deleteDoc } from "firebase/firestore";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

import { TruckLoader } from "@/components/TruckLoader";
import { utils, writeFile } from "xlsx";

export default function AdminSubhaulers() {
  const { toast } = useToast();
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  const [selectedReg, setSelectedReg] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!isFirebaseConfigured()) {
      setIsLoading(false);
      return;
    }

    const q = query(collection(db, "subhauler_registrations"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const regs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRegistrations(regs);
      setIsLoading(false);
    }, (error) => {
      console.error("Error fetching registrations:", error);
      toast({
        title: "Error",
        description: "Failed to load registrations.",
        variant: "destructive"
      });
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleStatusUpdate = async (regId: string, newStatus: string) => {
    setIsProcessing(true);
    try {
      if (isFirebaseConfigured()) {
        await updateDoc(doc(db, "subhauler_registrations", regId), {
          status: newStatus,
          updatedAt: serverTimestamp()
        });
      } else {
        // Mock update
        setRegistrations(prev => prev.map(reg => 
          reg.id === regId ? { ...reg, status: newStatus } : reg
        ));
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      toast({
        title: "Status Updated",
        description: `Registration status changed to ${newStatus}.`,
      });
      
      if (selectedReg && selectedReg.id === regId) {
        setSelectedReg({ ...selectedReg, status: newStatus });
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast({
        title: "Error",
        description: "Failed to update status.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async (regId: string) => {
    if (!confirm("Are you sure you want to delete this registration? This cannot be undone.")) return;
    
    setIsProcessing(true);
    try {
      if (isFirebaseConfigured()) {
        await deleteDoc(doc(db, "subhauler_registrations", regId));
      } else {
        setRegistrations(prev => prev.filter(reg => reg.id !== regId));
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      toast({
        title: "Registration Deleted",
        description: "The registration has been removed.",
      });
      setIsDetailsOpen(false);
    } catch (error) {
      console.error("Error deleting registration:", error);
      toast({
        title: "Error",
        description: "Failed to delete registration.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const filteredRegistrations = registrations.filter(reg => {
    const matchesSearch = 
      reg.companyName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reg.contactPerson?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reg.email?.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = statusFilter === "all" || reg.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleExport = () => {
    if (filteredRegistrations.length === 0) {
      toast({
        title: "No Data",
        description: "There is no data to export.",
        variant: "destructive"
      });
      return;
    }

    // Format data for export
    const exportData = filteredRegistrations.map(reg => ({
      "Company Name": reg.companyName,
      "Contact Person": reg.contactPerson,
      "Email": reg.email,
      "Phone": reg.phone,
      "Fleet Size": reg.fleetSize,
      "Truck Types": reg.truckTypes,
      "Status": reg.status,
      "Registered Date": reg.createdAt ? format(new Date(reg.createdAt.seconds * 1000), 'yyyy-MM-dd HH:mm:ss') : 'Unknown'
    }));

    const ws = utils.json_to_sheet(exportData);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Subhaulers");
    
    // Generate filename with timestamp
    const date = new Date().toISOString().split('T')[0];
    writeFile(wb, `Subhauler_Registrations_${date}.csv`, { bookType: "csv" });
    
    toast({
      title: "Export Started",
      description: "Your download should begin shortly."
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "bg-blue-100 text-blue-700 border-blue-200";
      case "reviewed": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "approved": return "bg-green-100 text-green-700 border-green-200";
      case "rejected": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-[var(--border)] text-[var(--text-muted)] border-[var(--border)]";
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminMobileHeader />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-[1600px] mx-auto space-y-6">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black tracking-tight text-[var(--text)] flex items-center gap-3">
                  <Truck className="h-6 w-6 text-[var(--primary)]" />
                  Subhauler Registrations
                </h1>
                <p className="text-sm text-[var(--text-muted)] mt-1">Manage partner carrier applications and fleet details.</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="bg-white hover:bg-[var(--surface-2)] border-[var(--border)]" onClick={handleExport}>
                  <Download className="mr-2 h-4 w-4" /> Export CSV
                </Button>
              </div>
            </div>

            {/* Filters */}
            <Card className="shadow-sm border-[var(--border)]">
              <CardContent className="p-4 flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-[var(--text-muted)]" />
                  <Input 
                    placeholder="Search by company, contact person or email..." 
                    className="pl-9 bg-[var(--surface-2)] border-[var(--border)]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant={statusFilter === "all" ? "default" : "outline"}
                    onClick={() => setStatusFilter("all")}
                    className="h-10"
                  >
                    All
                  </Button>
                  <Button 
                    variant={statusFilter === "new" ? "default" : "outline"}
                    onClick={() => setStatusFilter("new")}
                    className={statusFilter === "new" ? "bg-blue-600 hover:bg-blue-700" : "text-blue-600 hover:bg-blue-50 hover:text-blue-700"}
                  >
                    New
                  </Button>
                  <Button 
                    variant={statusFilter === "approved" ? "default" : "outline"}
                    onClick={() => setStatusFilter("approved")}
                    className={statusFilter === "approved" ? "bg-green-600 hover:bg-green-700" : "text-green-600 hover:bg-green-50 hover:text-green-700"}
                  >
                    Approved
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Registrations Table */}
            <Card className="shadow-sm border-[var(--border)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-[var(--surface-2)]/50 text-[var(--text-muted)] font-semibold border-b border-[var(--border)]">
                    <tr>
                      <th className="px-6 py-4">Company</th>
                      <th className="px-6 py-4">Contact Person</th>
                      <th className="px-6 py-4">Contact Info</th>
                      <th className="px-6 py-4">Fleet Details</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border)] bg-white">
                    {isLoading ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-8">
                          <TruckLoader text="Loading registrations..." size="sm" />
                        </td>
                      </tr>
                    ) : filteredRegistrations.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-8 text-center text-[var(--text-muted)]">
                          No registrations found matching your criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredRegistrations.map((reg) => (
                        <tr key={reg.id} className="hover:bg-[var(--surface-2)]/80 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)]">
                                <Building2 size={20} />
                              </div>
                              <div>
                                <div className="font-bold text-[var(--text)]">{reg.companyName}</div>
                                <div className="text-xs text-[var(--text-muted)]">Applied: {reg.createdAt ? format(new Date(reg.createdAt.seconds * 1000), 'MMM d') : 'N/A'}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-medium text-[var(--text)]">{reg.contactPerson}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-[var(--text-muted)]">
                                <Mail size={12} />
                                {reg.email}
                              </div>
                              <div className="flex items-center gap-2 text-[var(--text-muted)]">
                                <Phone size={12} />
                                {reg.phone}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-1">
                              <div className="text-xs font-semibold text-[var(--text-muted)] bg-[var(--border)] inline-block px-2 py-0.5 rounded">
                                Size: {reg.fleetSize}
                              </div>
                              <div className="text-xs text-[var(--text-muted)] truncate max-w-[150px]" title={reg.truckTypes}>
                                {reg.truckTypes}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <Badge variant="outline" className={`${getStatusColor(reg.status || "new")} capitalize`}>
                              {reg.status || "new"}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Dialog open={isDetailsOpen && selectedReg?.id === reg.id} onOpenChange={(open) => {
                              setIsDetailsOpen(open);
                              if (open) setSelectedReg(reg);
                              else setSelectedReg(null);
                            }}>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/5">
                                  <Eye size={16} className="mr-2" /> View
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col p-0">
                                <DialogHeader className="p-6 pb-2">
                                  <DialogTitle className="text-2xl flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)]">
                                      <Building2 size={20} />
                                    </div>
                                    {reg.companyName}
                                  </DialogTitle>
                                  <DialogDescription>
                                    Subhauler Registration • ID: {reg.id}
                                  </DialogDescription>
                                </DialogHeader>
                                
                                <ScrollArea className="flex-1 p-6 pt-2">
                                  <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                      <h3 className="font-semibold text-[var(--text)] flex items-center gap-2 border-b pb-2">
                                        <User size={16} /> Contact Information
                                      </h3>
                                      <div className="grid gap-3 text-sm">
                                        <div>
                                          <Label className="text-xs text-[var(--text-muted)]">Contact Person</Label>
                                          <p className="font-medium">{reg.contactPerson}</p>
                                        </div>
                                        <div>
                                          <Label className="text-xs text-[var(--text-muted)]">Email Address</Label>
                                          <p className="font-medium flex items-center gap-2">
                                            <Mail size={12} className="text-[var(--text-muted)]" /> 
                                            <a href={`mailto:${reg.email}`} className="text-[var(--primary)] hover:underline">{reg.email}</a>
                                          </p>
                                        </div>
                                        <div>
                                          <Label className="text-xs text-[var(--text-muted)]">Phone Number</Label>
                                          <p className="font-medium flex items-center gap-2">
                                            <Phone size={12} className="text-[var(--text-muted)]" />
                                            <a href={`tel:${reg.phone}`} className="text-[var(--primary)] hover:underline">{reg.phone}</a>
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    
                                    <div className="space-y-4">
                                      <h3 className="font-semibold text-[var(--text)] flex items-center gap-2 border-b pb-2">
                                        <Truck size={16} /> Fleet Details
                                      </h3>
                                      <div className="grid gap-3 text-sm">
                                        <div>
                                          <Label className="text-xs text-[var(--text-muted)]">Fleet Size</Label>
                                          <p className="font-medium">{reg.fleetSize} Trucks</p>
                                        </div>
                                        <div>
                                          <Label className="text-xs text-[var(--text-muted)]">Truck Types</Label>
                                          <p className="font-medium p-2 bg-[var(--surface-2)] rounded border border-[var(--border)] text-[var(--text-muted)]">
                                            {reg.truckTypes}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="mt-8 space-y-4">
                                    <h3 className="font-semibold text-[var(--text)] flex items-center gap-2 border-b pb-2">
                                      <CheckCircle size={16} /> Registration Status
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                      {["new", "reviewed", "approved", "rejected"].map((status) => (
                                        <Button
                                          key={status}
                                          size="sm"
                                          variant={reg.status === status ? "default" : "outline"}
                                          className={`capitalize ${
                                            reg.status === status 
                                              ? (status === 'approved' ? 'bg-green-600' : status === 'rejected' ? 'bg-red-600' : '') 
                                              : ''
                                          }`}
                                          onClick={() => handleStatusUpdate(reg.id, status)}
                                          disabled={isProcessing}
                                        >
                                          {status}
                                        </Button>
                                      ))}
                                    </div>
                                    <div className="pt-4 border-t flex justify-between items-center text-xs text-[var(--text-muted)]">
                                      <span>Registered on {reg.createdAt ? format(new Date(reg.createdAt.seconds * 1000), 'PPP p') : 'Unknown'}</span>
                                      <Button 
                                        variant="ghost" 
                                        size="sm" 
                                        className="text-red-500 hover:text-red-600 hover:bg-red-50 h-8"
                                        onClick={() => handleDelete(reg.id)}
                                      >
                                        <XCircle size={14} className="mr-1" /> Delete Registration
                                      </Button>
                                    </div>
                                  </div>
                                </ScrollArea>
                              </DialogContent>
                            </Dialog>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
