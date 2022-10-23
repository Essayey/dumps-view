import AddDump from "./pages/AddDump";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import Main from "./pages/Main";
import { ADD_DUMP_ROUTE, ADMIN_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE } from "./utils/consts";

export const publicRoutes = [
    { path: MAIN_ROUTE, component: Main },
]

export const guestRoutes = [
    { path: REGISTRATION_ROUTE, component: Auth },
    { path: LOGIN_ROUTE, component: Auth }
]

export const authRoutes = [
    { path: ADD_DUMP_ROUTE, component: AddDump }
]

export const adminRoutes = [
    { path: ADMIN_ROUTE, component: Admin }
]