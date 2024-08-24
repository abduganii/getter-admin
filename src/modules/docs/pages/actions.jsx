import React, { useState } from "react";
import GlobalAvtion from "../../../ui/glabal-action";
import GlobalIcons from "../../../ui/global-input";
import FileUpload from "../../../ui/file-upload";
import { FormContainer } from "../../../components/Forms";
import { useNavigate, useParams } from "react-router-dom";
import { GetAllData, GetByIdData } from "../../../service/global";
import { useQuery } from "react-query";

const Actions = () => {
  const [loader, setLoader] = useState();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: DataOne, isLoading: productLoader } = useQuery(
    ["documentId", id],
    () => GetByIdData("document", id),
    {
      enabled: id !== "new"
    }
  );
  const { data: categories, isLoading: categoriesLoader } = useQuery(
    ["categoriesForsale"],
    () => GetAllData("categories")
  );
  console.log(categories);
  return (
    <div className={"ml-[260px] w-full"}>
      <FormContainer
        url={"document"}
        isFormData={false}
        setLoader={setLoader}
        loaderGlob={loader}
        fields={[
          {
            name: "name",
            validations: [{ type: "required" }],
            value: DataOne?.name || ""
          },

          {
            name: "categories",
            value: DataOne?.data?.categories?.map((e) => e.id) || [],
            validationType: "array"
          },
          {
            name: "file",
            validations: [{ type: "required" }],
            value: DataOne?.file || ""
          }
        ]}
        onSuccess={() => {
          navigate("/document");
        }}
        onError={(e) => {
          console.log(e, "onError");
        }}
        onFinal={() => {
          setLoader(false);
        }}
        customData={(data) => {
          let retrData = JSON.parse(JSON.stringify(data));
          retrData.categories = categories?.items.filter((item) =>
            retrData?.categories?.includes(item.id)
          );
          return retrData;
        }}
        // onSubmit={() => {
        // }}
        validateOnMount={false}
      >
        {(formik) => {
          return (
            <>
              <GlobalAvtion title={"Документы"} />
              <div className="w-full max-w-[700px] mx-auto  mb-[100px] overflow-hidden">
                <GlobalIcons
                  placeholder={"name"}
                  type="text"
                  className={"w-full"}
                  formik={formik}
                  value={formik.values.name}
                  name={"name"}
                  id={"name"}
                  errors={formik.errors.name}
                  required={true}
                />
                <GlobalIcons
                  placeholder={"categories"}
                  type="select"
                  className="w-full border-y-0"
                  formik={formik}
                  mode="multiple"
                  value={formik.values.categories || ""}
                  name={"categories"}
                  id={"categories"}
                  errors={formik.errors.categories}
                  localChange={(e) => {
                    formik.setFieldValue(`categories`, e);
                  }}
                  required={true}
                  options={categories?.items || []}
                />
                <FileUpload
                  name={"file"}
                  type="file"
                  formik={formik}
                  value={formik.values.file}
                  title={"file"}
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