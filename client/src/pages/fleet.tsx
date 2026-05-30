import { Link } from "wouter";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, CheckCircle2, Gauge, ShieldCheck, Truck, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import heroImage1 from "@/assets/a2a02ae8-e30d-4a34-ad88-64598b4c945f_1772219729261.jpeg";
import heroImage2 from "@/assets/867d8163-e94d-4056-b575-856aa6f68ace_1772219729261.jpeg";

const fleetTypes = [
  { name: "Super Dumps", highlight: "Maximum payload", copy: "Designed for heavy material movement with strong productivity across larger project demands." },
  { name: "Super Tags", highlight: "Balanced stability", copy: "A versatile option that balances hauling capacity with dependable road performance." },
  { name: "Super 10s", highlight: "Tighter access", copy: "A strong fit for constrained job sites where maneuverability matters as much as capacity." },
  { name: "Ten Wheelers", highlight: "Daily workhorse", copy: "Reliable equipment for aggregates, construction materials, and steady site support." },
  { name: "End Dumps", highlight: "Fast unload cycles", copy: "Built for efficient bulk unloading where turnaround and volume both matter." },
  { name: "Dispatch matched", highlight: "Right truck, right job", copy: "Fleet planning centered on material type, route needs, and job-site constraints." },
];

const standards = [
  "Preventive maintenance schedules keep equipment dependable",
  "CARB-compliant fleet support for California operations",
  "Safety-first operating standards across dispatch and field coordination",
  "Responsive communication when schedules or site conditions change",
];

export default function Fleet() {
  return (
    <div className="min-h-screen bg-white text-[var(--text)] font-sans">
      <Navbar />

      <section className="pt-28 md:pt-36 pb-16 md:pb-20 bg-[var(--surface-2)] border-b border-[var(--border)]">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-[1.02fr_0.98fr] gap-10 lg:gap-14 items-center">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="space-y-7 max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--primary)]">Fleet</p>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-[0.98] text-[var(--text)]" data-testid="text-fleet-title">
                Specialized equipment matched to the realities of heavy construction work.
              </h1>
              <p className="text-lg md:text-xl leading-relaxed text-[var(--text-muted)]" data-testid="text-fleet-description">
                We replaced the hard-to-read image overlay with a cleaner production layout that highlights what decision-makers actually need: fleet types, maintenance confidence, and dispatch support.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/contact">
                  <Button data-testid="button-fleet-request-availability" className="w-full sm:w-auto rounded-full bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90">
                    Request Fleet Availability
                    <ArrowRight className="ml-2" size={18} />
                  </Button>
                </Link>
                <Link href="/services">
                  <Button data-testid="button-fleet-view-services" variant="outline" className="w-full sm:w-auto rounded-full border-[var(--border)] bg-white text-[var(--text)] hover:bg-white">
                    View Services
                  </Button>
                </Link>
              </div>
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="rounded-2xl border border-[var(--border)] bg-white p-4 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--primary)]">Uptime</p>
                  <p className="mt-2 text-2xl font-black text-[var(--text)]">99.8%</p>
                </div>
                <div className="rounded-2xl border border-[var(--border)] bg-white p-4 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--primary)]">Compliance</p>
                  <p className="mt-2 text-2xl font-black text-[var(--text)]">CARB Ready</p>
                </div>
                <div className="rounded-2xl border border-[var(--border)] bg-white p-4 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--primary)]">Dispatch</p>
                  <p className="mt-2 text-2xl font-black text-[var(--text)]">24/7</p>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="relative">
              <div className="absolute -inset-4 bg-[var(--primary)]/10 blur-3xl rounded-[2rem]" />
              <div className="relative rounded-[2rem] overflow-hidden border border-[var(--border)] bg-white shadow-sm">
                <img src={heroImage1} alt="Forty Niner Trucking fleet" className="w-full aspect-[4/3] object-cover" />
                <div className="grid grid-cols-2 gap-3 p-5 bg-white">
                  <div className="rounded-2xl border border-[var(--border)] p-4">
                    <ShieldCheck className="text-[var(--primary)]" size={24} />
                    <p className="mt-3 text-base font-black text-[var(--text)]">Well-maintained equipment</p>
                  </div>
                  <div className="rounded-2xl border border-[var(--border)] p-4">
                    <Gauge className="text-[var(--primary)]" size={24} />
                    <p className="mt-3 text-base font-black text-[var(--text)]">Matched to payload and site needs</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="max-w-3xl space-y-4 mb-10 md:mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--primary)]">Fleet types</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[var(--text)]">The equipment lineup is now easier to scan and compare.</h2>
            <p className="text-lg text-[var(--text-muted)] leading-relaxed">We simplified this section for production so fleet types read clearly without competing against a photo background.</p>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {fleetTypes.map((truck) => (
              <Card key={truck.name} className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface-2)] shadow-sm">
                <CardContent className="p-7 space-y-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-white border border-[var(--border)] flex items-center justify-center text-[var(--primary)]">
                      <Truck size={28} />
                    </div>
                    <span className="rounded-full bg-white border border-[var(--border)] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">{truck.highlight}</span>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-black tracking-tight text-[var(--text)]">{truck.name}</h3>
                    <p className="text-[var(--text-muted)] leading-relaxed">{truck.copy}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-[var(--surface-2)] border-y border-[var(--border)]">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center">
            <div className="space-y-6">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--primary)]">Maintenance and reliability</p>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[var(--text)]">Dependable fleet performance starts long before the truck leaves the yard.</h2>
              <p className="text-lg text-[var(--text-muted)] leading-relaxed">This content now does a better job of building trust around maintenance standards, compliance posture, and day-to-day operating discipline.</p>
              <div className="grid gap-4">
                {standards.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-[var(--border)] bg-white p-4 shadow-sm">
                    <div className="mt-0.5 h-8 w-8 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] shrink-0">
                      <CheckCircle2 size={16} />
                    </div>
                    <p className="text-sm font-medium text-[var(--text-muted)] leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] overflow-hidden border border-[var(--border)] bg-white shadow-sm">
              <img src={heroImage2} alt="Fleet maintenance and reliability" className="w-full aspect-[4/3] object-cover" />
              <div className="p-5 border-t border-[var(--border)] bg-white">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-[var(--text)] text-white flex items-center justify-center">
                    <Wrench size={22} />
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-muted)]">Service discipline</p>
                    <p className="text-xl font-black text-[var(--text)]">Preventive maintenance with uptime focus</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white text-center">
        <div className="w-full max-w-[1000px] mx-auto px-4 md:px-8 space-y-6">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--primary)]">Get the right trucks in place</p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[var(--text)]">Need specific fleet coverage for an upcoming project?</h2>
          <p className="text-lg text-[var(--text-muted)] leading-relaxed">The action path is simpler now: review fleet types, then move directly into a dispatch conversation about timing, materials, and availability.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
            <Link href="/contact">
              <Button data-testid="button-fleet-cta-contact" className="rounded-full bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90">Request Availability</Button>
            </Link>
            <Link href="/services">
              <Button data-testid="button-fleet-cta-services" variant="outline" className="rounded-full border-[var(--border)]">Compare Service Types</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
