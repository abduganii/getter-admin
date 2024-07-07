import api from "./api";


export const Loginout = async () => {
  const response = await api.post("/logout");
  return response;
};
