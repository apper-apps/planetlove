import { motion } from "framer-motion";
import NavigationTab from "@/components/molecules/NavigationTab";

const BottomNavigation = () => {
  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        <NavigationTab
          to="/"
          icon="Compass"
          label="Discover"
        />
        <NavigationTab
          to="/matches"
          icon="Heart"
          label="Matches"
        />
        <NavigationTab
          to="/profile"
          icon="User"
          label="Profile"
        />
        <NavigationTab
          to="/simulation"
          icon="MessageSquare"
          label="Simulation"
        />
      </div>
    </motion.nav>
  );
};

export default BottomNavigation;