import { useState, useRef } from 'react';
import Certification from './Certification';
import "../styles/certificationsList.css";
import { useEffect } from 'react';

const CertificationsList = ({
    title,
    certifications,
}) => {
  const [isOpen, setOpen] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const listRef = useRef(null);

  const [certs, setCerts] = useState(
    Object.entries(certifications).map(([key, value]) => ({
      id: key,
      isInteractive: false,
      data: value,
    }))
  );

  const updateListHeight = () => {
    if (listRef.current) {
      listRef.current.style.height = isOpen ? `${listRef.current.scrollHeight}px` : '0';
    }
  };

  useEffect(() => {
    const handleResize = () => updateListHeight();
    window.addEventListener("resize", handleResize);
    updateListHeight();

    return () => {
      window.removeEventListener("resize", handleResize);
    }
  });

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

    if (isOpen && listRef.current) {
      const certElements = listRef.current.querySelectorAll(".cert");
      certElements.forEach((cert) => {
        if (cert.classList.contains("open")) {
          cert.classList.add("closed");
          cert.classList.remove("open");
        }
      });
    }

    setButtonDisabled(true);
    button.classList.add("disabled");
    setTimeout(() => {
      setButtonDisabled(false);
      button.classList.remove("disabled");
    }, 250)
  };

  return (
    <div className="certificationsGroup">
        <h1 className="certGroupTitle">{title}</h1>
        <div className="certGroupButtonWrapper" style={{ pointerEvents: buttonDisabled ? "none" : "auto" }}>
          <button className="certGroupButton" onClick={(e) => toggleList(e.target)} type="button">&#x2022; &#x2022; &#x2022;</button>
        </div>
        <ul className={`certificationsList ${isOpen ? "open" : "closed"}`} ref={listRef}  style={isOpen ? {
          height: `${listRef.current?.scrollHeight}px`
        } : {
          height: "0"
        }}>
          {certs.map((cert) => (
            <li key={cert.id} className="certWrapper" style={{pointerEvents: cert.isInteractive ? "auto" : "none", visibility: `${cert.visibility}`}}>
              <div
                className={"cert closed"}
                data-id={cert.id}
                id={cert.id}
                onTransitionEnd={(e) =>
                  handleTransitionEnd(cert.id, e.propertyName)
                }
              >
                <Certification certData={cert.data} listRef={listRef} id={cert.id} />
              </div>
            </li>
          ))}
        </ul>

        <div className="certGroupFooter" />
    </div>
  );
};

export default CertificationsList;