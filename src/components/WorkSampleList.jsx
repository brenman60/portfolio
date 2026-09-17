import { useEffect, useState } from "react";
import "../styles/workSampleList.css";
import WorkSample from "./WorkSample";

const WorkSampleList = () => {
  const [data, setData] = useState(null);
    
  useEffect(() => {
    // const jsonPath = import.meta.env.DEV 
    // ? "/data/workSamples.json" 
    // : `${import.meta.env.BASE_URL}data/workSamples.json`;

    fetch("/data/workSamples.json")
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
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
