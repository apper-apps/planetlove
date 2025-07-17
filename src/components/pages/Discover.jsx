import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import FilterSidebar from "@/components/organisms/FilterSidebar";
import ProfileGrid from "@/components/organisms/ProfileGrid";
import ApperIcon from "@/components/ApperIcon";
import { profileService } from "@/services/api/profileService";

const Discover = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    mbtiTypes: [],
    loveLanguages: [],
    compatibility: { min: 0, max: 100 }
  });
  
  const loadProfiles = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await profileService.getAll();
      setProfiles(data);
    } catch (err) {
      setError("Failed to load profiles. Please try again.");
      toast.error("Failed to load profiles");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadProfiles();
  }, []);
  
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    // Apply filters to profiles
    applyFilters(newFilters);
  };
  
  const applyFilters = async (filterCriteria) => {
    try {
      setLoading(true);
      const data = await profileService.getAll();
      
      let filteredProfiles = data;
      
      // Filter by MBTI types
      if (filterCriteria.mbtiTypes.length > 0) {
        filteredProfiles = filteredProfiles.filter(profile =>
          filterCriteria.mbtiTypes.includes(profile.mbtiType)
        );
      }
      
      // Filter by love languages
      if (filterCriteria.loveLanguages.length > 0) {
        filteredProfiles = filteredProfiles.filter(profile =>
          profile.loveLanguages.some(lang =>
            filterCriteria.loveLanguages.includes(lang)
          )
        );
      }
      
      // Filter by compatibility score
      filteredProfiles = filteredProfiles.filter(profile =>
        profile.compatibilityScore >= filterCriteria.compatibility.min &&
        profile.compatibilityScore <= filterCriteria.compatibility.max
      );
      
      setProfiles(filteredProfiles);
    } catch (err) {
      setError("Failed to apply filters");
      toast.error("Failed to apply filters");
    } finally {
      setLoading(false);
    }
  };
  
  const handleViewProfile = (profileId) => {
    toast.info(`Viewing profile ${profileId}`);
  };
  
  const handleLike = (profileId) => {
    toast.success("Profile liked! 💕");
  };
  
  const handlePass = (profileId) => {
    toast.info("Profile passed");
  };
  
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Filter Sidebar - Desktop */}
        <div className="hidden lg:block w-80 bg-white shadow-lg">
          <FilterSidebar
            isOpen={true}
            onClose={() => {}}
            filters={filters}
            onFiltersChange={handleFiltersChange}
          />
        </div>
        
        {/* Mobile Filter Sidebar */}
        <FilterSidebar
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          filters={filters}
          onFiltersChange={handleFiltersChange}
        />
        
        {/* Main Content */}
        <div className="flex-1 p-6 lg:ml-0">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h1 className="text-3xl font-display font-bold gradient-text">
                Discover
              </h1>
              <p className="text-gray-600 mt-1">
                Find your perfect psychological match
              </p>
            </div>
            
            <Button
              variant="outline"
              onClick={() => setIsFilterOpen(true)}
              className="lg:hidden"
            >
              <ApperIcon name="Filter" className="w-5 h-5 mr-2" />
              Filters
            </Button>
          </motion.div>
          
          {/* Profile Grid */}
          <ProfileGrid
            profiles={profiles}
            loading={loading}
            error={error}
            onRetry={loadProfiles}
            onViewProfile={handleViewProfile}
            onLike={handleLike}
            onPass={handlePass}
          />
        </div>
      </div>
    </div>
  );
};

export default Discover;