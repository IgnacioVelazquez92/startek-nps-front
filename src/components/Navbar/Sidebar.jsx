import "./sidebar.css";
import React, { useContext } from "react";
import SidemarModal from "./SidebarModal";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../../context/userContext";
import InicioSesion from "./inicioSesion";
import FeedBack from "./FeedBack";

const Sidebar = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark sidebar">
      <Link
        as={Link}
        to="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <img className="img-fluid d-none d-md-block" src="/SRT_BIG-dark.svg" />
        <img className="img-fluid d-md-none" src="/SRT_dark.svg" />
      </Link>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink
            as={Link}
            to="/"
            className="d-none d-md-block nav-link text-white sidebar__link"
            activeclassname="active"
          >
            <i className="bi bi-house-door me-1"></i>
            Inicio
          </NavLink>
          <NavLink
            as={Link}
            to="/"
            className="d-md-none nav-link text-white sidebar__link"
            activeclassname="active"
          >
            <i className="bi bi-house-door me-1 h1"></i>
          </NavLink>
        </li>
        <li>
          <NavLink
            as={Link}
            to="/email"
            className="d-none d-md-block nav-link text-white sidebar__link"
          >
            <i className="bi bi-people-fill  me-1"></i>
            Clientes
          </NavLink>

          <NavLink
            as={Link}
            to="/email"
            className="d-md-none nav-link text-white sidebar__link"
          >
            <i className="bi bi-people-fill h1 me-1"></i>
          </NavLink>
        </li>
        <li>
          <NavLink
            as={Link}
            to="/user"
            className="d-none d-md-block nav-link text-white sidebar__link"
          >
            <i className="bi bi-headset me-1"></i>
            Agente
          </NavLink>
          <NavLink
            as={Link}
            to="/user"
            className="d-md-none nav-link text-white sidebar__link"
          >
            <i className="bi bi-headset me-1 h1"></i>
          </NavLink>
        </li>
        <li>
          <NavLink
            as={Link}
            to="/lider"
            className="d-none d-md-block nav-link text-white sidebar__link"
          >
            <i className="bi bi-star-fill me-1"></i>
            Lider
          </NavLink>
          <NavLink
            as={Link}
            to="/lider"
            className="d-md-none nav-link text-white sidebar__link"
          >
            <i className="bi bi-star-fill me-1 h1"></i>
          </NavLink>
        </li>
        <li>
          <NavLink
            as={Link}
            to="/cuenta"
            className="d-none d-md-block nav-link text-white sidebar__link"
          >
            <i className="bi bi-graph-up-arrow me-1"></i>
            Cuenta
          </NavLink>
          <NavLink
            as={Link}
            to="/cuenta"
            className="d-md-none nav-link text-white sidebar__link"
          >
            <i className="bi bi-graph-up-arrow me-1 h1"></i>
          </NavLink>
        </li>
        {user && (
          <li>
            <FeedBack />
          </li>
        )}
      </ul>
      <hr />
      {!user ? <SidemarModal /> : <InicioSesion user={user} />}
    </div>
  );
};

export default Sidebar;
