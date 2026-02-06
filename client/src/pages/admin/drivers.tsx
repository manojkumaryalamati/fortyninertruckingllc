import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Plus, MoreHorizontal, Phone, Mail, FileText, Truck } from "lucide-react";
import { Link } from "wouter";

// Mock Drivers Data
const mockDrivers = [
  { id: "DRV-001", name: "Michael Rodriguez", status: "Active", phone: "(555) 123-4567", email: "m.rodriguez@49trucking.com", license: "CDL-A 829102", truck: "T-680 #409", joinDate: "Jan 12, 2022" },
  { id: "DRV-002", name: "Sarah Jenkins", status: "Active", phone: "(555) 987-6543", email: "s.jenkins@49trucking.com", license: "CDL-A 192834", truck: "T-680 #410", joinDate: "Mar 04, 2023" },
  { id: "DRV-003", name: "David Chen", status: "On Leave", phone: "(555) 456-7890", email: "d.chen@49trucking.com", license: "CDL-A 564738", truck: "Unassigned", joinDate: "Nov 15, 2021" },
  { id: "DRV-004", name: "Robert Johnson", status: "Active", phone: "(555) 234-5678", email: "r.johnson@49trucking.com", license: "CDL-A 918273", truck: "P-389 #205", joinDate: "Jun 20, 2020" },
  { id: "DRV-005", name: "Emily Davis", status: "Suspended", phone: "(555) 876-5432", email: "e.davis@49trucking.com", license: "CDL-A 736451", truck: "Unassigned", joinDate: "Aug 10, 2023" },
];

export default function DriversManagement() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDrivers = mockDrivers.filter(driver => 
    driver.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    driver.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
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
             <Button className="gap-2"><Plus size={16} /> Add Driver</Button>
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
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredDrivers.map(driver => (
            <Card key={driver.id} className="shadow-sm hover:shadow-md transition-shadow group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border border-border">
                    <AvatarFallback className="bg-primary/10 text-primary font-bold">{driver.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base font-bold">{driver.name}</CardTitle>
                    <p className="text-xs text-muted-foreground">{driver.id}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal size={16} />
                </Button>
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
                   <Button variant="outline" size="sm" className="flex-1">View Profile</Button>
                   <Button variant="secondary" size="sm" className="flex-1">Documents</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
