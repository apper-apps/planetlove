import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { useState } from "react";

const ProfileCard = ({ profile, onViewProfile, onLike, onPass, showActions = true }) => {
  const [imageError, setImageError] = useState(false);
  
  const handleImageError = () => {
    setImageError(true);
  };
  
  return (
    <Card hover className="p-0 overflow-hidden">
      <div className="relative">
        <div className="h-64 bg-gradient-to-br from-primary-100 to-accent-100 overflow-hidden">
          {!imageError ? (
            <img
              src={profile.photo}
              alt={profile.name}
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ApperIcon name="User" className="w-16 h-16 text-primary-400" />
            </div>
          )}
        </div>
        
        <div className="absolute top-4 right-4">
          <Badge variant="primary" size="md">
            {profile.compatibilityScore}% Match
          </Badge>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-display font-semibold text-gray-800">
              {profile.name}
            </h3>
            <p className="text-gray-600">{profile.age} • {profile.location}</p>
          </div>
          <Badge variant="secondary" size="sm">
            {profile.mbtiType}
          </Badge>
        </div>
        
        <p className="text-gray-700 mb-4 line-clamp-2">
          {profile.bio}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {profile.loveLanguages.slice(0, 2).map((language, index) => (
            <Badge key={index} variant="primary" size="sm">
              <ApperIcon name="Heart" className="w-3 h-3 mr-1" />
              {language}
            </Badge>
          ))}
        </div>
        
        {showActions && (
          <div className="flex space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPass(profile.Id)}
              className="flex-1"
            >
              <ApperIcon name="X" className="w-4 h-4 mr-2" />
              Pass
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => onLike(profile.Id)}
              className="flex-1"
            >
              <ApperIcon name="Heart" className="w-4 h-4 mr-2" />
              Like
            </Button>
          </div>
        )}
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onViewProfile(profile.Id)}
          className="w-full mt-2"
        >
          View Full Profile
        </Button>
      </div>
    </Card>
  );
};

export default ProfileCard;