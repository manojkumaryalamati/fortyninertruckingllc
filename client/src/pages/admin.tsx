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
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

// Mock Data for Charts
const revenueData = [
  { name: "Mon", value: 12400 },
  { name: "Tue", value: 14200 },
  { name: "Wed", value: 11800 },
  { name: "Thu", value: 15600 },
  { name: "Fri", value: 18900 },
  { name: "Sat", value: 16400 },
  { name: "Sun", value: 13200 },
];

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
            <Button variant={location === "/admin/documents" ? "secondary" : "ghost"} className="w-full justify-start gap-3 mb-1">
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
              { label: "Total Revenue", value: "$128,420", change: "+12.5%", trend: "up", icon: ArrowUpRight },
              { label: "Active Loads", value: "48", change: "+4", trend: "up", icon: Package },
              { label: "On-Time Delivery", value: "98.2%", change: "-0.4%", trend: "down", icon: Clock },
              { label: "Fleet Utilization", value: "87%", change: "+2.1%", trend: "up", icon: Truck },
            ].map((stat, i) => (
              <Card key={i} className="shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <span className={`flex items-center text-xs font-semibold ${stat.trend === "up" ? "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400" : "text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400"} px-2 py-0.5 rounded-full`}>
                      {stat.change}
                    </span>
                  </div>
                  <div className="text-3xl font-bold tracking-tight">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </section>

          {/* Charts & Map Area */}
          <section className="grid lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 shadow-sm">
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>Weekly performance vs previous period</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tickMargin={10} fontSize={12} stroke="hsl(var(--muted-foreground))" />
                      <YAxis axisLine={false} tickLine={false} tickMargin={10} fontSize={12} stroke="hsl(var(--muted-foreground))" tickFormatter={(value) => `$${value/1000}k`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: "hsl(var(--card))", borderRadius: "8px", border: "1px solid hsl(var(--border))" }}
                        itemStyle={{ color: "hsl(var(--foreground))" }}
                      />
                      <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Fleet Status</CardTitle>
                <CardDescription>Real-time vehicle distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    { label: "In Transit", count: 28, color: "bg-blue-500" },
                    { label: "Available", count: 12, color: "bg-green-500" },
                    { label: "Maintenance", count: 4, color: "bg-orange-500" },
                    { label: "Out of Service", count: 2, color: "bg-red-500" },
                  ].map((status, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-sm font-medium">
                        <span>{status.label}</span>
                        <span>{status.count}</span>
                      </div>
                      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                        <div className={`h-full ${status.color}`} style={{ width: `${(status.count / 46) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                  
                  <div className="pt-6 mt-6 border-t border-border">
                    <Button variant="outline" className="w-full">View Fleet Map <Map className="ml-2 h-4 w-4" /></Button>
                  </div>
                </div>
              </CardContent>
            </Card>
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
  );
}

function Clock(props: any) {
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
