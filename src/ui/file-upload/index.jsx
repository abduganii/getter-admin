import React, { useState } from "react";
import { UploadFile } from "../../service/upload";
import { UploadIcons } from "../icons";

const FileUpload = ({ name, title, value, type, formik, setRemoveImageId }) => {
  const [loading, setloading] = useState(false);

  const handleUpload = async (e) => {
    if (e.target.files[0]) {
      setloading(true);
      const file = e.target.files[0];
      await UploadFile({ file: file })
        .then((res) => {
          if (value && setRemoveImageId) {
            setRemoveImageId(value);
          }
          formik.setFieldValue(name, res?.data?.id.toString());
        })
        .catch(() => console.log("err"))
        .finally(() => setloading(false));
    }
  };
  return (
    <label
      className={`flex items-center justify-center  bg-white rounded-bl-[7px] rounded-br-[7px] border border-zinc-200 cursor-pointer aspect-square max-h-[360px] ${
        type == "avatar"
          ? "min-w-[107px] w-[107px] rounded-bl-0 rounded-br-0"
          : " w-full"
      }`}
    >
      {value ? (
        <img
          src={`${
            import.meta.env.VITE_API_STORE_URL
          }/api/v1/media/${value}/open`}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="flex items-center  gap-[7px]">
          <UploadIcons />
          <p className="text-zinc-400 text-[22px] font-normal font-['SF Pro Display']">
            {title}
          </p>
        </div>
      )}
      <input type="file" className="hidden" onChange={handleUpload} />
    </label>
  );
};

export default FileUpload;
