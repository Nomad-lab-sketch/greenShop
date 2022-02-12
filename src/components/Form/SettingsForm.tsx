import { ErrorMessage, Field, Form, Formik } from "formik";

import s from "./css/login.module.css";

interface PropsType {
  initialValues: { [key: string]: string };
  loginValidate: any;
  module: (...args: any[]) => void;
  title: string;
  typeField: Array<TypeField>;
}

interface TypeField {
  nameField: string;
  type: string
  placeHolder: string;
}

export const SettingsFrom: React.FC<PropsType> = ({
  initialValues,
  loginValidate,
  module,
  title,
  typeField,
}) => {
  const ReturnCountField = (typeField: Array<TypeField>) => {
    return typeField.map((i) => (
      <div key={i.nameField}>
        <div className={s.form_container__item}>
          <Field
            className={s.form_container__input}
            placeholder={i.placeHolder}
            type={i.type}
            name={i.nameField}
          />
        </div>
        <ErrorMessage name={i.nameField} component="div" />
      </div>
    ));
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginValidate}
      onSubmit={(values) => {
        module(values);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className={s.wrapper}>
            <h1>{title}</h1>
            <div className={s.form_container}>
              <div className={s.form_container__email}>
                {ReturnCountField(typeField)}
              </div>
              <div className={s.form_container__button__submit}>
                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
