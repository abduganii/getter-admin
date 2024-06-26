import SitesPage from "./pages";
import Actions from "./pages/actions";
export const SitesRoute = [
  {
    url: "/sites",
    Element: SitesPage,
    label: "Все сайты",
    meta: {
      isLoginIf: false,
      role: new Set(["admin"])
    }
  },
  {
    url: "/sites/:id",
    Element: Actions,
    meta: {
      isLoginIf: false,
      role: new Set(["admin"])
    }
  }
];
