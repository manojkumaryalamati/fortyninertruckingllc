import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { CheckCircle2, FileText, Handshake, Loader2, ShieldCheck, Truck } from "lucide-react";
import { useState } from "react";
import Footer from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

const partnerBenefits = [
  {
    title: "Fair dispatch",
    desc: "Straightforward communication and load opportunities aligned with active project needs.",
    icon: Handshake,
  },
  {
    title: "Compliance-focused",
    desc: "A safety-first operating standard built around dependable paperwork and professional expectations.",
    icon: ShieldCheck,
  },
  {
    title: "Consistent work opportunities",
    desc: "Long-term relationships for owner-operators and fleets that want repeatable project support.",
    icon: Truck,
  },
];

export default function Subhaulers() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    truckTypes: "",
    fleetSize: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!formData.companyName || !formData.contactPerson || !formData.email || !formData.phone) {
        throw new Error("Please fill in all required fields");
      }

      if (!isFirebaseConfigured()) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        toast({
          title: "Registration Sent (Mock)",
          description: "Firebase is not configured. Check console for data.",
        });
      } else {
        await addDoc(collection(db, "subhauler_registrations"), {
          ...formData,
          createdAt: serverTimestamp(),
          status: "new",
        });

        toast({
          title: "Registration Sent",
          description: "We've received your registration and will contact you soon.",
        });
      }

      setFormData({
        companyName: "",
        contactPerson: "",
        email: "",
        phone: "",
        truckTypes: "",
        fleetSize: "",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit registration. Please try again.",
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
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--primary)]">Subhaulers</p>
                <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-[1.02] text-[var(--text)]" data-testid="text-subhaulers-title">
                  Partnership information that feels ready for serious fleet conversations.
                </h1>
                <p className="text-lg md:text-xl leading-relaxed text-[var(--text-muted)]" data-testid="text-subhaulers-description">
                  We rebuilt this page to create a cleaner trust path for owner-operators and fleet partners looking for long-term work, clear terms, and dependable dispatch communication.
                </p>
              </div>

              <div className="grid gap-4">
                {partnerBenefits.map((item) => (
                  <div key={item.title} className="rounded-[1.5rem] border border-[var(--border)] bg-white p-5 shadow-sm flex gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center shrink-0">
                      <item.icon size={24} />
                    </div>
                    <div className="space-y-1">
                      <h2 className="text-lg font-black text-[var(--text)]">{item.title}</h2>
                      <p className="text-[var(--text-muted)] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-[1.75rem] border border-[var(--border)] bg-white p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center">
                    <FileText size={22} />
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--primary)]">Required document</p>
                    <h2 className="text-xl font-black text-[var(--text)]">Subhauler Agreement</h2>
                  </div>
                </div>
                <p className="text-[var(--text-muted)] leading-relaxed">
                  Review our terms and expectations before registering so both sides start with a clear understanding of compliance and working standards.
                </p>
                <Button asChild variant="outline" className="rounded-full border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white">
                  <a
                    href="/src/assets/fortyNinerTruckingSubhauler.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="link-view-subhauler-document"
                  >
                    View Document
                  </a>
                </Button>
              </div>
            </div>

            <Card className="rounded-[2rem] border border-[var(--border)] bg-white shadow-xl shadow-black/5">
              <CardContent className="p-8 md:p-10">
                <div className="space-y-3 mb-8">
                  <h2 className="text-3xl font-black tracking-tight text-[var(--text)]">Subhauler Registration</h2>
                  <p className="text-[var(--text-muted)] leading-relaxed">
                    Tell us about your company, available truck types, and fleet size so we can evaluate fit and follow up quickly.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName" className="text-[var(--text-muted)]">Company Name</Label>
                      <Input id="companyName" data-testid="input-company-name" value={formData.companyName} onChange={handleChange} placeholder="Your Trucking Co." className="h-12 rounded-xl bg-[var(--surface-2)] border-[var(--border)]" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactPerson" className="text-[var(--text-muted)]">Contact Person</Label>
                      <Input id="contactPerson" data-testid="input-contact-person" value={formData.contactPerson} onChange={handleChange} placeholder="Full name" className="h-12 rounded-xl bg-[var(--surface-2)] border-[var(--border)]" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[var(--text-muted)]">Email Address</Label>
                    <Input id="email" type="email" data-testid="input-subhauler-email" value={formData.email} onChange={handleChange} placeholder="dispatch@example.com" className="h-12 rounded-xl bg-[var(--surface-2)] border-[var(--border)]" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-[var(--text-muted)]">Phone Number</Label>
                    <Input id="phone" type="tel" data-testid="input-subhauler-phone" value={formData.phone} onChange={handleChange} placeholder="(555) 000-0000" className="h-12 rounded-xl bg-[var(--surface-2)] border-[var(--border)]" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="truckTypes" className="text-[var(--text-muted)]">Truck Types Available</Label>
                    <Input id="truckTypes" data-testid="input-truck-types" value={formData.truckTypes} onChange={handleChange} placeholder="Super dumps, transfers, end dumps" className="h-12 rounded-xl bg-[var(--surface-2)] border-[var(--border)]" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fleetSize" className="text-[var(--text-muted)]">Fleet Size</Label>
                    <Input id="fleetSize" type="number" data-testid="input-fleet-size" value={formData.fleetSize} onChange={handleChange} placeholder="Number of units" className="h-12 rounded-xl bg-[var(--surface-2)] border-[var(--border)]" />
                  </div>

                  <div className="rounded-[1.25rem] border border-[var(--border)] bg-[var(--surface-2)] p-4 flex items-start gap-3">
                    <CheckCircle2 size={18} className="mt-0.5 text-[var(--primary)] shrink-0" />
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed" data-testid="text-subhauler-note">
                      Complete company and contact details help us evaluate dispatch fit, compliance readiness, and follow-up timing.
                    </p>
                  </div>

                  <Button type="submit" data-testid="button-submit-registration" disabled={isSubmitting} className="w-full rounded-full h-12 text-base font-bold bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90">
                    {isSubmitting ? <Loader2 className="animate-spin" /> : "Submit Registration"}
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
