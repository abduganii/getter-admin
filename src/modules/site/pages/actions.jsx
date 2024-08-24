import React, { useState } from "react";
import GlobalAvtion from "../../../ui/glabal-action";
import GlobalIcons from "../../../ui/global-input";
import FileUpload from "../../../ui/file-upload";
import { FormContainer } from "../../../components/Forms";
import { useNavigate, useParams } from "react-router-dom";
import { GetByIdData } from "../../../service/global";
import {FileRemove} from '../../../service/upload'
import { useQuery } from "react-query";

const Actions = () => {
  const [loader, setLoader] = useState()
  const navigate = useNavigate()
  const { id } = useParams();
  const [removeImageId,setRemoveImageId] = useState(null)
  const { data: DataOne, isLoading: productLoader } = useQuery(
    ["websiteId", id],
    () =>
      GetByIdData("website", id),
    {
      enabled: id !== "new"
    }
  );
  return (
    <div className={"ml-[260px] w-full"}>
    <FormContainer
      url={"website"}
      isFormData={false}
      setLoader={setLoader}
      loaderGlob={loader}
      
    fields={[
      {
        name: "title",
        validations: [{ type: "required" }],
        value:  DataOne?.data?.title || ""
      },
   
      {
        name: "link",
        validations: [{ type: "required" }],
        value:  DataOne?.data?.link || ""
      },
      {
        name: "media",
        value:  DataOne?.data?.media || ""
      },
      
    
    ]}
        onSuccess={async () => {
          if (removeImageId) {
            await FileRemove(removeImageId)
      }
      navigate("/sites");
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
            <GlobalAvtion title={"Site"} />
            <div className="w-full max-w-[700px] mx-auto  mb-[100px] overflow-hidden">
              <GlobalIcons
                   className={'w-full border-b-0'}
                placeholder={"link"}
                 type="text"
                  formik={formik}
                  value={formik.values.link}
                  name={"link"}
                  id={"link"}
                  errors={formik.errors.link} 
                  required={true}
                />
              <GlobalIcons
                placeholder={"name"}
                type="text"
                className={'w-full border-b-0'}
                formik={formik}
                value={formik.values.title}
                name={"title"}
                id={"title"}
                errors={formik.errors.title} 
                required={true}
                  />
              <FileUpload name="media" value={formik?.values?.media} setRemoveImageId={setRemoveImageId}  formik={formik} title={"sreenshot"}
                
              />
            </div>
          </>)
      }}
      </FormContainer>
      </div>
  );
};

export default Actions;
