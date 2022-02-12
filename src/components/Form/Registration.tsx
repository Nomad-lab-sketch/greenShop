import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { registrationDataThunk } from "../../redux/reducers/login-reducer";
import s from "./css/login.module.css";
import * as Yup from "yup";
import { AppStateType } from "../../redux/store";
import { Redirect } from "react-router";
import { SettingsFrom } from "./SettingsForm";

const Registration = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: AppStateType) => state.loginCatalog.auth);

  let destructurizationModule = (
    email: string,
    password: string,
    passwordConfirmation: string
  ) => {
    dispatch(registrationDataThunk(email, password, passwordConfirmation));
  };

  const registrationValidate = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string()
      .required()
      .min(4)
      .max(10)
      .required()
      .matches(/^(?=.*[A-Z])/, "One Uppercase"),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required(),
  });

  if (auth === true) {
    return <Redirect to={"/home"} />;
  }

  const configureFormData = {
    initialValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    typeField: [
      {
        nameField: "email",
        type: "email",
        placeHolder: "Email",
      },
      {
        nameField: "password",
        type: "password",
        placeHolder: "Password",
      },
      {
        nameField: "passwordConfirmation",
        type: "password",
        placeHolder: "passwordConfirmation",
      },
    ],
  };

  return (
    <div className={s.container}>
      <SettingsFrom
        initialValues={configureFormData.initialValues}
        loginValidate={registrationValidate}
        module={destructurizationModule}
        title={"Registration"}
        typeField={configureFormData.typeField}
      />
    </div>
  );
};

export default React.memo(Registration);
