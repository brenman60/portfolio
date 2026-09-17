import "../styles/imageViewer.css";
import { useState, forwardRef, useImperativeHandle } from 'react';
import { MoonLoader } from "react-spinners";
import { AnimatePresence, motion } from "framer-motion";

const ImageViewer = forwardRef(({
    title,
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState(null);
  const [image, setImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [pictureTransitionDirection, setPictureTransitionDirection] = useState(-10);

  useImperativeHandle(ref, () => ({
    // The images and openImage must be in the format of the workSamples.json images, i.e. they must contain the link and caption value, cannot just be a list of links.
    open(images, openImage) {
        setImages(images);
        setImage(images.indexOf(openImage));
        setIsOpen(true);
    },
    close() {
        setIsOpen(false);
    }
  }));

  const changeImage = (direction) => {
    if (direction !== 0) {
      setPictureTransitionDirection(direction > 0 ? -10 : 10);
    }

    if (image + direction <= -1) {
        setImage(images.length - 1);
    } else if (image + direction >= images.length) {
        setImage(0);
    } else {
        setImage(image + direction);
    }
  };

  if (!images) {
    return <></>;
  }

  return (
    <div id="imageViewer" className={isOpen ? "open" : "closed"}>
      <div id="imageViewerImageContainer">
        <button id="imageViewerLeft" onClick={() => changeImage(-1)} type="button">
          <img src="/images/icons/arrow.png" alt="Left Arrow" />
        </button>
        
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={images[image].link}
            src={images[image].link}
            alt={images[image].caption}
            id="imageViewerImage"
            initial={{ opacity: 0, x: -pictureTransitionDirection }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: pictureTransitionDirection }}
            transition={{ duration: 0.2 }}
          />
        </AnimatePresence>

        <button id="imageViewerRight" onClick={() => changeImage(1)} type="button">
          <img src="/images/icons/arrow.png" alt="Right Arrow" />
        </button>
        <a id="imageViewerNewTab" href={images[image].link} target="_blank">
          <img src="/images/icons/newTab.png" alt="Open Image in New Tab" />
        </a>
      </div>
      <p id="imageViewerCaption">{images[image].caption}</p>
      <button id="imageViewerExit" onClick={() => setIsOpen(false)} type="button">
        <img src="/images/icons/exit.png" alt="Exit Button" />
      </button>
    </div>
  );
});

ImageViewer.displayName = "ImageViewer";
export default ImageViewer;
