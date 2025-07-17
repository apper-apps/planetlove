import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const MBTISelector = ({ selectedType, onTypeSelect, className = "" }) => {
  const mbtiTypes = [
    { type: "INTJ", name: "Architect", description: "Imaginative and strategic thinkers" },
    { type: "INTP", name: "Thinker", description: "Innovative inventors with unquenchable thirst for knowledge" },
    { type: "ENTJ", name: "Commander", description: "Bold, imaginative and strong-willed leaders" },
    { type: "ENTP", name: "Debater", description: "Smart and curious thinkers who love intellectual challenges" },
    { type: "INFJ", name: "Advocate", description: "Creative and insightful, inspired and independent" },
    { type: "INFP", name: "Mediator", description: "Poetic, kind and altruistic, always eager to help" },
    { type: "ENFJ", name: "Protagonist", description: "Charismatic and inspiring leaders" },
    { type: "ENFP", name: "Campaigner", description: "Enthusiastic, creative and sociable free spirits" },
    { type: "ISTJ", name: "Logistician", description: "Practical and fact-minded, reliable and responsible" },
    { type: "ISFJ", name: "Protector", description: "Warm-hearted and dedicated, always ready to protect" },
    { type: "ESTJ", name: "Executive", description: "Excellent administrators, unsurpassed at managing things" },
    { type: "ESFJ", name: "Consul", description: "Extraordinarily caring, social and popular people" },
    { type: "ISTP", name: "Virtuoso", description: "Bold and practical experimenters" },
    { type: "ISFP", name: "Adventurer", description: "Flexible and charming artists, always ready to explore" },
    { type: "ESTP", name: "Entrepreneur", description: "Smart, energetic and perceptive people" },
    { type: "ESFP", name: "Entertainer", description: "Spontaneous, energetic and enthusiastic people" }
  ];
  
  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-4 gap-4", className)}>
      {mbtiTypes.map((mbti) => (
        <motion.button
          key={mbti.type}
          onClick={() => onTypeSelect(mbti.type)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            "p-4 rounded-xl border-2 transition-all duration-200 text-left",
            selectedType === mbti.type
              ? "border-primary-500 bg-primary-50 shadow-lg"
              : "border-gray-200 bg-white hover:border-primary-300 hover:bg-primary-25"
          )}
        >
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-display font-semibold text-gray-800">
              {mbti.type}
            </h4>
            {selectedType === mbti.type && (
              <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            )}
          </div>
          <p className="text-sm font-medium text-gray-700 mb-1">{mbti.name}</p>
          <p className="text-xs text-gray-600 line-clamp-2">{mbti.description}</p>
        </motion.button>
      ))}
    </div>
  );
};

export default MBTISelector;