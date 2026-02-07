import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Truck } from "lucide-react";

export default function Fleet() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />

      <section className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
           <img 
             src="https://images.unsplash.com/photo-1605218427306-635ba2439af2?q=80&w=2940&auto=format&fit=crop" 
             alt="Fleet Hero" 
             className="w-full h-full object-cover opacity-50"
           />
           <div className="absolute inset-0 bg-[#0F3F40]/90 z-10" />
        </div>

        {/* Sliding Content */}
        <div className="relative z-20 container mx-auto px-6 overflow-hidden">
          <motion.div 
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ 
              duration: 1.2, 
              ease: [0.22, 1, 0.36, 1], // Custom easing for smooth slide
              delay: 0.2 
            }}
            className="flex flex-col items-center text-center space-y-8"
          >
            <div className="h-24 w-24 rounded-3xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-2xl mb-4">
              <Truck size={48} strokeWidth={1.5} />
            </div>

            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-none">
              Coming <br/>
              <span className="text-primary text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">Soon</span>
            </h1>
            
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100px" }}
              transition={{ duration: 1, delay: 1 }}
              className="h-1 bg-white/30 rounded-full"
            />

            <p className="text-xl md:text-2xl text-white/70 max-w-2xl font-light tracking-wide">
              We are currently updating our fleet gallery with our newest equipment. Check back shortly to view our full inventory of trucks and trailers.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
