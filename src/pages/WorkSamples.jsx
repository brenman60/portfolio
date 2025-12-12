import Hero from "../components/Hero";
import PageDivider from "../components/PageDivider";
import { motion } from "framer-motion";
import WorkSampleList from "../components/WorkSampleList";

const WorkSamples = () => {
  document.title = "Work Samples";
  return (
    <motion.div
      key="work-samples"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "tween", duration: 0.5, ease: "anticipate" }}
    >
      <Hero title="Work Samples" />
      <PageDivider height="4px" width="80%" opacity="0.5" />
      
      <WorkSampleList />
    </motion.div>
  );
};

export default WorkSamples;
