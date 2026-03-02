import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Shield, Clock, Users, Target, Award, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import Footer from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

import heroImage1 from "@/assets/a2a02ae8-e30d-4a34-ad88-64598b4c945f_1772219729261.jpeg";
import heroImage2 from "@/assets/867d8163-e94d-4056-b575-856aa6f68ace_1772219729261.jpeg";

export default function About() {
  return (
    <div className="min-h-screen bg-[var(--surface-2)] text-[var(--text)] font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden mt-0">
        <div className="absolute inset-0 z-0">
           <img 
             src={heroImage1} 
             alt="About Us Hero" 
             className="w-full h-full object-cover object-[center_25%]"
           />
           <div className="absolute inset-0 bg-black/50 z-10" />
        </div>

        <div className="relative z-20 w-full max-w-[1800px] mx-auto px-4 md:px-8 h-full flex flex-col justify-center">
          <div className="max-w-3xl space-y-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-white leading-[0.9]">
              Driving <br />
              <span className="text-[var(--primary)]">Excellence</span> <br />
              in Hauling
            </h1>
            <div className="h-1 w-24 bg-[var(--primary)] my-8" />
            <p className="text-xl text-white/90 leading-relaxed max-w-xl font-medium mt-8">
              FortyNinerTrucking LLC is your strategic partner in logistics, delivering safety and reliability since inception.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-white">
        <div className="w-full max-w-[1800px] mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-sm font-bold tracking-widest text-[var(--primary)]">Our Mission</h2>
              <h3 className="text-4xl font-black tracking-tight text-[var(--text)]">
                Commitment to <span className="text-[var(--primary)]">Safety</span> & Service
              </h3>
              <div className="space-y-4 text-lg text-[var(--text-muted)] leading-relaxed">
                <p>
                  FortyNinerTrucking LLC is a full-service trucking and hauling company dedicated to supporting the construction and infrastructure industries. We specialize in moving materials efficiently, safely, and on schedule.
                </p>
                <p>
                  We believe in building lasting relationships with our clients through transparency and integrity. Our team of experienced professionals ensures that every project, from small site clearings to major developments, receives the same level of attention and care.
                </p>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-6 pt-4">
                {[
                  { icon: Shield, title: "Safety First", desc: "Rigorous training & maintenance" },
                  { icon: Clock, title: "On-Time", desc: "Precision scheduling & dispatch" },
                  { icon: Users, title: "Expert Team", desc: "Experienced drivers & logistics pros" },
                  { icon: Target, title: "Reliability", desc: "Consistent performance every load" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="h-12 w-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] shrink-0">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[var(--text)]">{item.title}</h4>
                      <p className="text-sm text-[var(--text-muted)]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative h-[600px] bg-[var(--border)] rounded-lg overflow-hidden">
               <img 
                 src={heroImage2} 
                 className="absolute inset-0 w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-[var(--primary)]/10 mix-blend-multiply" />
               <div className="absolute bottom-0 left-0 p-8 bg-black/60 backdrop-blur-sm text-white w-full">
                 <p className="text-3xl font-black">10M+ Miles</p>
                 <p className="text-sm font-bold opacity-80 uppercase">Safely Traveled across California</p>
               </div>
            </div>
          </div>
        </div>
      </section>


      {/* CTA */}
      <section className="py-24 bg-[var(--primary)] text-white text-center">
        <div className="w-full max-w-[1800px] mx-auto px-4 md:px-8 max-w-4xl space-y-8">
          <h2 className="text-4xl md:text-5xl font-black">Ready to Partner With Us?</h2>
          <p className="text-xl font-medium opacity-90">
            Join the hundreds of contractors who trust FortyNinerTrucking for their logistical needs.
          </p>
          <div className="flex justify-center gap-4 pt-4">
             <Link href="/contact">
               <Button size="lg" className="rounded-full bg-white text-[var(--primary)] hover:bg-gray-100 font-bold px-10 h-14">
                 Get in Touch
               </Button>
             </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}