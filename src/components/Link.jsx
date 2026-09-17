import "../styles/link.css";

const Link = ({
    linkType,
    link,
}) => {
  const images = {
    "GitHub": "images/icons/github.png",
    "Download": "images/icons/download.png",
    "Itch": "images/icons/itchio.png",
    "Google Play": "images/icons/google_play.png",
    "Project Website": "images/icons/website.png",
    "Steam": "images/icons/steam.png",
    "YouTube": "images/icons/youtube.png",
    "Kaggle": "images/icons/kaggle.png",
    "Presentation": "images/icons/presentation.png",
    "LinkedIn": "images/icons/linkedin.png",
  }

  return (
    <div className="link" onClick={() => window.open(link, "_blank")}>
      <img className="linkIcon" src={images[linkType]} alt={linkType} />
      <h1 className="linkTitle">{linkType}</h1>
    </div>
  );
};

export default Link;
