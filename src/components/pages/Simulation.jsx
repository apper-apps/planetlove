import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import SimulationChat from "@/components/organisms/SimulationChat";
import ApperIcon from "@/components/ApperIcon";
import { simulationService } from "@/services/api/simulationService";

const Simulation = () => {
  const [simulation, setSimulation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasActiveSimulation, setHasActiveSimulation] = useState(false);
  
  const loadSimulation = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await simulationService.getActive();
      setSimulation(data);
      setHasActiveSimulation(true);
    } catch (err) {
      setHasActiveSimulation(false);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadSimulation();
  }, []);
  
  const handleStartSimulation = async () => {
    try {
      const newSimulation = await simulationService.create({
        participants: ["user1", "user2"],
        questionSequence: [1, 2, 3, 4, 5],
        responses: [],
        completionRate: 0,
        insights: {}
      });
      setSimulation(newSimulation);
      setHasActiveSimulation(true);
      toast.success("Simulation started!");
    } catch (err) {
      toast.error("Failed to start simulation");
    }
  };
  
  const handleSendResponse = async (response) => {
    try {
      const updatedSimulation = await simulationService.addResponse(simulation.Id, response);
      setSimulation(updatedSimulation);
    } catch (err) {
      toast.error("Failed to send response");
    }
  };
  
  const handleCompleteSimulation = async (responses) => {
    try {
      const completedSimulation = await simulationService.complete(simulation.Id, responses);
      setSimulation(completedSimulation);
      toast.success("Simulation completed!");
    } catch (err) {
      toast.error("Failed to complete simulation");
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto p-6 pb-20">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-8"></div>
            <div className="bg-gray-200 rounded-2xl h-96"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!hasActiveSimulation) {
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
                <ApperIcon name="MessageSquare" className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-display font-bold gradient-text">
                Dating Simulation
              </h1>
            </div>
            <p className="text-gray-600">
              Experience guided conversations to deepen your emotional connection
            </p>
          </motion.div>
          
          {/* Welcome Card */}
          <Card className="p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary-100 to-accent-100 rounded-full flex items-center justify-center">
              <ApperIcon name="Heart" className="w-10 h-10 text-primary-500" />
            </div>
            
            <h2 className="text-2xl font-display font-semibold text-gray-800 mb-4">
              Ready to Connect?
            </h2>
            
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Our simulation uses the famous "36 Questions to Fall in Love" to create meaningful 
              conversations that help you understand your compatibility with potential matches.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-2 bg-primary-100 rounded-full flex items-center justify-center">
                  <ApperIcon name="MessageCircle" className="w-6 h-6 text-primary-500" />
                </div>
                <h3 className="font-medium text-gray-800">Guided Questions</h3>
                <p className="text-sm text-gray-600">Answer thoughtful questions together</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-2 bg-primary-100 rounded-full flex items-center justify-center">
                  <ApperIcon name="BarChart" className="w-6 h-6 text-primary-500" />
                </div>
                <h3 className="font-medium text-gray-800">Compatibility Analysis</h3>
                <p className="text-sm text-gray-600">Get insights on your connection</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-2 bg-primary-100 rounded-full flex items-center justify-center">
                  <ApperIcon name="Users" className="w-6 h-6 text-primary-500" />
                </div>
                <h3 className="font-medium text-gray-800">Deeper Connection</h3>
                <p className="text-sm text-gray-600">Build meaningful relationships</p>
              </div>
            </div>
            
            <Button
              variant="primary"
              size="lg"
              onClick={handleStartSimulation}
              className="px-8"
            >
              <ApperIcon name="Play" className="w-5 h-5 mr-2" />
              Start Simulation
            </Button>
          </Card>
        </div>
      </div>
    );
  }
  
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
              <ApperIcon name="MessageSquare" className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-display font-bold gradient-text">
              Dating Simulation
            </h1>
          </div>
          <p className="text-gray-600">
            Answer questions together to build a deeper connection
          </p>
        </motion.div>
        
        {/* Simulation Chat */}
        <SimulationChat
          simulation={simulation}
          loading={loading}
          error={error}
          onRetry={loadSimulation}
          onSendResponse={handleSendResponse}
          onCompleteSimulation={handleCompleteSimulation}
        />
      </div>
    </div>
  );
};

export default Simulation;