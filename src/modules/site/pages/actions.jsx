import React from "react";
import GlobalAvtion from "../../../ui/glabal-action";
import GlobalIcons from "../../../ui/global-input";

const Actions = () => {
  return (
    <div className={"ml-[260px] w-full"}>
      <GlobalAvtion title={"Site"} />
      <div className="w-full max-w-[700px] mx-auto rounded-[7px] overflow-hidden">
        <GlobalIcons placeholder={"link"} />
        <GlobalIcons placeholder={"name"} />
      </div>
    </div>
  );
};

export default Actions;
