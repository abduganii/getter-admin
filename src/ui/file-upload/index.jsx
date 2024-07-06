import React, { useState } from "react";
import { UploadIcons } from "../icons";

const FileUpload = ({ title,value,type }) => {
  const [image, setImage] = useState( value|| null);
  return (
    <label className={`flex items-center justify-center     bg-white rounded-bl-[7px] rounded-br-[7px] border border-zinc-200 cursor-pointer ${type == "avatar" ? "min-w-[107px] w-[107px] rounded-bl-0 rounded-br-0"  :'h-[360px] w-full'}` }>
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
