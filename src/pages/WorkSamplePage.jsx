import "../styles/workSamplePage.css";
import { AnimatePresence, motion } from "framer-motion";
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
  const [pictureTransitionDirection, setPictureTransitionDirection] = useState(-10);
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
    if (direction !== 0) {
      setPictureTransitionDirection(direction > 0 ? -10 : 10);
    }

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

  document.title = "Work Sample - " + workSample.name;
  return (
    <motion.div
      key="work-sample"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{
        duration: 0.45, 
        ease: [0.16, 1, 0.3, 1]
      }}
    >
      <Hero title={workSample.name} subtitle={
        <>
          {workSample.status} <br /> {workSample.time}
        </>
      } image={workSample.banner} height={400} />
      <PageDivider height="4px" width="80%" />
      <div id="workSampleContainer">
        <div id="workSampleColumn1">
          <h1 className="workSectionTitle">Description</h1>
          <p id="workDescription">{workSample.description}</p>
          <PageDivider height="4px" width="80%" />
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
          <PageDivider height="4px" width="80%" bottomMargin={25} />
          <p className="workSectionTitle workSampleRole">{`Role: ${workSample.role}`}</p>
        </div>

        <div id="workSampleColumn2">
          <div id="workPictureContainer">
            <div id="workPicture">
              <button id="workPictureLeft" onClick={() => {
                changeImage(-1);
              }} type="button"><img src="/images/icons/arrow.png" alt="Left Arrow" /></button>
              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  key={workSample.pictures[picture].link}
                  src={workSample.pictures[picture].link}
                  alt={workSample.pictures[picture].caption}
                  id="workPicturePic"
                  initial={{ opacity: 0, x: -pictureTransitionDirection }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: pictureTransitionDirection }}
                  transition={{ duration: 0.2 }}
                />
              </AnimatePresence>

              <button id="workPictureZoom" onClick={() => openImageViewer(workSample.pictures[picture])}>
                <img src="/images/icons/zoom.png" alt="Open Image" />
              </button>

              <button id="workPictureRight" onClick={() => {
                changeImage(1);
              }} type="button"><img src="/images/icons/arrow.png" alt="Right Arrow" /></button>
            </div>
            <ul id="workPictureDots">
              {workSample.pictures.map((_, index) => (
                <li key={index} className={"workPictureDot" + (index === picture ? " active" : "")} onClick={() => changeImage(index - picture)}>
                  <p>{index + 1}</p>
                </li>
              ))}
            </ul>
            <p id="workPictureCaption">{workSample.pictures[picture].caption}</p>
          </div>

          <PageDivider height="4px" width="80%" topMargin={25} />
          <ul id="workSampleLinks">
            {workSample.links.map((item, index) => (
              <li key={index} className="workSampleLink">
                <Link linkType={item.name} link={item.link} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ImageViewer ref={imageViewerRef} title={workSample.name} />
    </motion.div>
  );
};

export default WorkSamplePage;
