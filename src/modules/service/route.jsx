import ServicePage from "./pages";

export const ServiceRoute = [
  {
    url: "/service",
    Element: ServicePage,
    label: "Услуги",
    meta: {
      isLoginIf: false,
      role: new Set(["admin"])
    }
  }
];
