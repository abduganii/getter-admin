import React, { useState } from "react";
import { UploadFile } from "../../service/upload";
import { UploadIcons } from "../icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
const FileUploadMilty = ({ name, title, value, formik }) => {
  const [loading, setloading] = useState(false);

  const handleUpload = async (e) => {
    if (e.target.files[0]) {
      setloading(true);
      const file = e.target.files[0];
      await UploadFile({ file: file })
        .then((res) => {
          formik.setFieldValue(name, [res?.data?.id.toString(), ...value]);
        })
        .catch(() => console.log("err"))
        .finally(() => setloading(false));
    }
  };
  return (
    <Swiper spaceBetween={0} slidesPerView={1}>
      {value?.length ? (
        <div className="flex w-full items-center justify-center  bg-white rounded-bl-[7px] rounded-br-[7px] border border-zinc-200 cursor-pointer aspect-square max-h-[360px]">
          {value?.length &&
            value?.map((e) => (
              <img
                src={`${
                  import.meta.env.VITE_API_STORE_URL
                }/api/v1/media/${e}/open`}
                className="w-full h-full object-cover"
              />
            ))}
        </div>
      ) : (
        ""
      )}
      <div className="aspect-square max-h-[360px] w-full">
        <label
          className={`flex items-center justify-center  bg-white rounded-bl-[7px] rounded-br-[7px] border border-zinc-200 cursor-pointer aspect-square max-h-[360px] w-full`}
        >
          <div className="flex items-center  gap-[7px]">
            <UploadIcons />
            <p className="text-zinc-400 text-[22px] font-normal font-['SF Pro Display']">
              {title}
            </p>
          </div>
          <input type="file" className="hidden" onChange={handleUpload} />
        </label>
      </div>
    </Swiper>
  );
};

export default FileUploadMilty;
