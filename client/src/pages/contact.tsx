import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowRight, CheckCircle2, Clock, Mail, MapPin, Phone, Loader2 } from "lucide-react";
import Footer from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

const contactCards = [
  {
    title: "Phone support",
    subtitle: "24/7 Dispatch Availability",
    value: "(925) 250-4605",
    href: "tel:9252504605",
    icon: Phone,
  },
  {
    title: "Email",
    subtitle: "Quotes, bids, and logistics coordination",
    value: "fortyninertrucking@gmail.com",
    href: "mailto:fortyninertrucking@gmail.com",
    icon: Mail,
  },
  {
    title: "Headquarters",
    subtitle: "Main terminal and office",
    value: "28 Glen Canyon Court, Pittsburg, CA 94565",
    href: "https://maps.google.com/?q=28+Glen+Canyon+Court+Pittsburg+CA+94565",
    icon: MapPin,
  },
  {
    title: "Hours",
    subtitle: "Dispatch support",
    value: "24/7",
    href: "",
    icon: Clock,
  },
];

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "Requesting a Quote",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!formData.email || !formData.message || !formData.firstName || !formData.lastName) {
        throw new Error("Please fill in all required fields");
      }

      if (!isFirebaseConfigured()) {
        toast({
          title: "Configuration Error",
          description: "Firebase environment variables are missing. Please check your setup.",
          variant: "destructive",
        });
        return;
      }

      await addDoc(collection(db, "contact_submissions"), {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        interestedIn: formData.subject,
        message: formData.message,
        status: "new",
        createdAt: serverTimestamp(),
      });

      toast({
        title: "Message Sent",
        description: "We've received your message and will get back to you soon.",
      });

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "Requesting a Quote",
        message: "",
      });
      setIsSuccess(true);
    } catch (error: any) {
      toast({
        title: "Submission Failed",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[var(--text)] font-sans">
      <Navbar />

      <section className="pt-28 md:pt-36 pb-16 md:pb-20 bg-[var(--surface-2)] border-b border-[var(--border)]">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-14 items-start">
            <div className="space-y-8 max-w-2xl">
              <div className="space-y-4">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--primary)]">Contact</p>
                <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-[1.02] text-[var(--text)]" data-testid="text-contact-title">
                  Reach the team quickly, with a clearer path into quotes and dispatch.
                </h1>
                <p className="text-base md:text-lg text-[var(--text-muted)] leading-relaxed" data-testid="text-contact-description">
                  We tightened the contact experience for production so customers can immediately see how to call, email, visit, or submit a quote request without the oversized empty spacing from before.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {contactCards.map((card) => (
                  <div key={card.title} className="rounded-[1.5rem] border border-[var(--border)] bg-white p-5 shadow-sm space-y-3">
                    <div className="h-12 w-12 rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center">
                      <card.icon size={24} />
                    </div>
                    <div className="space-y-1">
                      <h2 className="text-lg font-black text-[var(--text)]">{card.title}</h2>
                      <p className="text-sm text-[var(--text-muted)]">{card.subtitle}</p>
                    </div>
                    {card.href ? (
                      <a
                        href={card.href}
                        target={card.href.startsWith("https") ? "_blank" : undefined}
                        rel={card.href.startsWith("https") ? "noopener noreferrer" : undefined}
                        className="text-sm font-semibold text-[var(--text)] hover:text-[var(--primary)] break-words"
                        data-testid={`link-contact-${card.title.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        {card.value}
                      </a>
                    ) : (
                      <p className="text-sm font-semibold text-[var(--text)]" data-testid="text-contact-hours">{card.value}</p>
                    )}
                  </div>
                ))}
              </div>

              <div className="rounded-[1.75rem] overflow-hidden border border-[var(--border)] h-[280px] relative bg-[var(--border)] shadow-sm">
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

            <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-xl shadow-black/5 border border-[var(--border)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)]/5 rounded-bl-full -mr-10 -mt-10" />
              <div className="space-y-3 mb-8 relative z-10">
                <h2 className="text-3xl font-black tracking-tight text-[var(--text)]">Send us a Message</h2>
                <p className="text-[var(--text-muted)] leading-relaxed">
                  Use the form for quotes, partnership questions, driver opportunities, or general project coordination.
                </p>
              </div>

              {isSuccess ? (
                <div className="relative z-10 flex flex-col items-center justify-center py-16 text-center space-y-6">
                  <div className="h-20 w-20 bg-green-500/10 rounded-full flex items-center justify-center text-green-500">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-black text-[var(--text)]">Message Sent Successfully</h3>
                  <p className="text-[var(--text-muted)] max-w-md">
                    Thank you for contacting Forty Niner Trucking. We have received your message and will be in touch shortly.
                  </p>
                  <Button onClick={() => setIsSuccess(false)} variant="outline" data-testid="button-send-another-message" className="rounded-full border-[var(--border)] hover:bg-[var(--surface-2)]">
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-[var(--text-muted)]">First Name</Label>
                      <Input id="firstName" data-testid="input-contact-first-name" value={formData.firstName} onChange={handleChange} placeholder="John" className="h-12 rounded-xl bg-[var(--surface-2)] border-[var(--border)]" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-[var(--text-muted)]">Last Name</Label>
                      <Input id="lastName" data-testid="input-contact-last-name" value={formData.lastName} onChange={handleChange} placeholder="Doe" className="h-12 rounded-xl bg-[var(--surface-2)] border-[var(--border)]" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-[var(--text-muted)]">Email Address</Label>
                      <Input id="email" type="email" data-testid="input-contact-email" value={formData.email} onChange={handleChange} placeholder="john@company.com" className="h-12 rounded-xl bg-[var(--surface-2)] border-[var(--border)]" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-[var(--text-muted)]">Phone Number</Label>
                      <Input id="phone" type="tel" data-testid="input-contact-phone" value={formData.phone} onChange={handleChange} placeholder="(555) 123-4567" className="h-12 rounded-xl bg-[var(--surface-2)] border-[var(--border)]" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-[var(--text-muted)]">I'm interested in</Label>
                    <select id="subject" data-testid="select-contact-subject" value={formData.subject} onChange={handleChange} className="w-full h-12 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-3 text-sm">
                      <option>Requesting a Quote</option>
                      <option>Becoming a Subhauler</option>
                      <option>Driver Opportunities</option>
                      <option>General Inquiry</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-[var(--text-muted)]">Message</Label>
                    <Textarea id="message" data-testid="input-contact-message" value={formData.message} onChange={handleChange} placeholder="Tell us more about your project or inquiry..." className="min-h-[180px] rounded-xl bg-[var(--surface-2)] border-[var(--border)] resize-none" />
                  </div>

                  <Button type="submit" data-testid="button-send-message" disabled={isSubmitting} className="w-full h-12 text-base font-bold rounded-full shadow-lg shadow-[var(--primary)]/20 hover:shadow-[var(--primary)]/30 transition-all flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        Sending...
                        <Loader2 className="animate-spin" size={18} />
                      </>
                    ) : (
                      <>
                        Send Message
                        <ArrowRight size={18} />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
