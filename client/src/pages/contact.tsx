import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans pt-24 pb-24">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Get In Touch</h1>
          <p className="text-xl text-muted-foreground">
            Have a question about a shipment or need a quote? Our 24/7 dispatch team is ready to help.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <Card className="bg-secondary/20 border-border">
            <CardContent className="p-8 text-center space-y-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto">
                <Phone size={24} />
              </div>
              <h3 className="text-xl font-bold">Call Dispatch</h3>
              <p className="text-muted-foreground">24/7 Support Line</p>
              <p className="text-2xl font-bold text-primary">(800) 555-0149</p>
            </CardContent>
          </Card>
          
          <Card className="bg-secondary/20 border-border">
            <CardContent className="p-8 text-center space-y-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto">
                <Mail size={24} />
              </div>
              <h3 className="text-xl font-bold">Email Us</h3>
              <p className="text-muted-foreground">Quotes & General Inquiries</p>
              <p className="text-xl font-bold text-primary">dispatch@49trucking.com</p>
            </CardContent>
          </Card>

          <Card className="bg-secondary/20 border-border">
            <CardContent className="p-8 text-center space-y-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto">
                <MapPin size={24} />
              </div>
              <h3 className="text-xl font-bold">Visit HQ</h3>
              <p className="text-muted-foreground">Main Terminal</p>
              <p className="text-lg font-medium">123 Industrial Pkwy<br/>Pittsburg, CA 94565</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
           <Card className="border-none shadow-2xl">
             <CardContent className="p-8 md:p-10">
               <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
               <form className="space-y-6">
                 <div className="grid md:grid-cols-2 gap-4">
                   <div className="space-y-2">
                     <Label htmlFor="name">Name</Label>
                     <Input id="name" placeholder="Your Name" className="bg-secondary/30" />
                   </div>
                   <div className="space-y-2">
                     <Label htmlFor="email">Email</Label>
                     <Input id="email" type="email" placeholder="email@company.com" className="bg-secondary/30" />
                   </div>
                 </div>
                 
                 <div className="space-y-2">
                   <Label htmlFor="subject">Subject</Label>
                   <select className="w-full h-10 rounded-md border border-input bg-secondary/30 px-3 py-2 text-sm">
                     <option>Request a Quote</option>
                     <option>Track a Shipment</option>
                     <option>Billing Inquiry</option>
                     <option>Other</option>
                   </select>
                 </div>

                 <div className="space-y-2">
                   <Label htmlFor="message">Message</Label>
                   <Textarea id="message" placeholder="How can we help you?" className="min-h-[150px] bg-secondary/30" />
                 </div>

                 <Button size="lg" className="w-full rounded-full h-12 text-base font-bold">SendMessage</Button>
               </form>
             </CardContent>
           </Card>

           {/* Map Placeholder */}
           <div className="rounded-3xl overflow-hidden bg-secondary h-full min-h-[400px] relative">
             <iframe 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3143.9827670732437!2d-121.89059152367503!3d38.00125867192892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085290656041a3d%3A0xe526d713217277!2sPittsburg%2C%20CA!5e0!3m2!1sen!2sus!4v1709772345678!5m2!1sen!2sus" 
               width="100%" 
               height="100%" 
               style={{ border: 0 }} 
               allowFullScreen 
               loading="lazy" 
               referrerPolicy="no-referrer-when-downgrade"
               className="grayscale hover:grayscale-0 transition-all duration-500"
             />
           </div>
        </div>
      </div>
    </div>
  );
}
