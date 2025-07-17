import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const CompatibilityMeter = ({ 
  score, 
  size = "md", 
  showLabel = true,
  className = ""
}) => {
  const sizes = {
    sm: "w-16 h-16 text-sm",
    md: "w-24 h-24 text-lg",
    lg: "w-32 h-32 text-xl"
  };
  
  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className={cn("relative", sizes[size])}>
        <svg
          className="w-full h-full transform -rotate-90"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#f3e5f5"
            strokeWidth="8"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e91e63" />
              <stop offset="100%" stopColor="#ff4081" />
            </linearGradient>
          </defs>
        </svg>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={cn("font-display font-bold text-gray-800", sizes[size])}>
            {score}%
          </span>
        </div>
      </div>
      
      {showLabel && (
        <p className="text-sm text-gray-600 mt-2">Compatibility</p>
      )}
    </div>
  );
};

export default CompatibilityMeter;