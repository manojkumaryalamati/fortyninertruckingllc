import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface LogoProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "dark" | "light";
}

export function Logo({ className, variant = "dark", ...props }: LogoProps) {
  const isLight = variant === "light";
  
  return (
    <div 
      className={cn(
        "flex flex-col items-center justify-center select-none",
        isLight ? "text-white" : "text-zinc-900",
        className
      )}
      {...props}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Pacifico&display=swap');
        .font-rockwell {
          font-family: 'Alfa Slab One', 'Rockwell Extra Bold', Rockwell, 'Arial Black', serif;
        }
        .font-brush {
          font-family: 'Pacifico', 'Brush Script MT', 'Brush Script Std', cursive;
        }
      `}} />
      <div className="flex flex-col items-center leading-none tracking-tight">
        <span 
          className={cn(
            "font-rockwell uppercase text-2xl md:text-3xl lg:text-4xl whitespace-nowrap",
            isLight ? "text-white drop-shadow-md" : "text-zinc-900"
          )}
          style={{ 
            textShadow: isLight ? '2px 2px 4px rgba(0,0,0,0.5)' : '1px 1px 0px rgba(0,0,0,0.1)'
          }}
        >
          FORTY NINER
        </span>
        <span 
          className={cn(
            "font-brush text-xl md:text-2xl lg:text-3xl -mt-1 md:-mt-2 whitespace-nowrap",
            isLight ? "text-primary drop-shadow-md" : "text-primary"
          )}
          style={{ 
            textShadow: isLight ? '1px 1px 3px rgba(0,0,0,0.5)' : 'none',
            transform: 'rotate(-2deg)'
          }}
        >
          Trucking LLC
        </span>
      </div>
    </div>
  );
}
