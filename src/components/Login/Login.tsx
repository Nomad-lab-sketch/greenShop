import { Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserDataThunk } from "../../redux/reducers/login-reducer";
import s from "./css/login.module.css";
import * as Yup from "yup";
import { NavLink } from "react-router-dom";
import { Redirect } from "react-router";
import { AppStateType } from "../../redux/store";

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

  return (
    <div className={s.container}>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={loginValidate}
        onSubmit={(values) => {
          destructurizationModule(values.email, values.password);
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
              </div>
              <div className={s.form_container__validate}>
                {errors.email && touched.email && (
                  <div
                    style={{
                      color: "red",
                      border: "solid",
                      width: 240,
                      marginTop: 10,
                      borderRadius: 50,
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
                      borderRadius: 50,
                    }}
                  >
                    {errors.password}
                  </div>
                )}
              </div>
              <div className={s.form_container__button__submit}>
                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
                <div className={s.createAccount}>
                  <NavLink to="/registration">create account</NavLink>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default React.memo(Login);
