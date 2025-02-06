import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export const ValentineProposalCardShare = () => {
    const [buttonStyle, setButtonStyle] = useState({});
    const buttonRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get("name");
    const message = urlParams.get("message");
    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth <= 768);
      };
  
      checkMobile(); // Run on mount
      window.addEventListener("resize", checkMobile);
  
      return () => window.removeEventListener("resize", checkMobile);
    }, []);
  
    const moveButton = () => {
      if (!buttonRef.current) return;
  
      const buttonWidth = buttonRef.current.offsetWidth;
      const buttonHeight = buttonRef.current.offsetHeight;
      const maxX = window.innerWidth - buttonWidth - 10;
      const maxY = window.innerHeight - buttonHeight - 10;
      const randomX = Math.max(10, Math.floor(Math.random() * maxX));
      const randomY = Math.max(10, Math.floor(Math.random() * maxY));
  
      setButtonStyle({
        position: "absolute",
        left: `${randomX}px`,
        top: `${randomY}px`,
        transition: "left 0.3s ease, top 0.3s ease",
      });
    };
  
    return (
      <>
        <img src="/right.png" className="rightImg" alt="Decorative" />
        <img src="/left.png" className="leftImg" alt="Decorative" />
        <div className="container mybox text-center">
          <h1 className="myline">
            {name}, you've received a Valentine's message!
          </h1>
          <p>{message}</p>
          <button
            className="btn btn-success yes-btn"
            onClick={() => alert("You said YES!")}
          >
            YES
          </button>
  
          <button
            ref={buttonRef}
            className="btn btn-danger no-btn"
            onMouseEnter={() => !isMobile && moveButton()} // Move on hover for desktop
            onClick={() => isMobile && moveButton()} // Move on click for mobile
            style={buttonStyle}
          >
            NO
          </button>
  
          <button
            className="companyButton companystart"
            onClick={() => window.open("http://www.avinyakriti.in", "_blank")}
          >
            <img src="/company.png" alt="Company Logo" />
          </button>
        </div>
      </>
    );
  };
  
  
  