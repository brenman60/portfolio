import "../styles/imageViewer.css";
import { useState, forwardRef, useImperativeHandle } from 'react';

const ImageViewer = forwardRef(({
    title,
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState(null);
  const [image, setImage] = useState(0);

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
      <h1 id="imageViewerTitle">{title}</h1>
      <div id="imageViewerImageContainer">
        <button id="imageViewerLeft" onClick={() => changeImage(-1)} type="button"><img src="/portfolio/images/icons/arrow.png" alt="Left Arrow" /></button>
        <img id="imageViewerImage" src={images[image].link} alt={title} />
        <button id="imageViewerRight" onClick={() => changeImage(1)} type="button"><img src="/portfolio/images/icons/arrow.png" alt="Right Arrow" /></button>
        <a id="imageViewerNewTab" href={images[image].link} target="_blank"><img src="/portfolio/images/icons/newTab.png" alt="Open Image in New Tab" /></a>
      </div>
      <p id="imageViewerCaption">{images[image].caption}</p>
      <button id="imageViewerExit" onClick={() => setIsOpen(false)} type="button">Close</button>
    </div>
  );
});

ImageViewer.displayName = "ImageViewer";
export default ImageViewer;
