import { Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { registrationDataThunk } from "../../redux/reducers/login-reducer";
import s from "./css/login.module.css";
import * as Yup from "yup";
import { AppStateType } from "../../redux/store";
import { Redirect } from "react-router";

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

  const RegistrationValidate = Yup.object().shape({
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

  return (
    <div className={s.container}>
      <Formik
        initialValues={{
          email: "",
          password: "",
          passwordConfirmation: "",
        }}
        validationSchema={RegistrationValidate}
        onSubmit={(values) => {
          destructurizationModule(
            values.email,
            values.password,
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
                  placeholder="Email"
                  type="email"
                  name="email"
                />
              </div>
              <div className={s.form_container__password}>
                <Field
                  className={s.form_container__input}
                  placeholder="Password"
                  type="password"
                  name="password"
                />
                <Field
                  className={s.form_container__input}
                  placeholder="passwordConfirmation"
                  type="password"
                  name="passwordConfirmation"
                />
              </div>
              <div className={s.form_container__validate}>
                {errors.email && touched.email && (
                  <div
                    style={{
                      color: "red",
                      border: "solid",
                      width: 240,
                      marginTop: 10,
                      borderRadius: 2,
                    }}
                  >
                    {errors.email}
                  </div>
                )}
                {errors.password && touched.password && (
                  <div
                    style={{
                      color: "red",
                      border: "solid",
                      width: 240,
                      marginTop: 10,
                      borderRadius: 2,
                    }}
                  >
                    {errors.password}
                  </div>
                )}
                {errors.passwordConfirmation && touched.passwordConfirmation && (
                  <div
                    style={{
                      color: "red",
                      border: "solid",
                      width: 240,
                      marginTop: 10,
                      borderRadius: 2,
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

export default React.memo(Registration);
