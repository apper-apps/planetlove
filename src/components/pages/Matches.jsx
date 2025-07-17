import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import MatchesList from "@/components/organisms/MatchesList";
import ApperIcon from "@/components/ApperIcon";
import { matchService } from "@/services/api/matchService";

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const loadMatches = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await matchService.getAll();
      setMatches(data);
    } catch (err) {
      setError("Failed to load matches. Please try again.");
      toast.error("Failed to load matches");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadMatches();
  }, []);
  
  const handleStartSimulation = (matchId) => {
    toast.success("Starting simulation...");
    // Navigate to simulation page
    window.location.href = `/simulation?matchId=${matchId}`;
  };
  
  const handleViewProfile = (matchId) => {
    toast.info(`Viewing profile ${matchId}`);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
              <ApperIcon name="Heart" className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-display font-bold gradient-text">
              Your Matches
            </h1>
          </div>
          <p className="text-gray-600">
            Connect with people who share your psychological compatibility
          </p>
        </motion.div>
        
        {/* Matches List */}
        <MatchesList
          matches={matches}
          loading={loading}
          error={error}
          onRetry={loadMatches}
          onStartSimulation={handleStartSimulation}
          onViewProfile={handleViewProfile}
        />
      </div>
    </div>
  );
};

export default Matches;