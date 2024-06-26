import { DashboardRoute } from "./dashboard/route";
import { ServiceRoute } from "./service/route";
import { SitesRoute } from "./site/route";

const routes = [
  //   ...notFound,
  ...DashboardRoute,
  ...SitesRoute,
  ...ServiceRoute
];
const rolename = "admin";

const data = routes.map((el) => {
  return el?.meta?.role?.has(rolename) ? el : null;
});

export const filteredRoutes = data.filter((el) => el !== null);
