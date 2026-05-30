import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, Clock3, HardHat, MapPinned, ShieldCheck, Truck } from "lucide-react";
import Footer from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import heroImage3 from "@/assets/2901750e-cf47-4cc3-af40-fe476f6840bc_1772219729261.jpeg";
import heroImage4 from "@/assets/d04ae16f-4942-46fc-bb1d-ac0c5740543c_1772219729261.jpeg";

const services = [
  {
    title: "Construction material hauling",
    description: "Reliable movement of sand, gravel, aggregate, asphalt, and site materials with consistent dispatch communication.",
    points: ["Job-site scheduling", "Material flow coordination", "Reliable daily coverage"],
    icon: HardHat,
  },
  {
    title: "Dump truck services",
    description: "Fleet support for excavation, grading, paving, demo removal, and bulk load transport where timing matters.",
    points: ["Rapid turnarounds", "High-capacity trucks", "Controlled unloading"],
    icon: Truck,
  },
  {
    title: "Dispatch coordination",
    description: "A straightforward operating model built around communication, accountability, and dependable field responsiveness.",
    points: ["24/7 dispatch access", "Clear routing updates", "Production-minded support"],
    icon: Clock3,
  },
  {
    title: "Certified project support",
    description: "Experienced partner support for contractors, developers, and public works teams looking for compliance-focused execution.",
    points: ["DBE & SB certified", "Safety-first standards", "California-ready operations"],
    icon: ShieldCheck,
  },
];

const process = [
  { step: "01", title: "Tell us the schedule", copy: "Share your material, delivery window, project scale, and location requirements." },
  { step: "02", title: "We match the fleet", copy: "Dispatch aligns the right trucks and support plan for your job conditions." },
  { step: "03", title: "Your site stays moving", copy: "We keep communication clean and equipment positioned for productive daily work." },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-white text-[var(--text)] font-sans">
      <Navbar />

      <section className="pt-28 md:pt-36 pb-16 md:pb-20 bg-[var(--surface-2)] border-b border-[var(--border)]">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center">
            <div className="space-y-7 max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--primary)]">Services</p>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-[0.98] text-[var(--text)]" data-testid="text-services-title">
                Specialized hauling support for construction timelines that cannot slip.
              </h1>
              <p className="text-lg md:text-xl text-[var(--text-muted)] leading-relaxed" data-testid="text-services-description">
                We refined this page around the real decision criteria for production work: responsive dispatch, capable equipment, clear scheduling, and confidence in the team executing the load plan.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/contact">
                  <Button data-testid="button-services-request-quote" className="w-full sm:w-auto rounded-full bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90">
                    Request Service
                    <ArrowRight className="ml-2" size={18} />
                  </Button>
                </Link>
                <Link href="/fleet">
                  <Button data-testid="button-services-view-fleet" variant="outline" className="w-full sm:w-auto rounded-full border-[var(--border)] bg-white text-[var(--text)] hover:bg-white">
                    View Fleet Availability
                  </Button>
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-[var(--border)] bg-white p-6 md:p-7 shadow-sm">
              <div className="rounded-[1.5rem] overflow-hidden border border-[var(--border)]">
                <img src={heroImage3} alt="Forty Niner hauling services" className="w-full aspect-[4/3] object-cover" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4 mt-5">
                <div className="rounded-2xl bg-[var(--surface-2)] p-4 border border-[var(--border)]">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--primary)]">Coverage</p>
                  <p className="mt-2 font-black text-[var(--text)]">Construction logistics and material transport</p>
                </div>
                <div className="rounded-2xl bg-[var(--surface-2)] p-4 border border-[var(--border)]">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--primary)]">Response</p>
                  <p className="mt-2 font-black text-[var(--text)]">24/7 dispatch support when schedules change</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service) => (
              <Card key={service.title} className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface-2)] shadow-sm">
                <CardContent className="p-8 space-y-6">
                  <div className="h-14 w-14 rounded-2xl bg-white border border-[var(--border)] flex items-center justify-center text-[var(--primary)]">
                    <service.icon size={28} />
                  </div>
                  <div className="space-y-3">
                    <h2 className="text-2xl font-black tracking-tight text-[var(--text)]">{service.title}</h2>
                    <p className="text-[var(--text-muted)] leading-relaxed">{service.description}</p>
                  </div>
                  <div className="space-y-3">
                    {service.points.map((point) => (
                      <div key={point} className="flex items-start gap-3 text-sm text-[var(--text-muted)]">
                        <CheckCircle2 size={16} className="mt-0.5 text-[var(--primary)] shrink-0" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-[var(--surface-2)] border-y border-[var(--border)]">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-14 items-center">
            <div className="rounded-[2rem] overflow-hidden border border-[var(--border)] bg-white shadow-sm">
              <img src={heroImage4} alt="Dump truck services" className="w-full aspect-[4/3] object-cover" />
            </div>
            <div className="space-y-6">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--primary)]">How we work</p>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[var(--text)]">A simpler service flow for teams that need confidence fast.</h2>
              <p className="text-lg text-[var(--text-muted)] leading-relaxed">Instead of oversized marketing language, this section now explains the operating flow clearly so customers know exactly what working with Forty Niner looks like.</p>
              <div className="grid gap-4">
                {process.map((item) => (
                  <div key={item.step} className="rounded-2xl border border-[var(--border)] bg-white p-5 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center font-black">{item.step}</div>
                      <div className="space-y-1">
                        <h3 className="text-lg font-black text-[var(--text)]">{item.title}</h3>
                        <p className="text-[var(--text-muted)] leading-relaxed">{item.copy}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white border border-[var(--border)] p-5">
                  <MapPinned className="text-[var(--primary)]" size={24} />
                  <p className="mt-3 text-lg font-black text-[var(--text)]">Project-ready coverage</p>
                  <p className="text-sm text-[var(--text-muted)] mt-1">Built around active construction schedules and changing field demands.</p>
                </div>
                <div className="rounded-2xl bg-white border border-[var(--border)] p-5">
                  <ShieldCheck className="text-[var(--primary)]" size={24} />
                  <p className="mt-3 text-lg font-black text-[var(--text)]">Compliance-minded execution</p>
                  <p className="text-sm text-[var(--text-muted)] mt-1">Positioned for teams that care about safety standards and reliable documentation.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 text-center space-y-6">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--primary)]">Start the conversation</p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[var(--text)]">Need a hauling partner that can support the way your project actually runs?</h2>
          <p className="max-w-3xl mx-auto text-lg text-[var(--text-muted)] leading-relaxed">The CTA flow is now clearer: request service, confirm fleet needs, and move directly into dispatch conversations without hunting for the next step.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
            <Link href="/contact">
              <Button data-testid="button-services-cta-contact" className="rounded-full bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90">Contact Dispatch</Button>
            </Link>
            <Link href="/fleet">
              <Button data-testid="button-services-cta-fleet" variant="outline" className="rounded-full border-[var(--border)]">Review Fleet Types</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
