import SearchByEmail from "../components/BusquedaPorEmail/SearchByEmail";
import Cuenta from "../components/Cuenta/Cuenta";
import SearchByU from "../components/BusquedaPorU/SearchByU";
import Home from "../components/Home/Home";
import Lider from "../components/Lider/Lider";

const routes = [
  {
    path: "/",
    Element: Home,
  },

  {
    path: "/cuenta",
    Element: Cuenta,
  },
  {
    path: "/email",
    Element: SearchByEmail,
  },
  {
    path: "/user",
    Element: SearchByU,
  },
  {
    path: "/lider",
    Element: Lider,
  },
  {
    path: "/*",
  },
];

export { routes };
