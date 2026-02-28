import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, ShieldCheck, FileText, Award } from "lucide-react";
import Footer from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export default function Certifications() {
  return (
    <div className="min-h-screen bg-[var(--surface-2)] text-[var(--text)] font-sans pt-40 md:pt-56 pb-32">
      <Navbar />

      <div className="w-full max-w-[1800px] mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center mb-32 space-y-8">
          <h1 className="text-5xl font-bold tracking-tight mb-8 text-[var(--text)]">Compliance & Certifications</h1>
          <p className="text-xl text-[var(--text-muted)] leading-relaxed mt-6">
            FortyNinerTrucking LLC is committed to the highest standards of safety, compliance, and professional excellence. We maintain all necessary permits and certifications to operate efficiently and legally across all our service areas.
          </p>
        </div>

        {/* Primary Certifications */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <Card className="border-none shadow-lg bg-white border border-[var(--border)]">
            <CardContent className="p-8 flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mb-6">
                <ShieldCheck size={32} />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-[var(--text)]">DBE Certified</h2>
              <p className="text-[var(--text-muted)] mb-6">
                Disadvantaged Business Enterprise certification, allowing us to participate in federally funded transportation projects.
              </p>
              <div className="w-full bg-[var(--surface-2)] rounded-lg p-4 text-sm font-mono text-[var(--text-muted)] border border-[var(--border)]">
                Cert # DBE-29183-CA
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg bg-white border border-[var(--border)]">
            <CardContent className="p-8 flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mb-6">
                <Award size={32} />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-[var(--text)]">Small Business (SB)</h2>
              <p className="text-[var(--text-muted)] mb-6">
                Certified Small Business Enterprise, supporting local economic growth and meeting specific project set-aside requirements.
              </p>
              <div className="w-full bg-[var(--surface-2)] rounded-lg p-4 text-sm font-mono text-[var(--text-muted)] border border-[var(--border)]">
                Cert # SB-99281-CA
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Permits & Licenses List */}
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center text-[var(--text)]">Operating Permits & Licenses</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
             {[
               { title: "Motor Carrier Permit", id: "CA-561086", icon: TruckIcon }
             ].map((permit, i) => (
               <div key={i} className="flex items-start gap-4 p-6 rounded-xl border border-[var(--border)] hover:border-[var(--primary)]/50 transition-colors bg-white shadow-sm">
                 <div className="h-10 w-10 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] shrink-0">
                   <permit.icon size={20} />
                 </div>
                 <div>
                   <h3 className="font-bold text-lg mb-1 text-[var(--text)]">{permit.title}</h3>
                   <p className="text-sm text-[var(--text-muted)] font-mono bg-[var(--surface-2)] px-2 py-0.5 rounded inline-block">
                     {permit.id}
                   </p>
                 </div>
               </div>
             ))}
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}

function TruckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 18H3c-.6 0-1-.4-1-1V9c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v3h5l4 4v3c0 .6-.4 1-1 1h-2" />
      <path d="M15 12h5" />
      <circle cx="5" cy="19" r="2" />
      <circle cx="18" cy="19" r="2" />
    </svg>
  )
}

function LeafIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  )
}

function HardHatIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z" />
      <path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5" />
      <path d="M4 15v-3a6 6 0 0 1 6-6h0" />
      <path d="M14 6h0a6 6 0 0 1 6 6v3" />
    </svg>
  )
}

function FlaskConicalIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2" />
      <path d="M8.5 2h7" />
      <path d="M7 16h10" />
    </svg>
  )
}

function RecycleIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5" />
      <path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12" />
      <path d="M14 5h-4.217a1.83 1.83 0 0 0-1.565.88l-1.636 2.82" />
      <path d="M17 14h3" />
      <path d="M20 9l-3 5" />
    </svg>
  )
}
