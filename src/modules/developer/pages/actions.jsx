import React, { useState } from "react";
import GlobalAvtion from "../../../ui/glabal-action";
import GlobalIcons from "../../../ui/global-input";
import FileUpload from "../../../ui/file-upload";
import { FormContainer } from "../../../components/Forms";
import { useNavigate, useParams } from "react-router-dom";
import { GetAllData, GetByIdData } from "../../../service/global";
import { useQuery } from "react-query";
import { FileRemove } from "../../../service/upload";

const Actions = () => {
  const [loader, setLoader] = useState()
  const [removeImageId,setRemoveImageId] = useState(null)
  const navigate = useNavigate()
  const { id } = useParams();
  const { data: DataOne, isLoading: productLoader } = useQuery(
    ["developerId", id],
    () =>
      GetByIdData("developer", id),
    {
      enabled: id !== "new"
    }
  );
  const { data: position, isLoading: positionLoader } = useQuery(
    ["position"],
    () =>
      GetAllData("position"),
   
  );
  
  return (
    <div className={"ml-[260px] w-full"}>
    <FormContainer
      url={"developer"}
      isFormData={false}
      setLoader={setLoader}
      loaderGlob={loader}
      
    fields={[
      {
        name: "firstName",
        validations: [{ type: "required" }],
        value:  DataOne?.firstName || ""
      },
      {
        name: "lastName",
        validations: [{ type: "required" }],
        value:  DataOne?.lastName || ""
      },
      {
        name: "position",
        validations: [{ type: "required" }],
        value:  DataOne?.position?.id || ""
      },
      {
        name: "avatar",
        value:  DataOne?.avatar || ""
      }
    ]}
      onSuccess={async () => {
          if (removeImageId) {
            await FileRemove(removeImageId)
      }
      navigate("/developer");
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
          console.log(formik?.values)
        return (
          <>
            <GlobalAvtion title={"Site"} />
            <div className="w-full max-w-[700px] mx-auto rounded-[7px] overflow-hidden flex ">
              <FileUpload name={'avatar'} type="avatar" formik={formik} setRemoveImageId={setRemoveImageId} value={formik.values.avatar} title={""} />
              <div className="flex flex-wrap">
                <GlobalIcons
                  placeholder={"firstName"}
                  type="text"
                  className="w-1/2"
                    formik={formik}
                    value={formik.values.firstName}
                    name={"firstName"}
                    id={"firstName"}
                    errors={formik.errors.firstName} 
                    required={true}
                  />
                <GlobalIcons
                  placeholder={"lastName"}
                  type="text"
                  className="w-1/2"
                    formik={formik}
                    value={formik.values.lastName}
                    name={"lastName"}
                    id={"lastName"}
                  errors={formik.errors.lastName} 
                  required={true}
                />
                <GlobalIcons
                  placeholder={"position"}
                  type="select"
                  className="w-full"
                    formik={formik}
                    value={formik.values.position}
                    name={"position"}
                    id={"position"}
                    errors={formik.errors.position} 
                    localChange={(e) => {
                     formik.setFieldValue(`position`, e);
                  }}
                  
                  
                    required={true}
                    options={position?.items || []}
                    />
              </div>
             
            </div>
          </>)
      }}
      </FormContainer>
      </div>
  );
};

export default Actions;
