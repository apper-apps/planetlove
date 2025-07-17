import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const Button = forwardRef(({ 
  variant = "primary", 
  size = "md", 
  children, 
  className = "", 
  disabled = false,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary-500 to-accent-500 text-white hover:from-primary-600 hover:to-accent-600 shadow-lg hover:shadow-xl focus:ring-primary-500",
    secondary: "bg-gradient-to-r from-secondary-500 to-purple-500 text-white hover:from-secondary-600 hover:to-purple-600 shadow-lg hover:shadow-xl focus:ring-secondary-500",
    outline: "border-2 border-primary-500 text-primary-500 hover:bg-primary-50 focus:ring-primary-500",
    ghost: "text-primary-500 hover:bg-primary-50 focus:ring-primary-500",
    danger: "bg-gradient-to-r from-error to-red-500 text-white hover:from-red-600 hover:to-red-600 shadow-lg hover:shadow-xl focus:ring-error"
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };
  
  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "";
  
  return (
    <motion.button
      ref={ref}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        disabledStyles,
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
});

Button.displayName = "Button";

export default Button;