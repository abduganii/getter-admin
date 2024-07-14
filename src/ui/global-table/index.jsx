import React from "react";
import { useQueryClient } from "react-query";
import { DeleteDataId } from "../../service/global";
import { CkeckIcons, DeleteIcons, EtidIcons, EyeIcons } from "../icons";

const GlobalTable = ({
  image,
  fields,
  confirm,
  OnConfirm,
  update,
  ondelete,
  show,
  id
}) => {
  const queryClient = useQueryClient()
  return (
    <li className="group hover:bg-purple-50  flex justify-between items-start gap-4 p-[6px]">
      {image && <img width={100} src={image} className="object-contain" />}
      {fields &&
        fields?.map((e,i) => (
          <p
            key={i}
            className="w-full max-w-[220px] text-neutral-900 text-[22px] font-normal truncate"
          >
            {e}
          </p>
        ))}

      {OnConfirm && !confirm && (
        <div onClick={OnConfirm} className="w-[24px] cursor-pointer">
          <CkeckIcons />
        </div>
      )}
      <div className="flex min-w-[72px] cursor-pointer items-start gap-[5px]">
        {show && (
          <div className="w-[24px] hidden group-hover:block">
            <EyeIcons />
          </div>
        )}
        {update && (
          <div className="w-[24px] hidden group-hover:block" onClick={update}>
            <EtidIcons />
          </div>
        )}
        {ondelete && (
          <div className="w-[24px] hidden group-hover:block" onClick={async() => {
            await DeleteDataId(ondelete, id)
              .then(e => {
                queryClient.invalidateQueries([ondelete]);
              })
          }}>
            <DeleteIcons />
          </div>
        )}
      </div>
    </li>
  );
};

export default GlobalTable;
