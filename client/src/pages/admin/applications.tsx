import { useState, useEffect } from "react";
import { AdminSidebar, AdminMobileHeader } from "@/components/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Briefcase, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  MoreHorizontal, 
  Phone, 
  Mail, 
  FileText,
  User,
  Calendar,
  CheckCircle,
  XCircle,
  Loader2
} from "lucide-react";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy, doc, updateDoc, serverTimestamp, deleteDoc } from "firebase/firestore";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

import { TruckLoader } from "@/components/TruckLoader";
import { utils, writeFile } from "xlsx";

// Mock data for fallback
const mockApplications = [
  {
    id: "app_001",
    firstName: "Michael",
    lastName: "Chen",
    email: "m.chen@example.com",
    phone: "(555) 123-4567",
    experience: "5+ years",
    license: "DL12345678",
    status: "new",
    createdAt: { seconds: 1675234567 },
    hasResume: true,
    resumeFileName: "resume_chen.pdf"
  },
  {
    id: "app_002",
    firstName: "Sarah",
    lastName: "Williams",
    email: "s.williams@example.com",
    phone: "(555) 987-6543",
    experience: "3-5 years",
    license: "DL87654321",
    status: "reviewed",
    createdAt: { seconds: 1674234567 },
    hasResume: false
  },
  {
    id: "app_003",
    firstName: "David",
    lastName: "Rodriguez",
    email: "d.rodriguez@example.com",
    phone: "(555) 456-7890",
    experience: "1-3 years",
    license: "DL45678901",
    status: "interviewed",
    createdAt: { seconds: 1673234567 },
    hasResume: true,
    resumeFileName: "david_r_resume.pdf"
  }
];

