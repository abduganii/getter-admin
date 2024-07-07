import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormContainer } from "../../../components/Forms";
import { AuthStore } from "../../../service/upload";
import GlobalIcons from "../../../ui/global-input";

const AuthPage = () => {
  const [loader, setLoader] = useState()
  const navigate = useNavigate()
  return <div>

<FormContainer
      url={"auth/login"}
      isFormData={false}
      setLoader={setLoader}
      loaderGlob={loader}
      
    fields={[
      {
        name: "email",
        validations: [{ type: "required" }],
        value:   ""
      },
   
      {
        name: "password",
        validations: [{ type: "required" }],
        value:   ""
      },
    
    ]}
      onSuccess={async(data) => {
        await AuthStore( { username: "khayrulloev.abdulloh@gmail.com", password: "password" })
            .then((data) =>   localStorage.setItem("storeToken", data?.data?.accessToken))
            .catch(()=>console.log("err"))
        localStorage.setItem("getterToken", data?.data?.accessToken);
        navigate("/dashboard");
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
            <div className="w-full max-w-[700px] mx-auto rounded-[7px] overflow-hidden">
            <GlobalIcons
                placeholder={"name"}
                  type="text"
                  formik={formik}
                  value={formik.values.email}
                  name={"email"}
                  id={"email"}
                errors={formik.errors.email} 
                required={true}
                  />
              <GlobalIcons
                placeholder={"password"}
                 type="text"
                  formik={formik}
                  value={formik.values.password}
                  name={"password"}
                  id={"password"}
                  errors={formik.errors.password} 
                  required={true}
                />
            
            <button type="submit">send</button>
            </div>
          </>)
      }}
      </FormContainer>
  </div>;
};

export default AuthPage;
