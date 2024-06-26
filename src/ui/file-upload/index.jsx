import React, { useState } from "react";
import { UploadIcons } from "../icons";

const FileUpload = ({ title }) => {
  const [image, setImage] = useState(null);
  return (
    <label className="flex items-center justify-center w-full h-[360px]  bg-white rounded-bl-[7px] rounded-br-[7px] border border-zinc-200 cursor-pointer">
      <div className="flex items-center  gap-[7px]">
        <UploadIcons />
        <p class="text-zinc-400 text-[22px] font-normal font-['SF Pro Display']">
          {title}
        </p>
      </div>
      {image && <img src={image} className="w-full h-full object-cover" />}
      <input type="file" className="hidden" />
    </label>
  );
};

export default FileUpload;
