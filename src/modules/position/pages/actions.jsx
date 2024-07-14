import React, { useState } from "react";
import GlobalAvtion from "../../../ui/glabal-action";
import GlobalIcons from "../../../ui/global-input";
import FileUpload from "../../../ui/file-upload";
import { FormContainer } from "../../../components/Forms";
import { useNavigate, useParams } from "react-router-dom";
import { GetByIdData } from "../../../service/global";
import { useQuery } from "react-query";

const Actions = () => {
  const [loader, setLoader] = useState();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: DataOne, isLoading: productLoader } = useQuery(
    ["positionId", id],
    () => GetByIdData("position", id),
    {
      enabled: id !== "new"
    }
  );
  return (
    <div className={"ml-[260px] w-full"}>
      <FormContainer
        url={"position"}
        isFormData={false}
        setLoader={setLoader}
        loaderGlob={loader}
        fields={[
          {
            name: "title",
            validations: [{ type: "required" }],
            value: DataOne?.title || ""
          }
        ]}
        onSuccess={() => {
          navigate("/position");
        }}
        onError={(e) => {
          console.log(e, "onError");
        }}
        onFinal={() => {
          setLoader(false);
        }}
        // onSubmit={() => {
        // }}
        validateOnMount={false}
      >
        {(formik) => {
          return (
            <>
              <GlobalAvtion title={"Должность"} />
              <div className="w-full max-w-[700px] mx-auto rounded-[7px] overflow-hidden">
                <GlobalIcons
                  placeholder={"title"}
                  type="text"
                  className={"w-full"}
                  formik={formik}
                  value={formik.values.title}
                  name={"title"}
                  id={"title"}
                  errors={formik.errors.title}
                  required={true}
                />
              </div>
            </>
          );
        }}
      </FormContainer>
    </div>
  );
};

export default Actions;
