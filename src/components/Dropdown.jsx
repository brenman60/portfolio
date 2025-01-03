import React, { useState, useRef } from 'react';
import "../styles/dropdown.css"

const Dropdown = ({
    label,
    children,
}) => {
    const [isOpen, setOpen] = useState(false);
    const dropdownRef = useRef(null);
  
    return (
    <>
      {/* This div will be the "header" part that you click */}
      <div className="dropdownHeader" onClick={() => setOpen(!isOpen)}>
        <p className="dropdownTitle">{label}</p>
        <img className="dropdownArrow" src="public/images/Arrow.png" style={isOpen ? {
            transform: "rotate(180deg)",
        } : {
            transform: "rotate(0deg)",
        }} />
      </div>

      {/* This one will be the content */}
      <div className={`dropdownContent ${isOpen ? "open" : "closed"}`} ref={dropdownRef} style={isOpen ? {
        height: `${dropdownRef.current?.scrollHeight}px`
      } : {
        height: "0"
      }}>
        {children}
      </div>
    </>
  )
}

export default Dropdown;
