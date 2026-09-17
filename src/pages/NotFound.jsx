import Hero from "../components/Hero";
import PageDivider from "../components/PageDivider";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import "../styles/notFound.css";

const NotFound = () => {
  document.title = "404 Not Found";

  const navigate = useNavigate();

  return (
    <motion.div
      key="not-found"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{
        duration: 0.45, 
        ease: [0.16, 1, 0.3, 1]
      }}
    >
      <Hero title="404 Not Found" />
      <PageDivider height="4px" width="80%" />
      <h1 id="notFoundTitle">{`This page doesn't seem to exist.`}</h1>
      <button id="notFoundButton" onClick={() => navigate("/portfolio/")}>Home</button>
    </motion.div>
  );
};

export default NotFound;
