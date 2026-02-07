import React from "react";

interface LogoProps {
  className?: string;
  variant?: "default" | "light" | "dark";
  showText?: boolean;
}

export function Logo({ className = "h-10", variant = "default", showText = true }: LogoProps) {
  // Determine text colors based on variant
  const titleColor = variant === "light" ? "text-white" : "text-foreground";
  const subtitleColor = variant === "light" ? "text-white/80" : "text-muted-foreground";
  
  // Icon colors
  const truckBodyColor = "#C62828"; // Red truck color from image
  const truckAccentColor = "#FFB300"; // Yellow/Orange accent
  const wheelColor = "#1A1A1A"; 

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Vector Truck Icon */}
      <svg
        viewBox="0 0 100 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto aspect-[5/4] shrink-0 drop-shadow-sm"
      >
        {/* Background Shape (Rounded Rect) - Optional, adds depth like the original image's background */}
        <rect x="0" y="5" width="95" height="70" rx="12" fill="url(#gradient-bg)" opacity="0.9" />
        
        {/* Truck Cabin */}
        <path d="M55 25 H75 L80 40 V55 H55 V25 Z" fill={truckBodyColor} stroke="white" strokeWidth="1" />
        <path d="M75 25 L85 40 H75 V25 Z" fill="#1e293b" /> {/* Window */}
        
        {/* Truck Bed (Dump Body) */}
        <path d="M10 28 L52 28 V55 H15 L10 40 Z" fill={truckBodyColor} stroke="white" strokeWidth="1" />
        <path d="M12 30 H50" stroke="white" strokeWidth="2" strokeOpacity="0.3" />
        <path d="M14 38 H50" stroke="white" strokeWidth="2" strokeOpacity="0.3" />

        {/* Wheels */}
        <circle cx="28" cy="55" r="8" fill={wheelColor} stroke="white" strokeWidth="2" />
        <circle cx="45" cy="55" r="8" fill={wheelColor} stroke="white" strokeWidth="2" />
        <circle cx="75" cy="55" r="8" fill={wheelColor} stroke="white" strokeWidth="2" />
        
        {/* Inner Wheel Rims */}
        <circle cx="28" cy="55" r="3" fill="#e5e5e5" />
        <circle cx="45" cy="55" r="3" fill="#e5e5e5" />
        <circle cx="75" cy="55" r="3" fill="#e5e5e5" />

        {/* Lights */}
        <circle cx="80" cy="40" r="1.5" fill="#FDB813" />
        <rect x="52" y="22" width="6" height="3" fill="#FDB813" />

        {/* Gradient Definition */}
        <defs>
          <linearGradient id="gradient-bg" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF9800" />
            <stop offset="1" stopColor="#F57C00" />
          </linearGradient>
        </defs>
      </svg>

      {/* Typography */}
      {showText && (
        <div className="flex flex-col justify-center leading-none">
          <span className={`font-bold tracking-tight text-xl ${titleColor} leading-[0.9]`}>
            Forty Niner
          </span>
          <span className={`text-[0.6rem] font-bold uppercase tracking-[0.2em] ${subtitleColor} mt-1`}>
            Trucking LLC
          </span>
        </div>
      )}
    </div>
  );
}
