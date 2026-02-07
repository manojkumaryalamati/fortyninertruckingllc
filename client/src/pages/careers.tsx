import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Check, Upload, Menu, X, Briefcase } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

import Footer from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export default function Careers() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans pt-32 md:pt-40 pb-24">
      <Navbar />

      <div className="w-full max-w-[1800px] mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">CDL DRIVERS WANTED</h1>
            <div className="text-lg text-muted-foreground leading-relaxed space-y-4">
              <p>
                FortyNinerTrucking is looking to add Drivers to Our Team. We are looking for Commercial Drivers for Long Haul and Daily Local Driving jobs.
              </p>
              <p>
                Weekends are not mandatory, maybe necessary for Long haul projects.
              </p>
              <p className="font-bold text-foreground">
                Class A or Class B license (CDL) required to apply for multiple positions available.
              </p>
            </div>
            
            <div className="space-y-4 pt-4">
               <h3 className="text-xl font-bold">Why Drive With Us?</h3>
               {[
                 { title: "Professional Environment", desc: "Respect and open communication." },
                 { title: "Well-Maintained Equipment", desc: "Safe, compliant, and reliable trucks." },
                 { title: "Safety Culture", desc: "Your safety is our priority." },
               ].map((benefit, i) => (
                 <div key={i} className="flex gap-3 items-center">
                   <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                     <Check size={16} />
                   </div>
                   <div>
                     <h3 className="font-bold text-base">{benefit.title}</h3>
                     <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                   </div>
                   
                 </div>
               ))}
            </div>
          </div>

          <Card className="border-none shadow-xl bg-secondary/30">
            <CardContent className="p-8 md:p-10">
              <h2 className="text-2xl font-bold mb-6">Driver Application</h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" className="bg-background" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" className="bg-background" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="john@example.com" className="bg-background" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="(555) 000-0000" className="bg-background" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Commercial Driving</Label>
                  <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option>Less than 1 year</option>
                    <option>1-3 years</option>
                    <option>3-5 years</option>
                    <option>5+ years</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="license">CDL Number</Label>
                  <Input id="license" placeholder="Enter License #" className="bg-background" />
                </div>

                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center space-y-2 hover:bg-background/50 transition-colors cursor-pointer">
                  <Upload className="mx-auto text-muted-foreground" />
                  <p className="text-sm font-medium">Upload Resume (Optional)</p>
                  <p className="text-xs text-muted-foreground">PDF, JPG, PNG up to 5MB</p>
                </div>

                <Button size="lg" className="w-full rounded-full h-12 text-base font-bold">Submit Application</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}
