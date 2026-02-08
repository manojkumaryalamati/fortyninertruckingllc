import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Check, Upload, Menu, X, Truck, Handshake, ShieldCheck, Briefcase, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

import Footer from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

export default function Subhaulers() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    truckType: "",
    fleetSize: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!formData.companyName || !formData.contactName || !formData.email || !formData.phone) {
        throw new Error("Please fill in all required fields");
      }

      if (!isFirebaseConfigured()) {
        console.log("Mock submission:", formData);
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast({
          title: "Registration Sent (Mock)",
          description: "Firebase is not configured. Check console for data.",
        });
      } else {
        await addDoc(collection(db, "subhaulers"), {
          ...formData,
          createdAt: serverTimestamp(),
          status: "new"
        });
        
        toast({
          title: "Registration Sent",
          description: "We've received your registration and will contact you soon.",
        });
      }

      setFormData({
        companyName: "",
        contactName: "",
        email: "",
        phone: "",
        truckType: "",
        fleetSize: ""
      });
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to submit registration. Please try again.",
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
          <div className="space-y-10">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-zinc-900">Partner With Us.</h1>
            <p className="text-lg text-zinc-600 leading-relaxed">
              We seek reliable owner-operators and subhaulers for long-term partnership. We offer fair dispatch and consistent opportunities.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4 pt-8">
               {[
                 { icon: Handshake, title: "Fair Dispatch", desc: "Equitable loads." },
                 { icon: ShieldCheck, title: "Clear Terms", desc: "Transparent agreements." },
                 { icon: Briefcase, title: "Consistent Work", desc: "Ongoing projects." },
                 { icon: Truck, title: "Compliance", desc: "Safety-first." }
               ].map((item, i) => (
                 <Card key={i} className="bg-white border border-zinc-200">
                   <CardContent className="p-5 space-y-2">
                     <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                       <item.icon size={16} />
                     </div>
                     <h3 className="font-bold text-base text-zinc-900">{item.title}</h3>
                     <p className="text-xs text-zinc-500">{item.desc}</p>
                   </CardContent>
                 </Card>
               ))}
            </div>
          </div>

          <Card className="border-none shadow-xl bg-white border border-zinc-200">
            <CardContent className="p-8 md:p-10">
              <h2 className="text-2xl font-bold mb-6 text-zinc-900">Subhauler Registration</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName" className="text-zinc-700">Company Name</Label>
                    <Input id="companyName" value={formData.companyName} onChange={handleChange} placeholder="Your Trucking Co." className="bg-zinc-50 border-zinc-200" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactName" className="text-zinc-700">Contact Person</Label>
                    <Input id="contactName" value={formData.contactName} onChange={handleChange} placeholder="Full Name" className="bg-zinc-50 border-zinc-200" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-zinc-700">Email Address</Label>
                  <Input id="email" type="email" value={formData.email} onChange={handleChange} placeholder="dispatch@example.com" className="bg-zinc-50 border-zinc-200" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-zinc-700">Phone Number</Label>
                  <Input id="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="(555) 000-0000" className="bg-zinc-50 border-zinc-200" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="truckType" className="text-zinc-700">Truck Types Available</Label>
                  <Input id="truckType" value={formData.truckType} onChange={handleChange} placeholder="e.g. Super Dumps, Transfers" className="bg-zinc-50 border-zinc-200" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="fleetSize" className="text-zinc-700">Fleet Size</Label>
                  <Input id="fleetSize" type="number" value={formData.fleetSize} onChange={handleChange} placeholder="Number of units" className="bg-zinc-50 border-zinc-200" />
                </div>

                <Button type="submit" disabled={isSubmitting} size="lg" className="w-full rounded-full h-12 text-base font-bold bg-primary text-white hover:bg-primary/90">
                  {isSubmitting ? <Loader2 className="animate-spin" /> : "Submit Registration"}
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
