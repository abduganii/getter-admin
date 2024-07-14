import indexPage from "./pages";
import Actions from "./pages/actions";
export const PositionRoute = [
  {
    url: "/position",
    Element: indexPage,
    label: "Должность",
    meta: {
      isLoginIf: false,
      role: new Set(["admin"])
    }
  },
  {
    url: "/position/:id",
    Element: Actions,
    meta: {
      isLoginIf: false,
      role: new Set(["admin"])
    }
  }
];
