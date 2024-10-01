export type UserType = {
  _id: string;
  name: string;
  email: string;
  role: number;
  state: string;
  socketId: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
  groupIds: {
    _id: string;
    manager: string;
    deleted: boolean;
    name: string;
  }[];
};
