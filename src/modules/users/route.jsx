import indexPage from "./pages";
export const UsersRoute = [
  {
    url: "/users",
    Element: indexPage,
    label: "Пользователи",
    meta: {
      isLoginIf: false,
      role: new Set(["admin"])
    }
  }
 
];
