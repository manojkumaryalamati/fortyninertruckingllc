import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock, ArrowRight, Loader2 } from "lucide-react";
import Footer from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "Requesting a Quote",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!formData.email || !formData.message) {
        throw new Error("Please fill in all required fields");
      }

      if (!isFirebaseConfigured()) {
        // Mock submission
        console.log("Mock submission:", formData);
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast({
          title: "Message Sent (Mock)",
          description: "Firebase is not configured. Check console for data.",
        });
      } else {
        await addDoc(collection(db, "contacts"), {
          ...formData,
          createdAt: serverTimestamp(),
          status: "new"
        });
        
        toast({
          title: "Message Sent",
          description: "We've received your message and will get back to you soon.",
        });
      }

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "Requesting a Quote",
        message: ""
      });
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-secondary/30">
        <div className="w-full max-w-[1800px] mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-4xl space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-8">
              Let's Start a <br />
              <span className="text-primary">Conversation.</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed mt-6">
              Whether you need a quote for a major project or want to join our fleet, 
              our team is ready to help you move forward.
            </p>
          </div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent hidden lg:block" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      </section>

      <section className="py-24 bg-background relative">
        <div className="w-full max-w-[1800px] mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
             {/* Contact Info */}
             <div className="lg:col-span-5 space-y-16">
               <div>
                 <h2 className="text-3xl font-bold tracking-tight mb-8">Get in Touch</h2>
                 <div className="space-y-8">
                   <div className="flex items-start gap-5 group">
                     <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0 transition-colors group-hover:bg-primary group-hover:text-white">
                       <Phone size={24} />
                     </div>
                     <div>
                       <h3 className="text-lg font-bold mb-1">Phone Support</h3>
                       <p className="text-muted-foreground mb-2">24/7 Dispatch Availability</p>
                       <a href="tel:9252504605" className="text-xl font-semibold hover:text-primary transition-colors">(925) 250-4605</a>
                     </div>
                   </div>

                   <div className="flex items-start gap-5 group">
                     <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0 transition-colors group-hover:bg-primary group-hover:text-white">
                       <Mail size={24} />
                     </div>
                     <div>
                       <h3 className="text-lg font-bold mb-1">Email</h3>
                       <p className="text-muted-foreground mb-2">For quotes and bids</p>
                       <a href="mailto:fortyninertrucking@gmail.com" className="text-xl font-semibold hover:text-primary transition-colors">fortyninertrucking@gmail.com</a>
                     </div>
                   </div>

                   <div className="flex items-start gap-5 group">
                     <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0 transition-colors group-hover:bg-primary group-hover:text-white">
                       <MapPin size={24} />
                     </div>
                     <div>
                       <h3 className="text-lg font-bold mb-1">Headquarters</h3>
                       <p className="text-muted-foreground mb-2">Main Terminal & Office</p>
                       <address className="text-xl font-semibold not-italic text-foreground">
                         28 Glen Canyon Court<br/>
                         Pittsburg, CA 94565
                       </address>
                     </div>
                   </div>

                   <div className="flex items-start gap-5 group">
                     <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0 transition-colors group-hover:bg-primary group-hover:text-white">
                       <Clock size={24} />
                     </div>
                     <div>
                       <h3 className="text-lg font-bold mb-1">Hours of Operation</h3>
                       <p className="text-muted-foreground mb-2">Office Hours</p>
                       <p className="text-xl font-semibold">Mon - Fri: 7:00 AM - 5:00 PM</p>
                       <p className="text-muted-foreground mt-1">Dispatch available 24/7</p>
                     </div>
                   </div>
                 </div>
               </div>

               {/* Map Card */}
               <div className="rounded-3xl overflow-hidden shadow-sm border border-border h-[300px] relative bg-secondary/30">
                 <iframe 
                   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3145.418648834645!2d-121.8988654242686!3d38.0175829719246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808560b4576394e1%3A0xc3f833777f985440!2s28%20Glen%20Canyon%20Ct%2C%20Pittsburg%2C%20CA%2094565!5e0!3m2!1sen!2sus!4v1707360000000!5m2!1sen!2sus" 
                   width="100%" 
                   height="100%" 
                   style={{ border: 0 }} 
                   allowFullScreen 
                   loading="lazy" 
                   referrerPolicy="no-referrer-when-downgrade"
                   className="grayscale hover:grayscale-0 transition-all duration-500"
                 ></iframe>
               </div>
             </div>

             {/* Form */}
             <div className="lg:col-span-7">
               <div className="bg-card rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-white/10 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-10 -mt-10" />
                 
                 <h3 className="text-2xl font-bold mb-8 relative z-10 text-foreground">Send us a Message</h3>
                 
                 <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                   <div className="grid md:grid-cols-2 gap-8">
                     <div className="space-y-2">
                       <Label htmlFor="firstName" className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">First Name</Label>
                       <Input 
                         id="firstName" 
                         value={formData.firstName}
                         onChange={handleChange}
                         placeholder="John" 
                         className="h-14 bg-secondary/30 border-transparent focus:bg-background transition-all rounded-xl text-lg px-4" 
                       />
                     </div>
                     <div className="space-y-2">
                       <Label htmlFor="lastName" className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Last Name</Label>
                       <Input 
                         id="lastName" 
                         value={formData.lastName}
                         onChange={handleChange}
                         placeholder="Doe" 
                         className="h-14 bg-secondary/30 border-transparent focus:bg-background transition-all rounded-xl text-lg px-4" 
                       />
                     </div>
                   </div>

                   <div className="grid md:grid-cols-2 gap-8">
                     <div className="space-y-2">
                       <Label htmlFor="email" className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Email Address</Label>
                       <Input 
                         id="email" 
                         type="email" 
                         value={formData.email}
                         onChange={handleChange}
                         placeholder="john@company.com" 
                         className="h-14 bg-secondary/30 border-transparent focus:bg-background transition-all rounded-xl text-lg px-4" 
                       />
                     </div>
                     <div className="space-y-2">
                       <Label htmlFor="phone" className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Phone Number</Label>
                       <Input 
                         id="phone" 
                         type="tel" 
                         value={formData.phone}
                         onChange={handleChange}
                         placeholder="(555) 123-4567" 
                         className="h-14 bg-secondary/30 border-transparent focus:bg-background transition-all rounded-xl text-lg px-4" 
                       />
                     </div>
                   </div>
                   
                   <div className="space-y-2">
                     <Label htmlFor="subject" className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">I'm interested in</Label>
                     <select 
                       id="subject"
                       value={formData.subject}
                       onChange={handleChange}
                       className="w-full h-14 rounded-xl border-transparent bg-secondary/30 px-4 py-2 text-lg focus:bg-background focus:ring-2 focus:ring-primary focus:outline-none transition-all text-foreground"
                     >
                       <option>Requesting a Quote</option>
                       <option>Becoming a Subhauler</option>
                       <option>Driver Opportunities</option>
                       <option>General Inquiry</option>
                     </select>
                   </div>

                   <div className="space-y-2">
                     <Label htmlFor="message" className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Message</Label>
                     <Textarea 
                       id="message" 
                       value={formData.message}
                       onChange={handleChange}
                       placeholder="Tell us more about your project or inquiry..." 
                       className="min-h-[200px] bg-secondary/30 border-transparent focus:bg-background transition-all rounded-xl text-lg p-4 resize-none" 
                     />
                   </div>

                   <Button 
                     type="submit" 
                     disabled={isSubmitting}
                     size="lg" 
                     className="w-full h-16 text-lg font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all flex items-center justify-center gap-2"
                   >
                     {isSubmitting ? (
                       <>Sending... <Loader2 className="animate-spin" size={20} /></>
                     ) : (
                       <>Send Message <ArrowRight size={20} /></>
                     )}
                   </Button>
                 </form>
               </div>
             </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
