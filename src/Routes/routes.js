import SearchByEmail from "../components/BusquedaPorEmail/SearchByEmail";
import Cuenta from "../components/Cuenta/Cuenta";
import SearchByU from "../components/BusquedaPorU/SearchByU";
import Home from "../components/Home/Home";
import Lider from "../components/Lider/Lider";
import CarouselAdmin from "../components/Firebase/CarouselAdmin";
import BuenasPracticas from "../components/Firebase/BuenasPracticas";
import NotFound from "../components/404/404.jsx";

// Obtener el estado de autenticación del localStorage
const userString = localStorage.getItem("user");
const user = JSON.parse(userString);
const isAuthenticated = !!user.name;
console.log(isAuthenticated);

const routes = isAuthenticated
  ? [
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
        Element: CarouselAdmin,
      },
      {
        path: "/buenas-practicas",
        Element: BuenasPracticas,
      },
      {
        path: "/*",
        Element: NotFound,
      },
    ]
  : [
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
        Element: NotFound,
      },
    ];

export { routes };
