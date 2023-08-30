import SearchByEmail from "../components/BusquedaPorEmail/SearchByEmail";
import Cuenta from "../components/Cuenta/Cuenta";
import SearchByU from "../components/BusquedaPorU/SearchByU";
import Home from "../components/Home/Home";
import Lider from "../components/Lider/Lider";
import CarruselAdmin from "../components/Firebase/CarruselAdmin";

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
    path: "/admin-carrousel",
    Element: CarruselAdmin,
  },
  {
    path: "/*",
  },
];

export { routes };
