import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const HomePage = () => {
  document.title = "Home";

  const navigate = useNavigate();

  useEffect(() => {
    navigate("/portfolio/about");
  });

  return (
    <motion.div
      key="home-page"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{
        duration: 0.45, 
        ease: [0.16, 1, 0.3, 1]
      }}
    >
    </motion.div>
  );
};

export default HomePage;
