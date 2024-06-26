import DashboardPage from "./pages";

export const DashboardRoute = [
  {
    url: "/dashboard",
    Element: DashboardPage,
    label: "Главная",
    meta: {
      isLoginIf: false,
      role: new Set(["admin"])
    }
  },
  {
    url: "/dashboard/:id",
    Element: DashboardPage,
    meta: {
      isLoginIf: false,
      role: new Set(["admin"])
    }
  }
];
