import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Shield, Clock, Users, Target, Award, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import Footer from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden mt-20">
        <div className="absolute inset-0 z-0">
           <img 
             src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2940&auto=format&fit=crop" 
             alt="About Us Hero" 
             className="w-full h-full object-cover"
           />
           <div className="absolute inset-0 bg-black/50 z-10" />
        </div>

        <div className="relative z-20 container mx-auto px-6 h-full flex flex-col justify-center">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-[0.9]">
              Driving <br />
              <span className="text-primary">Excellence</span> <br />
              in Hauling
            </h1>
            <div className="h-1 w-24 bg-primary" />
            <p className="text-xl text-white/90 leading-relaxed max-w-xl font-medium">
              FortyNinerTrucking LLC is your strategic partner in logistics, delivering safety and reliability since inception.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-sm font-bold tracking-widest text-primary">Our Mission</h2>
              <h3 className="text-4xl font-black tracking-tight text-foreground">
                Commitment to <span className="text-primary">Safety</span> & Service
              </h3>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
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
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative h-[600px] bg-secondary rounded-lg overflow-hidden">
               <img 
                 src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=3270&auto=format&fit=crop" 
                 className="absolute inset-0 w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
               <div className="absolute bottom-0 left-0 p-8 bg-black/60 backdrop-blur-sm text-white w-full">
                 <p className="text-3xl font-black">10M+ Miles</p>
                 <p className="text-sm font-bold opacity-80 uppercase">Safely Traveled across California</p>
               </div>
            </div>
          </div>
        </div>
      </section>


      {/* CTA */}
      <section className="py-24 bg-primary text-white text-center">
        <div className="container mx-auto px-6 max-w-4xl space-y-8">
          <h2 className="text-4xl md:text-5xl font-black">Ready to Partner With Us?</h2>
          <p className="text-xl font-medium opacity-90">
            Join the hundreds of contractors who trust FortyNinerTrucking for their logistical needs.
          </p>
          <div className="flex justify-center gap-4 pt-4">
             <Link href="/contact">
               <Button size="lg" className="rounded-full bg-white text-primary hover:bg-gray-100 font-bold px-10 h-14">
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