import React, { useState } from "react";
import { UploadFile } from "../../service/upload";
import { UploadIcons } from "../icons";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

const FileUploadMilty = ({ name, title, value, formik }) => {
  const [loading, setloading] = useState(false);

  const handleUpload = async (e) => {
    if (e.target.files[0]) {
      setloading(true);
      const file = e.target.files[0];
      await UploadFile({ file: file })
        .then((res) => {
          formik.setFieldValue(name, [ ...value,res?.data?.id.toString()]);
        })
        .catch(() => console.log("err"))
        .finally(() => setloading(false));
    }
  };
  
  return (
    <div className="w-full group aspect-square max-h-[360px] relative ">

        
        <Swiper spaceBetween={10} slidesPerView={1} pagination={true} modules={[Pagination]}>

              {value?.length ?
                value?.map((e) => (
                <SwiperSlide className="w-full aspect-square max-h-[360px] ">
                  <div className=" flex w-full items-center justify-center  bg-white  border border-zinc-200 cursor-pointer aspect-square max-h-[360px] group">
                        <img
                          src={`${
                            import.meta.env.VITE_API_STORE_URL
                          }/api/v1/media/${e}/open`}
                          className="w-full h-full object-cover"
                        />
                    <div className="hidden group-hover:flex max-h-[360px] justify-center items-center text-white  absolute top-0 left-0 w-full aspect-square" >
                        <div className="p-3 bg-black text-white  cursor-pointer flex justify-center items-center h-10" onClick={()=>{
                           formik.setFieldValue(name, value.filter(el=>el != e));
                        }}>
                            delete
                          </div>
                    </div>
                    </div>
              </SwiperSlide>
              )):""}
            <SwiperSlide className="aspect-square max-h-[360px] w-full">
                <label
                  className={`flex items-center justify-center bg-white border border-zinc-200 cursor-pointer aspect-square max-h-[360px] w-full`}
                >
                  <div className="flex items-center  gap-[7px]">
                    <UploadIcons />
                    <p className="text-zinc-400 text-[22px] font-normal font-['SF Pro Display']">
                      {title}
                    </p>
                  </div>
                  <input type="file" className="hidden" onChange={handleUpload} />
                </label>
            </SwiperSlide>
          </Swiper>
    </div>
  );
};

export default FileUploadMilty;
