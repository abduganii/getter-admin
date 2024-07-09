import IndexPage from "./pages";
import Actions from "./pages/actions";
export const PortfolioRoute = [
  {
    url: "/portfolio",
    Element: IndexPage,
    label: "Продукты",
    meta: {
      isLoginIf: false,
      role: new Set(["admin"])
    }
  },
  {
    url: "/portfolio/:id",
    Element: Actions,
    meta: {
      isLoginIf: false,
      role: new Set(["admin"])
    }
  }
];
