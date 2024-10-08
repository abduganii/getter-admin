import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormContainer } from "../../../components/Forms";
import { AuthStore } from "../../../service/upload";
import GlobalIcons from "../../../ui/global-input";
import { LoginIcons } from "../../../ui/icons";

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
            <div className="w-full text-center relative max-w-[530px] mx-auto  overflow-hidden">
                <img src="/GetterAdmin.svg" alt="img" className='mx-auto mb-[60px] mt-[100px]'/>

              <GlobalIcons
                placeholder={"Login"}
                type="text"
                className={'w-full py-[10px]'}
                  formik={formik}
                  value={formik.values.email}
                  name={"email"}
                  id={"email"}
                errors={formik.errors.email} 
                required={true}
                  />
              <GlobalIcons
                placeholder={"Parol"}
                type="text"
                className={'w-full py-[10px]'}
                  formik={formik}
                  value={formik.values.password}
                  name={"password"}
                  id={"password"}
                  errors={formik.errors.password} 
                  required={true}
                />
            
              <button className={`absolute bottom-[12px] right-[16px] px-[10px] py-[5px] cursor-pointer ${ !loader&&formik.values.password &&  formik.values.email ? "bg-violet-700 rounded-[20px] " :""}`} type="submit">
                <LoginIcons color={ !loader&&formik.values.password &&  formik.values.email ? "white" :"gray"} />
             </button>
            </div>
          </>)
      }}
      </FormContainer>
  </div>;
};

export default AuthPage;
