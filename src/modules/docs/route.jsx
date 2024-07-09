import indexPage from "./pages";
import Actions from "./pages/actions";
export const DocumentRoute = [
  {
    url: "/document",
    Element: indexPage,
    label: "Документы",
    meta: {
      isLoginIf: false,
      role: new Set(["admin"])
    }
  },
  {
    url: "/document/:id",
    Element: Actions,
    meta: {
      isLoginIf: false,
      role: new Set(["admin"])
    }
  }
];
