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
        <i className={`bi bi-caret-${isOpen ? "down" : "right"} mx-1`}></i>
        Admin
      </button>
      <div className={`menu ${isOpen ? "open" : ""}`} id="menu">
        <ul>
          <li>
            <Link className="feedback__a" to="/admin-carrousel">
              Carrusel
            </Link>
          </li>
          <li>
            <Link className="feedback__a" to="/buenas-practicas">
              Buenas practicas
            </Link>
          </li>
          <li>
            <Link className="feedback__a" to="/admin-procedimientos">
              Procedimientos
            </Link>
          </li>
          <li>
            <Link className="feedback__a" to="/admin-carrousel">
              Carrusel
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default FeedBack;
