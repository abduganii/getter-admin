import { FC, ReactNode } from "react";
import { Form, Formik, FormikProps } from "formik";
import { isFunction } from "lodash";
import { formHelpers } from "../formHelpers.js";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AddData, UpdateData, UpdateDataOne } from "../../service/global.js";


export const FormContainer = ({
  url,
  params,
  children,
  isFormData,
  fields,
  onSuccess,
  onError,
  onFinal,
  customData,
  onSubmit,
  loaderGlob,
  setLoader,
  validateOnMount = false,
  ...formProps
}) => {
  const { id } = useParams();
  const { initialValues, validationSchema } =
    formHelpers.createFormSchema(fields);
  const handleSubmit = async (values) => {
    const formValues = formHelpers.getFormValues(values, fields, isFormData);
    setLoader(true);
    if (id == "new" || !id) {
      await AddData(url, formValues)
        .then((res) => {
          if (res?.status == "200" || res?.status == "201") {
            // formHelpers.resetForm();
            onSuccess(res);
          }
        })
        .catch((errors) => {
          onError(errors);
        })
        .finally(() => {
          onFinal();
          setLoader();
        });
    } else if (id == "old") {
      await UpdateDataOne(url, formValues)
        .then((res) => {
          if (res?.status == "200" || res?.status == "201") {
            toast.success("seccessfully update");
            onSuccess(res);
          }
        })
        .catch((errors) => {
          onError(errors);
        })
        .finally(() => onFinal());
    } else {
      await UpdateData(url, formValues, id)
        .then((res) => {
          if (res?.status == "200" || res?.status == "201") {
            onSuccess(res);
            toast.success("seccessfully update");
          }
        })
        .catch((errors) => {
          onError(errors);
        })
        .finally(() => onFinal());
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnMount={validateOnMount}
      onSubmit={(value) => {
        if (customData) {
          isFunction(onSubmit)
            ? onSubmit(customData(value))
            : handleSubmit(customData(value));
        } else {
          isFunction(onSubmit) ? onSubmit(value) : handleSubmit(value);
        }
      }}
      enableReinitialize={true}
    >
      {(formik) => {
        return <Form {...formProps}>{children(formik)}</Form>;
      }}
    </Formik>
  );
};
