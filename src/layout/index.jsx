import { Popconfirm } from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { filteredRoutes } from "../modules";
import { Loginout } from "../service/auth";
import { PlusIcons } from "../ui/icons";
const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className="flex gap-[40px] w-full h-screen">
      <div className="w-full flex  flex-col  justify-between max-w-[240px] h-screen bg-white border-r border-zinc-100 p-[37px] py-[17px] fixed top-0 left-0">
        <div>
          <img src="/Getter.svg" alt="hds" className="mb-[37px]" />
          {filteredRoutes?.map((e, i) => (
            <Link
              key={i}
              className={`${
                e?.url.includes(location.pathname)
                  ? "text-violet-700"
                  : "text-neutral-900"
              }  text-[22px] font-normal w-full block hover:text-violet-700`}
              to={e?.url}
            >
              {e?.label}
            </Link>
          ))}
        </div>
        <Popconfirm
          title="Corfirm to log out"
          description="Are you sure to log out?"
          onConfirm={async () => {
            await Loginout().then(() => {
              window.localStorage.clear("getterToken");
              navigate("/auth/login");
            });
          }}
          okText="Yes"
          cancelText="No"
        >
          <div
            className={`text-neutral-900 cursor-pointer text-[22px] font-normal w-full block hover:text-violet-700`}
          >
            logout
          </div>
        </Popconfirm>
      </div>

      <Outlet />
      {filteredRoutes.map((e) => e.url).includes(location.pathname) && (
        <div
          className="w-[74px] h-[74px] flex items-center justify-center absolute right-0 top-0 cursor-pointer"
          onClick={() => {
            if (!["/order", "/users"].includes(location.pathname)) {
              navigate(location.pathname + "/new");
            }
          }}
        >
          <PlusIcons />
        </div>
      )}
    </div>
  );
};

export default MainLayout;
