import { Link } from "wouter";
import { Phone, Mail, MapPin, Clock, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/Logo";

const quickLinks = [
  { name: "Services", href: "/services", testId: "link-services-footer" },
  { name: "Fleet", href: "/fleet", testId: "link-fleet-footer" },
  { name: "Careers", href: "/careers", testId: "link-careers-footer" },
  { name: "Subhaulers", href: "/subhaulers", testId: "link-subhaulers-footer" },
  { name: "Contact", href: "/contact", testId: "link-contact-footer" },
];

const contactItems = [
  {
    title: "Call Dispatch",
    value: "(925) 250-4605",
    href: "tel:9252504605",
    icon: Phone,
    testId: "link-phone-footer",
  },
  {
    title: "Email",
    value: "fortyninertrucking@gmail.com",
    href: "mailto:fortyninertrucking@gmail.com",
    icon: Mail,
    testId: "link-email-footer",
  },
  {
    title: "Headquarters",
    value: "28 Glen Canyon Court, Pittsburg, CA 94565",
    icon: MapPin,
    testId: "text-address-footer",
  },
  {
    title: "Availability",
    value: "24/7 dispatch support",
    icon: Clock,
    testId: "text-hours-footer",
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface-2)] text-[var(--text)]">
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 py-10 md:py-14">
        <div className="rounded-[2rem] border border-[var(--border)] bg-white p-6 md:p-8 lg:p-10 shadow-sm">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
            <div className="space-y-7">
              <div className="space-y-4">
                <Link href="/">
                  <div className="inline-block cursor-pointer" data-testid="link-home-footer-logo">
                    <Logo variant="dark" className="w-[216px] origin-left" />
                  </div>
                </Link>
                <div className="space-y-3 max-w-xl">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--primary)]">Forty Niner Trucking LLC</p>
                  <h2 className="text-2xl md:text-3xl font-black tracking-tight text-[var(--text)]">Reliable hauling support for construction schedules that cannot slip.</h2>
                  <p className="text-sm md:text-base leading-relaxed text-[var(--text-muted)]">
                    Built for contractors, developers, and public works teams that need clear communication, dependable fleet coverage, and certified transportation support.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-4">
                  <p className="text-2xl font-black text-[var(--text)]" data-testid="text-dispatch-availability">24/7</p>
                  <p className="mt-1 text-sm text-[var(--text-muted)]">Dispatch support</p>
                </div>
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-4">
                  <p className="text-2xl font-black text-[var(--text)]" data-testid="text-certification-status">DBE & SB</p>
                  <p className="mt-1 text-sm text-[var(--text-muted)]">Certified partner</p>
                </div>
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-4 col-span-2 sm:col-span-1">
                  <p className="text-2xl font-black text-[var(--text)]" data-testid="text-location-footer">Pittsburg</p>
                  <p className="mt-1 text-sm text-[var(--text-muted)]">California base</p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--text-muted)]">Quick access</p>
                <div className="flex flex-wrap gap-2.5">
                  {quickLinks.map((link) => (
                    <Link key={link.name} href={link.href}>
                      <span
                        data-testid={link.testId}
                        className="inline-flex cursor-pointer items-center rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm font-semibold text-[var(--text)] transition-colors hover:border-[var(--primary)]/30 hover:text-[var(--primary)]"
                      >
                        {link.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface-2)] p-5 md:p-6 space-y-6">
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--primary)]">Dispatch & contact</p>
                <h3 className="text-2xl font-black tracking-tight text-[var(--text)]">Reach the team without hunting through the site.</h3>
                <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                  Use the contact page for project requests, driver inquiries, and partnership conversations, or reach dispatch directly by phone.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {contactItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.title} className="rounded-2xl border border-[var(--border)] bg-white p-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--primary-soft)]">
                          <Icon size={18} className="text-[var(--primary)]" />
                        </div>
                        <div className="min-w-0 space-y-1">
                          <p className="text-sm font-bold text-[var(--text)]">{item.title}</p>
                          {item.href ? (
                            <a
                              href={item.href}
                              data-testid={item.testId}
                              className="block text-sm leading-relaxed text-[var(--text-muted)] break-words transition-colors hover:text-[var(--primary)]"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <p data-testid={item.testId} className="text-sm leading-relaxed text-[var(--text-muted)]">
                              {item.value}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <Link href="/contact">
                  <span
                    data-testid="button-footer-contact-dispatch"
                    className="inline-flex cursor-pointer items-center justify-center rounded-full bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--primary)]/90"
                  >
                    Contact Dispatch
                  </span>
                </Link>
                <Link href="/subhaulers">
                  <span
                    data-testid="button-footer-subhaulers"
                    className="inline-flex cursor-pointer items-center justify-center rounded-full border border-[var(--border)] bg-white px-5 py-3 text-sm font-semibold text-[var(--text)] transition-colors hover:bg-[var(--surface-2)]"
                  >
                    Subhauler Info
                  </span>
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-[var(--border)] pt-6 md:flex-row md:items-center md:justify-between">
            <p className="text-sm font-medium text-[var(--text-muted)]">© {new Date().getFullYear()} Forty Niner Trucking LLC. All rights reserved.</p>
            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
              <ShieldCheck size={16} className="text-[var(--primary)]" />
              <span>Licensed, insured, and built for demanding project schedules.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
