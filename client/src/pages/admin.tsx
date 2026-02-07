import { useState } from "react";
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
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AdminSidebar, AdminMobileHeader } from "@/components/AdminSidebar";

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

// Mock Data for Table
const recentShipments = [
  { id: "FT-9281", customer: "Tesla Gigafactory", destination: "Austin, TX", status: "In Transit", driver: "M. Rodriguez", eta: "2h 15m", value: "$4,200" },
  { id: "FT-9282", customer: "Amazon fulfillment", destination: "Reno, NV", status: "Delivered", driver: "J. Smith", eta: "Arrived", value: "$1,850" },
  { id: "FT-9283", customer: "Home Depot HQ", destination: "Atlanta, GA", status: "Pending", driver: "Unassigned", eta: "Tom. 8am", value: "$3,100" },
  { id: "FT-9284", customer: "Costco Wholesale", destination: "Seattle, WA", status: "In Transit", driver: "K. Johnson", eta: "4h 30m", value: "$2,900" },
  { id: "FT-9285", customer: "Walmart DC", destination: "Phoenix, AZ", status: "Delayed", driver: "B. Davis", eta: "+2h Delay", value: "$2,100" },
];

export default function AdminDashboard() {
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const [revenueFilter, setRevenueFilter] = useState<keyof typeof revenueDataMap>("weekly");

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
              className="bg-transparent border-none shadow-none focus-visible:ring-0 h-8 pl-0 placeholder:text-muted-foreground/70" 
            />
          </div>
          <div className="flex items-center gap-4">
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
              { label: "Active Drivers", value: "42", change: "+2", trend: "up", icon: Users },
              { label: "Trucks on Road", value: "38", change: "-1", trend: "down", icon: Truck },
              { label: "Today's Revenue", value: "$12,450", change: "+15%", trend: "up", icon: DollarSign },
              { label: "Safety Score", value: "98/100", change: "+1", trend: "up", icon: ShieldCheck },
            ].map((stat, i) => (
              <Card key={i} className="shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      <stat.icon size={20} />
                    </div>
                    <span className={`flex items-center text-xs font-semibold ${stat.trend === "up" ? "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400" : "text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400"} px-2 py-0.5 rounded-full`}>
                      {stat.change}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">{stat.label}</p>
                    <div className="text-2xl font-bold tracking-tight">{stat.value}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>

          {/* Recent Shipments Table */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold tracking-tight">Recent Shipments</h2>
                <p className="text-sm text-muted-foreground">Manage and track active loads.</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm"><Filter className="mr-2 h-4 w-4" /> Filter</Button>
                <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" /> Export</Button>
              </div>
            </div>
            
            <Card className="shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-secondary/50 text-muted-foreground font-medium border-b border-border">
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
                  <tbody className="divide-y divide-border">
                    {recentShipments.map((load) => (
                      <tr key={load.id} className="hover:bg-secondary/20 transition-colors group">
                        <td className="px-6 py-4 font-medium">{load.id}</td>
                        <td className="px-6 py-4">{load.customer}</td>
                        <td className="px-6 py-4">{load.destination}</td>
                        <td className="px-6 py-4">
                          <Badge variant="outline" className={`
                            ${load.status === "Delivered" ? "border-green-200 bg-green-50 text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400" : 
                              load.status === "Delayed" ? "border-red-200 bg-red-50 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400" : 
                              load.status === "Pending" ? "border-yellow-200 bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-400" : 
                              "border-blue-200 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400"}
                          `}>
                            {load.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 flex items-center gap-2">
                           {load.driver !== "Unassigned" && <div className="h-6 w-6 rounded-full bg-secondary flex items-center justify-center text-xs font-bold">{load.driver.charAt(0)}</div>}
                           {load.driver}
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">{load.eta}</td>
                        <td className="px-6 py-4 text-right font-medium">{load.value}</td>
                        <td className="px-6 py-4 text-right">
                          <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
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
