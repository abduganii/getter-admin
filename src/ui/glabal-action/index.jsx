import React from "react";
import { LeftIcons } from "../icons";
import { useNavigate, useParams } from "react-router-dom";

const GlobalAvtion = ({ title }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div className="w-full flex items-center justify-between">
      <div
        className="flex items-center  gap-[16px] cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <LeftIcons />
        <p class="text-neutral-900 text-[22px] font-medium">{title}</p>
      </div>
      <div className="flex items-center gap-[40px]">
        <p
          onClick={() => navigate(-1)}
          class="text-neutral-900 text-[22px] font-medium cursor-pointer"
        >
          Отмена
        </p>
        <button
          type="submit"
          class="min-w-[180px]  bg-violet-700 text-center text-white text-[22px] font-semibold  py-[24px] inline-block px-[35px]"
        >
          {id == "new" ? "Сохранить" : "Изменить"}
        </button>
      </div>
    </div>
  );
};

export default GlobalAvtion;
