import { motion } from "framer-motion";
import ProfileCard from "@/components/molecules/ProfileCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

const ProfileGrid = ({ 
  profiles, 
  loading, 
  error, 
  onRetry,
  onViewProfile,
  onLike,
  onPass
}) => {
  if (loading) {
    return <Loading type="cards" />;
  }
  
  if (error) {
    return (
      <Error
        message={error}
        onRetry={onRetry}
        className="col-span-full"
      />
    );
  }
  
  if (!profiles || profiles.length === 0) {
    return (
      <Empty
        title="No matches found"
        description="Try adjusting your filters to see more potential matches"
        icon="Search"
        className="col-span-full"
      />
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {profiles.map((profile, index) => (
        <motion.div
          key={profile.Id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <ProfileCard
            profile={profile}
            onViewProfile={onViewProfile}
            onLike={onLike}
            onPass={onPass}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProfileGrid;