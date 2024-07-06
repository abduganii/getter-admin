import IndexPage from "./pages";
import Actions from "./pages/actions";
export const DeveloperRoute = [
  {
    url: "/developer",
    Element: IndexPage,
    label: "Разработчики",
    meta: {
      isLoginIf: false,
      role: new Set(["admin"])
    }
  },
  {
    url: "/developer/:id",
    Element: Actions,
    meta: {
      isLoginIf: false,
      role: new Set(["admin"])
    }
  }
];
