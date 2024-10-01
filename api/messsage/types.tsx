import { UserType } from "../auth/types";

export type GetAllMessageResponseType = {
  _id: string;
  messages: MessageResponseType[];
  totalMessage?: number;
  page?: number;
  user: UserType;
};

export type MessageResponseType = {
  _id: string | null;
  from: string;
  to: string;
  msg: string;
  messageKey: string | number;
  status: statusMessageType;
  react?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type statusMessageType =
  | "new"
  | "sending..."
  | "sent"
  | "seen"
  | "deleted";
