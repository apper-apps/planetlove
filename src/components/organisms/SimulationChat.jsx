import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";

const SimulationChat = ({ 
  simulation, 
  loading, 
  error, 
  onRetry,
  onSendResponse,
  onCompleteSimulation
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState([]);
  const [selectedResponse, setSelectedResponse] = useState("");
  
  const questions = [
    {
      id: 1,
      text: "What would constitute a 'perfect' day for you?",
      category: "Personal Values",
      responses: [
        "A day filled with meaningful conversations and deep connections",
        "An adventure exploring new places and experiences",
        "A peaceful day at home with loved ones",
        "A productive day achieving important goals"
      ]
    },
    {
      id: 2,
      text: "For what in your life do you feel most grateful?",
      category: "Gratitude",
      responses: [
        "My family and close relationships",
        "My health and well-being",
        "The opportunities I've been given",
        "The ability to learn and grow"
      ]
    },
    {
      id: 3,
      text: "If you could change anything about the way you were raised, what would it be?",
      category: "Family",
      responses: [
        "More open communication about emotions",
        "More encouragement to take risks",
        "More quality time together",
        "Nothing, I'm grateful for my upbringing"
      ]
    },
    {
      id: 4,
      text: "What is your most treasured memory?",
      category: "Memories",
      responses: [
        "A special moment with family",
        "An achievement I worked hard for",
        "A spontaneous adventure",
        "A quiet moment of realization"
      ]
    },
    {
      id: 5,
      text: "What does friendship mean to you?",
      category: "Relationships",
      responses: [
        "Unconditional support and loyalty",
        "Shared experiences and adventures",
        "Deep understanding and acceptance",
        "Mutual growth and inspiration"
      ]
    }
  ];
  
useEffect(() => {
    if (simulation && simulation.responses) {
      const parsedResponses = typeof simulation.responses === 'string' 
        ? JSON.parse(simulation.responses) 
        : simulation.responses;
      setResponses(parsedResponses);
      setCurrentQuestion(parsedResponses.length);
    }
  }, [simulation]);
  
  const handleResponseSelect = (response) => {
    setSelectedResponse(response);
  };
  
  const handleSendResponse = () => {
    if (!selectedResponse) return;
    
    const newResponse = {
      questionId: questions[currentQuestion].id,
      response: selectedResponse,
      timestamp: new Date().toISOString()
    };
    
    const updatedResponses = [...responses, newResponse];
    setResponses(updatedResponses);
    onSendResponse(newResponse);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedResponse("");
    } else {
      onCompleteSimulation(updatedResponses);
    }
  };
  
  if (loading) {
    return <Loading type="form" />;
  }
  
  if (error) {
    return (
      <Error
        message={error}
        onRetry={onRetry}
      />
    );
  }
  
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const isCompleted = currentQuestion >= questions.length;
  
  if (isCompleted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <Card className="p-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
            <ApperIcon name="CheckCircle" className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-display font-semibold text-gray-800 mb-2">
            Simulation Complete!
          </h2>
          <p className="text-gray-600 mb-6">
            Great job! Your responses have been analyzed for compatibility insights.
          </p>
          <Button
            variant="primary"
            onClick={() => window.location.href = "/matches"}
          >
            <ApperIcon name="Heart" className="w-4 h-4 mr-2" />
            View Your Matches
          </Button>
        </Card>
      </motion.div>
    );
  }
  
  const currentQ = questions[currentQuestion];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Progress Bar */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-sm font-medium text-primary-600">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full"
            transition={{ duration: 0.5 }}
          />
        </div>
      </Card>
      
      {/* Question Card */}
      <Card className="p-6">
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <ApperIcon name="MessageCircle" className="w-5 h-5 text-primary-500" />
            <span className="text-sm font-medium text-primary-600">
              {currentQ.category}
            </span>
          </div>
          <h2 className="text-xl font-display font-semibold text-gray-800">
            {currentQ.text}
          </h2>
        </div>
        
        <div className="space-y-3">
          {currentQ.responses.map((response, index) => (
            <motion.button
              key={index}
              onClick={() => handleResponseSelect(response)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`w-full p-4 rounded-xl text-left transition-all duration-200 ${
                selectedResponse === response
                  ? "bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg"
                  : "bg-gray-50 hover:bg-primary-50 text-gray-700"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full border-2 ${
                  selectedResponse === response
                    ? "border-white bg-white"
                    : "border-gray-300"
                }`}>
                  {selectedResponse === response && (
                    <div className="w-2 h-2 bg-primary-500 rounded-full m-0.5"></div>
                  )}
                </div>
                <span className="flex-1">{response}</span>
              </div>
            </motion.button>
          ))}
        </div>
        
        <div className="mt-6 flex justify-end">
          <Button
            variant="primary"
            onClick={handleSendResponse}
            disabled={!selectedResponse}
          >
            {currentQuestion < questions.length - 1 ? "Next Question" : "Complete Simulation"}
            <ApperIcon name="ArrowRight" className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </Card>
      
      {/* Previous Responses */}
      {responses.length > 0 && (
        <Card className="p-6">
          <h3 className="font-display font-medium text-gray-800 mb-4">
            Your Previous Responses
          </h3>
          <div className="space-y-3">
            {responses.map((response, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-primary-600">
                    {index + 1}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800">{response.response}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </motion.div>
  );
};

export default SimulationChat;