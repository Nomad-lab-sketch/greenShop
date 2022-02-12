import { Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePasswordDataThunk } from "../../redux/reducers/login-reducer";
import s from "./css/login.module.css";
import * as Yup from "yup";
import { AppStateType } from "../../redux/store";
import { Redirect } from "react-router";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: AppStateType) => state.loginCatalog.auth);

  let destructurizationModule = (
    oldPassword: string,
    newPassword: string,
    passwordConfirmation: string
  ) => {
    dispatch(
      changePasswordDataThunk(oldPassword, newPassword, passwordConfirmation)
    );
  };

  const ChangePasswordValidate = Yup.object().shape({
    oldPassword: Yup.string().required(),
    newPassword: Yup.string()
      .required()
      .min(4)
      .max(10)
      .required()
      .matches(/^(?=.*[A-Z])/, "One Uppercase"),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required(),
  });

  if (auth === false) {
    return <Redirect to={"/login"} />;
  }

  return (
    <div className={s.container}>
      <Formik
        initialValues={{
          oldPassword: "",
          newPassword: "",
          passwordConfirmation: "",
        }}
        validationSchema={ChangePasswordValidate}
        onSubmit={(values) => {
          destructurizationModule(
            values.oldPassword,
            values.newPassword,
            values.passwordConfirmation
          );
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <div className={s.form_container}>
              <div className={s.form_container__email}>
                <Field
                  className={s.form_container__input}
                  placeholder="OldPassword"
                  type="password"
                  name="oldPassword"
                />
              </div>
              <div className={s.form_container__password}>
                <Field
                  className={s.form_container__input}
                  placeholder="NewPassword"
                  type="password"
                  name="newPassword"
                />
                <Field
                  className={s.form_container__input}
                  placeholder="PasswordConfirmation"
                  type="password"
                  name="passwordConfirmation"
                />
              </div>
              <div className={s.form_container__validate}>
                {errors.oldPassword && touched.oldPassword && (
                  <div
                    style={{
                      color: "red",
                      border: "solid",
                      width: 240,
                      marginTop: 10,
                      borderRadius: 50,
                    }}
                  >
                    {errors.oldPassword}
                  </div>
                )}
                {errors.newPassword && touched.newPassword && (
                  <div
                    style={{
                      color: "red",
                      border: "solid",
                      width: 240,
                      marginTop: 10,
                      borderRadius: 50,
                    }}
                  >
                    {errors.newPassword}
                  </div>
                )}
                {errors.passwordConfirmation &&
                  touched.passwordConfirmation && (
                    <div
                      style={{
                        color: "red",
                        border: "solid",
                        width: 240,
                        marginTop: 10,
                        borderRadius: 50,
                      }}
                    >
                      {errors.passwordConfirmation}
                    </div>
                  )}
              </div>
              <div className={s.form_container__button__submit}>
                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default React.memo(ChangePassword);
