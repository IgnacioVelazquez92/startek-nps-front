import React from "react";
import { Outlet } from "react-router-dom";
import "./layaout.css";
import Sidebar from "../components/Navbar/Sidebar";

const RootLayout = () => {
  return (
    <div className="root-layout">
      <Sidebar />
      <main className="main p-0">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
