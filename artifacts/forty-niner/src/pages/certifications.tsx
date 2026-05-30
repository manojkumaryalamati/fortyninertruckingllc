import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Award, FileText, ShieldCheck, Truck } from "lucide-react";
import Footer from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

const certifications = [
  {
    title: "DBE Certified",
    description: "Disadvantaged Business Enterprise certification supporting participation in federally funded transportation work.",
    code: "DBE-29183-CA",
    icon: ShieldCheck,
  },
  {
    title: "Small Business (SB)",
    description: "Certified Small Business status supporting project set-asides and local participation requirements.",
    code: "SB-99281-CA",
    icon: Award,
  },
];

const permits = [
  { title: "Motor Carrier Permit", code: "CA-561086", icon: Truck },
  { title: "Operating documentation", code: "Maintained and current", icon: FileText },
];

export default function Certifications() {
  return (
    <div className="min-h-screen bg-white text-[var(--text)] font-sans">
      <Navbar />

      <section className="pt-32 md:pt-36 lg:pt-48 pb-16 md:pb-20 bg-[var(--surface-2)] border-b border-[var(--border)]">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center">
            <div className="space-y-7 max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--primary)]">Certifications</p>
              <h3 className="text-2xl md:text-3xl font-semibold tracking-tight leading-[1.02] text-[var(--text)]" data-testid="text-certifications-title">
                Compliance credentials presented with the clarity expected in production.
              </h3>
              <p className="text-base md:text-lg text-[var(--text-muted)] leading-relaxed" data-testid="text-certifications-description">
                This page now supports trust-building more directly by surfacing certifications, permit references, and operating posture in a cleaner format that is easier for partners to scan.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/contact">
                  <Button data-testid="button-certifications-contact" className="w-full sm:w-auto rounded-full bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90">
                    Discuss Project Requirements
                    <ArrowRight className="ml-2" size={18} />
                  </Button>
                </Link>
                <Link href="/services">
                  <Button data-testid="button-certifications-services" variant="outline" className="w-full sm:w-auto rounded-full border-[var(--border)] bg-white text-[var(--text)] hover:bg-white">
                    Review Services
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[1.75rem] border border-[var(--border)] bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--primary)]">Compliance posture</p>
                <p className="mt-3 text-xl font-semibold text-[var(--text)]">Safety-first, certification-backed operations</p>
                <p className="mt-3 text-[var(--text-muted)] leading-relaxed">Positioned for customers who need confidence in documentation, professionalism, and operating standards before work begins.</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-[1.5rem] border border-[var(--border)] bg-white p-5 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--primary)]">Primary certifications</p>
                  <p className="mt-2 text-lg font-semibold text-[var(--text)]">DBE & SB</p>
                </div>
                <div className="rounded-[1.5rem] border border-[var(--border)] bg-white p-5 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--primary)]">Operations</p>
                  <p className="mt-2 text-lg font-semibold text-[var(--text)]">California-ready fleet support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-6 mb-10 md:mb-12">
            {certifications.map((item) => (
              <Card key={item.title} className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface-2)] shadow-sm">
                <CardContent className="p-8 text-center space-y-5">
                  <div className="mx-auto h-16 w-16 rounded-2xl bg-white border border-[var(--border)] flex items-center justify-center text-[var(--primary)]">
                    <item.icon size={30} />
                  </div>
                  <div className="space-y-3">
                    <h2 className="text-xl font-semibold tracking-tight text-[var(--text)]">{item.title}</h2>
                    <p className="text-[var(--text-muted)] leading-relaxed">{item.description}</p>
                  </div>
                  <div className="rounded-2xl bg-white border border-[var(--border)] px-4 py-3 text-sm font-mono text-[var(--text-muted)]" data-testid={`text-certification-${item.code.toLowerCase()}`}>
                    Cert # {item.code}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface-2)] p-6 md:p-8 shadow-sm">
            <div className="max-w-2xl space-y-3 mb-8">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--primary)]">Permits and references</p>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[var(--text)]">Operating details presented in one cleaner section.</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {permits.map((permit) => (
                <div key={permit.title} className="flex items-start gap-4 rounded-[1.5rem] bg-white border border-[var(--border)] p-5 shadow-sm">
                  <div className="h-12 w-12 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] shrink-0">
                    <permit.icon size={24} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-semibold text-[var(--text)]">{permit.title}</h3>
                    <p className="text-sm font-mono text-[var(--text-muted)]">{permit.code}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
