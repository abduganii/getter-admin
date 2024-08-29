import React, { useState } from "react";
import GlobalAvtion from "../../../ui/glabal-action";
import GlobalIcons from "../../../ui/global-input";
import UserInput from "../../../ui/user-input";
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
    ["portfolioId", id],
    () => GetByIdData("portfolio", id),
    {
      enabled: id !== "new"
    }
  );

  const { data: developer, isLoading: developerLoader } = useQuery(
    ["developerForsale"],
    () => GetAllData("developer")
  );

  return (
    <div className={"ml-[260px] w-full"}>
      <FormContainer
        url={"portfolio"}
        isFormData={false}
        setLoader={setLoader}
        loaderGlob={loader}
        fields={[
          {
            name: "secondText",
            value: DataOne?.data?.secondText || ""
          },
          {
            name: "link",
            validations: [{ type: "required" }],
            value: DataOne?.data?.link || ""
          },

          {
            name: "video",
            value: DataOne?.data?.video || ""
          },
          {
            name: "comment",
            validations: [{ type: "required" }],
            value: DataOne?.data?.comment || ""
          },
          {
            name: "fourthText",
            validations: [{ type: "required" }],
            value: DataOne?.data?.fourthText || ""
          },
          {
            name: "fifthText",
            validations: [{ type: "required" }],
            value: DataOne?.data?.fourthText || ""
          },
          {
            name: "developers",
            value: DataOne?.data?.developers?.map((e) => e.id) || [],
            validationType: "array"
          },
          {
            name: "media",
            value: DataOne?.data?.media || [],
            validationType: "array"
          },
          {
            name: "type",
            value: "portfolio"
          }
        ]}
        customData={(data) => {
          let retrData = JSON.parse(JSON.stringify(data));
          retrData.developers = developer?.items.filter((item) =>
            retrData?.developers?.includes(item.id)
          );

          return retrData;
        }}
        onSuccess={() => {
          navigate("/portfolio");
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
              <GlobalAvtion title={"Protfolio"} />
              <div className="w-full max-w-[947px] mx-auto gap-[31px] mb-[100px]  overflow-hidden  ">
                <GlobalIcons
                  placeholder={"link"}
                  type="text"
                  className="w-full border-b-0"
                  formik={formik}
                  value={formik.values.link}
                  name={"link"}
                  id={"link"}
                  errors={formik.errors.link}
                  required={true}
                />
                <FileUploadMilty
                  name={"media"}
                  formik={formik}
                  value={formik.values.media}
                  title={"media"}
                />
                <GlobalIcons
                  placeholder={"secondText"}
                  type="textarea"
                  rows={1}
                  className="w-full border-y-0"
                  formik={formik}
                  value={formik.values.secondText}
                  name={"secondText"}
                  id={"secondText"}
                  errors={formik.errors.secondText}
                  required={true}
                />
                <div className="flex">
                  <FileUpload
                    name={"video"}
                    type="file"
                    formik={formik}
                    value={formik.values.video}
                    title={"image"}
                  />
                  <GlobalIcons
                    placeholder={"comment"}
                    type="textarea"
                    className="w-full border-l-0"
                    formik={formik}
                    value={formik.values.comment}
                    name={"comment"}
                    id={"comment"}
                    errors={formik.errors.comment}
                    required={true}
                  />
                </div>
                <GlobalIcons
                  placeholder={"fourthText"}
                  type="text"
                  className="w-full border-t-0"
                  formik={formik}
                  value={formik.values.fourthText}
                  name={"fourthText"}
                  id={"fourthText"}
                  errors={formik.errors.fourthText}
                  required={true}
                />

                <UserInput
                  options={developer?.items || []}
                  localChange={(e) => {
                    formik.setFieldValue(`developers`, [
                      ...formik.values.developers,
                      e
                    ]);
                  }}
                  removeItem={(e) => {
                    formik.setFieldValue(
                      `developers`,
                      formik.values.developers?.filter((el) => el.id !== e?.id)
                    );
                  }}
                  value={formik.values.developers}
                />
                <GlobalIcons
                  placeholder={"fifthText"}
                  type="text"
                  className="w-full mb-[100px] "
                  formik={formik}
                  value={formik.values.fifthText}
                  name={"fifthText"}
                  id={"fifthText"}
                  errors={formik.errors.fifthText}
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
