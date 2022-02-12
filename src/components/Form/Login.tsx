import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserDataThunk } from "../../redux/reducers/login-reducer";
import s from "./css/login.module.css";
import * as Yup from "yup";
import { Redirect } from "react-router";
import { AppStateType } from "../../redux/store";
import { SettingsFrom } from "./SettingsForm";

const Login = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: AppStateType) => state.loginCatalog.auth);

  let destructurizationModule = (email: string, password: string) => {
    dispatch(setUserDataThunk(email, password));
  };

  const loginValidate = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string()
      .required()
      .min(4)
      .max(10)
      .required()
      .matches(/^(?=.*[A-Z])/, "One Uppercase"),
  });

  if (auth === true) {
    return <Redirect to={"/home"} />;
  }

  const configureFormData = {
    initialValues: {
      email: "",
      password: "",
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
    ],
  };

  return (
    <div className={s.container}>
      <SettingsFrom
        initialValues={configureFormData.initialValues}
        loginValidate={loginValidate}
        module={destructurizationModule}
        title={"Login"}
        typeField={configureFormData.typeField}
      />
    </div>
  );
};

export default React.memo(Login);
