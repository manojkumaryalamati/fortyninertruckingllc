import { Link } from "wouter";
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo_v6.png";

export default function Footer() {
  return (
    <footer className="bg-zinc-100 text-zinc-900 py-16 border-t border-zinc-200">
      <div className="w-full max-w-[1800px] mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          <div className="space-y-6">
            <Link href="/">
              <div className="block cursor-pointer">
                <img src={logo} alt="FortyNiner Trucking" className="h-10 w-auto brightness-0" />
              </div>
            </Link>
            <p className="text-zinc-600 leading-relaxed">
              Premier construction hauling and logistics solutions. Building strong partnerships through reliability, safety, and operational excellence.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="text-zinc-600 hover:bg-primary hover:text-white rounded-full h-10 w-10">
                <Facebook size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="text-zinc-600 hover:bg-primary hover:text-white rounded-full h-10 w-10">
                <Twitter size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="text-zinc-600 hover:bg-primary hover:text-white rounded-full h-10 w-10">
                <Instagram size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="text-zinc-600 hover:bg-primary hover:text-white rounded-full h-10 w-10">
                <Linkedin size={20} />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 text-primary">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { name: "Services", href: "/services" },
                { name: "Our Fleet", href: "/fleet" },
                { name: "Careers", href: "/careers" },
                { name: "Subhaulers", href: "/subhaulers" },
                { name: "Contact Us", href: "/contact" },
                { name: "Admin Portal", href: "/admin" }
              ].map(link => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <span className="text-zinc-600 hover:text-primary transition-colors cursor-pointer">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 text-primary">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-zinc-600">
                <MapPin size={20} className="text-primary shrink-0 mt-1" />
                <span>28 Glen Canyon Court<br />Pittsburg, CA 94565</span>
              </li>
              <li className="flex items-center gap-3 text-zinc-600">
                <Phone size={20} className="text-primary shrink-0" />
                <span>(925) 250-4605</span>
              </li>
              <li className="flex items-center gap-3 text-zinc-600">
                <Mail size={20} className="text-primary shrink-0" />
                <span>fortyninertrucking@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-500">
          <p>&copy; {new Date().getFullYear()} FortyNinerTrucking LLC. All rights reserved.</p>
          <div className="flex gap-8">
            <span className="hover:text-primary cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
