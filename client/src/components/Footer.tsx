import { Link } from "wouter";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/Logo";

const navigationLinks = [
  { name: "Services", href: "/services", testId: "link-services-footer" },
  { name: "Fleet", href: "/fleet", testId: "link-fleet-footer" },
  { name: "Certifications", href: "/certifications", testId: "link-certifications-footer" },
  { name: "Careers", href: "/careers", testId: "link-careers-footer" },
  { name: "Subhaulers", href: "/subhaulers", testId: "link-subhaulers-footer" },
  { name: "Contact", href: "/contact", testId: "link-contact-footer" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-white text-[var(--text)]">
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 py-10 md:py-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md space-y-4">
            <Link href="/">
              <div className="inline-block cursor-pointer" data-testid="link-home-footer-logo">
                <Logo variant="dark" className="w-[216px] origin-left" />
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-[var(--text-muted)]">
              Reliable hauling support for contractors, developers, and public works teams across California.
            </p>
            <div className="space-y-2 text-sm text-[var(--text-muted)]">
              <a href="tel:9252504605" data-testid="link-phone-footer" className="flex items-center gap-2 transition-colors hover:text-[var(--primary)]">
                <Phone size={16} className="text-[var(--primary)]" />
                <span>(925) 250-4605</span>
              </a>
              <a href="mailto:fortyninertrucking@gmail.com" data-testid="link-email-footer" className="flex items-center gap-2 break-all transition-colors hover:text-[var(--primary)]">
                <Mail size={16} className="text-[var(--primary)]" />
                <span>fortyninertrucking@gmail.com</span>
              </a>
              <div data-testid="text-address-footer" className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-[var(--primary)]" />
                <span>28 Glen Canyon Court, Pittsburg, CA 94565</span>
              </div>
            </div>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-3 lg:max-w-xl">
            {navigationLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                <span
                  data-testid={link.testId}
                  className="cursor-pointer text-sm font-semibold text-[var(--text-muted)] transition-colors hover:text-[var(--primary)]"
                >
                  {link.name}
                </span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-[var(--border)] pt-5 text-sm text-[var(--text-muted)] md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Forty Niner Trucking LLC. All rights reserved.</p>
          <p data-testid="text-footer-status">24/7 Dispatch · DBE & SB Certified</p>
        </div>
      </div>
    </footer>
  );
}
