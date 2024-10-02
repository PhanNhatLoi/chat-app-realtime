import FETCH from "../fetch";
import { UserType } from "./types";

export const loginApi = (data: {
  email: string;
  password: string;
}): Promise<{ _token: string }> => {
  return FETCH({
    method: "POST",
    path: "user/login",
    body: data,
  });
};

export const registerApi = (data: {
  email: string;
  name: string;
  password: string;
}): Promise<{ msg: string }> => {
  return FETCH({
    method: "POST",
    path: "user/register",
    body: data,
  });
};

export const getProfieApi = (): Promise<UserType> => {
  return FETCH({
    method: "GET",
    path: "user/infor",
  });
};

export const getAllUserApi = (): Promise<{ user: UserType[] }> => {
  return FETCH({
    method: "GET",
    path: "user/all_infor",
  });
};

export const changePasswordApi = (body: {
  currentPassword: string;
  password: string;
}): Promise<{ msg: string }> => {
  return FETCH({
    method: "PUT",
    path: "user/change_password",
    body,
  });
};

export const updateProfileApi = (body: {
  name: string;
  avatar: string;
}): Promise<{ msg: string }> => {
  return FETCH({
    method: "PATCH",
    path: "user/update",
    body,
  });
};
