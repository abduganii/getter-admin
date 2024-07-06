import { CategoriesRoute } from "./categories/route";
import { DashboardRoute } from "./dashboard/route";
import { DeveloperRoute } from "./developer/route";
import { OrderRoute } from "./order/route";
import { OurserviceRoute } from "./our-service/route";
// import { SaleProductRoute } from "./sale-product/route";
import { SitesRoute } from "./site/route";

const routes = [
  //   ...notFound,
  ...DashboardRoute,
  ...SitesRoute,
  ...DeveloperRoute,
  // ...SaleProductRoute,
  ...CategoriesRoute,
  ...OurserviceRoute,
  ...OrderRoute
];
const rolename = "admin";

const data = routes.map((el) => {
  return el?.meta?.role?.has(rolename) ? el : null;
});

export const filteredRoutes = data.filter((el) => el !== null);
