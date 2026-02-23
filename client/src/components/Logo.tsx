import truckIcon from "@/assets/truck_icon_transparent.png";

interface LogoProps {
  className?: string;
  dark?: boolean;
  stacked?: boolean;
  iconSize?: string;
}

export function Logo({ className = "", dark = false, stacked = false, iconSize = "h-12" }: LogoProps) {
  const textColor = dark ? 'text-white' : 'text-zinc-900';
  const subtextColor = dark ? 'text-zinc-300' : 'text-zinc-600';

  if (stacked) {
    return (
      <div className={`flex flex-col ${className}`}>
        <img 
          src={truckIcon} 
          alt="FortyNiner Trucking" 
          className={`${iconSize} w-auto object-contain drop-shadow-md mb-2 transition-all duration-300 ${dark ? 'brightness-0 invert opacity-90' : ''}`} 
        />
        <div className="flex flex-col">
          <span className={`text-2xl font-black tracking-tighter leading-none uppercase ${textColor}`} style={{ fontFamily: '"Rockwell Extra Bold", "Arial Black", impact, sans-serif' }}>
            FORTYNINER
          </span>
          <span className={`text-base tracking-wide leading-tight ${subtextColor} mt-1`} style={{ fontFamily: '"Brush Script MT", cursive, script' }}>
            Trucking LLC
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img 
        src={truckIcon} 
        alt="FortyNiner Trucking" 
        className={`${iconSize} w-auto object-contain drop-shadow-md transition-all duration-300 ${dark ? 'brightness-0 invert opacity-90' : ''}`} 
      />
      <div className="flex flex-col justify-center pt-1 text-left">
        <span className={`text-xl md:text-2xl font-black tracking-tighter leading-none uppercase ${textColor}`} style={{ fontFamily: '"Rockwell Extra Bold", "Arial Black", impact, sans-serif' }}>
          FORTYNINER
        </span>
        <span className={`text-sm md:text-base tracking-wide leading-tight ${subtextColor} mt-1`} style={{ fontFamily: '"Brush Script MT", cursive, script' }}>
          Trucking LLC
        </span>
      </div>
    </div>
  );
}