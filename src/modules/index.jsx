import { ArticleRoute } from "./article/route";
import { CategoriesRoute } from "./categories/route";
import { DashboardRoute } from "./dashboard/route";
import { DeveloperRoute } from "./developer/route";
import { OrderRoute } from "./order/route";
import { OurserviceRoute } from "./our-service/route";
import { PositionRoute } from "./position/route";
import { SaleProductRoute } from "./sale-product/route";
import { SitesRoute } from "./site/route";
import { UsersRoute } from "./users/route";

const routes = [
  //   ...notFound,
  ...DashboardRoute,
  ...SitesRoute,
  ...ArticleRoute,
  ...DeveloperRoute,
  ...SaleProductRoute,
  ...CategoriesRoute,
  ...OurserviceRoute,
  ...UsersRoute,
  ...OrderRoute,
  ...PositionRoute
];
const rolename = "admin";

const data = routes.map((el) => {
  return el?.meta?.role?.has(rolename) ? el : null;
});

export const filteredRoutes = data.filter((el) => el !== null);
