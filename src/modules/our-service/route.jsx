import indexPage from "./pages";
import Actions from "./pages/actions";
export const OurserviceRoute = [
  {
    url: "/our-service",
    Element: indexPage,
    label: "Услуги",
    meta: {
      isLoginIf: false,
      role: new Set(["admin"])
    }
  },
  {
    url: "/our-service/:id",
    Element: Actions,
    meta: {
      isLoginIf: false,
      role: new Set(["admin"])
    }
  }
];
