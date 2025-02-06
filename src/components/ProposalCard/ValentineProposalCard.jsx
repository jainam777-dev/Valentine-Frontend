import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { TwitterShareButton, FacebookShareButton, WhatsappShareButton } from "react-share";
import { TwitterIcon, FacebookIcon, WhatsappIcon } from "react-share";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import axios from "axios";

export const ValentineProposalCard = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [link, setLink] = useState("");
  const [screenShot,setScreenShot]=useState(null);
const check=async (link)=>{

  const apiUrl = `https://api.microlink.io/?url=${encodeURIComponent(link)}&screenshot=true`;

  const response = await axios.get(apiUrl);

  console.log("Microlink API Response:", response.data,response.data.data.screenshot.url);
  setScreenShot(response.data.data.screenshot.url)
}

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const uniqueLink = `${
      window.location.origin
    }/valentine-proposalCardShare?name=${encodeURIComponent(name)}&message=${encodeURIComponent(
      message
    )}`;
    check(uniqueLink);
    setLink(uniqueLink);
  };

  return (
   
            <>
              <img src="/right.png" className="rightImg" alt="Decorative" />
              <img src="/left.png" className="leftImg" alt="Decorative" />
              <div className="container text-center mt-4 mybox">
                <h1 className="myline">Send a Valentine's Message</h1>
                <form onSubmit={handleFormSubmit}>
                  <input
                    type="text"
                    className="form-control my-2"
                    placeholder="Enter your loved one's name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <textarea
                    className="form-control my-2"
                    placeholder="Enter your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                  <button type="submit" className="btn btn-danger mt-2">
                    Generate Link
                  </button>
                  <button
                    className="companyButton companystart2"
                    onClick={() =>
                      window.open("http://www.avinyakriti.in", "_blank")
                    }
                  >
                    <img src="/company.png" alt="Company Logo" />
                  </button>
                </form>
                {link && (
                  <div className="link-container mt-3">
                    <h3>Your personalized Valentine's link:</h3>
                    <p>
                      <Link
                        to={`/valentine-proposalCardShare?name=${encodeURIComponent(
                          name
                        )}&message=${encodeURIComponent(message)}`}
                        target="_blank"
                      >
                        {link}
                      </Link>
                    </p>
                  </div>
                )}
              {link && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
          style={{ backdropFilter: "blur(8px)", zIndex: 10 }}
        ></div>
      )}
      {link && (
        <motion.div
          initial={{ scale: 0, opacity: 0, y: "-100vh" }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0, opacity: 0, y: "-100vh" }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="position-fixed top-50 start-50 translate-middle bg-white p-3 rounded shadow-lg border border-dark"
          style={{ zIndex: 20,  width: "60%",
            maxWidth: "100svw", }}
        >
         
          <div className="position-relative p-3 bg-dark border border-3 border-secondary rounded">
      
            <div className="position-absolute top-0 start-50 translate-middle-x bg-secondary w-25 rounded-pill" style={{ height: "5px" }}></div>
            <img
              src={screenShot}
              alt="Website preview"
              className="img-fluid border border-2 border-white"
            />
            <div className="position-absolute bottom-0 start-50 translate-middle-x bg-secondary w-25 rounded-pill" style={{ height: "5px" }}></div>
          </div>

      
          <div className="d-flex justify-content-center mt-3 gap-2">
            <WhatsappShareButton url={link}>
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <FacebookShareButton url={link}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton url={link}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
          </div>

        
          <div className="text-center mt-3">
            <button className="btn btn-outline-secondary btn-sm mt-2" onClick={() => setLink(null)}>
              Close
            </button>
          </div>
        </motion.div>
      )}
              </div>
            </>
          
        
        
  );
};
