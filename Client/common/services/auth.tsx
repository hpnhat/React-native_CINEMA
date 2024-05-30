import { IAuthSignIn, IAuthSignUp } from "@/common/interfaces/Auth";
import instance from "@/config/axios";
import { ThunkAction } from "@reduxjs/toolkit";
import {
  loginFailure,
  loginRequest,
  loginSuccess,
  registerFailure,
  registerRequest,
  registerSuccess,
} from "../redux/actions/auth";
import { storeLoginInfo } from "@/utils/authStorage";

export const AuthSignUp =
  (userData: IAuthSignUp): ThunkAction<Promise<void>, any, null, any> =>
  async (dispatch: any) => {
    dispatch(registerRequest(userData));
    try {
      const { data } = await instance.post("account/sign-up", userData);
      dispatch(registerSuccess(data));
    } catch (error) {
      dispatch(registerFailure(error));
    }
  };

export const AuthSignIn =
  (credentials: IAuthSignIn): ThunkAction<Promise<void>, any, null, any> =>
  async (dispatch: any) => {
    try {
      dispatch(loginRequest(credentials));
      const { data } = await instance.post("/account/sign-in", credentials);
      storeLoginInfo(data.accessToken, data.data);
      dispatch(loginSuccess(data));
    } catch (error) {
      dispatch(loginFailure(error));
      throw error;
    }
  };
