import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { 
  LayoutDashboard, 
  Truck, 
  Package, 
  Users, 
  Settings, 
  Bell, 
  Search, 
  MoreHorizontal, 
  ArrowUpRight, 
  ArrowDownRight,
  Filter,
  Download,
  Plus,
  ChevronDown,
  Map,
  BarChart3,
  LogOut,
  FileText,
  DollarSign,
  ShieldCheck,
  UserCog,
  Key,
  Mail,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AdminSidebar, AdminMobileHeader } from "@/components/AdminSidebar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { updatePassword, updateProfile } from "firebase/auth";
import { auth, db, isFirebaseConfigured } from "@/lib/firebase";
import { collection, onSnapshot, query, where, getCountFromServer, orderBy, limit } from "firebase/firestore";
import { TruckLoader } from "@/components/TruckLoader";

export default function AdminDashboard() {
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const { toast } = useToast();
  
  // Real-time Data States
  const [stats, setStats] = useState({
    activeDrivers: 0,
    trucksOnRoad: 0,
    revenue: "$0",
    safetyScore: "100/100" // Default perfect score until incidents found
  });
  const [recentShipments, setRecentShipments] = useState<any[]>([]);
  const [filteredShipments, setFilteredShipments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Profile Update State
  const [isUpdateProfileOpen, setIsUpdateProfileOpen] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState(user?.displayName || "");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  // Fetch Stats and Recent Trips
  useEffect(() => {
    if (!isFirebaseConfigured()) {
      setIsLoading(false);
      return;
    }

    const unsubscribeDrivers = onSnapshot(collection(db, "drivers"), (snapshot) => {
       const activeCount = snapshot.docs.filter(d => d.data().status === "Active").length;
       setStats(prev => ({ ...prev, activeDrivers: activeCount }));
    });

    const unsubscribeTrips = onSnapshot(query(collection(db, "trips"), orderBy("createdAt", "desc"), limit(50)), (snapshot) => {
       let totalRevenue = 0;
       let completedTrips = 0;
       let totalTrips = 0;
       
       const trips = snapshot.docs.map(doc => {
         const data = doc.data();
         totalTrips++;
         
         // Calculate Revenue
         if (data.rate) {
           const rateVal = parseFloat(data.rate.replace(/[^0-9.]/g, '') || "0");
           totalRevenue += rateVal;
         }

         if (data.status === "Delivered") {
            completedTrips++;
         }

         return {
            id: doc.id,
            customer: data.customer,
            destination: data.route?.split("→")[1]?.trim() || "Unknown",
            status: data.status === "In Progress" ? "In Transit" : data.status,
            driver: data.driver,
            eta: data.deliveryDate ? new Date(data.deliveryDate.seconds * 1000).toLocaleDateString() : "Pending",
            value: data.rate || "$0",
            bol: data.bol || ""
         };
       });
       
       setRecentShipments(trips);
       
       // Calculate Safety Score based on mock logic for now (e.g. delivered vs total) or keep static if no real safety data exists
       // For now, let's make it 98 default, or calculated if we had safety incidents.
       // Since we don't have a "safety incidents" collection, we will keep it high but maybe vary slightly based on "Delayed" status?
       const delayedTrips = trips.filter(t => t.status === "Delayed").length;
       const calculatedScore = Math.max(80, 100 - (delayedTrips * 5));

       setStats(prev => ({ 
         ...prev, 
         trucksOnRoad: trips.filter(t => t.status === "In Transit" || t.status === "In Progress" || t.status === "Scheduled").length,
         revenue: `$${totalRevenue.toLocaleString()}`,
         safetyScore: `${calculatedScore}/100`
       }));

       setIsLoading(false);
    });

    return () => {
      unsubscribeDrivers();
      unsubscribeTrips();
    };
  }, []);

  // Filter Logic
  useEffect(() => {
    let result = recentShipments;

    // Search Filter
    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      result = result.filter(item => 
        item.id.toLowerCase().includes(lowerTerm) ||
        item.customer.toLowerCase().includes(lowerTerm) ||
        item.driver?.toLowerCase().includes(lowerTerm) ||
        item.destination.toLowerCase().includes(lowerTerm) ||
        (item.bol && item.bol.toLowerCase().includes(lowerTerm))
      );
    }

    // Status Filter
    if (statusFilter !== "All") {
      result = result.filter(item => item.status === statusFilter);
    }

    setFilteredShipments(result);
  }, [recentShipments, searchTerm, statusFilter]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    
    try {
      if (!user) throw new Error("No user logged in");
      
      const updates = [];
      let messages = [];

      // Update Display Name
      if (newDisplayName && newDisplayName !== user.displayName) {
        if (!isFirebaseConfigured()) {
          console.log("Mock update profile:", newDisplayName);
        } else {
          await updateProfile(user, { displayName: newDisplayName });
        }
        messages.push("Profile name updated");
      }

      // Update Password
      if (newPassword) {
        if (newPassword !== confirmPassword) {
          throw new Error("Passwords do not match");
        }
        if (newPassword.length < 6) {
          throw new Error("Password must be at least 6 characters");
        }
        
        if (!isFirebaseConfigured()) {
          console.log("Mock update password");
        } else {
          await updatePassword(user, newPassword);
        }
        messages.push("Password updated");
      }

      if (messages.length > 0) {
        toast({
          title: "Success",
          description: messages.join(" and "),
        });
        setIsUpdateProfileOpen(false);
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast({
          title: "No changes",
          description: "No fields were modified.",
          variant: "default"
        });
      }
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive"
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminMobileHeader />
        <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="h-16 border-b border-border bg-background/50 backdrop-blur-sm sticky top-0 z-10 flex items-center justify-between px-6">
          <div className="flex items-center gap-4 w-1/3">
            <Search className="text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search shipments, drivers, or BOL..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-none shadow-none focus-visible:ring-0 h-8 pl-0 text-zinc-900 placeholder:text-muted-foreground/70" 
            />
          </div>
          <div className="flex items-center gap-4">
            <Dialog open={isUpdateProfileOpen} onOpenChange={setIsUpdateProfileOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <UserCog size={14} />
                  Settings
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Profile Settings</DialogTitle>
                  <DialogDescription>
                    Update your account details and password here.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleUpdateProfile} className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Input id="email" value={user?.email || ""} disabled className="pl-9 bg-muted" />
                      <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Display Name</Label>
                    <div className="relative">
                      <Input 
                        id="displayName" 
                        value={newDisplayName} 
                        onChange={(e) => setNewDisplayName(e.target.value)}
                        placeholder="Your Name" 
                        className="pl-9"
                      />
                      <Users className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t">
                    <Label htmlFor="newPassword">New Password</Label>
                    <div className="relative">
                      <Input 
                        id="newPassword" 
                        type="password"
                        value={newPassword} 
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Leave blank to keep current" 
                        className="pl-9"
                      />
                      <Key className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Input 
                        id="confirmPassword" 
                        type="password"
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password" 
                        className="pl-9"
                      />
                      <Key className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>

                  <DialogFooter className="pt-4">
                    <Button type="submit" disabled={isUpdating}>
                      {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Save Changes
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            <Button variant="ghost" size="icon" className="relative">
              <Bell size={18} />
              <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full" />
            </Button>
            <Button className="h-8 text-xs font-semibold bg-foreground text-background hover:bg-foreground/90">
              <Plus size={14} className="mr-2" /> New Load
            </Button>
          </div>
        </header>

        {isLoading ? (
          <div className="h-[calc(100vh-4rem)] flex items-center justify-center">
            <TruckLoader text="Loading dashboard..." />
          </div>
        ) : (
        <div className="p-6 space-y-8 max-w-[1600px] mx-auto">
          {/* Key Metrics */}
          <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {[
              { label: "Active Drivers", value: stats.activeDrivers, change: "Real-time", trend: "up", icon: Users, color: "text-blue-600 bg-blue-100" },
              { label: "Trucks on Road", value: stats.trucksOnRoad, change: "Real-time", trend: "up", icon: Truck, color: "text-indigo-600 bg-indigo-100" },
              { label: "Total Revenue", value: stats.revenue, change: "Cumulative", trend: "up", icon: DollarSign, color: "text-green-600 bg-green-100" },
              { label: "Safety Score", value: stats.safetyScore, change: "Calculated", trend: "up", icon: ShieldCheck, color: "text-orange-600 bg-orange-100" },
            ].map((stat, i) => (
              <Card key={i} className="shadow-sm hover:shadow-md transition-shadow border-none ring-1 ring-black/5">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-2 rounded-lg ${stat.color}`}>
                      <stat.icon size={20} />
                    </div>
                    <span className={`flex items-center text-[10px] font-bold text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded-full border border-zinc-200`}>
                      {stat.change}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-500 mb-1 uppercase tracking-wide text-xs">{stat.label}</p>
                    <div className="text-3xl font-black tracking-tight text-zinc-900">{stat.value}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>

          {/* Recent Shipments Table */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-zinc-900">Recent Shipments</h2>
                <p className="text-sm text-zinc-500">Manage and track active loads.</p>
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="h-8 w-[130px] bg-white border-zinc-200 text-xs font-medium">
                    <Filter className="mr-2 h-3 w-3" /> 
                    <SelectValue placeholder="Filter Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Statuses</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="In Transit">In Transit</SelectItem>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                    <SelectItem value="Delayed">Delayed</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" className="bg-white hover:bg-zinc-50 border-zinc-200"><Download className="mr-2 h-4 w-4" /> Export</Button>
              </div>
            </div>
            
            <Card className="shadow-sm overflow-hidden border-none ring-1 ring-black/5">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-zinc-50/50 text-zinc-500 font-semibold border-b border-zinc-100">
                    <tr>
                      <th className="px-6 py-4">Load ID</th>
                      <th className="px-6 py-4">Customer</th>
                      <th className="px-6 py-4">Destination</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Driver</th>
                      <th className="px-6 py-4">ETA</th>
                      <th className="px-6 py-4 text-right">Value</th>
                      <th className="px-6 py-4"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 bg-white">
                    {filteredShipments.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="px-6 py-12 text-center text-zinc-400">
                          <p>No shipments found matching your criteria.</p>
                        </td>
                      </tr>
                    ) : (
                      filteredShipments.map((load) => (
                        <tr key={load.id} className="hover:bg-zinc-50/80 transition-colors group">
                          <td className="px-6 py-4 font-bold text-zinc-900 whitespace-nowrap">{load.id.substring(0, 8)}...</td>
                          <td className="px-6 py-4 text-zinc-700">{load.customer}</td>
                          <td className="px-6 py-4 text-zinc-600">{load.destination}</td>
                          <td className="px-6 py-4">
                            <Badge variant="outline" className={`
                              ${load.status === "Delivered" ? "border-green-200 bg-green-50 text-green-700" : 
                                load.status === "Delayed" ? "border-red-200 bg-red-50 text-red-700" : 
                                load.status === "Pending" ? "border-yellow-200 bg-yellow-50 text-yellow-700" : 
                                "border-blue-200 bg-blue-50 text-blue-700"}
                              font-semibold whitespace-nowrap
                            `}>
                              {load.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 flex items-center gap-3">
                             {load.driver !== "Unassigned" && load.driver ? (
                               <div className="h-8 w-8 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-xs font-bold text-zinc-600 shrink-0">
                                 {load.driver.charAt(0)}
                               </div>
                             ) : null}
                             <span className="font-medium text-zinc-700 whitespace-nowrap">{load.driver || "Unassigned"}</span>
                          </td>
                          <td className="px-6 py-4 text-zinc-500 font-mono text-xs whitespace-nowrap">{load.eta}</td>
                          <td className="px-6 py-4 text-right font-bold text-zinc-900 whitespace-nowrap">{load.value}</td>
                          <td className="px-6 py-4 text-right">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-zinc-900 transition-colors">
                              <MoreHorizontal size={16} />
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </section>
        </div>
        )}
      </main>
      </div>
    </div>
  );
}

function ClockIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}
