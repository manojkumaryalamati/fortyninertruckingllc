import { Link } from "wouter";
import { Phone, Mail, MapPin, Clock, ArrowRight, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-white text-[var(--text)] border-t border-[var(--border)] relative overflow-hidden pt-8">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--primary)]/5 rounded-full blur-[100px] -mr-32 -mt-32 opacity-50 pointer-events-none" />

      <div className="w-full mx-auto relative z-10 footer-css px-4 md:px-8">
        <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface-2)] p-6 md:p-8 mb-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--primary)]">Ready to move your next load?</p>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-[var(--text)]">Talk to a dispatch team that understands construction timelines.</h2>
            <p className="text-[var(--text-muted)] leading-relaxed">From aggregates to specialized fleet needs, Forty Niner Trucking delivers reliable scheduling, clear communication, and job-site-ready equipment.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <Link href="/contact">
              <Button data-testid="button-footer-request-quote" className="w-full sm:w-auto rounded-full bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90">Contact Dispatch</Button>
            </Link>
            <a href="tel:9252504605" data-testid="link-footer-call" className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-white px-5 py-2.5 font-semibold text-[var(--text)] hover:bg-[var(--surface-2)]">Call Dispatch</a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-8">
          <div className="lg:col-span-4 space-y-6">
            <Link href="/">
              <div className="block cursor-pointer inline-block mb-2" data-testid="link-home-footer-logo">
                <Logo variant="dark" className="w-[216px] origin-left" />
              </div>
            </Link>
            <p className="text-[var(--text-muted)] leading-relaxed text-sm max-w-sm">
              California's premier partner for construction logistics, dump truck services, and heavy material transport built on reliability, safety, and operational discipline.
            </p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl border border-[var(--border)] p-4 bg-white">
                <p className="font-black text-[var(--text)]" data-testid="text-dispatch-availability">24/7</p>
                <p className="text-[var(--text-muted)]">Dispatch support</p>
              </div>
              <div className="rounded-2xl border border-[var(--border)] p-4 bg-white">
                <p className="font-black text-[var(--text)]" data-testid="text-certification-status">DBE & SB</p>
                <p className="text-[var(--text-muted)]">Certified partner</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 lg:col-start-6">
            <h3 className="font-bold text-sm uppercase tracking-widest text-[var(--text)] mb-6">Explore</h3>
            <ul className="space-y-4">
              {[
                { name: "Services", href: "/services" },
                { name: "Fleet", href: "/fleet" },
                { name: "Certifications", href: "/certifications" },
                { name: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <span className="text-[var(--text-muted)] hover:text-[var(--primary)] text-sm font-medium transition-colors cursor-pointer inline-flex items-center group" data-testid={`link-${link.name.toLowerCase()}-footer`}>
                      <ArrowRight size={14} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-[var(--primary)]" />
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-bold text-sm uppercase tracking-widest text-[var(--text)] mb-6">Opportunities</h3>
            <ul className="space-y-4">
              {[
                { name: "Driver Careers", href: "/careers" },
                { name: "Subhauler Network", href: "/subhaulers" },
                { name: "Admin Portal", href: "/login" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <span className="text-[var(--text-muted)] hover:text-[var(--primary)] text-sm font-medium transition-colors cursor-pointer inline-flex items-center group" data-testid={`link-${link.name.toLowerCase().replace(/\s+/g, "-")}-footer`}>
                      <ArrowRight size={14} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-[var(--primary)]" />
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-bold text-sm uppercase tracking-widest text-[var(--text)] mb-6">Get in Touch</h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <div className="mt-1 h-8 w-8 rounded-full bg-[var(--primary-soft)] flex items-center justify-center shrink-0">
                  <MapPin size={16} className="text-[var(--primary)]" />
                </div>
                <div className="text-sm text-[var(--text-muted)] leading-relaxed">
                  <span className="font-semibold text-[var(--text)] block mb-1">Headquarters</span>
                  28 Glen Canyon Court
                  <br />
                  Pittsburg, CA 94565
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-1 h-8 w-8 rounded-full bg-[var(--primary-soft)] flex items-center justify-center shrink-0">
                  <Phone size={16} className="text-[var(--primary)]" />
                </div>
                <div className="text-sm text-[var(--text-muted)]">
                  <span className="font-semibold text-[var(--text)] block mb-1">Call Dispatch</span>
                  <a href="tel:9252504605" data-testid="link-phone-footer" className="hover:text-[var(--primary)] transition-colors">(925) 250-4605</a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-1 h-8 w-8 rounded-full bg-[var(--primary-soft)] flex items-center justify-center shrink-0">
                  <Mail size={16} className="text-[var(--primary)]" />
                </div>
                <div className="text-sm text-[var(--text-muted)]">
                  <span className="font-semibold text-[var(--text)] block mb-1">Email</span>
                  <a href="mailto:fortyninertrucking@gmail.com" data-testid="link-email-footer" className="hover:text-[var(--primary)] transition-colors break-all">fortyninertrucking@gmail.com</a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-1 h-8 w-8 rounded-full bg-[var(--primary-soft)] flex items-center justify-center shrink-0">
                  <Clock size={16} className="text-[var(--primary)]" />
                </div>
                <div className="text-sm text-[var(--text-muted)]">
                  <span className="font-semibold text-[var(--text)] block mb-1">Hours</span>
                  24/7 dispatch availability
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mb-6 border-t border-[var(--border)] pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[var(--text-muted)] font-medium">© {new Date().getFullYear()} Forty Niner Trucking LLC. All rights reserved.</p>
          <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
            <ShieldCheck size={16} className="text-[var(--primary)]" />
            <span>Licensed, insured, and built for demanding project schedules.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
