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
          <div className="grid lg:grid-cols-[0.82fr_1.18fr] gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="order-2 lg:order-1 space-y-6 max-w-lg"
            >
              <div className="inline-flex items-center rounded-full border border-[var(--primary)]/15 bg-white/90 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--primary)] shadow-sm">
                California construction logistics
              </div>
              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl xl:text-[2.9rem] font-black tracking-tight leading-[1] text-[var(--text)]" data-testid="text-home-hero-title">
                  The dependable hauling partner for high-demand job sites.
                </h1>
                <p className="text-sm md:text-base leading-relaxed text-[var(--text-muted)] max-w-md" data-testid="text-home-hero-description">
                  Certified fleet coverage, disciplined dispatch, and production-ready transportation for contractors, developers, and public works teams.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/contact">
                  <Button data-testid="button-home-request-quote" className="w-full sm:w-auto h-11 px-5 rounded-full bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90 shadow-lg shadow-[var(--primary)]/20">
                    Talk to Dispatch
                    <ArrowRight className="ml-2" size={17} />
                  </Button>
                </Link>
                <Link href="/fleet">
                  <Button data-testid="button-home-view-fleet" variant="outline" className="w-full sm:w-auto h-11 px-5 rounded-full border-[var(--border)] bg-white text-[var(--text)] hover:bg-white">
                    Explore Our Fleet
                  </Button>
                </Link>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {metrics.slice(0, 2).map((metric) => (
                  <div key={metric.label} className="rounded-2xl border border-[var(--border)]/80 bg-white/85 p-3.5 shadow-sm backdrop-blur-sm">
                    <p className="text-base font-black text-[var(--text)]" data-testid={`text-metric-${metric.value.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
                      {metric.value}
                    </p>
                    <p className="text-xs text-[var(--text-muted)]">{metric.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.12, ease: "easeOut" }}
              className="order-1 lg:order-2 relative"
            >
              <div className="absolute -inset-5 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.18),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(15,23,42,0.08),transparent_38%)] blur-2xl rounded-[2.5rem]" />
              <div className="relative rounded-[2.25rem] border border-white/70 bg-white/92 p-4 md:p-5 shadow-[0_28px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl">
                <div className="relative overflow-hidden rounded-[1.9rem] border border-[var(--border)] bg-[linear-gradient(180deg,#f8fafc_0%,#eef2f7_100%)]">
                  <div className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-full bg-white/92 px-3 py-2 text-xs font-semibold text-[var(--text)] shadow-sm backdrop-blur-sm">
                    <HardHat size={15} className="text-[var(--primary)]" />
                    Production-ready fleet support
                  </div>
                  <div className="aspect-[16/11] w-full overflow-hidden px-4 pt-14 pb-5 md:px-6 md:pb-6">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentImageIndex}
                        src={carouselImages[currentImageIndex]}
                        alt="Forty Niner Trucking fleet"
                        initial={{ opacity: 0.2, scale: 1.03 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0.2 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="h-full w-full object-contain drop-shadow-[0_20px_35px_rgba(15,23,42,0.12)]"
                      />
                    </AnimatePresence>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 z-10 p-4 md:p-5">
                    <div className="grid gap-3 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
                      <div className="rounded-2xl bg-white/92 p-4 shadow-sm backdrop-blur-md">
                        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--primary)]">Service focus</p>
                        <p className="mt-2 text-sm md:text-base font-bold text-[var(--text)]">Construction materials, aggregates, and dump operations</p>
                      </div>
                      <div className="rounded-2xl bg-white/88 p-4 shadow-sm backdrop-blur-md">
                        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--primary)]">
                          <Clock3 size={14} />
                          Dispatch
                        </div>
                        <p className="mt-2 text-sm font-semibold text-[var(--text)]">24/7 schedule support</p>
                      </div>
                      <div className="rounded-2xl bg-white/88 p-4 shadow-sm backdrop-blur-md">
                        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--primary)]">
                          <MapPin size={14} />
                          Base
                        </div>
                        <p className="mt-2 text-sm font-semibold text-[var(--text)]">Pittsburg, California</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-4 px-1">
                  <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
                      <ShieldCheck size={15} />
                    </span>
                    DBE & SB certified and CARB-ready equipment
                  </div>
                  <div className="flex items-center gap-2">
                    {carouselImages.map((_, index) => (
                      <span
                        key={index}
                        className={`block rounded-full transition-all duration-300 ${index === currentImageIndex ? "h-2.5 w-7 bg-[var(--primary)]" : "h-2.5 w-2.5 bg-[var(--border)]"}`}
                      />
                    ))}
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
