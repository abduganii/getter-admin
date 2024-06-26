import AuthPage from "./pages";

export const AuthRoute = [
  {
    url: "/auth",
    Element: AuthPage,
    label: "Auth",
    meta: {
      isLoginIf: false,
      role: new Set(["admin"])
    }
  }
];
