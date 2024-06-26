import React from "react";

const GlobalIcons = ({ placeholder, value }) => {
  return (
    <>
      <input
        className="w-full  bg-white border border-zinc-200 px-[20px] py-[4px] text-neutral-900 text-[22px] font-normal"
        placeholder={placeholder}
        value={value}
      />
    </>
  );
};

export default GlobalIcons;
