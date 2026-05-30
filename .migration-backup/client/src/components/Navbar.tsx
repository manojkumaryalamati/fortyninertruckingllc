import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail, Clock, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/Logo";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Fleet", href: "/fleet" },
  { name: "Certifications", href: "/certifications" },
  { name: "Careers", href: "/careers" },
  { name: "Subhaulers", href: "/subhaulers" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => location === href;

  return (
    <>
      <div
        className={`hidden lg:block fixed top-0 left-0 right-0 z-[51] transition-all duration-300 ${scrolled ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"}`}
      >
        <div className="w-full max-w-[1400px] mx-auto px-4 lg:px-8 pt-3">
          <div className="flex h-10 items-center justify-between rounded-full border border-[var(--border)]/80 bg-white/88 px-5 text-[11px] font-medium tracking-[0.16em] text-[var(--text-muted)] shadow-[0_10px_30px_rgba(15,23,42,0.06)] backdrop-blur-xl uppercase">
            <div className="flex items-center gap-5 tracking-normal normal-case text-xs">
              <a
                href="tel:9252504605"
                data-testid="link-phone-nav"
                className="flex items-center gap-2 transition-colors hover:text-[var(--primary)]"
              >
                <Phone size={14} className="text-[var(--primary)]" />
                (925) 250-4605
              </a>
              <a
                href="mailto:fortyninertrucking@gmail.com"
                data-testid="link-email-nav"
                className="flex items-center gap-2 transition-colors hover:text-[var(--primary)]"
              >
                <Mail size={14} className="text-[var(--primary)]" />
                fortyninertrucking@gmail.com
              </a>
            </div>

            <div className="flex items-center gap-5 tracking-normal normal-case text-xs">
              <span className="flex items-center gap-2">
                <Clock size={14} className="text-[var(--primary)]" />
                24/7 Dispatch
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-[var(--primary)]" />
                DBE & SB Certified
              </span>
            </div>
          </div>
        </div>
      </div>

      <nav
        className={`fixed left-0 right-0 z-50 w-full transition-all duration-300 ${scrolled ? "top-0" : "top-0 lg:top-[52px]"}`}
      >
        <div className={`w-full max-w-[1400px] mx-auto px-4 lg:px-8 ${scrolled ? "py-2.5" : "py-3.5"}`}>
          <div className="rounded-[26px] border border-black/5 bg-white/92 shadow-[0_20px_60px_rgba(15,23,42,0.1)] backdrop-blur-xl">
            <div className={`flex items-center justify-between gap-4 px-4 lg:px-5 ${scrolled ? "h-[72px]" : "h-[78px]"}`}>
              <div className="flex shrink-0 items-center">
                <Link href="/">
                  <div
                    data-testid="link-home-logo"
                    className="cursor-pointer transition-opacity hover:opacity-90"
                  >
                    <Logo
                      variant="dark"
                      className={`origin-left transition-all duration-300 ${scrolled ? "w-[172px] md:w-[188px]" : "w-[180px] md:w-[204px]"}`}
                    />
                  </div>
                </Link>
              </div>

              <div className="hidden lg:flex items-center justify-center flex-1 px-2">
                <div className="flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--surface-2)]/80 p-1.5">
                  {navLinks.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <div
                        data-testid={`link-${item.name.toLowerCase().replace(/\s+/g, "-")}-nav`}
                        className={`relative cursor-pointer rounded-full px-4 py-2.5 text-sm font-semibold tracking-wide transition-all duration-300 ${isActive(item.href) ? "text-[var(--text)]" : "text-[var(--text-muted)] hover:text-[var(--text)]"}`}
                      >
                        {isActive(item.href) && (
                          <motion.div
                            layoutId="nav-pill"
                            className="absolute inset-0 rounded-full border border-[var(--primary)]/15 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.08)]"
                            initial={false}
                            transition={{ type: "spring", stiffness: 340, damping: 30 }}
                          />
                        )}
                        <span className="relative z-10">{item.name}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="hidden xl:flex items-center gap-2 xl:gap-3">
                <Link href="/login">
                  <Button
                    data-testid="button-admin-portal-nav"
                    variant="outline"
                    className="rounded-full border-[var(--border)] bg-white px-5 text-[var(--text)] shadow-sm hover:bg-[var(--surface-2)]"
                  >
                    Admin Portal
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    data-testid="button-request-quote-nav"
                    className="rounded-full bg-[var(--primary)] px-5 text-white shadow-[0_14px_32px_rgba(249,115,22,0.28)] hover:bg-[var(--primary)]/90"
                  >
                    Contact Dispatch
                  </Button>
                </Link>
              </div>

              <button
                data-testid="button-open-mobile-menu"
                className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-white text-[var(--text)] shadow-sm transition-colors hover:bg-[var(--surface-2)]"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-[rgba(15,23,42,0.36)] p-4 backdrop-blur-sm lg:hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              className="flex h-full flex-col overflow-hidden rounded-[32px] border border-white/70 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.18)]"
            >
              <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
                <Logo variant="dark" className="w-[182px] origin-left" />
                <button
                  data-testid="button-close-mobile-menu"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-2)] text-[var(--text)] transition-colors hover:bg-white"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-6">
                <div className="space-y-2">
                  {navLinks.map((item, idx) => (
                    <Link key={item.name} href={item.href}>
                      <motion.div
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.04 }}
                        onClick={() => setIsMobileMenuOpen(false)}
                        data-testid={`link-${item.name.toLowerCase().replace(/\s+/g, "-")}-mobile-nav`}
                        className={`flex cursor-pointer items-center justify-between rounded-2xl px-4 py-3.5 text-base font-semibold transition-all ${isActive(item.href) ? "bg-[var(--primary)]/10 text-[var(--primary)]" : "text-[var(--text)] hover:bg-[var(--surface-2)]"}`}
                      >
                        <span>{item.name}</span>
                        <span className={`text-lg transition-opacity ${isActive(item.href) ? "opacity-100" : "opacity-30"}`}>
                          →
                        </span>
                      </motion.div>
                    </Link>
                  ))}
                </div>

                <div className="mt-6 grid gap-3">
                  <Link href="/contact">
                    <div onClick={() => setIsMobileMenuOpen(false)}>
                      <Button
                        data-testid="button-get-quote-mobile-nav"
                        className="h-12 w-full rounded-full bg-[var(--primary)] text-base font-semibold text-white shadow-[0_14px_32px_rgba(249,115,22,0.24)] hover:bg-[var(--primary)]/90"
                      >
                        Contact Dispatch
                      </Button>
                    </div>
                  </Link>

                  <Link href="/login">
                    <div onClick={() => setIsMobileMenuOpen(false)}>
                      <Button
                        data-testid="button-admin-portal-mobile-nav"
                        variant="outline"
                        className="h-12 w-full rounded-full border-[var(--border)] bg-white text-base font-semibold text-[var(--text)]"
                      >
                        Admin Portal
                      </Button>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="border-t border-[var(--border)] bg-[var(--surface-2)] px-5 py-5">
                <div className="space-y-3 rounded-[24px] border border-[var(--border)] bg-white p-4">
                  <a
                    href="tel:9252504605"
                    data-testid="link-phone-mobile-nav"
                    className="flex items-center gap-3 text-sm font-semibold text-[var(--text)]"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
                      <Phone size={16} />
                    </span>
                    (925) 250-4605
                  </a>
                  <a
                    href="mailto:fortyninertrucking@gmail.com"
                    data-testid="link-email-mobile-nav"
                    className="flex items-center gap-3 text-sm text-[var(--text-muted)]"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
                      <Mail size={16} />
                    </span>
                    fortyninertrucking@gmail.com
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
