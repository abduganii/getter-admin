import { toast } from "react-toastify";
import api from "./api";
import qs from "qs";

export const GetAllData = async (url, query) => {
  try {
    const params = query
      ? `?${qs.stringify(query, { arrayFormat: "repeat" })}`
      : "";
    const response = await api.get(`/${url}${params}`);
    return response?.data;
  } catch (error) {
    handleError(error);
  }
};

export const GetByIdData = async (url, id, query) => {
  try {
    const params = query
      ? `?${qs.stringify(query, { arrayFormat: "repeat" })}`
      : "";
    const response = await api.get(`/${url}/${id}${params}`);
    return response?.data;
  } catch (error) {
    handleError(error);
  }
};

export const AddData = async (url, data) => {
  try {
    const response = await api.post(`/${url}`, data);
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const UpdateData = async (url, data, id) => {
  try {
    const response = await api.put(`/${url}/${id}`, data);
    return response;
  } catch (error) {
    handleError(error);
  }
};
export const UpdateDataOne = async (url, data) => {
  try {
    const response = await api.put(`/${url}`, data);
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const DeleteDataId = async (url, id) => {
  try {
    const response = await api.delete(`/${url}/${id}`);
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const GetMe = async () => {
  try {
    const res = await api.get("/users/me");
    return res;
  } catch (error) {
    handleError(error);
  }
};

const handleError = (error) => {
  if (error?.response?.status === 401) {
    window.location.replace("/auth/login");
    window.localStorage.removeItem("authToken");
  }
  toast.error(
    error?.response?.data?.error?.message ||
      error?.response?.data ||
      "error not given"
  );
};
