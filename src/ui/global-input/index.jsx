import React from "react";
import { Select } from "antd";
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
  props,
  rows
}) => {
  console.log(value);
  return (
    <>
      {type == "select" ? (
        <div className="relative w-full">
          <Select
            defaultValue={placeholder}
            className={`w-full  flex bg-white border border-zinc-200  text-neutral-900 text-[22px] font-normal ${
              className && className
            }`}
            placeholder={placeholder}
            value={value}
            mode={mode}
            onChange={(e) => {
              if (localChange) localChange(e);
            }}
            onSelect={onSelect}
            onDeselect={onDeselect}
            // disabled={disabled}
            options={options?.map((sp) => ({
              value: sp.id,
              label: props ? sp?.[`${props}`] : sp?.title
            }))}
          />

          {mode == "tags" ? (
            <>
              {value.length ? (
                <>
                  <p className="absolute top-[2px] left-[18px] text-[#a6a4ac] text-[22px] font-normal">
                    {placeholder}
                  </p>
                  <div className="w-full gap-[2px] flex flex-wrap bg-white border border-zinc-200 p-[10px]">
                    {value?.map((e, i) => (
                      <p
                        className="p-[10px]  text-base font-medium"
                        style={{
                          background: "rgba(105, 0, 255, 0.05)",
                          color: "#6900ff"
                        }}
                        key={i}
                      >
                        {e}
                      </p>
                    ))}
                  </div>
                </>
              ) : (
                ""
              )}
            </>
          ) : (
            <>
              {value.length ? (
                <>
                  <p className="absolute top-[2px] left-[18px] text-[#a6a4ac] text-[22px] font-normal">
                    {placeholder}
                  </p>
                  <div className="w-full gap-[2px] flex flex-wrap bg-white border border-zinc-200 p-[10px]">
                    {options?.map((e) => {
                      if (value.includes(e?.id)) {
                        return (
                          <p
                            className="p-[10px]  text-base font-medium"
                            style={{
                              background: "rgba(105, 0, 255, 0.05)",
                              color: "#6900ff"
                            }}
                            key={e?.id}
                          >
                            {e?.title}
                          </p>
                        );
                      }
                    })}
                  </div>
                </>
              ) : (
                ""
              )}
            </>
          )}
        </div>
      ) : type == "textarea" ? (
        <textarea
          id={id}
          name={name}
          type={type || "text"}
          onChange={(e) => {
            formik.handleChange(e);
            if (localChange) localChange(e);
          }}
          className={`w-full bg-white border border-zinc-200 px-[20px] py-[4px] text-neutral-900 text-[22px] font-normal ${
            className && className
          }`}
          placeholder={placeholder}
          value={value}
          onInput={(e) => {
            e.target.style.height = "auto"; // Reset height to calculate new height
            e.target.style.height = `${e.target.scrollHeight}px`; // Set height based on scrollHeight
          }}
          rows={rows || 8}
          required={required}
        ></textarea>
      ) : (
        <input
          id={id}
          name={name}
          type={type || "text"}
          onChange={(e) => {
            formik.handleChange(e);
            if (localChange) localChange(e);
          }}
          onInput={(e) => {
            e.target.style.height = "auto"; // Reset height to calculate new height
            e.target.style.height = `${e.target.scrollHeight}px`; // Set height based on scrollHeight
          }}
          className={`  bg-white border border-zinc-200 px-[20px] py-[4px] text-neutral-900 text-[22px] font-normal ${
            className && className
          }`}
          placeholder={placeholder}
          value={value}
          required={required}
        />
      )}
    </>
  );
};

export default GlobalIcons;
