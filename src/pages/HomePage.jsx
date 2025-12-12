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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "tween", duration: 0.5, ease: "anticipate" }}
    >
    </motion.div>
  );
};

export default HomePage;
