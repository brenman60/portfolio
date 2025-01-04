import { useState, useRef } from 'react';
import Certification from './Certification';
import "../styles/certificationsList.css";

const CertificationsList = ({
    title,
    certifications,
}) => {
  const [isOpen, setOpen] = useState(false);
  const listRef = useRef(null);

  const [certs, setCerts] = useState(
    Object.entries(certifications).map(([key, value]) => ({
      id: key,
      isInteractive: false,
      data: value,
    }))
  );

  const handleTransitionEnd = (id, propertyName) => {
    if (propertyName === "opacity") {
      const certElement = document.querySelector(`.cert[data-id="${id}"]`);
      const opacity = window.getComputedStyle(certElement).opacity;

      setCerts((prevCerts) =>
        prevCerts.map((cert) =>
          cert.id === id
            ? { ...cert, isInteractive: opacity === "1" }
            : cert
        )
      );
    }
  };

  const toggleList = (button) => {
    setOpen(!isOpen);

    button.classList.add("disabled");
    setTimeout(() => {
      button.classList.remove("disabled");
    }, 2 * 1000)
  };

  return (
    <div className="certificationsGroup">
        <h1 className="certGroupTitle">{title}</h1>
        <button className="certGroupButton" onClick={(e) => toggleList(e.target)}>...</button>
        <ul className={`certificationsList ${isOpen ? "open" : "closed"}`} ref={listRef}  style={isOpen ? {
          height: `${listRef.current?.scrollHeight}px`
        } : {
          height: "0"
        }}>
          {certs.map((cert, index) => (
            <li key={cert.id} className="certWrapper" style={{pointerEvents: cert.isInteractive ? "all" : "none"}}>
              <div
                className={`cert ${isOpen ? "open" : "closed"}`}
                data-id={cert.id}
                style={{
                  transitionDelay: `${isOpen ? (index * 0.25) : (0.1)}s, ${isOpen ? (index * 0.25 + 0.1) : (0.2)}s, 0s, 0s`,
                  transitionDuration: `${isOpen ? 1 : 0.5}s, ${isOpen ? 1 : 0.5}s, 0.5s, 0.05s`
                }}
                onTransitionEnd={(e) =>
                  handleTransitionEnd(cert.id, e.propertyName)
                }
              >
                <Certification certData={cert.data} />
              </div>
            </li>
          ))}
        </ul>

        <div className="certGroupFooter" />
    </div>
  )
};

export default CertificationsList;