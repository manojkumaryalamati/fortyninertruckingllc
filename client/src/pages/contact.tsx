import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail } from "lucide-react";
import Footer from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] w-full overflow-hidden mt-20">
        <div className="absolute inset-0 z-0">
           <img 
             src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2940&auto=format&fit=crop" 
             alt="Contact Hero" 
             className="w-full h-full object-cover"
           />
           <div className="absolute inset-0 bg-black/60 z-10" />
        </div>
        <div className="relative z-20 container mx-auto px-6 h-full flex flex-col justify-center">
           <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase leading-[0.9]">
            GET IN <br/>
            <span className="text-primary">TOUCH</span>
           </h1>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
             {/* Contact Info */}
             <div className="space-y-12">
               <div>
                 <h2 className="text-4xl font-black uppercase mb-6">Contact Us</h2>
                 <p className="text-xl text-muted-foreground">
                   Contractors, subhaulers, and partners – reach out to our dispatch team for reliable service.
                 </p>
               </div>

               <div className="space-y-8">
                 <div className="flex items-start gap-6">
                   <div className="h-16 w-16 bg-primary flex items-center justify-center text-white shrink-0">
                     <Phone size={32} />
                   </div>
                   <div>
                     <h3 className="text-xl font-black uppercase">Call Dispatch</h3>
                     <p className="text-muted-foreground mb-1">Immediate Assistance 24/7</p>
                     <p className="text-2xl font-bold text-primary">(925) 250-4605</p>
                   </div>
                 </div>

                 <div className="flex items-start gap-6">
                   <div className="h-16 w-16 bg-primary flex items-center justify-center text-white shrink-0">
                     <Mail size={32} />
                   </div>
                   <div>
                     <h3 className="text-xl font-black uppercase">Email Us</h3>
                     <p className="text-muted-foreground mb-1">Quotes & Bids</p>
                     <p className="text-xl font-bold text-primary">fortyninertrucking@gmail.com</p>
                   </div>
                 </div>

                 <div className="flex items-start gap-6">
                   <div className="h-16 w-16 bg-primary flex items-center justify-center text-white shrink-0">
                     <MapPin size={32} />
                   </div>
                   <div>
                     <h3 className="text-xl font-black uppercase">Visit HQ</h3>
                     <p className="text-muted-foreground mb-1">Main Terminal</p>
                     <p className="text-xl font-bold">28 Glen Canyon Court<br/>Pittsburg CA 94565</p>
                   </div>
                 </div>
               </div>
             </div>

             {/* Form */}
             <div className="bg-[#FDFBF7] p-8 md:p-12 shadow-xl border-t-4 border-primary">
               <h3 className="text-2xl font-black uppercase mb-8">Send a Message</h3>
               <form className="space-y-6">
                 <div className="grid md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                     <Label htmlFor="name" className="uppercase font-bold">Name</Label>
                     <Input id="name" placeholder="YOUR NAME" className="bg-white border-gray-200 h-12" />
                   </div>
                   <div className="space-y-2">
                     <Label htmlFor="email" className="uppercase font-bold">Email</Label>
                     <Input id="email" type="email" placeholder="EMAIL@COMPANY.COM" className="bg-white border-gray-200 h-12" />
                   </div>
                 </div>
                 
                 <div className="space-y-2">
                   <Label htmlFor="subject" className="uppercase font-bold">Subject</Label>
                   <select className="w-full h-12 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm">
                     <option>Request a Quote</option>
                     <option>Subhauler Inquiry</option>
                     <option>Driver Application</option>
                     <option>General Information</option>
                   </select>
                 </div>

                 <div className="space-y-2">
                   <Label htmlFor="message" className="uppercase font-bold">Message</Label>
                   <Textarea id="message" placeholder="HOW CAN WE HELP YOU?" className="min-h-[150px] bg-white border-gray-200" />
                 </div>

                 <Button size="lg" className="w-full bg-primary hover:bg-primary/90 h-14 uppercase font-bold text-white tracking-widest">
                   Send Message
                 </Button>
               </form>
             </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
