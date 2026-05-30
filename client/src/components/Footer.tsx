import { Link } from "wouter";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-white text-[var(--text)]">
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 py-5 md:py-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <Link href="/">
            <div className="inline-block cursor-pointer" data-testid="link-home-footer-logo">
              <Logo variant="dark" className="w-[216px] origin-left" />
            </div>
          </Link>

          <div className="space-y-2 text-sm text-[var(--text-muted)] md:text-right">
            <a
              href="mailto:fortyninertrucking@gmail.com"
              data-testid="link-email-footer"
              className="flex items-center gap-2 transition-colors hover:text-[var(--primary)] md:justify-end"
            >
              <Mail size={16} className="shrink-0 text-[var(--primary)]" />
              <span>fortyninertrucking@gmail.com</span>
            </a>
            <a
              href="tel:9252504605"
              data-testid="link-phone-footer"
              className="flex items-center gap-2 transition-colors hover:text-[var(--primary)] md:justify-end"
            >
              <Phone size={16} className="shrink-0 text-[var(--primary)]" />
              <span>(925) 250-4605</span>
            </a>
            <div data-testid="text-address-footer" className="flex items-start gap-2 md:justify-end">
              <MapPin size={16} className="mt-0.5 shrink-0 text-[var(--primary)]" />
              <span>28 Glen Canyon Court, Pittsburg, CA 94565</span>
            </div>
          </div>
        </div>

        <div className="mt-4 border-t border-[var(--border)] pt-3 text-sm text-[var(--text-muted)] flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
          <p data-testid="text-rights-footer">© {new Date().getFullYear()} Forty Niner Trucking LLC. All rights reserved.</p>
          <p data-testid="text-developed-by-footer" className="flex items-center gap-2 md:justify-end">Developed by Techtaxcorp <span className="text-xs">techtaxcorp@gmail.com</span></p>
        </div>
      </div>
    </footer>
  );
}
