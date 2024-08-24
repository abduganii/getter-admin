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
  mode,
  onDeselect,
  onSelect,
  value,
  props
}) => {
  return (
    <>
      {type == "select" ? (
        <Select
          defaultValue={placeholder}
          className={`w-full flex bg-white border border-zinc-200  text-neutral-900 text-[22px] font-normal ${className && className}`}
          placeholder={placeholder}
          value={value}
          mode={mode}
          onChange={(e) => {
            if (localChange) localChange(e);
          }}
          onSelect={onSelect}
          onDeselect={onDeselect}
          // disabled={disabled}
          options={options?.map((sp) => ({ value: sp.id, label: props ? sp?.[`${props}`] : sp?.title }))}
        />
      )  :type == "textarea" ? (
          <textarea
             id={id}
              name={name}
              type={type || "text"}
              onChange={(e) => {
                formik.handleChange(e);
                if (localChange) localChange(e);
              }}
              className={`w-full bg-white border border-zinc-200 px-[20px] py-[4px] text-neutral-900 text-[22px] font-normal ${className && className}`}
              placeholder={placeholder}
            value={value}
            onInput={(e) => {
              e.target.style.height = "auto"; // Reset height to calculate new height
              e.target.style.height = `${e.target.scrollHeight}px`; // Set height based on scrollHeight
            }}
            rows={8}
            required={required}
          >
                
          </textarea>
      ) : (
          
        <input
          id={id}
          name={name}
          type={type || "text"}
          onChange={(e) => {
            formik.handleChange(e);
            if (localChange) localChange(e);
          }}
          className={`  bg-white border border-zinc-200 px-[20px] py-[4px] text-neutral-900 text-[22px] font-normal ${className && className}`}
          placeholder={placeholder}
          value={value}
          required={required}
        />
      )}
    </>
  );
};

export default GlobalIcons;




