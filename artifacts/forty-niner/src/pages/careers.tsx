import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Clock3, Loader2, ShieldCheck, Truck } from "lucide-react";
import { useState } from "react";
import Footer from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

const benefits = [
  {
    title: "Professional environment",
    desc: "Respectful communication and a team that values dependable operators.",
    icon: ShieldCheck,
  },
  {
    title: "Well-maintained equipment",
    desc: "Safety-minded trucks and a fleet culture built around reliability.",
    icon: Truck,
  },
  {
    title: "Practical schedules",
    desc: "Local and long-haul opportunities with straightforward expectations.",
    icon: Clock3,
  },
];

export default function Careers() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    experience: "Less than 1 year",
    license: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
        throw new Error("Please fill in all required fields");
      }

      if (!isFirebaseConfigured()) {
        await new Promise((resolve) => setTimeout(resolve, 1200));
        toast({
          title: "Application Sent (Mock)",
          description: "Firebase is not configured. Data logged to console.",
        });
      } else {
        await addDoc(collection(db, "driver_applications"), {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          yearsCommercialDriving: formData.experience,
          cdlNumber: formData.license,
          status: "new",
          createdAt: serverTimestamp(),
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
        license: "",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[var(--text)] font-sans">
      <Navbar />

      <section className="pt-32 md:pt-36 lg:pt-48 pb-16 md:pb-20 bg-[var(--surface-2)] border-b border-[var(--border)]">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-14 items-start">
            <div className="space-y-8 max-w-2xl">
              <div className="space-y-4">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--primary)]">Careers</p>
                <h3 className="text-2xl md:text-3xl font-semibold tracking-tight leading-[1.02] text-[var(--text)]" data-testid="text-careers-title">
                  Driver opportunities presented like a serious hiring page, not just a form.
                </h3>
                <p className="text-base md:text-lg leading-relaxed text-[var(--text-muted)]" data-testid="text-careers-description">
                  We tightened the spacing, clarified the value proposition, and made the application workflow feel more production-ready for qualified CDL drivers.
                </p>
              </div>

              <div className="grid gap-4">
                {benefits.map((benefit) => (
                  <div key={benefit.title} className="rounded-[1.5rem] border border-[var(--border)] bg-white p-5 shadow-sm flex gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center shrink-0">
                      <benefit.icon size={24} />
                    </div>
                    <div className="space-y-1">
                      <h2 className="text-base font-semibold text-[var(--text)]">{benefit.title}</h2>
                      <p className="text-[var(--text-muted)] leading-relaxed">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-[1.75rem] bg-[var(--text)] text-white p-6 space-y-3">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/70">Hiring snapshot</p>
                <p className="text-xl font-semibold">Class A or Class B CDL required.</p>
                <p className="text-white/75 leading-relaxed">
                  We support long-haul and daily local work. Weekends are not mandatory, though select projects may require additional flexibility.
                </p>
              </div>
            </div>

            <Card className="rounded-[2rem] border border-[var(--border)] bg-white shadow-xl shadow-black/5">
              <CardContent className="p-8 md:p-10">
                <div className="space-y-3 mb-8">
                  <h2 className="text-2xl font-semibold tracking-tight text-[var(--text)]">Driver Application</h2>
                  <p className="text-[var(--text-muted)] leading-relaxed">
                    Complete the form below and our team will review your experience, CDL information, and availability.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-[var(--text-muted)]">First Name</Label>
                      <Input
                        id="firstName"
                        data-testid="input-first-name"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="John"
                        className="h-12 rounded-xl bg-[var(--surface-2)] border-[var(--border)]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-[var(--text-muted)]">Last Name</Label>
                      <Input
                        id="lastName"
                        data-testid="input-last-name"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Doe"
                        className="h-12 rounded-xl bg-[var(--surface-2)] border-[var(--border)]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[var(--text-muted)]">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      data-testid="input-email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="h-12 rounded-xl bg-[var(--surface-2)] border-[var(--border)]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-[var(--text-muted)]">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      data-testid="input-phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(555) 000-0000"
                      className="h-12 rounded-xl bg-[var(--surface-2)] border-[var(--border)]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience" className="text-[var(--text-muted)]">Years of Commercial Driving</Label>
                    <select
                      id="experience"
                      data-testid="select-driving-experience"
                      value={formData.experience}
                      onChange={handleChange}
                      className="w-full h-12 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-3 text-sm"
                    >
                      <option>Less than 1 year</option>
                      <option>1-3 years</option>
                      <option>3-5 years</option>
                      <option>5+ years</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="license" className="text-[var(--text-muted)]">CDL Number</Label>
                    <Input
                      id="license"
                      data-testid="input-cdl-number"
                      value={formData.license}
                      onChange={handleChange}
                      placeholder="Enter license #"
                      className="h-12 rounded-xl bg-[var(--surface-2)] border-[var(--border)]"
                    />
                  </div>

                  <div className="rounded-[1.25rem] border border-[var(--border)] bg-[var(--surface-2)] p-4 flex items-start gap-3">
                    <CheckCircle2 size={18} className="mt-0.5 text-[var(--primary)] shrink-0" />
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed" data-testid="text-careers-note">
                      Provide your best contact details so the team can follow up quickly after reviewing your application.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    data-testid="button-submit-application"
                    disabled={isSubmitting}
                    className="w-full rounded-full h-12 text-base font-bold bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" /> : "Submit Application"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
