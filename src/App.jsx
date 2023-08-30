import React, { useState, useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { routes } from "./Routes/routes";
import RootLayout from "./Layout/RootLayout";
import UserContext from "../context/UserContext";
import("./App.css");
import("react-datepicker/dist/react-datepicker.css");

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      {routes.map(({ path, Element, index }) => (
        <Route key={path} path={path} element={<Element />} />
      ))}
    </Route>
  )
);

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);
  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <RouterProvider router={router} />
      </UserContext.Provider>
    </>
  );
}

export default App;
