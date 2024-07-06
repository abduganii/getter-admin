import indexPage from "./pages";
import Actions from "./pages/actions";
export const CategoriesRoute = [
  {
    url: "/categories",
    Element: indexPage,
    label: "Категории",
    meta: {
      isLoginIf: false,
      role: new Set(["admin"])
    }
  },
  {
    url: "/categories/:id",
    Element: Actions,
    meta: {
      isLoginIf: false,
      role: new Set(["admin"])
    }
  }
];
