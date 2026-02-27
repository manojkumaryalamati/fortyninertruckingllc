import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import logoImg from "@/assets/logo-transparent.png";

interface LogoProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "dark" | "light";
}

export function Logo({ className, variant = "dark", ...props }: LogoProps) {
  return (
    <div 
      className={cn(
        "flex items-center justify-center select-none overflow-hidden",
        className
      )}
      {...props}
    >
      <img 
        src={logoImg} 
        alt="Forty Niner Trucking LLC" 
        className={cn(
          "h-auto max-h-16 w-auto object-contain transition-all duration-300",
          variant === "light" && "drop-shadow-md"
        )}
      />
    </div>
  );
}
