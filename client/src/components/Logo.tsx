import React from "react";

interface LogoProps {
  className?: string;
  variant?: "default" | "light" | "dark";
  showText?: boolean;
}

export function Logo({ className = "h-10", variant = "default", showText = true }: LogoProps) {
  if (variant === "light") {
    return (
      <div className={`bg-white rounded-lg p-2 inline-flex items-center justify-center ${className}`}>
        <img 
          src="/logo.png" 
          alt="FortyNiner Trucking" 
          className="h-full w-auto object-contain"
        />
      </div>
    );
  }

  return (
    <img 
      src="/logo.png" 
      alt="FortyNiner Trucking" 
      className={`w-auto object-contain ${className}`}
    />
  );
}
