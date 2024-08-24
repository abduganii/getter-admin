import React, { useState } from "react";
import GlobalAvtion from "../../../ui/glabal-action";
import GlobalIcons from "../../../ui/global-input";
import FileUpload from "../../../ui/file-upload";
import { FormContainer } from "../../../components/Forms";
import { useNavigate, useParams } from "react-router-dom";
import { GetByIdData } from "../../../service/global";
import { useQuery } from "react-query";

const Actions = () => {
  const [loader, setLoader] = useState()
  const navigate = useNavigate()
  const { id } = useParams();
  const { data: DataOne, isLoading: productLoader } = useQuery(
    ["our-serviceId", id],
    () =>
      GetByIdData("our-service", id),
    {
      enabled: id !== "new"
    }
  );

  return (
    <div className={"ml-[260px] w-full"}>
    <FormContainer
      url={"our-service"}
      isFormData={false}
      setLoader={setLoader}
      loaderGlob={loader}
      
    fields={[
      {
        name: "title",
        validations: [{ type: "required" }],
        value:  DataOne?.title || ""
      },
   
      {
        name: "description",
        validations: [{ type: "required" }],
        value:  DataOne?.description || ""
      },
    
    ]}
    onSuccess={() => {
      navigate("/our-service");
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
          console.log(formik)
        return (
          <>
            <GlobalAvtion title={"Услуги"} />
            <div className="w-full max-w-[700px] mx-auto mb-[100px] overflow-hidden">
              <GlobalIcons
                placeholder={"title"}
                 type="text"
                  formik={formik}
                  value={formik.values.title}
                  name={"title"}
                id={"title"}
                className={'w-full border-b-0'}
                  errors={formik.errors.title} 
                  required={true}
                />
              <GlobalIcons placeholder={"description"}
                type="text"
                className={'w-full'}
                  formik={formik}
                  value={formik.values.description}
                  name={"description"}
                  id={"description"}
                errors={formik.errors.description} 
                required={true}
                  />
           
            </div>
          </>)
      }}
      </FormContainer>
      </div>
  );
};

export default Actions;
