import React, { useState } from "react";
import GlobalAvtion from "../../../ui/glabal-action";
import GlobalIcons from "../../../ui/global-input";
import FileUpload from "../../../ui/file-upload";
import { FormContainer } from "../../../components/Forms";
import { useNavigate, useParams } from "react-router-dom";
import { AddData, GetAllData, GetByIdData } from "../../../service/global";
import { useQuery } from "react-query";
import RichText from "../../../ui/rich-text";
import Cookies from "js-cookie";
const Actions = () => {
  const [loader, setLoader] = useState();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: DataOne, isLoading: productLoader } = useQuery(
    ["articleId", id],
    () =>
      GetByIdData("article", id, {
        userId: Cookies.get("user_id")
      }),
    {
      enabled: id !== "new"
    }
  );
  const { data: categories, isLoading: categoriesLoader } = useQuery(
    ["categoriesForsale"],
    () => GetAllData("categories")
  );
  return (
    <div className={"ml-[260px] w-full"}>
      <FormContainer
        url={"article"}
        isFormData={false}
        setLoader={setLoader}
        loaderGlob={loader}
        fields={[
          {
            name: "description",
            value: DataOne?.data?.description || ""
          },
          {
            name: "title",
            validations: [{ type: "required" }],
            value: DataOne?.data?.title || ""
          },
          {
            name: "categories",
            value: DataOne?.data?.categories?.map((e) => e.id) || [],
            validationType: "array"
          },
          {
            name: "tags",
            value: DataOne?.data?.tags || [],
            validationType: "array"
          },
          {
            name: "descImgs",
            value: DataOne?.data?.descImgs || [],
            validationType: "array"
          },
          {
            name: "avatar",
            validations: [{ type: "required" }],
            value: DataOne?.data?.avatar || ""
          }
        ]}
        customData={(data) => {
          let retrData = JSON.parse(JSON.stringify(data));
          retrData.categories = categories?.items.filter((item) =>
            retrData?.categories?.includes(item.id)
          );
          return retrData;
        }}
        onSuccess={() => {
          navigate("/article");
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
          console.log(formik.values.tags,"here")
          return (
            <>
              <GlobalAvtion title={"Статьи / Тема Статьи"} />
              <div className="w-full max-w-[947px] mx-auto gap-[31px] mb-[100px]  overflow-hidden flex ">
                <div className=" w-full max-w-[240px]">
                  <FileUpload
                    name={"avatar"}
                    formik={formik}
                    value={formik.values.avatar}
                    title={""}
                  />
                  <GlobalIcons
                    placeholder={"categories"}
                    type="select"
                    className="w-full border-y-0"
                    formik={formik}
                    mode="multiple"
                    value={formik.values.categories}
                    name={"categories"}
                    id={"categories"}
                    errors={formik.errors.categories}
                    localChange={(e) => {
                      formik.setFieldValue(`categories`, e);
                    }}
                    required={true}
                    options={categories?.items || []}
                  />

                  <GlobalIcons
                    placeholder={"tags"}
                    type="select"
                    className="w-full "
                    formik={formik}
                    mode="tags"
                    name={"tags"}
                    id={"tags"}
                    value={formik.values.tags.map((e) => e.title)}
                    errors={formik.errors.tags}
                    onDeselect={(e) => {
                      formik.setFieldValue(
                        `tags`,
                        formik.values.tags.filter((el) => el.title !=e )
                      );
                    }}
                    onSelect={async (e) => {
                      if (e) {
                        await AddData("tag", {
                          title: "#" + e
                        })
                          .then((res) => {
                            formik.setFieldValue(`tags`, [
                              ...formik.values.tags,
                              res.data
                            ]);
                          })
                          .catch(() => console.log("err"));
                      }
                    }}
                    required={true}
                    options={[]}
                  />
                  <GlobalIcons
                    placeholder={"shortDescription"}
                    type="textarea"
                    className="w-full border-t-0"
                    formik={formik}
                    value={formik.values.shortDescription}
                    name={"shortDescription"}
                    id={"shortDescription"}
                    errors={formik.errors.shortDescription}
                    required={true}
                  />
                </div>

                <div className="w-full max-w-[676px] mb-[100px]">
                  <RichText
                    placeholder={"Mavzu"}
                    title={true}
                    name={`title`}
                    value={formik.values.title}
                    formik={formik}
                  />
                  <RichText
                  
                    placeholder={"Mavzu matnini batafsil yozing"}
                    name={`description`}
                    value={formik.values.description}
                    formik={formik}
                  />
                </div>
              </div>
            </>
          );
        }}
      </FormContainer>
    </div>
  );
};

export default Actions;
