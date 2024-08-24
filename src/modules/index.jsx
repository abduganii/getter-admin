import { ArticleRoute } from "./article/route";
import { CategoriesRoute } from "./categories/route";
import { DashboardRoute } from "./dashboard/route";
import { DeveloperRoute } from "./developer/route";
import { DocumentRoute } from "./docs/route";
import { OrderRoute } from "./order/route";
import { OurserviceRoute } from "./our-service/route";
import { PortfolioRoute } from "./portfolio/route";
import { PositionRoute } from "./position/route";
import { ProductRoute } from "./product/route";
import { SaleProductRoute } from "./sale-product/route";
import { SitesRoute } from "./site/route";
import { UsersRoute } from "./users/route";

const routes = [
  //   ...notFound,
  ...DashboardRoute,
  ...SitesRoute,
  ...PortfolioRoute,
  ...ArticleRoute,
  ...SaleProductRoute,
  ...DocumentRoute,
  ...ProductRoute,
  ...OurserviceRoute,
  ...OrderRoute,
  ...UsersRoute,
  ...CategoriesRoute,
  ...PositionRoute,
  ...DeveloperRoute,
];
const rolename = "admin";

const data = routes.map((el) => {
  return el?.meta?.role?.has(rolename) ? el : null;
});

export const filteredRoutes = data.filter((el) => el !== null);
