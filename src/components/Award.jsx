const Award = ({
    award
}) => {
  const editedDescription = award.description.split("\n").map((line, index) => 
    <span key={index}>{line}<br /></span>
  );

  return (
    <>
      <h1 className="awardTitle">{award.title}</h1>
      <h2 className="awardPlacement" style={{ display: award.placement == "" ? "none" : ""}}>{award.placement}</h2>
      <h3 className="awardDate">{award.date}</h3>
      <p className="awardDescription">{editedDescription}</p>
    </>
  );
};

export default Award;
