import { getAllUserApi } from "@/api/auth/actions";
import { UserType } from "@/api/auth/types";
import { getAllMessageApi } from "@/api/messsage/actions";
import { GetAllMessageResponseType } from "@/api/messsage/types";
import { store } from "@/redux/store";
import React, {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from "react";
import { useSession } from "./SessionContext";

type MessageContextType = {
  allMessageList: GetAllMessageResponseType[];
  fetchAllMessage: () => void;
  fetchAllUser: () => void;
  allFriends: UserType[];
};

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider = ({ children }: { children: ReactNode }) => {
  const [allMessageList, setAllMessageList] = useState<
    GetAllMessageResponseType[]
  >([]);
  const { isAuthenticated } = useSession();

  const [allFriends, setAllFriends] = useState<UserType[]>([]);

  const fetchAllMessage = useCallback(() => {
    fetchData();
  }, []);

  const fetchAllUser = useCallback(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      setAllFriends([]);
      setAllMessageList([]);
      fetchAllUser();
      fetchAllMessage();
    }
  }, [isAuthenticated]);

  const fetchUser = async () => {
    getAllUserApi()
      .then((res) => {
        setAllFriends(res?.user);
      })
      .catch((err) => {});
  };

  const fetchData = async () => {
    getAllMessageApi()
      .then((res) => {
        setAllMessageList(Object.values(res).reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <MessageContext.Provider
      value={{ allMessageList, fetchAllMessage, allFriends, fetchAllUser }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => {
  const context = React.useContext(MessageContext);
  if (!context) {
    throw new Error("useSession must be used within a MessageProvider");
  }
  return context;
};
