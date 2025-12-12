import { useContext, useEffect } from "react";
import "../styles/workSample.css";
import { TagsContext } from "./TagsProvider";
import { useState } from "react";
import Tag from "./Tag";
import { useNavigate } from 'react-router-dom';

const WorkSample = ({
  sample,
  id,
  identifier,
}) => {
  const navigate = useNavigate();
  const { getTagNames } = useContext(TagsContext);

  const [image, setImage] = useState(sample.gallery[0]);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const element = document.getElementById(`workSample${id}`);
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
      }
    }, {
      rootMargin: "-50px 0px -50px 0px",
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [id]);

  const changeImage = (direction) => {
    var currentIndex = sample.gallery.indexOf(image);
    
    if (direction == "left") {
      currentIndex--;
      if (currentIndex == -1) {
        currentIndex = sample.gallery.length - 1;
      }
    } else {
      currentIndex++;
      if (currentIndex == sample.gallery.length) {
        currentIndex = 0;
      }
    }

    setImage(sample.gallery[currentIndex]);
  };

  const hidden = sample.visibility == "hidden";

  return (
    <div id={`workSample${id}`} className={`workSample ${isVisible ? "open" : "closed"}`} style={hidden ?
      { 
        visibility: "hidden",
        display: "none",
      } : {
        visibility: "visible",
      }}>
      <div className="workOrganization">
        <p className="workCategory">{sample.category}</p>
        <p className={`workStatus ${sample.status.toString().toLowerCase()}`}>{sample.status}</p>
      </div>
      <p className="workTime">{sample.time}</p>
      <div className="workGallery">
        <button className="workGalleryLeft" onClick={() => changeImage("left")} type="button"><img src="/portfolio/images/icons/arrow.png" alt="Left Arrow" /></button>
        <div className="workGalleryImageContainer">
        <img className="workGalleryImage" src={image} alt={sample.name} />
        </div>
        <button className="workGalleryRight" onClick={() => changeImage("right")} type="button"><img src="/portfolio/images/icons/arrow.png" alt="Right Arrow" /></button>
      </div>
      <h1 className="workName">{sample.name}</h1>
      <a className="workLearnMore" onClick={() => navigate(`/portfolio/workSample/${identifier}`)}>Learn More</a>
      <ul className="workTags">
        {getTagNames(sample.tags).map((tag, index) => {
          return(
            <li key={index}>
              <Tag tag={tag} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default WorkSample;
