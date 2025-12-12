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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "tween", duration: 0.5, ease: "anticipate" }}
    >
      <Hero title="Resume" />
      <PageDivider height="4px" width="80%" opacity="0.5" />
      <ResumeView />
      <ResumeDownload />
    </motion.div>
  );
};

export default Resume;
