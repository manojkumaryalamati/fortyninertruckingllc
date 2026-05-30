import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import logoImg from "@/assets/fortyniner-logo.png";
import logoImg2x from "@/assets/fortyniner-logo@2x.png";

interface LogoProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "dark" | "light";
}

export function Logo({ className, variant = "dark", ...props }: LogoProps) {
  return (
    <div
      className={cn("inline-flex items-center select-none", className)}
      {...props}
    >
      <div
        className={cn(
          "w-full transition-all duration-300",
          variant === "light" && "rounded-xl bg-white px-2.5 py-1.5 shadow-sm ring-1 ring-black/5"
        )}
      >
        <img
          src={logoImg}
          srcSet={`${logoImg2x} 2x`}
          width={1200}
          height={400}
          alt="Forty Niner Trucking LLC"
          decoding="async"
          draggable={false}
          className="block h-auto w-full max-w-full object-contain"
        />
      </div>
    </div>
  );
}
