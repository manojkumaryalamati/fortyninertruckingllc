import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Check, Upload, Menu, X, Briefcase, Loader2, FileText, Trash2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

import Footer from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { db, isFirebaseConfigured, auth } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { createDriverWithDocs } from "@/services/driverRegistration";
import { useToast } from "@/hooks/use-toast";

export default function Careers() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    experience: "Less than 1 year",
    license: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
        throw new Error("Please fill in all required fields");
      }

      if (!isFirebaseConfigured()) {
        console.log("Mock submission:", formData);
        await new Promise(resolve => setTimeout(resolve, 1500));
        toast({
          title: "Application Sent (Mock)",
          description: "Firebase is not configured. Data logged to console.",
        });
      } else {
        // Use the specialized service if we have a file, otherwise just add doc
        // Resume upload section removed as requested
        
        await addDoc(collection(db, "driver_applications"), {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            yearsCommercialDriving: formData.experience,
            cdlNumber: formData.license,
            status: "new",
            createdAt: serverTimestamp()
        });
        
        toast({
          title: "Application Sent",
          description: "We've received your application and will review it shortly.",
        });
      }

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        experience: "Less than 1 year",
        license: ""
      });
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to submit application. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans pt-40 md:pt-56 pb-32">
      <Navbar />

      <div className="w-full max-w-[1800px] mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div className="text-lg text-zinc-600 leading-relaxed space-y-4">
              <p>
                FortyNinerTrucking is looking to add Drivers to Our Team. We are looking for Commercial Drivers for Long Haul and Daily Local Driving jobs.
              </p>
              <p>
                Weekends are not mandatory, maybe necessary for Long haul projects.
              </p>
              <p className="font-bold text-zinc-900">
                Class A or Class B license (CDL) required to apply for multiple positions available.
              </p>
            </div>
            
            <div className="space-y-4 pt-4">
               <h3 className="text-xl font-bold text-zinc-900">Why Drive With Us?</h3>
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
                     <h3 className="font-bold text-base text-zinc-900">{benefit.title}</h3>
                     <p className="text-sm text-zinc-500">{benefit.desc}</p>
                   </div>
                   
                 </div>
               ))}
            </div>
          </div>

          <Card className="border-none shadow-xl bg-white border border-zinc-200">
            <CardContent className="p-8 md:p-10">
              <h2 className="text-2xl font-bold mb-6 text-zinc-900">Driver Application</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-zinc-700">First Name</Label>
                    <Input id="firstName" value={formData.firstName} onChange={handleChange} placeholder="John" className="bg-zinc-50 border-zinc-200" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-zinc-700">Last Name</Label>
                    <Input id="lastName" value={formData.lastName} onChange={handleChange} placeholder="Doe" className="bg-zinc-50 border-zinc-200" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-zinc-700">Email Address</Label>
                  <Input id="email" type="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" className="bg-zinc-50 border-zinc-200" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-zinc-700">Phone Number</Label>
                  <Input id="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="(555) 000-0000" className="bg-zinc-50 border-zinc-200" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience" className="text-zinc-700">Years of Commercial Driving</Label>
                  <select id="experience" value={formData.experience} onChange={handleChange} className="w-full h-10 rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm">
                    <option>Less than 1 year</option>
                    <option>1-3 years</option>
                    <option>3-5 years</option>
                    <option>5+ years</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="license" className="text-zinc-700">CDL Number</Label>
                  <Input id="license" value={formData.license} onChange={handleChange} placeholder="Enter License #" className="bg-zinc-50 border-zinc-200" />
                </div>

                <Button type="submit" disabled={isSubmitting} size="lg" className="w-full rounded-full h-12 text-base font-bold bg-primary text-white hover:bg-primary/90">
                  {isSubmitting ? <Loader2 className="animate-spin" /> : "Submit Application"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}
