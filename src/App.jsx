import { useEffect, useState } from "react";
import { AuthorizedRoutes, UnAuthorizedRoutes } from "./router/index";
// import { GetMe } from "./service/global";
import { useLocation, useNavigate } from "react-router-dom";
import GlobalLoader from "./ui/global-loader";
function App() {
  const isAuth = window.localStorage.getItem("authToken") || true;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     await GetMe()
  //       .then((res) => {

  //         if (res.status == "200" && location.pathname == "/")
  //           navigate("/dashboard");
  //       })
  //       .finally(() => setLoading(false));
  //   };
  //   if (location.pathname != "/auth/login" && isAuth) fetchData();
  // }, []);

  useEffect(() => {
    if (!isAuth) {
      navigate("/auth/login");
    } else if (location.pathname == "/" || location.pathname == "/auth/login") {
      navigate("/dashboard");
    }
  }, [isAuth]);

  return (
    <>
      {true ? <AuthorizedRoutes /> : <UnAuthorizedRoutes />}
      {loading ? <GlobalLoader /> : ""}
    </>
  );
}

export default App;
