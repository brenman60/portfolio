import "../styles/link.css";

const Link = ({
    linkType,
    link,
}) => {
  const images = {
    "GitHub": "/portfolio/images/icons/github.png",
    "Download": "/portfolio/images/icons/download.png",
    "Itch": "/portfolio/images/icons/itchio.png",
    "Google Play": "/portfolio/images/icons/google_play.png",
    "Project Website": "/portfolio/images/icons/website.png",
    "Steam": "/portfolio/images/icons/steam.png",
    "YouTube": "/portfolio/images/icons/youtube.png",
    "Kaggle": "/portfolio/images/icons/kaggle.png",
    "Presentation": "/portfolio/images/icons/presentation.png",
    "LinkedIn": "/portfolio/images/icons/linkedin.png",
  }

  return (
    <div className="link" onClick={() => window.open(link, "_blank")}>
      <img className="linkIcon" src={images[linkType]} alt={linkType} />
      <h1 className="linkTitle">{linkType}</h1>
    </div>
  );
};

export default Link;
