import { ThunkAction } from "redux-thunk";
import { authApi } from "../../dal/api";

import { AppStateType, InferActionsType } from "../store";

const defaultState = {
  login: {
    email: "",
    password: "",
  },
  registration: {
    email: "",
    password: "",
    passwordConfirmation: "",
  },
  changePassword: {
    oldPassword: "",
    newPassword: "",
    passwordConfirmation: "",
  },
  auth: false,
};

type DefaultStateType = typeof defaultState;

const LoginReducer = (
  state = defaultState,
  action: ActionsType
): DefaultStateType => {
  switch (action.type) {
    case "GH/loginsReducer/setData":
      return {
        ...state,
        login: action.payload,
        auth: action.auth,
      };
    case "GH/loginsReducer/registration":
      return {
        ...state,
        ...action.payload,
        auth: action.auth,
      };
    case "GH/loginsReducer/changePassword":
      return {
        ...state,
        ...action.payload,
      };
    case "GH/loginsReducer/setAuth":
      return {
        ...state,
        auth: action.payload,
      };
    default:
      return state;
  }
};

type ActionsType = InferActionsType<typeof actions>;

const actions = {
  login: (email: string, password: string, auth: boolean) =>
    ({
      type: "GH/loginsReducer/setData",
      payload: { email, password },
      auth,
    } as const),
  registration: (
    email: string,
    password: string,
    passwordConfirmation: string,
    auth: boolean
  ) =>
    ({
      type: "GH/loginsReducer/registration",
      payload: { email, password, passwordConfirmation },
      auth,
    } as const),
  changePassword: (
    oldPassword: string,
    newPassword: string,
    passwordConfirmation: string
  ) =>
    ({
      type: "GH/loginsReducer/changePassword",
      payload: { oldPassword, newPassword, passwordConfirmation },
    } as const),
  logout: (auth: boolean) =>
    ({ type: "GH/loginsReducer/setAuth", payload: auth } as const),
};

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsType>;

export const setUserDataThunk =
  (email: string, password: string): ThunkType =>
  async (dispatch) => {
    // let setAuth = await authApi.login();
    dispatch(actions.login(email, password, true));
  };
export const registrationDataThunk =
  (email: string, password: string, passwordConfirmation: string): ThunkType =>
  async (dispatch) => {
    let registrationData = await authApi.registration(
      email,
      password,
      passwordConfirmation
    );
    console.log(registrationData);
    dispatch(actions.registration(email, password, passwordConfirmation, true));
  };
export const changePasswordDataThunk =
  (
    oldPassword: string,
    newPassword: string,
    passwordConfirmation: string
  ): ThunkType =>
  async (dispatch) => {
    let setAuth = await authApi.changePassword();
    dispatch(
      actions.changePassword(oldPassword, newPassword, passwordConfirmation)
    );
  };
export const logOutDataThunk = (): ThunkType => async (dispatch) => {
  dispatch(actions.logout(false));
};

export default LoginReducer;
