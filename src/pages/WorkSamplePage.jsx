import "../styles/workSamplePage.css";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import { TagsContext } from "../components/TagsProvider";
import { useContext, useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Tag from "../components/Tag";
import PageDivider from "../components/PageDivider";
import Link from "../components/Link";
import ImageViewer from "../components/ImageViewer";

const WorkSamplePage = () => {
  const { id } = useParams();
  const [workSample, setWorkSample] = useState(null);
  const { getTagNames } = useContext(TagsContext);
  const [picture, setPicture] = useState(0);
  const imageViewerRef = useRef();

  useEffect(() => {
    fetch("../data/workSamples.json")
    .then(response => response.json())
    .then(jsonData => setWorkSample(jsonData[id]))
    .catch(error => console.error("Error loading JSON: ", error));
  }, [id]);

  const openImageViewer = (image) => {
    imageViewerRef.current.open(workSample.pictures, image);
  };

  const changeImage = (direction) => {
    if (picture + direction <= -1) {
      setPicture(workSample.pictures.length - 1);
    } else if (picture + direction >= workSample.pictures.length) {
      setPicture(0);
    } else {
      setPicture(picture + direction);
    }
  };

  if (!workSample) {
    return <motion.div></motion.div>
  }

  return (
    <motion.div
      key="work-sample"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "tween", duration: 1, ease: "anticipate" }}
    >
      <Hero title={workSample.name} subtitle={
        <>
          {workSample.status} <br /> {workSample.time}
        </>
      } image={workSample.banner} height={400} />
      <PageDivider height="4px" width="80%" opacity="0.5" />
      <div id="workSampleContainer">
        <div id="workSampleColumn1">
          <h1 className="workSectionTitle">Description</h1>
          <p id="workDescription">{workSample.description}</p>
          <PageDivider height="4px" width="80%" opacity="0.5" />
          <h1 className="workSectionTitle">Relevant Skills</h1>
          <ul id="workSampleTags">
            {getTagNames(workSample.tags).map((tag, index) => {
              return(
                <li key={index}>
                  <Tag tag={tag} />
                </li>
              );
            })}
          </ul>
          <PageDivider height="4px" width="80%" opacity="0.5" bottomMargin={25} />
          <p className="workSectionTitle">{`Role: ${workSample.role}`}</p>
          <PageDivider height="4px" width="80%" opacity="0.5" topMargin={25} />
          <ul id="workSampleLinks">
            {workSample.links.map((item, index) => (
              <li key={index} className="workSampleLink">
                <Link linkType={item.name} link={item.link} />
              </li>
            ))}
          </ul>
        </div>

        <div id="workSampleColumn2">
          <div id="workPictureContainer">
            <div id="workPicture">
              <button id="workPictureLeft" onClick={() => changeImage(-1)} type="button"><img src="/portfolio/images/icons/arrow.png" alt="Left Arrow" /></button>
              <img src={workSample.pictures[picture].link} alt={workSample.pictures[picture].caption} id="workPicturePic" />
              <img src="/portfolio/images/icons/zoom.png" alt="Open Image" id="workPictureZoom" onClick={() => openImageViewer(workSample.pictures[picture])} />
              <button id="workPictureRight" onClick={() => changeImage(1)} type="button"><img src="/portfolio/images/icons/arrow.png" alt="Right Arrow" /></button>
            </div>
            <ul id="workPictureDots">
              {workSample.pictures.map((item, index) => (
                <li key={index} className="workPictureDot" onClick={() => setPicture(index)}>
                  <img src={index == picture ? "/portfolio/images/icons/dotFilled.png" : "/portfolio/images/icons/dotEmpty.png"} alt={"Picture " + index} className={index === picture ? "active" : ""} />
                </li>
              ))}
            </ul>
            <p id="workPictureCaption">{workSample.pictures[picture].caption}</p>
          </div>
        </div>
      </div>

      <ImageViewer ref={imageViewerRef} title={workSample.name} />
    </motion.div>
  );
};

export default WorkSamplePage;
