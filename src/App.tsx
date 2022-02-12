import React from "react";
import s from "./App.module.css";
import Header from "./components/Header/Heder";
import InfoForm from "./components/InfoForm/InfoForm";
import Contacts from "./components/Contacts/Contacts";
import Footer from "./components/Footer/Footer";
import Login from "./components/Form/Login";
import Registration from "./components/Form/Registration";
import ChangePassword from "./components/Form/ChangePassword";
import { Redirect, Route } from "react-router";
import { useSelector } from "react-redux";
import { AppStateType } from "./redux/store";

const App: React.FC = () => {
  const auth = useSelector((state: AppStateType) => state.loginCatalog.auth);
  return (
    <div className={s.container}>
      <Header />
      {auth === false ? <Route path="/login" render={() => <Login />} /> : null}
      {auth === false ? (
        <Route path="/registration" render={() => <Registration />} />
      ) : null}
      {auth === true ? (
        <Route path="/changePassword" render={() => <ChangePassword />} />
      ) : (
        <Redirect to={"/login"} />
      )}
      <Route path="/home" render={() => <InfoForm />} />
      <Contacts />
      <Footer />
    </div>
  );
};

export default App;
