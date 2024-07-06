import IndexPage from "./pages";
import Actions from "./pages/actions";
export const SaleProductRoute = [
  {
    url: "/sale-product",
    Element: IndexPage,
    label: "Продажа",
    meta: {
      isLoginIf: false,
      role: new Set(["admin"])
    }
  },
  {
    url: "/sale-product/:id",
    Element: Actions,
    meta: {
      isLoginIf: false,
      role: new Set(["admin"])
    }
  }
];
