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
import { collection, onSnapshot, query, where, getCountFromServer } from "firebase/firestore";

// Mock Data for Charts
const weeklyData = [
  { name: "Mon", value: 12400 },
  { name: "Tue", value: 14200 },
  { name: "Wed", value: 11800 },
  { name: "Thu", value: 15600 },
  { name: "Fri", value: 18900 },
  { name: "Sat", value: 16400 },
  { name: "Sun", value: 13200 },
];

const monthlyData = [
  { name: "Week 1", value: 45000 },
  { name: "Week 2", value: 52000 },
  { name: "Week 3", value: 48000 },
  { name: "Week 4", value: 61000 },
];

const quarterlyData = [
  { name: "Jan", value: 180000 },
  { name: "Feb", value: 210000 },
  { name: "Mar", value: 195000 },
];

const yearlyData = [
  { name: "Jan", value: 180000 },
  { name: "Feb", value: 210000 },
  { name: "Mar", value: 195000 },
  { name: "Apr", value: 230000 },
  { name: "May", value: 245000 },
  { name: "Jun", value: 215000 },
  { name: "Jul", value: 260000 },
  { name: "Aug", value: 280000 },
  { name: "Sep", value: 250000 },
  { name: "Oct", value: 290000 },
  { name: "Nov", value: 310000 },
  { name: "Dec", value: 340000 },
];

const revenueDataMap = {
  weekly: weeklyData,
  monthly: monthlyData,
  quarterly: quarterlyData,
  yearly: yearlyData,
};

// Mock Data for Table (Fallback)
const mockShipments = [
  { id: "FT-9281", customer: "Tesla Gigafactory", destination: "Austin, TX", status: "In Transit", driver: "M. Rodriguez", eta: "2h 15m", value: "$4,200" },
  { id: "FT-9282", customer: "Amazon fulfillment", destination: "Reno, NV", status: "Delivered", driver: "J. Smith", eta: "Arrived", value: "$1,850" },
  { id: "FT-9283", customer: "Home Depot HQ", destination: "Atlanta, GA", status: "Pending", driver: "Unassigned", eta: "Tom. 8am", value: "$3,100" },
  { id: "FT-9284", customer: "Costco Wholesale", destination: "Seattle, WA", status: "In Transit", driver: "K. Johnson", eta: "4h 30m", value: "$2,900" },
  { id: "FT-9285", customer: "Walmart DC", destination: "Phoenix, AZ", status: "Delayed", driver: "B. Davis", eta: "+2h Delay", value: "$2,100" },
];

export default function AdminDashboard() {
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [revenueFilter, setRevenueFilter] = useState<keyof typeof revenueDataMap>("weekly");
  
  // Real-time Data States
  const [stats, setStats] = useState({
    activeDrivers: 42,
    trucksOnRoad: 38,
    revenue: "$12,450",
    safetyScore: "98/100"
  });
  const [recentShipments, setRecentShipments] = useState(mockShipments);
  const [isLoading, setIsLoading] = useState(true);

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

    // Subscribe to Drivers count
    const unsubscribeDrivers = onSnapshot(collection(db, "drivers"), (snapshot) => {
       const activeCount = snapshot.docs.filter(d => d.data().status === "Active").length;
       setStats(prev => ({ ...prev, activeDrivers: activeCount || 42 })); // Fallback to mock if 0 for demo visual
    });

    // Subscribe to Trips
    const unsubscribeTrips = onSnapshot(collection(db, "trips"), (snapshot) => {
       const trips = snapshot.docs.map(doc => {
         const data = doc.data();
         return {
            id: doc.id,
            customer: data.customer,
            destination: data.route?.split("→")[1]?.trim() || "Unknown",
            status: data.status === "In Progress" ? "In Transit" : data.status,
            driver: data.driver,
            eta: "Unknown", // Would need real tracking for this
            value: data.rate
         };
       });
       
       if (trips.length > 0) {
         setRecentShipments(trips.slice(0, 5));
         setStats(prev => ({ 
           ...prev, 
           trucksOnRoad: trips.filter(t => t.status === "In Transit" || t.status === "In Progress").length 
         }));
       }
       setIsLoading(false);
    });

    return () => {
      unsubscribeDrivers();
      unsubscribeTrips();
    };
  }, []);

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
          // Mock update
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

        <div className="p-6 space-y-8 max-w-[1600px] mx-auto">
          {/* Key Metrics */}
          <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {[
              { label: "Active Drivers", value: stats.activeDrivers, change: "+2", trend: "up", icon: Users, color: "text-blue-600 bg-blue-100" },
              { label: "Trucks on Road", value: stats.trucksOnRoad, change: "-1", trend: "down", icon: Truck, color: "text-indigo-600 bg-indigo-100" },
              { label: "Today's Revenue", value: stats.revenue, change: "+15%", trend: "up", icon: DollarSign, color: "text-green-600 bg-green-100" },
              { label: "Safety Score", value: stats.safetyScore, change: "+1", trend: "up", icon: ShieldCheck, color: "text-orange-600 bg-orange-100" },
            ].map((stat, i) => (
              <Card key={i} className="shadow-sm hover:shadow-md transition-shadow border-none ring-1 ring-black/5">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-2 rounded-lg ${stat.color}`}>
                      <stat.icon size={20} />
                    </div>
                    <span className={`flex items-center text-xs font-bold ${stat.trend === "up" ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"} px-2.5 py-1 rounded-full border ${stat.trend === "up" ? "border-green-100" : "border-red-100"}`}>
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
                <Button variant="outline" size="sm" className="bg-white hover:bg-zinc-50 border-zinc-200"><Filter className="mr-2 h-4 w-4" /> Filter</Button>
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
                    {recentShipments.map((load) => (
                      <tr key={load.id} className="hover:bg-zinc-50/80 transition-colors group">
                        <td className="px-6 py-4 font-bold text-zinc-900">{load.id.substring(0, 8)}...</td>
                        <td className="px-6 py-4 text-zinc-700">{load.customer}</td>
                        <td className="px-6 py-4 text-zinc-600">{load.destination}</td>
                        <td className="px-6 py-4">
                          <Badge variant="outline" className={`
                            ${load.status === "Delivered" ? "border-green-200 bg-green-50 text-green-700" : 
                              load.status === "Delayed" ? "border-red-200 bg-red-50 text-red-700" : 
                              load.status === "Pending" ? "border-yellow-200 bg-yellow-50 text-yellow-700" : 
                              "border-blue-200 bg-blue-50 text-blue-700"}
                            font-semibold
                          `}>
                            {load.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 flex items-center gap-3">
                           {load.driver !== "Unassigned" && <div className="h-8 w-8 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-xs font-bold text-zinc-600">{load.driver ? load.driver.charAt(0) : "U"}</div>}
                           <span className="font-medium text-zinc-700">{load.driver}</span>
                        </td>
                        <td className="px-6 py-4 text-zinc-500 font-mono text-xs">{load.eta}</td>
                        <td className="px-6 py-4 text-right font-bold text-zinc-900">{load.value}</td>
                        <td className="px-6 py-4 text-right">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-zinc-900 transition-colors">
                            <MoreHorizontal size={16} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </section>
        </div>
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
