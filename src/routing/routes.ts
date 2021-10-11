import Login from "../pages/Login";
import People from "../pages/People";
import Person from "../pages/Person";
import Tasks from "../pages/Tasks";

/**
 * Route Types
 */
export type IRouteType = {
  name: string;
  link: string;
  component: any;
  authed: boolean;
  admin: boolean;
  showInNav: boolean;
};

/**
 * Defines all routes for the application
 *
 * @param {string} name - The name of the route
 * @param {string} link - The link to he route
 * @param {JSX.Element} component - The component to be rendered
 * @param {bool} authed - Whether the user needs to be authenticated to view this route
 * @param {bool} admin - Whether the user needs to be an admin view this route
 * @param {bool} showInNav - Whether this route should display in the navigation
 */
const routes: IRouteType[] = [
  {
    name: "Login",
    link: "/login",
    component: Login,
    authed: false,
    admin: false,
    showInNav: true,
  },
  {
    name: "Tasks",
    link: "/tasks",
    component: Tasks,
    authed: true,
    admin: true,
    showInNav: true,
  },
  {
    name: "People",
    link: "/people",
    component: People,
    authed: true,
    admin: true,
    showInNav: true,
  },
  {
    name: "Person",
    link: "/person/:id",
    component: Person,
    authed: true,
    admin: false,
    showInNav: false,
  },
];

export default routes;
