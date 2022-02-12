import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import s from "./css/Header.module.css";

import headerLogo from "../../images/icons/header-logo.svg";
import headerSearch from "../../images/icons/header-search.svg";
import headerCart from "../../images/icons/header-cart.svg";
import headerLogin from "../../images/icons/header-login.svg";
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "../../redux/store";
import { logOutDataThunk } from "../../redux/reducers/login-reducer";
import { authApi } from "../../dal/api";

const Header: React.FC = (props) => {
  const auth = useSelector((state: AppStateType) => state.loginCatalog.auth);
  const dispatch = useDispatch();


  useEffect(() => {
   setInterval(() => {
    authApi.changePasswordR()
    }, 5000);
  }, []);

  const headerNavGenerator = (item: string) => {
    return (
      <li className={s.header__item} key={item}>
        <NavLink
          to={
            item === "ChangePassword"
              ? "/changePassword"
              : item === "Registration"
              ? "/registration"
              : item === "Home"
              ? "/home"
              : ""
          }
          className={s.header__item_link}
        >
          {item}
        </NavLink>
      </li>
    );
  };

  const arrNavItem: Array<string> = [
    "Home",
    "Shop",
    "ChangePassword",
    "Registration",
  ];

  return (
    <div className={s.header}>
      <NavLink to={""} className={s.header__logo}>
        <img src={headerLogo} alt="Header logo" className={s.header__logoimg} />
      </NavLink>
      <nav className={s.header__nav}>
        <ul className={s.header__list}>
          {arrNavItem.map((str) => headerNavGenerator(str))}
        </ul>
      </nav>
      <div className={s.header__actions}>
        <NavLink
          to={""}
          className={`${s.header__actions_icon} ${s.header__search}`}
        >
          <img src={headerSearch} alt="" />
        </NavLink>
        <NavLink
          to={""}
          className={`${s.header__actions_icon} ${s.header__cart} `}
        >
          <img src={headerCart} alt="" />
        </NavLink>
        <NavLink
          to={"/login"}
          className={`${s.header__actions_icon} ${s.header__login}`}
          onClick={() => (auth === true ? dispatch(logOutDataThunk()) : null)}
        >
          <img src={headerLogin} className={s.header__login_img} alt="" />
          {auth === false ? "login" : "Go out"}
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
