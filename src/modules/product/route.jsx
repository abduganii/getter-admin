import IndexPage from "./pages";
import Actions from "./pages/actions";
export const ProductRoute = [
  {
    url: "/product",
    Element: IndexPage,
    label: "Product",
    meta: {
      isLoginIf: false,
      role: new Set(["admin"])
    }
  },
  {
    url: "/product/:id",
    Element: Actions,
    meta: {
      isLoginIf: false,
      role: new Set(["admin"])
    }
  }
];
