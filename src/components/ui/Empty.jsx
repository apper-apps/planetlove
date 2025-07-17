import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No results found",
  description = "Try adjusting your search criteria",
  icon = "Search",
  action,
  className = ""
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center p-12 text-center ${className}`}
    >
      <div className="w-20 h-20 mb-6 bg-gradient-to-br from-primary-100 to-accent-100 rounded-full flex items-center justify-center">
        <ApperIcon name={icon} className="w-10 h-10 text-primary-500" />
      </div>
      
      <h3 className="text-2xl font-display font-semibold text-gray-800 mb-3">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md">
        {description}
      </p>
      
      {action && (
        <motion.button
          onClick={action.onClick}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-8 py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2"
        >
          <ApperIcon name={action.icon || "Plus"} className="w-5 h-5" />
          <span>{action.label}</span>
        </motion.button>
      )}
    </motion.div>
  );
};

export default Empty;