import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Filter, AlertTriangle, Wrench, CheckCircle2, MoreVertical, Truck } from "lucide-react";
import { Link } from "wouter";

const mockTrucks = [
  { id: "TRK-409", type: "Kenworth T680", plate: "XYZ-1234", vin: "...89201", status: "Active", maintenance: "Due in 30 days", mileage: "142,000 mi", category: "Tractor" },
  { id: "TRK-410", type: "Kenworth T680", plate: "ABC-5678", vin: "...19283", status: "Active", maintenance: "Up to date", mileage: "89,500 mi", category: "Tractor" },
  { id: "TRK-205", type: "Peterbilt 389", plate: "LMN-9012", vin: "...56473", status: "Maintenance", maintenance: "Service in progress", mileage: "210,000 mi", category: "Tractor" },
  { id: "TRL-101", type: "Great Dane Dry Van", plate: "PQR-3456", vin: "...91827", status: "Active", maintenance: "Up to date", mileage: "N/A", category: "Trailer" },
  { id: "TRK-882", type: "Super Dump", plate: "STU-7890", vin: "...73645", status: "Out of Service", maintenance: "Repairs needed", mileage: "185,000 mi", category: "Construction" },
];

export default function TrucksManagement() {
  const [filter, setFilter] = useState("All");

  const filteredTrucks = filter === "All" ? mockTrucks : mockTrucks.filter(t => t.category === filter);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <div className="p-8 max-w-[1600px] mx-auto space-y-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Fleet Management</h1>
            <p className="text-muted-foreground">Track vehicle status, maintenance schedules, and assignments.</p>
          </div>
          <div className="flex gap-3">
             <Link href="/admin">
               <Button variant="outline">Back to Dashboard</Button>
             </Link>
             <Button className="gap-2"><Plus size={16} /> Add Vehicle</Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           <Card className="bg-primary/5 border-primary/20">
             <CardContent className="p-4 flex items-center justify-between">
               <div>
                 <p className="text-xs font-bold uppercase text-primary mb-1">Total Fleet</p>
                 <p className="text-2xl font-bold">48</p>
               </div>
               <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary"><Truck size={16} /></div>
             </CardContent>
           </Card>
           <Card className="bg-green-50 border-green-200">
             <CardContent className="p-4 flex items-center justify-between">
               <div>
                 <p className="text-xs font-bold uppercase text-green-700 mb-1">Active</p>
                 <p className="text-2xl font-bold text-green-800">42</p>
               </div>
               <div className="h-8 w-8 rounded-full bg-green-200 flex items-center justify-center text-green-700"><CheckCircle2 size={16} /></div>
             </CardContent>
           </Card>
           <Card className="bg-orange-50 border-orange-200">
             <CardContent className="p-4 flex items-center justify-between">
               <div>
                 <p className="text-xs font-bold uppercase text-orange-700 mb-1">In Shop</p>
                 <p className="text-2xl font-bold text-orange-800">4</p>
               </div>
               <div className="h-8 w-8 rounded-full bg-orange-200 flex items-center justify-center text-orange-700"><Wrench size={16} /></div>
             </CardContent>
           </Card>
           <Card className="bg-red-50 border-red-200">
             <CardContent className="p-4 flex items-center justify-between">
               <div>
                 <p className="text-xs font-bold uppercase text-red-700 mb-1">Critical</p>
                 <p className="text-2xl font-bold text-red-800">2</p>
               </div>
               <div className="h-8 w-8 rounded-full bg-red-200 flex items-center justify-center text-red-700"><AlertTriangle size={16} /></div>
             </CardContent>
           </Card>
        </div>

        {/* Fleet Table */}
        <Card className="shadow-sm">
           <div className="p-4 border-b border-border flex items-center gap-4">
             <div className="relative flex-1 max-w-sm">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
               <Input placeholder="Search VIN, Plate, or Unit #" className="pl-9" />
             </div>
             <div className="flex gap-2">
               {["All", "Tractor", "Trailer", "Construction"].map(cat => (
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
                   <th className="px-6 py-4">Unit ID</th>
                   <th className="px-6 py-4">Type</th>
                   <th className="px-6 py-4">Plate / VIN</th>
                   <th className="px-6 py-4">Category</th>
                   <th className="px-6 py-4">Status</th>
                   <th className="px-6 py-4">Maintenance</th>
                   <th className="px-6 py-4">Mileage</th>
                   <th className="px-6 py-4"></th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-border">
                 {filteredTrucks.map(truck => (
                   <tr key={truck.id} className="hover:bg-secondary/20 transition-colors">
                     <td className="px-6 py-4 font-bold">{truck.id}</td>
                     <td className="px-6 py-4">{truck.type}</td>
                     <td className="px-6 py-4">
                       <div className="flex flex-col">
                         <span>{truck.plate}</span>
                         <span className="text-xs text-muted-foreground">{truck.vin}</span>
                       </div>
                     </td>
                     <td className="px-6 py-4">
                       <Badge variant="secondary">{truck.category}</Badge>
                     </td>
                     <td className="px-6 py-4">
                       <Badge variant="outline" className={`
                         ${truck.status === "Active" ? "border-green-200 bg-green-50 text-green-700" : 
                           truck.status === "Maintenance" ? "border-orange-200 bg-orange-50 text-orange-700" : 
                           "border-red-200 bg-red-50 text-red-700"}
                       `}>
                         {truck.status}
                       </Badge>
                     </td>
                     <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                           {truck.status === "Maintenance" ? <Wrench size={14} className="text-orange-500" /> : <CheckCircle2 size={14} className="text-green-500" />}
                           {truck.maintenance}
                        </div>
                     </td>
                     <td className="px-6 py-4 text-muted-foreground font-mono">{truck.mileage}</td>
                     <td className="px-6 py-4 text-right">
                       <Button variant="ghost" size="icon" className="h-8 w-8">
                         <MoreVertical size={16} />
                       </Button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </Card>
      </div>
    </div>
  );
}
