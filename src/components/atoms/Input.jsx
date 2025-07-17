import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(({ 
  type = "text", 
  placeholder = "",
  className = "", 
  error = false,
  ...props 
}, ref) => {
  const baseStyles = "w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-white";
  
  const errorStyles = error 
    ? "border-error focus:border-error focus:ring-error" 
    : "border-gray-200 focus:border-primary-500 focus:ring-primary-500";
  
  return (
    <input
      ref={ref}
      type={type}
      placeholder={placeholder}
      className={cn(
        baseStyles,
        errorStyles,
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;