import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Check, Upload, Menu, X, Truck, Handshake, ShieldCheck, Briefcase } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

import Footer from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export default function Subhaulers() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans pt-24 pb-24">
      <Navbar />

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <h1 className="text-5xl font-bold tracking-tight">Partner With Us.</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Join a network of professionals. FortyNinerTrucking LLC seeks reliable owner-operators and subhaulers for long-term partnership. We offer fair dispatch, transparent terms, and consistent opportunities.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6 pt-4">
               {[
                 { icon: Handshake, title: "Fair Dispatch", desc: "Equitable load distribution." },
                 { icon: ShieldCheck, title: "Clear Terms", desc: "Transparent agreements." },
                 { icon: Briefcase, title: "Consistent Work", desc: "Access to ongoing projects." },
                 { icon: Truck, title: "Compliance Focused", desc: "Safety-first partnerships." }
               ].map((item, i) => (
                 <Card key={i} className="bg-secondary/30 border-none">
                   <CardContent className="p-6 space-y-3">
                     <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                       <item.icon size={20} />
                     </div>
                     <h3 className="font-bold text-lg">{item.title}</h3>
                     <p className="text-sm text-muted-foreground">{item.desc}</p>
                   </CardContent>
                 </Card>
               ))}
            </div>
          </div>

          <Card className="border-none shadow-2xl bg-secondary/30">
            <CardContent className="p-8 md:p-10">
              <h2 className="text-2xl font-bold mb-6">Subhauler Registration</h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input id="companyName" placeholder="Your Trucking Co." className="bg-background" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactName">Contact Person</Label>
                    <Input id="contactName" placeholder="Full Name" className="bg-background" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="dispatch@example.com" className="bg-background" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="(555) 000-0000" className="bg-background" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="truckType">Truck Types Available</Label>
                  <Input id="truckType" placeholder="e.g. Super Dumps, Transfers" className="bg-background" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="fleetSize">Fleet Size</Label>
                  <Input id="fleetSize" type="number" placeholder="Number of units" className="bg-background" />
                </div>

                <Button size="lg" className="w-full rounded-full h-12 text-base font-bold">Submit Registration</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}
