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
    "Itch": "https://brenman60.itch.io/",
    "Steam": "https://store.steampowered.com/search/?publisher=brenman60%20Games",
  };

  return (
    <motion.div
      key="contact"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "tween", duration: 0.5, ease: "anticipate" }}
    >
      <Hero title="Contact" />
      <PageDivider height="4px" width="80%" opacity="0.5" />
      <ul id="contactList">
        {Object.entries(contacts).map(([name, link]) => (
          <li key={name} className="contactLink">
            <Link linkType={name} link={link} />
          </li>
        ))}
      </ul>
      <a id="contactEmail" href="mailto:brennankunicki@gmail.com">brennankunicki@gmail.com</a>
    </motion.div>
  );
};

export default Contact;
