import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Calendar, MapPin, Truck, User, DollarSign, FileText } from "lucide-react";
import { Link } from "wouter";

const mockTrips = [
  { id: "TRP-9281", date: "Feb 09, 2026", customer: "Tesla Gigafactory", route: "Sacramento → Austin", driver: "M. Rodriguez", truck: "TRK-409", status: "In Progress", rate: "$4,200", material: "Steel Coils" },
  { id: "TRP-9282", date: "Feb 09, 2026", customer: "Amazon", route: "Reno → Salt Lake City", driver: "S. Jenkins", truck: "TRK-410", status: "Scheduled", rate: "$1,850", material: "Palletized Goods" },
  { id: "TRP-9283", date: "Feb 08, 2026", customer: "Home Depot", route: "Oakland → Fresno", driver: "R. Johnson", truck: "TRK-205", status: "Completed", rate: "$950", material: "Lumber" },
  { id: "TRP-9284", date: "Feb 08, 2026", customer: "Granite Construction", route: "Local Quarry → Job Site A", driver: "D. Chen", truck: "TRK-882", status: "Completed", rate: "$1,200", material: "Aggregate" },
];

export default function TripsManagement() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <div className="p-8 max-w-[1600px] mx-auto space-y-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Trip Management</h1>
            <p className="text-muted-foreground">Dispatch board, routing, and load details.</p>
          </div>
          <div className="flex gap-3">
             <Link href="/admin">
               <Button variant="outline">Back to Dashboard</Button>
             </Link>
             <Button className="gap-2"><Plus size={16} /> New Trip</Button>
          </div>
        </div>

        {/* Dispatch Board Layout */}
        <div className="grid lg:grid-cols-3 gap-6">
           {/* Active Trips Column */}
           <div className="lg:col-span-2 space-y-6">
              <Card>
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <h3 className="font-bold">Active & Scheduled</h3>
                  <div className="flex items-center gap-2">
                     <Search size={16} className="text-muted-foreground" />
                     <Input placeholder="Search trips..." className="h-8 w-48" />
                  </div>
                </div>
                <div className="divide-y divide-border">
                  {mockTrips.filter(t => t.status !== "Completed").map(trip => (
                     <div key={trip.id} className="p-4 hover:bg-secondary/20 transition-colors flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                        <div className="space-y-2">
                           <div className="flex items-center gap-2">
                              <span className="font-mono text-xs text-muted-foreground font-bold">{trip.id}</span>
                              <Badge variant={trip.status === "In Progress" ? "default" : "outline"}>{trip.status}</Badge>
                              <span className="text-xs text-muted-foreground flex items-center gap-1"><Calendar size={12} /> {trip.date}</span>
                           </div>
                           <h4 className="font-bold text-lg">{trip.customer}</h4>
                           <div className="flex items-center gap-2 text-sm">
                              <MapPin size={14} className="text-primary" />
                              <span>{trip.route}</span>
                           </div>
                           <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1"><Truck size={12} /> {trip.truck}</span>
                              <span className="flex items-center gap-1"><User size={12} /> {trip.driver}</span>
                              <span className="flex items-center gap-1"><DollarSign size={12} /> {trip.rate}</span>
                           </div>
                        </div>
                        <div className="flex flex-col gap-2">
                           <Button size="sm" variant="secondary">View Details</Button>
                           <Button size="sm" variant="ghost" className="text-muted-foreground"><FileText size={14} className="mr-1"/> BOL</Button>
                        </div>
                     </div>
                  ))}
                </div>
              </Card>

              <Card>
                <div className="p-4 border-b border-border">
                  <h3 className="font-bold text-muted-foreground">Recently Completed</h3>
                </div>
                <div className="divide-y divide-border opacity-80">
                  {mockTrips.filter(t => t.status === "Completed").map(trip => (
                     <div key={trip.id} className="p-4 flex justify-between items-center">
                        <div>
                           <p className="font-bold">{trip.customer}</p>
                           <p className="text-xs text-muted-foreground">{trip.route}</p>
                        </div>
                        <Badge variant="secondary" className="bg-green-100 text-green-700">Completed</Badge>
                     </div>
                  ))}
                </div>
              </Card>
           </div>

           {/* Quick Actions & Calendar Placeholder */}
           <div className="space-y-6">
              <Card className="bg-primary text-primary-foreground border-none">
                 <CardContent className="p-6 space-y-4">
                    <h3 className="font-bold text-xl">Quick Dispatch</h3>
                    <p className="text-primary-foreground/80 text-sm">Create a new load assignment instantly.</p>
                    <div className="space-y-3">
                       <Input placeholder="Customer Name" className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50" />
                       <Input placeholder="Pickup Location" className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50" />
                       <Input placeholder="Dropoff Location" className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50" />
                       <Button variant="secondary" className="w-full font-bold">Create Assignment</Button>
                    </div>
                 </CardContent>
              </Card>

              <Card>
                 <CardContent className="p-6">
                    <h3 className="font-bold mb-4">Unassigned Drivers</h3>
                    <div className="space-y-3">
                       {["David Chen", "Emily Davis"].map((driver, i) => (
                          <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary">
                             <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold">{driver.charAt(0)}</div>
                                <span className="text-sm font-medium">{driver}</span>
                             </div>
                             <Button size="sm" variant="ghost">Assign</Button>
                          </div>
                       ))}
                    </div>
                 </CardContent>
              </Card>
           </div>
        </div>
      </div>
    </div>
  );
}
