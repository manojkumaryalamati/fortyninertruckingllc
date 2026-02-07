import React from "react";

interface LogoProps {
  className?: string;
  variant?: "default" | "light" | "dark";
  showText?: boolean;
}

export function Logo({ className = "h-10", variant = "default", showText = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Icon Mark */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto aspect-square shrink-0"
      >
        {/* Shield/Badge Background */}
        <path
          d="M10 20C10 14.4772 14.4772 10 20 10H80C85.5228 10 90 14.4772 90 20V60C90 75 80 90 50 95C20 90 10 75 10 60V20Z"
          className="fill-primary"
        />
        
        {/* Truck/Grille Stylized Lines */}
        <path
          d="M30 35H70M30 45H70M30 55H70"
          stroke="white"
          strokeWidth="6"
          strokeLinecap="round"
        />
        
        {/* 49 Number */}
        <text
          x="50"
          y="80"
          fontSize="24"
          fontWeight="bold"
          fill="white"
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
        >
          49
        </text>
      </svg>

      {/* Typography */}
      {showText && (
        <div className="flex flex-col justify-center leading-none">
          <span className={`font-bold tracking-tight text-xl ${
            variant === "light" ? "text-white" : "text-foreground"
          }`}>
            FortyNiner
          </span>
          <span className={`text-[0.65rem] font-bold uppercase tracking-[0.2em] ${
            variant === "light" ? "text-white/80" : "text-muted-foreground"
          }`}>
            Trucking LLC
          </span>
        </div>
      )}
    </div>
  );
}
