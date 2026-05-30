import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import logoImg from "@assets/fortyninertrucking_logo_1780146058152.png";

interface LogoProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "dark" | "light";
}

export function Logo({ className, variant = "dark", ...props }: LogoProps) {
  return (
    <div
      className={cn("flex items-center select-none", className)}
      {...props}
    >
      <div
        className={cn(
          "flex w-full items-center justify-start transition-all duration-300",
          variant === "light" && "rounded-2xl bg-white px-3 py-2 shadow-sm ring-1 ring-white/15"
        )}
      >
        <img
          src={logoImg}
          alt="Forty Niner Trucking LLC"
          className="block h-auto max-h-14 w-full max-w-full object-contain"
        />
      </div>
    </div>
  );
}
