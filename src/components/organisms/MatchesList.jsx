import { motion } from "framer-motion";
import React, { useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import Empty from "@/components/ui/Empty";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import Profile from "@/components/pages/Profile";
import CompatibilityMeter from "@/components/molecules/CompatibilityMeter";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";

const MatchesList = ({ 
  matches, 
  loading, 
  error, 
  onRetry,
  onStartSimulation,
  onViewProfile
}) => {
  const [imageErrors, setImageErrors] = useState({});
  
  const handleImageError = (matchId) => {
    setImageErrors(prev => ({ ...prev, [matchId]: true }));
  };
  
  if (loading) {
    return <Loading type="list" />;
  }
  
  if (error) {
    return (
      <Error
        message={error}
        onRetry={onRetry}
      />
    );
  }
  
  if (!matches || matches.length === 0) {
    return (
      <Empty
        title="No matches yet"
        description="Start discovering profiles to find your perfect match"
        icon="Heart"
        action={{
          label: "Start Discovering",
          onClick: () => window.location.href = "/",
          icon: "Compass"
        }}
      />
    );
  }
  
  return (
    <motion.div
    initial={{
        opacity: 0
    }}
    animate={{
        opacity: 1
    }}
    className="space-y-4">
    {matches.map((match, index) => <motion.div
        key={match.Id}
        initial={{
            opacity: 0,
            y: 20
        }}
        animate={{
            opacity: 1,
            y: 0
        }}
        transition={{
            delay: index * 0.1
        }}>
        <Card className="p-6">
            <div className="flex items-center space-x-4">
                <div className="relative">
                    <div
                        className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-100 to-accent-100 overflow-hidden">
                        {!imageErrors[match.Id] ? <img
                            src={match.photo}
                            alt={match.Name}
                            className="w-full h-full object-cover"
                            onError={() => handleImageError(match.Id)} /> : <div className="w-full h-full flex items-center justify-center">
                            <ApperIcon name="User" className="w-8 h-8 text-primary-400" />
                        </div>}
                    </div>
                    <div
                        className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-display font-semibold text-gray-800">
                            {match.Name}
                        </h3>
                        <Badge variant="secondary" size="sm">
                            {match.mbti_type}
                        </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                        {match.age}• {match.location}
                    </p>
                    <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-2">
                            <ApperIcon name="Heart" className="w-4 h-4 text-primary-500" />
                            <span className="text-sm text-gray-600">
                                {match.love_languages?.split(",")[0] || "N/A"}
                            </span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <CompatibilityMeter score={match.compatibility_score} size="sm" showLabel={false} />
                            <div className="flex flex-col space-y-2">
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={() => onStartSimulation(match.Id)}
                                    className="whitespace-nowrap">
                                    <ApperIcon name="MessageSquare" className="w-4 h-4 mr-2" />Start Chat
                                                      </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onViewProfile(match.Id)}
                                    className="whitespace-nowrap">
                                    <ApperIcon name="Eye" className="w-4 h-4 mr-2" />View Profile
                                                      </Button>
                            </div>
                        </div>
                    </div>
                </div></div></Card>
    </motion.div>)}
</motion.div>
  );
};

export default MatchesList;