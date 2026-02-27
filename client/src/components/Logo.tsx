import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import logoImg from "@/assets/D820436C-B5D8-45F1-9850-8245C8B19717_1772223187419.jpeg";

interface LogoProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "dark" | "light";
}

export function Logo({ className, variant = "dark", ...props }: LogoProps) {
  // We no longer invert the logo as it's a JPEG with its own colors and background
  return (
    <div 
      className={cn(
        "flex items-center justify-center select-none rounded-xl overflow-hidden",
        className
      )}
      {...props}
    >
      <img 
        src={logoImg} 
        alt="Forty Niner Trucking LLC" 
        className="h-auto max-h-16 w-auto object-contain transition-all duration-300"
      />
    </div>
  );
}
