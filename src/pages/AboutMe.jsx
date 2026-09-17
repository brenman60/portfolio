import Hero from "../components/Hero";
import PageDivider from "../components/PageDivider";
import { motion } from "framer-motion";
import { TagsContext } from "../components/TagsProvider";
import { useContext, useState, useRef } from "react";
import Tag from "../components/Tag";
import "../styles/aboutMe.css";

const AboutMe = () => {
  document.title = "About Me";

  const topSkills = [67, 70, 45, 22, 73, 64, 26];
  const { getTagNames, getTags, sortByLevel, sortByStarred } = useContext(TagsContext);
  const [tagsExpanded, setTagsExpanded] = useState(false);
  const tagsRef = useRef(null);

  return (
    <motion.div
      key="about-me"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{
        duration: 0.45, 
        ease: [0.16, 1, 0.3, 1]
      }}
    >
      <Hero title="About Me" effects="squares" />
      <PageDivider height="4px" width="80%" />
      <div id="aboutMeInfo">
        <h1 id="aboutDescriptionTitle">Brennan Kunicki</h1>
          <p id="aboutDescription">
            Student at Middlesex Community College, studying for an Associate's Degree in Computer Science.
            My core interests are software development, game development, and web development.
            I am looking for an entry-level position or internship in any field of development, and I am always open to learning new frameworks, languages, and skills.
            Please feel free to reach out to me on the Contact page.
          </p>
          <h1 id="topSkillsTitle">Top Skills</h1>
          <ul id="topSkills">
            {getTagNames(topSkills).map((tag, index) => {
              return(
                <li key={index} className="topSkill">
                  <Tag tag={tag} />
                </li>
              );
            })}
          </ul>
      </div>
      <PageDivider height="4px" width="80%" topMargin={50} bottomMargin={50} />
      <div id="aboutMeTags" ref={tagsRef} className={tagsExpanded ? "open" : "closed"} style={{ height: tagsExpanded ? `${tagsRef.current?.scrollHeight}px` : "500px" }}>
        {Object.entries(sortByStarred(sortByLevel(getTags()))).map(([key, value]) => {
          return(
            <div key={key} className={`aboutMeTag ${value.starred === "true" ? "starred" : ""}`} style={{ display: value.shownInSkills }}>
              <h1 className="aboutMeTagName">{value.name}</h1>
              <div className="aboutMeTagLength">
                <h1 className="aboutMeTagYears">{
                  value.years >= 1 ? value.years : Math.round(value.years * 12)
                }</h1>
                <h1 className="aboutMeTagYearsCaption">{
                  value.years > 1 ? "Years of Experience" :
                  value.years == 1 ? "Year of Experience": "Months of Experience"
                }</h1>
              </div>
            </div>
          )
        })}
      </div>

      <button id="aboutMeTagsExpand" className={tagsExpanded ? "closed" : "open"} onClick={() => setTagsExpanded(true)} type="button">Show More</button>
    </motion.div>
  );
};

export default AboutMe;
