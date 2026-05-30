import { Link } from "wouter";
import { MapPin } from "lucide-react";
import { Logo } from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-white text-[var(--text)]">
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 py-8 md:py-10">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <Link href="/">
            <div className="inline-block cursor-pointer" data-testid="link-home-footer-logo">
              <Logo variant="dark" className="w-[216px] origin-left" />
            </div>
          </Link>

          <div data-testid="text-address-footer" className="flex items-start gap-2 text-sm text-[var(--text-muted)] md:text-right">
            <MapPin size={16} className="mt-0.5 shrink-0 text-[var(--primary)] md:order-2" />
            <span>28 Glen Canyon Court, Pittsburg, CA 94565</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
