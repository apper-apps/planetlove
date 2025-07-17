import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const LoveLanguageCard = ({ 
  language, 
  isSelected = false, 
  onSelect,
  className = ""
}) => {
  const languageIcons = {
    "Words of Affirmation": "MessageCircle",
    "Acts of Service": "Heart",
    "Receiving Gifts": "Gift",
    "Quality Time": "Clock",
    "Physical Touch": "Hand"
  };
  
  const languageDescriptions = {
    "Words of Affirmation": "Expressing love through spoken affection, praise, and encouragement",
    "Acts of Service": "Showing love through helpful actions and thoughtful gestures",
    "Receiving Gifts": "Feeling loved through thoughtful presents and tokens of affection",
    "Quality Time": "Valuing focused attention and meaningful time together",
    "Physical Touch": "Expressing and receiving love through physical connection"
  };
  
  return (
    <motion.button
      onClick={() => onSelect(language)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn("w-full text-left", className)}
    >
      <Card
        className={cn(
          "p-6 transition-all duration-200 cursor-pointer",
          isSelected
            ? "border-primary-500 bg-gradient-to-br from-primary-50 to-accent-50 shadow-lg"
            : "hover:border-primary-300 hover:shadow-md"
        )}
      >
        <div className="flex items-start space-x-4">
          <div className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center",
            isSelected
              ? "bg-gradient-to-br from-primary-500 to-accent-500 text-white"
              : "bg-primary-100 text-primary-500"
          )}>
            <ApperIcon name={languageIcons[language]} className="w-6 h-6" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-display font-semibold text-gray-800">
                {language}
              </h4>
              {isSelected && (
                <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                  <ApperIcon name="Check" className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            
            <p className="text-sm text-gray-600">
              {languageDescriptions[language]}
            </p>
          </div>
        </div>
      </Card>
    </motion.button>
  );
};

export default LoveLanguageCard;