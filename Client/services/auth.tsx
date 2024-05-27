
import { IAuth } from "@/common/interfaces/Auth";
import instance from "@/config/axios";

export const AuthSignUp = async (account: IAuth) => {
  try {
    const { data } = await instance.post("account/register", account);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const AuthSignIn = async (account: IAuth) => {
  try {
    const { data } = await instance.post("account/sign-in", account);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const AuthLogOut = async () => {
  try {
    const { data } = await instance.post("account/log-out");
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getById = async (id: string) => {
  try {
    const { data } = await instance.get(`account/user/${id}`);
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
export const get = async () => {
  try {
    const { data } = await instance.get(`account/user`);
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
