import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./feedBack.css";

const FeedBack = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className="toggle-button text-light" onClick={toggleMenu}>
        <i className="bi bi-gear-wide-connected d-md-none h3"></i>
        <i className={`bi bi-caret-${isOpen ? "down" : "right"} mx-1`}></i>
        <span className="d-md-block d-none">Admin</span>
      </button>
      <div className={`menu ${isOpen ? "open" : ""}`} id="menu">
        <ul>
          <li>
            <Link className="feedback__a" to="/admin-carrousel">
              <span className="d-md-block d-none">Carrusel</span>
              <i className="bi bi-images d-md-none h3"></i>
            </Link>
          </li>
          <li>
            <Link className="feedback__a" to="/buenas-practicas">
              <span className="d-md-block d-none">Buenas practicas</span>
              <i className="bi bi-journal-check d-md-none h3"></i>
            </Link>
          </li>
          <li>
            <Link className="feedback__a" to="/admin-procedimientos">
              <span className="d-md-block d-none">Procedimientos</span>
              <i className="bi bi-signpost-2-fill d-md-none h3"></i>
            </Link>
          </li>
          <li>
            <Link className="feedback__a" to="/admin-base">
              <span className="d-md-block d-none">Base NPS</span>
              <i className="bi bi-database-fill-up d-md-none h3"></i>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default FeedBack;
