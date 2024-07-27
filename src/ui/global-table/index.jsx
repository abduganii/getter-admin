import React from "react";
import { useQueryClient } from "react-query";
import { DeleteDataId } from "../../service/global";
import { CkeckIcons, DeleteIcons, EtidIcons, EyeIcons } from "../icons";
import { Popconfirm } from "antd";
import { FileRemove } from "../../service/upload";

const GlobalTable = ({
  image,
  fields,
  confirm,
  OnConfirm,
  update,
  ondelete,
  show,
  id,
  fileid
}) => {
  const queryClient = useQueryClient();

  return (
    <li onClick={update ? update :()=>{} } className="group hover:bg-purple-50  flex justify-between items-center gap-4 p-[6px]">
      {image && <img width={100} src={image} className="object-contain" />}
      {fields &&
        fields?.map((e, i) => (
        
          <p key={i}
            className="w-full max-w-[220px] text-neutral-900 text-[22px] font-normal truncate" dangerouslySetInnerHTML={{ __html: e }} />
        ))}

      {OnConfirm && !confirm && (
        <div onClick={(e) => {
           e.stopPropagation()
          OnConfirm(e)
        }} className="w-[24px] cursor-pointer">
          <CkeckIcons />
        </div>
      ) }
      <div onClick={(e)=> e.stopPropagation()} className="flex min-w-[90px] cursor-pointer items-start gap-[8px]">
        {show && (
          <div className="w-[24px] hidden group-hover:block">
            <EyeIcons   onClick={update ? update :()=>{} }/>
          </div>
        )}
        {update && (
          <div className="w-[24px] hidden group-hover:block" onClick={update} >
            <EtidIcons />
          </div>
        )}
        {ondelete && (
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={async (e) => {
              await DeleteDataId(ondelete, id).then(async (e) => {
                queryClient.invalidateQueries([ondelete]);
                if (fileid) {
                  await FileRemove(fileid);
                }
              });
            }}
            okText="Yes"
            cancelText="No"
          >
            <div className="w-[24px] hidden group-hover:block"   >
              <DeleteIcons />
            </div>
          </Popconfirm>
        )}
      </div>
    </li>
  );
};

export default GlobalTable;
