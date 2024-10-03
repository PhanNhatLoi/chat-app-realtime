import FETCH from "../fetch";
import { GetAllMessageResponseType, MessageResponseType } from "./types";

export const getAllMessageApi = (): Promise<GetAllMessageResponseType[]> => {
  return FETCH({
    method: "GET",
    path: "message/get-all-msg",
  });
};

export const getMessageByIdApi = (
  params: {
    page: number;
    limit: number;
  },
  userId: string
): Promise<GetAllMessageResponseType> => {
  return FETCH({
    method: "GET",
    path: "message/get-msg",
    params: params,
    headers: {
      userId,
    },
  });
};

export const sendMessageApi = (
  body: MessageResponseType
): Promise<GetAllMessageResponseType> => {
  return FETCH({
    method: "POST",
    path: "message/send-msg",
    body: body,
  });
};

export const readMessageApi = (
  userId: string
): Promise<GetAllMessageResponseType> => {
  return FETCH({
    method: "POST",
    path: "message/read-msg",
    headers: {
      userId,
    },
  });
};

export const deleteMessageApi = (msgId: string): Promise<{ msg: string }> => {
  return FETCH({
    method: "DELETE",
    path: `message/remove-msg/${msgId}`,
  });
};

export const reactMessageApi = (
  msgId: string,
  body: { react: string }
): Promise<{ msg: string }> => {
  return FETCH({
    method: "POST",
    path: `message/react-msg/${msgId}`,
    body,
  });
};
