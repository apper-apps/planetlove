import { motion } from "framer-motion";
import { useState } from "react";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const FilterSidebar = ({ isOpen, onClose, filters, onFiltersChange }) => {
  const [localFilters, setLocalFilters] = useState(filters);
  
  const mbtiTypes = ["INTJ", "INTP", "ENTJ", "ENTP", "INFJ", "INFP", "ENFJ", "ENFP", "ISTJ", "ISFJ", "ESTJ", "ESFJ", "ISTP", "ISFP", "ESTP", "ESFP"];
  const loveLanguages = ["Words of Affirmation", "Acts of Service", "Receiving Gifts", "Quality Time", "Physical Touch"];
  
  const handleMBTIToggle = (type) => {
    setLocalFilters(prev => ({
      ...prev,
      mbtiTypes: prev.mbtiTypes.includes(type)
        ? prev.mbtiTypes.filter(t => t !== type)
        : [...prev.mbtiTypes, type]
    }));
  };
  
  const handleLoveLanguageToggle = (language) => {
    setLocalFilters(prev => ({
      ...prev,
      loveLanguages: prev.loveLanguages.includes(language)
        ? prev.loveLanguages.filter(l => l !== language)
        : [...prev.loveLanguages, language]
    }));
  };
  
  const handleCompatibilityChange = (field, value) => {
    setLocalFilters(prev => ({
      ...prev,
      compatibility: {
        ...prev.compatibility,
        [field]: value
      }
    }));
  };
  
  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    onClose();
  };
  
  const handleClearFilters = () => {
    const clearedFilters = {
      mbtiTypes: [],
      loveLanguages: [],
      compatibility: {
        min: 0,
        max: 100
      }
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };
  
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ type: "spring", damping: 25 }}
        className="fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 overflow-y-auto lg:relative lg:translate-x-0 lg:shadow-none lg:bg-transparent"
      >
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-display font-semibold text-gray-800">
              Filters
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="lg:hidden"
            >
              <ApperIcon name="X" className="w-5 h-5" />
            </Button>
          </div>
          
          {/* MBTI Types */}
          <Card className="p-4">
            <h3 className="font-display font-medium text-gray-800 mb-3">
              MBTI Types
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {mbtiTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => handleMBTIToggle(type)}
                  className={`p-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    localFilters.mbtiTypes.includes(type)
                      ? "bg-primary-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-primary-100"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </Card>
          
          {/* Love Languages */}
          <Card className="p-4">
            <h3 className="font-display font-medium text-gray-800 mb-3">
              Love Languages
            </h3>
            <div className="space-y-2">
              {loveLanguages.map((language) => (
                <button
                  key={language}
                  onClick={() => handleLoveLanguageToggle(language)}
                  className={`w-full p-3 rounded-lg text-left text-sm transition-all duration-200 ${
                    localFilters.loveLanguages.includes(language)
                      ? "bg-primary-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-primary-100"
                  }`}
                >
                  {language}
                </button>
              ))}
            </div>
          </Card>
          
          {/* Compatibility Range */}
          <Card className="p-4">
            <h3 className="font-display font-medium text-gray-800 mb-3">
              Compatibility Score
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <label className="text-sm text-gray-600">Min: {localFilters.compatibility.min}%</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={localFilters.compatibility.min}
                    onChange={(e) => handleCompatibilityChange("min", parseInt(e.target.value))}
                    className="w-full mt-1"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-sm text-gray-600">Max: {localFilters.compatibility.max}%</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={localFilters.compatibility.max}
                    onChange={(e) => handleCompatibilityChange("max", parseInt(e.target.value))}
                    className="w-full mt-1"
                  />
                </div>
              </div>
            </div>
          </Card>
          
          {/* Actions */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearFilters}
              className="flex-1"
            >
              Clear
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleApplyFilters}
              className="flex-1"
            >
              Apply
            </Button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default FilterSidebar;