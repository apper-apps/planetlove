import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import BottomNavigation from "@/components/organisms/BottomNavigation";
import Discover from "@/components/pages/Discover";
import Matches from "@/components/pages/Matches";
import Profile from "@/components/pages/Profile";
import Simulation from "@/components/pages/Simulation";

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Routes>
        <Route path="/" element={<Discover />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/simulation" element={<Simulation />} />
      </Routes>
      
      <BottomNavigation />
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastClassName="font-body"
        style={{ zIndex: 9999 }}
      />
    </div>
  );
}

export default App;