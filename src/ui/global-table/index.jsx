import React from "react";
import { CkeckIcons, DeleteIcons, EtidIcons, EyeIcons } from "../icons";

const GlobalTable = ({
  image,
  fields,
  confirm,
  OnConfirm,
  update,
  ondelete,
  show
}) => {
  return (
    <div className="group hover:bg-purple-50 w-full flex items-start gap-[5px] p-[6px]">
      {image && <img width={100} src={image} className="object-contain" />}
      {fields &&
        fields?.map((e) => (
          <p
            key={e?.key}
            className="w-full text-neutral-900 text-[22px] font-normal"
          >
            {e}
          </p>
        ))}

      {OnConfirm && !confirm && (
        <div onClick={OnConfirm} className="w-[24px] cursor-pointer">
          <CkeckIcons />
        </div>
      )}
      <div className="flex min-w-[72px] cursor-pointer items-start gap-[2px]">
        {show && (
          <div className="w-[24px] hidden group-hover:block">
            <EyeIcons />
          </div>
        )}
        {update && (
          <div className="w-[24px] hidden group-hover:block">
            <EtidIcons />
          </div>
        )}
        {ondelete && (
          <div className="w-[24px] hidden group-hover:block">
            <DeleteIcons />
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalTable;
