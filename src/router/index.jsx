import { Routes, Route } from "react-router-dom";
import { filteredRoutes } from "../modules/index";
import { Fragment } from "react";
import MainLayout from "../layout";
import { AuthRoute } from "../modules/auth/route";
import AuthPage from "../modules/auth/pages";

const nestedRoutes = (routes) =>
  routes.map(({ Element, url, children }) => {
    if (children?.length) {
      return (
        <Fragment key={url}>
          <Route key={url} path={url} element={<Element />} />
          {nestedRoutes(children)}
        </Fragment>
      );
    }
    return <Route key={url} path={url} element={<Element />} />;
  });

export const AuthorizedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {nestedRoutes(filteredRoutes)}
      </Route>
      {/* <Route path="*" element={<Loading />} /> */}
    </Routes>
  );
};

export const UnAuthorizedRoutes = () => (
  <Routes>
    {/* <Route path="*" element={<Loading />} /> */}
    {/* {AuthRoute.map(({ Element, url }) => (
      <Route key={url} path={url} element={<Element />} />
    ))} */}
    <Route path="/auth/login" element={<AuthPage />}/>
    UnAuthorizedRoutes/auth/login
  </Routes>
);
