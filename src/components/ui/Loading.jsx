import { motion } from "framer-motion";

const Loading = ({ type = "cards" }) => {
  const renderCardSkeleton = () => (
    <div className="bg-surface rounded-2xl p-6 shadow-lg animate-pulse">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-32"></div>
          <div className="h-3 bg-gray-200 rounded w-24"></div>
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="h-3 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
      </div>
      <div className="flex space-x-2">
        <div className="h-6 bg-gray-200 rounded-full w-16"></div>
        <div className="h-6 bg-gray-200 rounded-full w-20"></div>
      </div>
    </div>
  );

  const renderListSkeleton = () => (
    <div className="bg-surface rounded-xl p-4 shadow-md animate-pulse">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="w-16 h-8 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );

  const renderFormSkeleton = () => (
    <div className="bg-surface rounded-xl p-6 shadow-lg animate-pulse">
      <div className="space-y-4">
        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
        <div className="h-10 bg-gray-200 rounded w-1/3"></div>
      </div>
    </div>
  );

  const skeletonVariants = {
    initial: { opacity: 0.6 },
    animate: { opacity: 1 },
    transition: { duration: 0.8, repeat: Infinity, repeatType: "reverse" }
  };

  return (
    <div className="space-y-6">
      <motion.div
        variants={skeletonVariants}
        initial="initial"
        animate="animate"
        className="space-y-4"
      >
        {type === "cards" && (
          <>
            {[...Array(3)].map((_, i) => (
              <div key={i}>{renderCardSkeleton()}</div>
            ))}
          </>
        )}
        {type === "list" && (
          <>
            {[...Array(5)].map((_, i) => (
              <div key={i}>{renderListSkeleton()}</div>
            ))}
          </>
        )}
        {type === "form" && renderFormSkeleton()}
      </motion.div>
    </div>
  );
};

export default Loading;