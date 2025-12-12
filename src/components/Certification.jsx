import { useContext, useRef, useEffect } from "react";
import "../styles/certification.css";
import Tag from "./Tag";
import { TagsContext } from "./TagsProvider";

const Certification = ({
    certData,
    listRef,
    id,
}) => {
  const { getTagNames } = useContext(TagsContext);

  const certRef = useRef(null);

  useEffect(() => {
    if (certRef.current) {
      const parentDiv = document.getElementById(id);
      const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (listRef.current?.classList.contains("open")) {
          parentDiv.classList.add("open");
          parentDiv.classList.remove("closed");
        }
      }}, { threshold: 0.1 });

      observer.observe(certRef.current);

      return () => observer.disconnect();
    }
  }, [listRef, id]);

  return (
    <a className="certContent" ref={certRef} href={certData.link} target="_blank" >
        <img src={certData.image} className="certImage" alt={certData.name} />
        <h1 className="certName">{certData.name}</h1>
        <ul className="certSkills">
          {getTagNames(certData.skills).map((tag, index) => {
            return(
              <li key={index}>
                <Tag tag={tag} />
              </li>
            );
          })}
        </ul>
    </a>
  );
};

export default Certification;