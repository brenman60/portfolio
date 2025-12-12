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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "tween", duration: 0.5, ease: "anticipate" }}
    >
      <Hero title="About Me" effects="squares" />
      <PageDivider height="4px" width="80%" opacity="0.5" />
      <div id="aboutMeInfo">
        <h1 id="aboutDescriptionTitle">Brennan Kunicki</h1>
          <p id="aboutDescription">
          Student at Greater Lowell Technical High School, in the Information Technology program. My core interests are web development, software development, and game development. I can adequately develop programs in C#, Python, Visual Basic, and React.
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
      <PageDivider height="4px" width="80%" opacity="0.5" topMargin={50} bottomMargin={50} />
      <div id="aboutMeTags" ref={tagsRef} className={tagsExpanded ? "open" : "closed"} style={{ height: tagsExpanded ? `${tagsRef.current?.scrollHeight}px` : "500px" }}>
        {Object.entries(sortByStarred(sortByLevel(getTags()))).map(([key, value]) => {
          return(
            <div key={key} className={`aboutMeTag ${value.starred === "true" ? "starred" : ""}`} style={{ display: value.shownInSkills }}>
              <h1 className="aboutMeTagName">{value.name}</h1>
              <div className="aboutMeTagLevel">
                <h1>Proficiency: {value.level + "%"}</h1>
                <div>
                  <div style={{ width: `${value.level}%` }}></div>
                </div>
              </div>
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
