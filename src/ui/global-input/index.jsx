import React from "react";
import {Select} from 'antd'
const GlobalIcons = ({ 
  placeholder,
  formik,
  name,
  id,
  type,
  errors,
  localChange,
  required,
  className,
  options,
  value} ) => {
  return (
    <>
      {type == "select" ? (
        <Select
          defaultValue={placeholder}
          className={`w-full flex bg-white border border-zinc-200  text-neutral-900 text-[22px] font-normal ${className && className}`}
          placeholder={placeholder}
          value={value}
      
          onChange={(e) => {
            formik.handleChange(e);
            if (localChange) localChange(e);
          }}
          // disabled={disabled}
          options={options?.map((sp) => ({ value: sp.id, label: sp.title }))}
        />
      ) : (
          
        <input
          id={id}
          name={name}
          type={type || "text"}
          onChange={(e) => {
            formik.handleChange(e);
            if (localChange) localChange(e);
          }}
          className={`w-full  bg-white border border-zinc-200 px-[20px] py-[4px] text-neutral-900 text-[22px] font-normal ${className && className}`}
          placeholder={placeholder}
          value={value}
          required={required}
        />
      )}
    </>
  );
};

export default GlobalIcons;




