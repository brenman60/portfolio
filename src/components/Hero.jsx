import "../styles/hero.css";

const Hero = ({
    title = "",
    subtitle = "",
    image = "",
    height = 250,
    effects = "",
}) => {
  const hasImage = image != "";

  const renderSquaresEffect = () => {
    const shapes = Array.from({ length: 20 }, (_, i) => (
      <div key={i} className="square"></div>
    ));
    return <div className="squares">{shapes}</div>;
  };

  const renderEffects = () => {
    if (effects.includes("squares")) {
      return renderSquaresEffect();
    }

    return null;
  };

  return (
    <div id="hero" style={{ height: height }}>
        <div id="heroTitles">
          <h1 id="heroText" className={hasImage ? "background" : ""} style={{ visibility: title == "" ? "hidden" : "visible" }}>{title}</h1>
          <h1 id="heroSubtext" className={hasImage ? "background" : ""} style={{ visibility: subtitle == "" ? "hidden" : "visible" }}>{subtitle}</h1>
        </div>
        <div id="heroBackground">
          <img src={image} alt="Hero Background" style={{ visibility: hasImage ? "visible" : "hidden" }} />
        </div>
        <div id={"heroEffects " + effects}>
          {renderEffects()}
        </div>
    </div>
  );
};

export default Hero;
