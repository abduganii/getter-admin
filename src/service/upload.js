import axios from "axios";

export const AuthStore = async ( data) => {
  try {
    const response =  await axios.post( `${import.meta.env.VITE_API_STORE_URL}/api/v1/auth/access/token`, data);
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const UploadFile = async (data) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_STORE_URL}/api/v1/media/1/upload`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization":`Bearer ${window.localStorage.getItem("storeToken")}`
      },
    }
  );
  return response;
};
export const FileRemove = async (removeImageId) => {
  const response = await axios.delete(
    `${import.meta.env.VITE_API_STORE_URL}/api/v1/media/${removeImageId}/hard-delete`,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization":`Bearer ${window.localStorage.getItem("storeToken")}`
      },
    }
  );
  return response;
};
