import IndexPage from "./pages";
import Actions from "./pages/actions";
export const ArticleRoute = [
  {
    url: "/article",
    Element: IndexPage,
    label: "Статьи",
    meta: {
      isLoginIf: false,
      role: new Set(["admin"])
    }
  },
  {
    url: "/article/:id",
    Element: Actions,
    meta: {
      isLoginIf: false,
      role: new Set(["admin"])
    }
  }
];
