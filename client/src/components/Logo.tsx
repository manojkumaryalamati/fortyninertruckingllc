import React from "react";

interface LogoProps {
  className?: string;
  variant?: "default" | "light" | "dark";
  showText?: boolean;
}

export function Logo({ className = "h-10", variant = "default", showText = true }: LogoProps) {
  return (
    <img 
      src="/logo.png" 
      alt="FortyNiner Trucking" 
      className={`w-auto object-contain ${className}`}
    />
  );
}
