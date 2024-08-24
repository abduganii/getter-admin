import React, { useState } from "react";
import GlobalAvtion from "../../../ui/glabal-action";
import GlobalIcons from "../../../ui/global-input";
import FileUpload from "../../../ui/file-upload";
import { FormContainer } from "../../../components/Forms";
import { useNavigate, useParams } from "react-router-dom";
import { GetByIdData } from "../../../service/global";
import { useQuery } from "react-query";

const typeArr = [
  {
    id: "article",
    title: "article"
  },
  {
    id: "portfolio",
    title: "portfolio"
  },
  {
    id: "sale",
    title: "sale"
  }
];
const Actions = () => {
  const [loader, setLoader] = useState();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: DataOne, isLoading: productLoader } = useQuery(
    ["categoriesId", id],
    () => GetByIdData("categories", id),
    {
      enabled: id !== "new"
    }
  );
  return (
    <div className={"ml-[260px] w-full"}>
      <FormContainer
        url={"categories"}
        isFormData={false}
        setLoader={setLoader}
        loaderGlob={loader}
        fields={[
          {
            name: "title",
            validations: [{ type: "required" }],
            value: DataOne?.title || ""
          },

          {
            name: "type",
            validations: [{ type: "required" }],
            value: DataOne?.type || ""
          }
        ]}
        onSuccess={() => {
          navigate("/categories");
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
              <GlobalAvtion title={"Категории"} />
              <div className="w-full max-w-[700px] mx-auto mb-[100px] overflow-hidden">
                <GlobalIcons
                  placeholder={"name"}
                  type="text"
                  className={"w-full border-b-0"}
                  formik={formik}
                  value={formik.values.title}
                  name={"title"}
                  id={"title"}
                  errors={formik.errors.title}
                  required={true}
                />

                <GlobalIcons
                  placeholder={"type"}
                  type="select"
                  className="w-full"
                  formik={formik}
                  value={formik.values.type}
                  name={"type"}
                  id={"type"}
                  errors={formik.errors.type}
                  localChange={(e) => {
                    formik.setFieldValue(`type`, e);
                  }}
                  required={true}
                  options={typeArr}
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
