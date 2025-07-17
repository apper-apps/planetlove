import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const Card = forwardRef(({ 
  children, 
  className = "", 
  hover = false,
  ...props 
}, ref) => {
  const baseStyles = "bg-surface rounded-2xl shadow-lg border border-gray-100 transition-all duration-200";
  const hoverStyles = hover ? "hover:shadow-xl hover:scale-[1.02]" : "";
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        baseStyles,
        hoverStyles,
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
});

Card.displayName = "Card";

export default Card;