import React, { useState } from "react";
import { UserPlusIcons } from "../icons";

const UserInput = ({ options, removeItem, localChange, value }) => {
  const [openMadal, setOpenMadal] = useState(false);
  return (
    <div className="relative">
      <div className="flex items-start ">
        {value?.length
          ? value?.map((e) => (
              <div className="w-[75px] h-[75px] cursor-pointer rounded-full border-gray-200 border">
                <img
                  onClick={() => removeItem(e)}
                  src={`${import.meta.env.VITE_API_STORE_URL}/api/v1/media/${
                    e?.avatar
                  }/open`}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            ))
          : ""}
        <div
          onClick={() => setOpenMadal(true)}
          className="w-[75px] h-[75px] cursor-pointer rounded-full bg-[#F7F2FF] flex items-center justify-center border-gray-200 border"
        >
          <UserPlusIcons />
        </div>
      </div>

      {openMadal ? (
        <div className="absolute bottom-10 left-10 border border-[#E3E4E8] px-[20px] py-[24px] bg-white shadow-[16px_20px_80px_-10px_rgba(0,0,0,0.15)]">
          {options.length
            ? options.map((e) => (
                <p
                  key={e?.id}
                  onClick={() => {
                    localChange(e);
                    setOpenMadal(false);
                  }}
                  className=" w-full cursor-pointer p-[6px] hover:bg-[#F7F2FF] text-[#121212] font-sf-pro text-[18px] font-normal leading-normal"
                >
                  {e?.firstName} {e?.lastName}
                </p>
              ))
            : ""}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default UserInput;
