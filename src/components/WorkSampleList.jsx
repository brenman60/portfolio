import { useEffect, useState } from "react";
import "../styles/workSampleList.css";
import WorkSample from "./WorkSample";

const WorkSampleList = () => {
  const [data, setData] = useState(null);
    
  useEffect(() => {
    fetch("data/workSamples.json")
    .then(response => response.json())
    .then(jsonData => setData(jsonData))
    .catch(error => console.error("Error loading JSON: ", error));
  }, []);

  if (!data) {
    return <></>;
  }

  return (
    <div className="workSampleList">
      {Object.entries(data)
        .sort(([, a], [, b]) => a.order - b.order)
        .map(([key, item], index) => (
          <WorkSample key={key} sample={item} id={index} identifier={key} />
        ))}
    </div>
  );
};

export default WorkSampleList;
