import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Check, Upload } from "lucide-react";

export default function Careers() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans pt-24 pb-24">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <h1 className="text-5xl font-bold tracking-tight">Drive With The Best.</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We offer more than just a job. We offer a career with top-tier equipment, competitive pay, and a team that respects your time on the road.
            </p>
            
            <div className="space-y-6 pt-8">
               {[
                 { title: "Competitive Pay", desc: "Top CPM in the industry with quarterly safety bonuses." },
                 { title: "New Equipment", desc: "Drive 2024+ Kenworth and Peterbilt trucks." },
                 { title: "Home Time", desc: "Flexible scheduling to get you home when it matters." },
                 { title: "Full Benefits", desc: "Health, Dental, Vision, and 401k with match." }
               ].map((benefit, i) => (
                 <div key={i} className="flex gap-4">
                   <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                     <Check size={20} />
                   </div>
                   <div>
                     <h3 className="font-bold text-lg">{benefit.title}</h3>
                     <p className="text-muted-foreground">{benefit.desc}</p>
                   </div>
                 </div>
               ))}
            </div>
          </div>

          <Card className="border-none shadow-2xl bg-secondary/30">
            <CardContent className="p-8 md:p-10">
              <h2 className="text-2xl font-bold mb-6">Start Your Application</h2>
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
                  <Label htmlFor="experience">Years of Experience</Label>
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
                  <p className="text-sm font-medium">Upload Resume or CDL (Optional)</p>
                  <p className="text-xs text-muted-foreground">PDF, JPG, PNG up to 5MB</p>
                </div>

                <Button size="lg" className="w-full rounded-full h-12 text-base font-bold">Submit Application</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
