import React, { useState } from "react";
import GlobalAvtion from "../../../ui/glabal-action";
import GlobalIcons from "../../../ui/global-input";
import FileUpload from "../../../ui/file-upload";
import { FormContainer } from "../../../components/Forms";
import { useNavigate, useParams } from "react-router-dom";
import { AddData, GetAllData, GetByIdData } from "../../../service/global";
import { useQuery } from "react-query";
import FileUploadMilty from "../../../ui/file-multi-upload";
const Actions = () => {
  const [loader, setLoader] = useState();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: DataOne, isLoading: productLoader } = useQuery(
    ["sale-productId", id],
    () => GetByIdData("sale-product", id),
    {
      enabled: id !== "new"
    }
  );
  const { data: categories, isLoading: categoriesLoader } = useQuery(
    ["categoriesForsale"],
    () => GetAllData("categories")
  );
  const { data: developer, isLoading: developerLoader } = useQuery(
    ["developerForsale"],
    () => GetAllData("developer")
  );
  return (
    <div className={"ml-[260px] w-full"}>
      <FormContainer
        url={"sale-product"}
        isFormData={false}
        setLoader={setLoader}
        loaderGlob={loader}
        fields={[
          {
            name: "categories",
            value: DataOne?.categories?.map((e) => e.id) || [],
            validationType: "array"
          },
          {
            name: "directions",
            value: DataOne?.directions || [],
            validationType: "array"
          },
          {
            name: "technologies",
            value: DataOne?.technologies || [],
            validationType: "array"
          },
          {
            name: "shortDescription",
            value: DataOne?.shortDescription || ""
          },
          {
            name: "description",
            value: DataOne?.description || ""
          },
          {
            name: "title",
            validations: [{ type: "required" }],
            value: DataOne?.title || ""
          },
          {
            name: "link",
            validations: [{ type: "required" }],
            value: DataOne?.link || ""
          },
          {
            name: "regularPrice",
            validations: [{ type: "required" }],
            value: DataOne?.regularPrice || ""
          },
          {
            name: "licensedPrice",
            validations: [{ type: "required" }],
            value: DataOne?.licensedPrice || ""
          },
          {
            name: "fifthText",
            validations: [{ type: "required" }],
            value: DataOne?.fifthText || ""
          },
          {
            name: "developers",
            value: DataOne?.developers || [],
            validationType: "array"
          },
          {
            name: "media",
            value: DataOne?.media || [],
            validationType: "array"
          }
        ]}
        customData={(data) => {
          let retrData = JSON.parse(JSON.stringify(data));
          // if (id == "new") {
          retrData.developers = developer?.items.filter((item) =>
            retrData?.developers?.includes(item.id)
          );
          // }
          retrData.categories = categories?.items.filter((item) =>
            retrData?.categories?.includes(item.id)
          );
          return retrData;
        }}
        onSuccess={() => {
          navigate("/sale-product");
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
          console.log(formik);
          return (
            <>
              <GlobalAvtion title={"Продажа"} />
              <div className="w-full max-w-[947px] mx-auto gap-[31px] mb-10  overflow-hidden flex ">
                <div className="rounded-[7px] w-full max-w-[240px]">
                  <GlobalIcons
                    placeholder={"categories"}
                    type="select"
                    className="w-full"
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
                    placeholder={"directions"}
                    type="select"
                    className="w-full"
                    formik={formik}
                    mode="tags"
                    name={"directions"}
                    id={"directions"}
                    value={formik.values.directions.map((e) => e.title)}
                    errors={formik.errors.directions}
                    onDeselect={(e) => {
                      formik.setFieldValue(
                        `directions`,
                        formik.values.directions.filter(
                          (el) => el.title != "#" + e
                        )
                      );
                    }}
                    onSelect={async (e) => {
                      if (e) {
                        await AddData("tag", {
                          title: "#" + e
                        })
                          .then((res) => {
                            formik.setFieldValue(`directions`, [
                              ...formik.values.directions,
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
                    className="w-full"
                    formik={formik}
                    value={formik.values.shortDescription}
                    name={"shortDescription"}
                    id={"shortDescription"}
                    errors={formik.errors.shortDescription}
                    required={true}
                  />
                </div>

                <div className="w-full max-w-[676px]">
                  <GlobalIcons
                    placeholder={"title"}
                    type="text"
                    className="w-full"
                    formik={formik}
                    value={formik.values.title}
                    name={"title"}
                    id={"title"}
                    errors={formik.errors.title}
                    required={true}
                  />
                  <FileUploadMilty
                    name={"media"}
                    formik={formik}
                    value={formik.values.media}
                    title={""}
                  />
                  <GlobalIcons
                    placeholder={"link"}
                    type="text"
                    className="w-full"
                    formik={formik}
                    value={formik.values.link}
                    name={"link"}
                    id={"link"}
                    errors={formik.errors.link}
                    required={true}
                  />
                  <GlobalIcons
                    placeholder={"technologies"}
                    type="select"
                    className="w-full"
                    formik={formik}
                    mode="tags"
                    name={"technologies"}
                    id={"technologies"}
                    value={formik.values.technologies.map((e) => e.title)}
                    errors={formik.errors.technologies}
                    onDeselect={(e) => {
                      formik.setFieldValue(
                        `technologies`,
                        formik.values.technologies.filter(
                          (el) => el.title != "#" + e
                        )
                      );
                    }}
                    onSelect={async (e) => {
                      if (e) {
                        await AddData("tag", {
                          title: "#" + e
                        })
                          .then((res) => {
                            formik.setFieldValue(`technologies`, [
                              ...formik.values.technologies,
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
                    placeholder={"description"}
                    type="textarea"
                    className="w-full"
                    formik={formik}
                    value={formik.values.description}
                    name={"description"}
                    id={"description"}
                    errors={formik.errors.description}
                    required={true}
                  />
                  <GlobalIcons
                    placeholder={"Цена (regular)"}
                    type="text"
                    className="w-1/2"
                    formik={formik}
                    value={formik.values.regularPrice}
                    name={"regularPrice"}
                    id={"regularPrice"}
                    errors={formik.errors.regularPrice}
                    required={true}
                  />
                  <GlobalIcons
                    placeholder={"Цена (лицензионна)"}
                    type="text"
                    className="w-1/2"
                    formik={formik}
                    value={formik.values.licensedPrice}
                    name={"licensedPrice"}
                    id={"licensedPrice"}
                    errors={formik.errors.licensedPrice}
                    required={true}
                  />
                  <GlobalIcons
                    placeholder={"developers"}
                    type="select"
                    className="w-full"
                    formik={formik}
                    mode="multiple"
                    value={formik.values.developers?.map(
                      (e) => e?.firstName || e
                    )}
                    name={"developers"}
                    id={"developers"}
                    props="firstName"
                    errors={formik.errors.developers}
                    localChange={(e) => {
                      formik.setFieldValue(`developers`, e);
                    }}
                    required={true}
                    options={developer?.items || []}
                  />

                  <GlobalIcons
                    placeholder={"fifthText"}
                    type="text"
                    className="w-full"
                    formik={formik}
                    value={formik.values.fifthText}
                    name={"fifthText"}
                    id={"fifthText"}
                    errors={formik.errors.fifthText}
                    required={true}
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
