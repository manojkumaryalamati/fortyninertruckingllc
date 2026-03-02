import { Link } from "wouter";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight,
} from "lucide-react";
import { Logo } from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="bg-white text-[var(--text)] border-t border-[var(--border)] relative overflow-hidden pt-4">
      {/* Abstract Background Element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--primary)]/5 rounded-full blur-[100px] -mr-32 -mt-32 opacity-50 pointer-events-none" />

      <div className="w-full  mx-auto px-4 md:px-1 relative z-10 footer-css">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-6">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/">
              <div className="block cursor-pointer inline-block mb-2">
                <Logo variant="dark" className="scale-75 origin-left" />
              </div>
            </Link>
            <p className="text-[var(--text-muted)] leading-relaxed text-sm max-w-sm">
              California's premier partner for construction logistics and
              material transport. Building strong partnerships through
              reliability, safety, and operational excellence.
            </p>
            <div className="flex gap-3 pt-2">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-10 w-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)] transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h3 className="font-bold text-sm uppercase tracking-widest text-[var(--text)] mb-6">
              Company
            </h3>
            <ul className="space-y-4">
              {[
                { name: "Our Fleet", href: "/fleet" },
                { name: "Services", href: "/services" },
                { name: "Careers", href: "/careers" },
                { name: "Subhaulers", href: "/subhaulers" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <span className="text-[var(--text-muted)] hover:text-[var(--primary)] text-sm font-medium transition-colors cursor-pointer inline-flex items-center group">
                      <ArrowRight
                        size={14}
                        className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-[var(--primary)]"
                      />
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="lg:col-span-2">
            <h3 className="font-bold text-sm uppercase tracking-widest text-[var(--text)] mb-6">
              Support
            </h3>
            <ul className="space-y-4">
              {[
                { name: "Contact Us", href: "/contact" },
                { name: "Admin Portal", href: "/admin" },
                { name: "Privacy Policy", href: "#" },
                { name: "Terms of Service", href: "#" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <span className="text-[var(--text-muted)] hover:text-[var(--primary)] text-sm font-medium transition-colors cursor-pointer inline-flex items-center group">
                      <ArrowRight
                        size={14}
                        className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-[var(--primary)]"
                      />
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h3 className="font-bold text-sm uppercase tracking-widest text-[var(--text)] mb-6">
              Get in Touch
            </h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <div className="mt-1 h-8 w-8 rounded-full bg-[var(--primary-soft)] flex items-center justify-center shrink-0">
                  <MapPin size={16} className="text-[var(--primary)]" />
                </div>
                <div className="text-sm text-[var(--text-muted)] leading-relaxed">
                  <span className="font-semibold text-[var(--text)] block mb-1">
                    Headquarters
                  </span>
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
                  <span className="font-semibold text-[var(--text)] block mb-1">
                    Call Us 24/7
                  </span>
                  (925) 250-4605
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mb-6 border-t border-[var(--border)] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[var(--text-muted)] font-medium">
            &copy; {new Date().getFullYear()} FortyNinerTrucking LLC. All rights
            reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
            <span>Designed with</span>
            <span className="text-[var(--primary)] animate-pulse">♥</span>
            <span>for logistics</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
