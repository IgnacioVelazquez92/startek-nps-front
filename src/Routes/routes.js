import SearchByEmail from "../components/BusquedaPorEmail/SearchByEmail";
import Home from "../components/Home/Home";
import SearchByU from "../components/BusquedaPorU/SearchByU";

const routes = [
  {
    path: "/",
    Element: Home,
  },
  {
    path: "/email",
    Element: SearchByEmail,
  },
  {
    path: "/user",
    Element: SearchByU,
  },
];

export { routes };
