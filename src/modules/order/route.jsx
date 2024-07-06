import indexPage from "./pages";
export const OrderRoute = [
  {
    url: "/order",
    Element: indexPage,
    label: "Закази",
    meta: {
      isLoginIf: false,
      role: new Set(["admin"])
    }
  }
 
];
