import Hero from "../components/Hero";
import PageDivider from "../components/PageDivider";
import { motion } from "framer-motion";
import Link from "../components/Link";
import "../styles/contact.css";

const Contact = () => {
  document.title = "Contact";

  const contacts = {
    "LinkedIn": "https://www.linkedin.com/in/brennan-kunicki-55a83a30a",
    "GitHub": "https://github.com/brenman60",
    "Itch": "https://brenman60.itch.io/"
  };

  return (
    <motion.div
      key="contact"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{
        duration: 0.45, 
        ease: [0.16, 1, 0.3, 1]
      }}
    >
      <Hero title="Contact" />
      <PageDivider height="4px" width="80%" />
      <a id="contactEmail" href="mailto:brennankunicki@gmail.com">brennankunicki@gmail.com</a>
      <ul id="contactList">
        {Object.entries(contacts).map(([name, link]) => (
          <li key={name} className="contactLink">
            <Link linkType={name} link={link} />
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default Contact;
