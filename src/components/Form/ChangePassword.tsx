import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePasswordDataThunk } from "../../redux/reducers/login-reducer";
import s from "./css/login.module.css";
import * as Yup from "yup";
import { AppStateType } from "../../redux/store";
import { Redirect } from "react-router";
import { SettingsFrom } from "./SettingsForm";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: AppStateType) => state.loginCatalog.auth);
  const oldPassword = useSelector(
    (state: AppStateType) => state.loginCatalog.login.password
  );
  let destructurizationModule = (
    oldPassword: string,
    newPassword: string,
    passwordConfirmation: string
  ) => {
    dispatch(
      changePasswordDataThunk(oldPassword, newPassword, passwordConfirmation)
    );
  };

  const changePasswordValidate = Yup.object().shape({
    oldPassword: Yup.string().oneOf([Yup.ref("password"), oldPassword], "invalid password").required(),
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

  if (auth === false) {
    return <Redirect to={"/login"} />;
  }

  const configureFormData = {
    initialValues: {
      oldPassword: "",
      newPassword: "",
      passwordConfirmation: "",
    },
    typeField: [
      {
        nameField: "oldPassword",
        type: "password",
        placeHolder: "oldPassword",
      },
      {
        nameField: "newPassword",
        type: "password",
        placeHolder: "NewPassword",
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
        loginValidate={changePasswordValidate}
        module={destructurizationModule}
        title={"Change Password"}
        typeField={configureFormData.typeField}
      />
    </div>
  );
};

export default React.memo(ChangePassword);
