import SearchByEmail from "../components/BusquedaPorEmail/SearchByEmail";
import Cuenta from "../components/Cuenta/Cuenta";
import SearchByU from "../components/BusquedaPorU/SearchByU";
import Home from "../components/Home/Home";
import Lider from "../components/Lider/Lider";
import CarouselAdmin from "../components/Firebase/CarouselAdmin";
import BuenasPracticas from "../components/Firebase/BuenasPracticas";
import NotFound from "../components/404/404.jsx";
import AdminPDFUploader from "../components/Firebase/AdminPDFUploader";

const userString = localStorage.getItem("user");
const user = JSON.parse(userString);
const isAuthenticated = user && user.name;

const protectedRoutes = [
  {
    path: "/admin-carrousel",
    Element: CarouselAdmin,
  },
  {
    path: "/buenas-practicas",
    Element: BuenasPracticas,
  },
  {
    path: "/admin-procedimientos",
    Element: AdminPDFUploader,
  },
];

const publicRoutes = [
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

// Combina las rutas según el estado de autenticación
const routes = isAuthenticated
  ? [...publicRoutes, ...protectedRoutes]
  : publicRoutes;

export { routes };
