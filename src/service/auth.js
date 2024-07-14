import api from "./api";


export const Loginout = async () => {
  const response = await api.post("/auth/logout");
  return response;
};
