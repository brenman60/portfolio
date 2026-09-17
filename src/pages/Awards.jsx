import Hero from "../components/Hero";
import PageDivider from "../components/PageDivider";
import { motion } from "framer-motion";
import "../styles/awards.css";
import { useState, useEffect } from "react";
import Award from "../components/Award";

const Awards = () => {
  document.title = "Awards";

  const [data, setData] = useState(null);
    
  useEffect(() => {
    fetch("data/awards.json")
    .then(response => response.json())
    .then(jsonData => setData(jsonData))
    .catch(error => console.error("Error loading JSON: ", error));
  }, []);

  if (!data) {
    return <motion.div></motion.div>
  }

  return (
    <motion.div
      key="awards"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{
        duration: 0.45, 
        ease: [0.16, 1, 0.3, 1]
      }}
    >
      <Hero title="Awards" />
      <PageDivider height="4px" width="80%" />
      <ul id="awardList">
        {Object.entries(data).map(([key, value]) => (
          <li key={key} className="award" style={{ display: value.visibility == "visible" ? "" : "none" }}>
            <Award award={value} />
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default Awards;
