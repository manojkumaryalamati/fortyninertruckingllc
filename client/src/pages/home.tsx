import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, Clock3, HardHat, MapPin, ShieldCheck, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import heroImage1 from "@/assets/a2a02ae8-e30d-4a34-ad88-64598b4c945f_1772219729261.jpeg";
import heroImage2 from "@/assets/867d8163-e94d-4056-b575-856aa6f68ace_1772219729261.jpeg";
import heroImage3 from "@/assets/2901750e-cf47-4cc3-af40-fe476f6840bc_1772219729261.jpeg";
import heroImage4 from "@/assets/d04ae16f-4942-46fc-bb1d-ac0c5740543c_1772219729261.jpeg";

const carouselImages = [heroImage1, heroImage2, heroImage3, heroImage4];

const metrics = [
  { value: "24/7", label: "Dispatch support" },
  { value: "DBE & SB", label: "Certified partner" },
  { value: "CARB", label: "Compliant fleet" },
  { value: "Pittsburg", label: "California headquarters" },
];

const capabilities = [
  {
    title: "Construction hauling",
    description: "Reliable transport of aggregates, asphalt, sand, rock, and site materials for demanding project schedules.",
    icon: Truck,
  },
  {
    title: "Fleet ready for production work",
    description: "Well-maintained dump trucks and specialized equipment positioned for both local and long-haul jobs.",
    icon: ShieldCheck,
  },
  {
    title: "Responsive field coordination",
    description: "Clear communication, dependable arrival windows, and dispatch support that keeps crews moving.",
    icon: Clock3,
  },
];

const proofPoints = [
  "24/7 dispatch coverage for active jobs",
  "Safety-first operations and compliance discipline",
  "Trusted support for contractors, municipalities, and developers",
  "Clear communication from bid stage to final delivery",
];

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white text-[var(--text)] font-sans selection:bg-[var(--primary)]/20">
      <Navbar />

      <section className="pt-28 md:pt-36 pb-16 md:pb-20 bg-[var(--surface-2)] border-b border-[var(--border)] overflow-hidden">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="space-y-8"
            >
              <div className="inline-flex items-center rounded-full border border-[var(--primary)]/15 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-[var(--primary)]">
                California construction logistics
              </div>
              <div className="space-y-5 max-w-2xl">
                <h1 className="text-4xl md:text-5xl xl:text-6xl font-black tracking-tight leading-[0.95] text-[var(--text)]" data-testid="text-home-hero-title">
                  The dependable hauling partner for high-demand job sites.
                </h1>
                <p className="text-lg md:text-xl leading-relaxed text-[var(--text-muted)] max-w-xl" data-testid="text-home-hero-description">
                  Forty Niner Trucking LLC supports contractors, developers, and public works teams with certified fleet coverage, disciplined dispatch, and production-ready transportation.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/contact">
                  <Button data-testid="button-home-request-quote" className="w-full sm:w-auto h-12 px-6 rounded-full bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90 shadow-lg shadow-[var(--primary)]/20">
                    Talk to Dispatch
                    <ArrowRight className="ml-2" size={18} />
                  </Button>
                </Link>
                <Link href="/fleet">
                  <Button data-testid="button-home-view-fleet" variant="outline" className="w-full sm:w-auto h-12 px-6 rounded-full border-[var(--border)] bg-white text-[var(--text)] hover:bg-white">
                    Explore Our Fleet
                  </Button>
                </Link>
              </div>

              <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-3">
                {metrics.map((metric) => (
                  <div key={metric.label} className="rounded-2xl border border-[var(--border)] bg-white p-4 shadow-sm">
                    <p className="text-lg font-black text-[var(--text)]" data-testid={`text-metric-${metric.value.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
                      {metric.value}
                    </p>
                    <p className="text-sm text-[var(--text-muted)]">{metric.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.12, ease: "easeOut" }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-[var(--primary)]/10 blur-3xl rounded-[2rem]" />
              <div className="relative rounded-[2rem] overflow-hidden border border-white/60 bg-white shadow-2xl shadow-black/5">
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImageIndex}
                      src={carouselImages[currentImageIndex]}
                      alt="Forty Niner Trucking fleet"
                      initial={{ opacity: 0.15, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0.15 }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                      className="h-full w-full object-contain bg-[var(--surface-2)] p-4"
                    />
                  </AnimatePresence>
                </div>
                <div className="grid grid-cols-2 gap-3 p-5 bg-white">
                  <div className="rounded-2xl border border-[var(--border)] p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--primary)]">Service focus</p>
                    <p className="mt-2 text-base font-bold text-[var(--text)]">Construction materials, aggregates, and dump operations</p>
                  </div>
                  <div className="rounded-2xl border border-[var(--border)] p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--primary)]">Operating style</p>
                    <p className="mt-2 text-base font-bold text-[var(--text)]">Clear dispatch, dependable schedules, and site-ready support</p>
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
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--primary)]">Why teams choose Forty Niner</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[var(--text)]">A cleaner, more reliable way to manage heavy hauling.</h2>
            <p className="text-lg text-[var(--text-muted)] leading-relaxed">We combine field-tested equipment with responsive coordination so your crews get the support they need without guesswork.</p>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            {capabilities.map((item) => (
              <Card key={item.title} className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface-2)] shadow-sm">
                <CardContent className="p-8 space-y-5">
                  <div className="h-14 w-14 rounded-2xl bg-white border border-[var(--border)] flex items-center justify-center text-[var(--primary)]">
                    <item.icon size={28} />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-black tracking-tight text-[var(--text)]">{item.title}</h3>
                    <p className="text-[var(--text-muted)] leading-relaxed">{item.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-[var(--surface-2)] border-y border-[var(--border)]">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-8 lg:gap-12 items-center">
            <div className="rounded-[2rem] overflow-hidden border border-[var(--border)] bg-white shadow-sm">
              <img src={heroImage4} alt="Dump truck at construction site" className="w-full aspect-[4/3] object-contain bg-[var(--surface-2)] p-4" />
            </div>
            <div className="space-y-6">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--primary)]">Production-ready support</p>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[var(--text)]">Built for demanding schedules, site constraints, and compliance expectations.</h2>
              <p className="text-lg text-[var(--text-muted)] leading-relaxed">Our approach is straightforward: keep the equipment dependable, keep the communication clear, and keep the project moving with the right trucks in the right place.</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {proofPoints.map((point) => (
                  <div key={point} className="flex items-start gap-3 rounded-2xl bg-white border border-[var(--border)] p-4 shadow-sm">
                    <div className="mt-0.5 h-8 w-8 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] shrink-0">
                      <CheckCircle2 size={16} />
                    </div>
                    <p className="text-sm font-medium text-[var(--text-muted)] leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
