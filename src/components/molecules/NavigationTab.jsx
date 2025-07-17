import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const NavigationTab = ({ to, icon, label, className = "" }) => {
  return (
    <NavLink to={to} className={cn("flex-1", className)}>
      {({ isActive }) => (
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200",
            isActive
              ? "bg-gradient-to-br from-primary-500 to-accent-500 text-white shadow-lg"
              : "text-gray-600 hover:text-primary-500 hover:bg-primary-50"
          )}
        >
          <ApperIcon name={icon} className="w-6 h-6 mb-1" />
          <span className="text-xs font-medium">{label}</span>
        </motion.div>
      )}
    </NavLink>
  );
};

export default NavigationTab;