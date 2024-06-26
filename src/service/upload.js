import axios from "axios";

export const UploadFile = async (data, query, onProgress) => {
  const params = new URLSearchParams(query);
  const response = await axios.post(
    `${import.meta.env.VITE_API_BACKEND_URL}/upload/custom_upload${
      query ? "?" + params.toString() : ""
    }`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(percentCompleted);
        }
      },
    },
    
  );
  return response;
};
export const FileRemove = async (body) => {
  const response = await axios.delete(
    `${import.meta.env.VITE_API_STORE_URL}/remove`,
    { data: body }
  );
  return response;
};