export default function AdminApplications() {
  const { toast } = useToast();
  const [applications, setApplications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!isFirebaseConfigured()) {
      setApplications(mockApplications);
      setIsLoading(false);
      return;
    }

    // Updated to query driver_applications collection
    const q = query(collection(db, "driver_applications"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const apps = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          // Map fields for backward compatibility/UI display if needed
          license: data.cdlNumber || data.license,
          hasResume: !!(data.resumePath || data.resumeUrl || data.resumeFileName)
        };
      });
      setApplications(apps);
      setIsLoading(false);
    }, (error) => {
      console.error("Error fetching applications:", error);
      toast({
        title: "Error",
        description: "Failed to load applications. Showing mock data.",
        variant: "destructive"
      });
      setApplications(mockApplications);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleStatusUpdate = async (appId: string, newStatus: string) => {
    setIsProcessing(true);
    try {
      if (isFirebaseConfigured()) {
        await updateDoc(doc(db, "driver_applications", appId), {
          status: newStatus,
          updatedAt: serverTimestamp()
        });
      } else {
        // Mock update
        setApplications(prev => prev.map(app => 
          app.id === appId ? { ...app, status: newStatus } : app
        ));
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      toast({
        title: "Status Updated",
        description: `Application status changed to ${newStatus}.`,
      });
      
      // Update local state for the modal
      if (selectedApp && selectedApp.id === appId) {
        setSelectedApp({ ...selectedApp, status: newStatus });
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

  const handleDelete = async (appId: string) => {
    if (!confirm("Are you sure you want to delete this application? This cannot be undone.")) return;
    
    setIsProcessing(true);
    try {
      if (isFirebaseConfigured()) {
        await deleteDoc(doc(db, "driver_applications", appId));
      } else {
        setApplications(prev => prev.filter(app => app.id !== appId));
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      toast({
        title: "Application Deleted",
        description: "The application has been removed.",
      });
      setIsDetailsOpen(false);
    } catch (error) {
      console.error("Error deleting application:", error);
      toast({
        title: "Error",
        description: "Failed to delete application.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email?.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleExport = () => {
    if (filteredApplications.length === 0) {
      toast({
        title: "No Data",
        description: "There is no data to export.",
        variant: "destructive"
      });
      return;
    }

    // Format data for export
    const exportData = filteredApplications.map(app => ({
      "First Name": app.firstName,
      "Last Name": app.lastName,
      "Email": app.email,
      "Phone": app.phone,
      "Experience": app.yearsCommercialDriving || app.experience,
      "CDL/License": app.license || "Not provided",
      "Status": app.status,
      "Has Resume": app.hasResume ? "Yes" : "No",
      "Applied Date": app.createdAt ? format(new Date(app.createdAt.seconds * 1000), 'yyyy-MM-dd HH:mm:ss') : 'Unknown'
    }));

    const ws = utils.json_to_sheet(exportData);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Applications");
    
    // Generate filename with timestamp
    const date = new Date().toISOString().split('T')[0];
    writeFile(wb, `Driver_Applications_${date}.csv`, { bookType: "csv" });
    
    toast({
      title: "Export Started",
      description: "Your download should begin shortly."
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "bg-blue-100 text-blue-700 border-blue-200";
      case "reviewed": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "interviewed": return "bg-purple-100 text-purple-700 border-purple-200";
      case "hired": return "bg-green-100 text-green-700 border-green-200";
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
                <h3 className="text-2xl font-black tracking-tight text-[var(--text)] flex items-center gap-3">
                  <Briefcase className="h-6 w-6 text-[var(--primary)]" />
                  Driver Applications
                </h3>
                <p className="text-sm text-[var(--text-muted)] mt-1">Manage job applications and candidate pipeline.</p>
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
                    placeholder="Search candidates by name or email..." 
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
                    variant={statusFilter === "hired" ? "default" : "outline"}
                    onClick={() => setStatusFilter("hired")}
                    className={statusFilter === "hired" ? "bg-green-600 hover:bg-green-700" : "text-green-600 hover:bg-green-50 hover:text-green-700"}
                  >
                    Hired
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Applications Table */}
            <Card className="shadow-sm border-[var(--border)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-[var(--surface-2)]/50 text-[var(--text-muted)] font-semibold border-b border-[var(--border)]">
                    <tr>
                      <th className="px-6 py-4">Candidate</th>
                      <th className="px-6 py-4">Contact</th>
                      <th className="px-6 py-4">Applied Date</th>
                      <th className="px-6 py-4">Experience</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border)] bg-white">
                    {isLoading ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-8">
                          <TruckLoader text="Loading applications..." size="sm" />
                        </td>
                      </tr>
                    ) : filteredApplications.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-8 text-center text-[var(--text-muted)]">
                          No applications found matching your criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredApplications.map((app) => (
                        <tr key={app.id} className="hover:bg-[var(--surface-2)]/80 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] font-bold">
                                {app.firstName?.charAt(0)}{app.lastName?.charAt(0)}
                              </div>
                              <div>
                                <div className="font-bold text-[var(--text)]">{app.firstName} {app.lastName}</div>
                                {app.hasResume && (
                                  <div className="flex items-center gap-1 text-xs text-blue-600 mt-0.5">
                                    <FileText size={10} />
                                    <span>Resume Attached</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-[var(--text-muted)]">
                                <Mail size={12} />
                                {app.email}
                              </div>
                              <div className="flex items-center gap-2 text-[var(--text-muted)]">
                                <Phone size={12} />
                                {app.phone}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-[var(--text-muted)]">
                            {app.createdAt ? format(new Date(app.createdAt.seconds * 1000), 'MMM d, yyyy') : 'N/A'}
                          </td>
                          <td className="px-6 py-4 text-[var(--text-muted)]">
                            {app.yearsCommercialDriving || app.experience}
                          </td>
                          <td className="px-6 py-4">
                            <Badge variant="outline" className={`${getStatusColor(app.status || "new")} capitalize`}>
                              {app.status || "new"}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Dialog open={isDetailsOpen && selectedApp?.id === app.id} onOpenChange={(open) => {
                              setIsDetailsOpen(open);
                              if (open) setSelectedApp(app);
                              else setSelectedApp(null);
                            }}>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/5">
                                  <Eye size={16} className="mr-2" /> View
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col p-0">
                                <DialogHeader className="p-6 pb-2">
                                  <DialogTitle className="text-2xl flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] text-base">
                                      {app.firstName?.charAt(0)}{app.lastName?.charAt(0)}
                                    </div>
                                    {app.firstName} {app.lastName}
                                  </DialogTitle>
                                  <DialogDescription>
                                    Application Details • ID: {app.id}
                                  </DialogDescription>
                                </DialogHeader>
                                
                                <ScrollArea className="flex-1 p-6 pt-2">
                                  <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                      <h3 className="font-semibold text-[var(--text)] flex items-center gap-2 border-b pb-2">
                                        <User size={16} /> Personal Information
                                      </h3>
                                      <div className="grid gap-3 text-sm">
                                        <div>
                                          <Label className="text-xs text-[var(--text-muted)]">Full Name</Label>
                                          <p className="font-medium">{app.firstName} {app.lastName}</p>
                                        </div>
                                        <div>
                                          <Label className="text-xs text-[var(--text-muted)]">Email Address</Label>
                                          <p className="font-medium flex items-center gap-2">
                                            <Mail size={12} className="text-[var(--text-muted)]" /> 
                                            <a href={`mailto:${app.email}`} className="text-[var(--primary)] hover:underline">{app.email}</a>
                                          </p>
                                        </div>
                                        <div>
                                          <Label className="text-xs text-[var(--text-muted)]">Phone Number</Label>
                                          <p className="font-medium flex items-center gap-2">
                                            <Phone size={12} className="text-[var(--text-muted)]" />
                                            <a href={`tel:${app.phone}`} className="text-[var(--primary)] hover:underline">{app.phone}</a>
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    
                                    <div className="space-y-4">
                                      <h3 className="font-semibold text-[var(--text)] flex items-center gap-2 border-b pb-2">
                                        <Briefcase size={16} /> Professional Details
                                      </h3>
                                      <div className="grid gap-3 text-sm">
                                        <div>
                                          <Label className="text-xs text-[var(--text-muted)]">Experience</Label>
                                          <p className="font-medium">{app.yearsCommercialDriving || app.experience}</p>
                                        </div>
                                        <div>
                                          <Label className="text-xs text-[var(--text-muted)]">CDL Number</Label>
                                          <p className="font-medium font-mono bg-[var(--surface-2)] inline-block px-2 py-1 rounded border border-[var(--border)]">
                                            {app.license || "Not provided"}
                                          </p>
                                        </div>
                                        <div>
                                          <Label className="text-xs text-[var(--text-muted)]">Resume</Label>
                                          {app.hasResume ? (
                                            <div className="flex items-center gap-2 mt-1 p-2 bg-blue-50 text-blue-700 rounded-md border border-blue-100 text-xs font-medium">
                                              <FileText size={14} />
                                              <span className="truncate max-w-[150px]">{app.resumeFileName || "resume.pdf"}</span>
                                              <Button size="sm" variant="ghost" className="h-6 px-2 ml-auto text-blue-700 hover:text-blue-900 hover:bg-blue-100">
                                                Download
                                              </Button>
                                            </div>
                                          ) : (
                                            <p className="text-[var(--text-muted)] italic">No resume uploaded</p>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="mt-8 space-y-4">
                                    <h3 className="font-semibold text-[var(--text)] flex items-center gap-2 border-b pb-2">
                                      <CheckCircle size={16} /> Application Status
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                      {["new", "reviewed", "interviewed", "hired", "rejected"].map((status) => (
                                        <Button
                                          key={status}
                                          size="sm"
                                          variant={app.status === status ? "default" : "outline"}
                                          className={`capitalize ${
                                            app.status === status 
                                              ? (status === 'hired' ? 'bg-green-600' : status === 'rejected' ? 'bg-red-600' : '') 
                                              : ''
                                          }`}
                                          onClick={() => handleStatusUpdate(app.id, status)}
                                          disabled={isProcessing}
                                        >
                                          {status}
                                        </Button>
                                      ))}
                                    </div>
                                    <div className="pt-4 border-t flex justify-between items-center text-xs text-[var(--text-muted)]">
                                      <span>Applied on {app.createdAt ? format(new Date(app.createdAt.seconds * 1000), 'PPP p') : 'Unknown'}</span>
                                      <Button 
                                        variant="ghost" 
                                        size="sm" 
                                        className="text-red-500 hover:text-red-600 hover:bg-red-50 h-8"
                                        onClick={() => handleDelete(app.id)}
                                      >
                                        <XCircle size={14} className="mr-1" /> Delete Application
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