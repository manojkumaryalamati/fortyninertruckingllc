import { Truck } from "lucide-react";

interface TruckLoaderProps {
  className?: string;
  text?: string;
  size?: "sm" | "md" | "lg";
}

export function TruckLoader({ className = "", text = "Loading...", size = "lg" }: TruckLoaderProps) {
  // Scale factor based on size
  const scale = size === "sm" ? 0.5 : size === "md" ? 0.75 : 1;
  const width = size === "sm" ? "w-24" : size === "md" ? "w-32" : "w-48";
  
  return (
    <div className={`flex flex-col items-center justify-center p-4 ${className}`}>
      <div className={`relative ${width} h-12 flex items-end overflow-hidden select-none pointer-events-none`}>
        {/* Road Line */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-border z-10"></div>
        
        {/* Dotted Divider */}
        <div className="absolute bottom-0 left-0 w-full flex justify-between px-1 z-0 opacity-50">
             {Array.from({ length: 12 }).map((_, i) => (
                 <div key={i} className="w-1 h-[2px] bg-muted-foreground/30 transform translate-y-[1px]" />
             ))}
        </div>

        {/* Truck */}
        <div className="absolute bottom-[1px] animate-drive-across will-change-transform z-20">
            <div className="relative">
                <Truck 
                    className="text-primary transform -scale-x-100" 
                    size={32 * scale} 
                    strokeWidth={1.5} 
                />
                {/* Wind/Speed lines */}
                <div className="absolute top-1 -right-3 flex flex-col gap-[2px] opacity-0 animate-wind">
                    <div className="w-3 h-[1px] bg-muted-foreground/40 rounded-full"></div>
                    <div className="w-2 h-[1px] bg-muted-foreground/40 rounded-full ml-1"></div>
                </div>
            </div>
        </div>
      </div>
      
      {text && (
        <p className={`mt-2 font-medium text-muted-foreground animate-pulse ${size === "sm" ? "text-xs" : "text-sm"}`}>
          {text}
        </p>
      )}
      
      <style>{`
        @keyframes drive-across {
          0% { left: -40px; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        @keyframes wind {
            0% { opacity: 0; transform: translateX(0); }
            50% { opacity: 1; transform: translateX(-2px); }
            100% { opacity: 0; transform: translateX(-5px); }
        }
        .animate-drive-across {
          animation: drive-across 2s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
        }
        .animate-wind {
            animation: wind 1s linear infinite;
        }
      `}</style>
    </div>
  );
}
