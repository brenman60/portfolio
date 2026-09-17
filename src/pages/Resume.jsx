import Hero from "../components/Hero";
import PageDivider from "../components/PageDivider";
import { motion } from "framer-motion";
import ResumeView from "../components/ResumeView";
import ResumeDownload from "../components/ResumeDownload";

const Resume = () => {
  document.title = "Resume";
  return (
    <motion.div
      key="resume"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{
        duration: 0.45, 
        ease: [0.16, 1, 0.3, 1]
      }}
    >
      <Hero title="Resume" />
      <PageDivider height="4px" width="80%" />
      <ResumeView />
      <ResumeDownload />
    </motion.div>
  );
};

export default Resume;
