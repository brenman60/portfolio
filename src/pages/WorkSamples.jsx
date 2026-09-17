import Hero from "../components/Hero";
import PageDivider from "../components/PageDivider";
import { motion } from "framer-motion";
import WorkSampleList from "../components/WorkSampleList";

const WorkSamples = () => {
  document.title = "Work Samples";
  return (
    <motion.div
      key="work-samples"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1]
      }}
    >
      <Hero title="Work Samples" />
      <PageDivider height="4px" width="80%" />
      
      <WorkSampleList />
    </motion.div>
  );
};

export default WorkSamples;
