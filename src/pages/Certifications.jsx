import { useState } from "react";
import CertificationsList from "../components/CertificationsList";
import Hero from "../components/Hero";
import PageDivider from "../components/PageDivider";
import { motion } from "framer-motion";
import { useEffect } from "react";

const Certifications = () => {
  document.title = "Certifications";

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("data/certifications.json")
    .then(response => response.json())
    .then(jsonData => setData(jsonData))
    .catch(error => console.error("Error loading JSON: ", error));
  }, []);

  if (!data) {
    return <motion.div></motion.div>
  }

  return (
    <motion.div
      key="certifications"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{
        duration: 0.45, 
        ease: [0.16, 1, 0.3, 1]
      }}
    >
      <Hero title="Certifications" />
      <PageDivider height="4px" width="80%" />

      {Object.entries(data).map(([key, value]) => (
        <CertificationsList key={key} title={key} certifications={value} />
      ))}
    </motion.div>
  );
};

export default Certifications;
