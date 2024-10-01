import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { normalize, scaleH, scaleW, widthScreen } from "@/utils/dimensionUtil";
import ArrowLeftSingleIcon from "@/assets/icons/ArrowLeftSingle";
import Avatar from "@/components/Avatar";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import SendIcon from "@/assets/icons/SendIcon";
import { MessageResponseType } from "@/api/messsage/types";
import { getMessageByIdApi, sendMessageApi } from "@/api/messsage/actions";
import Pusher from "pusher-js/react-native";
import { pusher_cluster, pusher_key } from "@/constants/env";
import { UserType } from "@/api/auth/types";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import CheckIcon from "@/assets/icons/CheckIcon";
import Input from "@/components/Inputs/Input";

const Message = () => {
  const router = useRouter();
  const item = useLocalSearchParams<any>();
  const user = useSelector((state: RootState) => state.auth.user);
  const scrollRef = useRef<ScrollView>(null);
  const [message, setMessage] = useState<MessageResponseType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [contentText, setContentText] = useState<string>("");
  const [refresh, setRefresh] = useState<boolean>(false);

  const [actionToRefresh, setActionToRefresh] = useState<
    | {
        action: "sent-msg" | "receive-msg" | "update-msg";
        msg: MessageResponseType;
        user?: UserType;
      }
    | undefined
  >();

  const [params, setParams] = useState<{
    page: number;
    limit: number;
  }>({
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    if (refresh) {
      handleRefreshMessages();
    }
  }, [refresh]);

  const handleRefreshMessages = () => {
    if (actionToRefresh?.action === "sent-msg") {
      setMessage((pre) => {
        return pre.map((item) => {
          return item.messageKey !== actionToRefresh.msg.messageKey
            ? item
            : actionToRefresh.msg;
        });
      });
    }
    if (actionToRefresh?.action === "receive-msg") {
      setMessage([...message, actionToRefresh.msg]);
      scrollRef.current?.scrollToEnd();
    }
    if (actionToRefresh?.action === "update-msg") {
      setMessage((pre) => {
        return pre.map((item) => {
          return item.messageKey !== actionToRefresh.msg.messageKey
            ? item
            : actionToRefresh.msg;
        });
      });
    }
    setRefresh(false);
  };

  // realtime event
  useEffect(() => {
    if (user?._id) {
      const pusher = new Pusher(pusher_key, {
        cluster: pusher_cluster,
      });
      const channelUser = pusher.subscribe(user._id);
      // event send-msg from user
      channelUser.bind(
        "receive-msg",
        ({ msg, user }: { msg: MessageResponseType; user: UserType }) => {
          setActionToRefresh({
            action: "receive-msg",
            msg: msg,
            user: user,
          });
          setRefresh(true);
        }
      );

      // event send-done
      channelUser.bind("sent-msg", ({ msg }: { msg: MessageResponseType }) => {
        if (msg.to === item._id) {
          setActionToRefresh({
            action: "sent-msg",
            msg: msg,
          });
          setRefresh(true);
        }
      });

      // event send-done
      channelUser.bind("read-msg", ({ msg }: { msg: MessageResponseType }) => {
        setActionToRefresh({
          action: "update-msg",
          msg: msg,
        });
        setRefresh(true);
      });

      return () => {
        pusher.unsubscribe(user._id);
        pusher.disconnect();
      };
    }
  }, [user?._id]);

  const onRefresh = () => {
    setRefreshing(true);
    setParams({
      page: params.page + 1,
      limit: params.limit,
    });
  };

  useEffect(() => {
    if (refreshing) fetchData(false);
  }, [params]);

  useEffect(() => {
    fetchData(true);
  }, []);

  const handleSendMessage = useCallback(() => {
    if (contentText) {
      const newMessage: MessageResponseType = {
        _id: null,
        from: user?._id || "",
        to: item._id,
        msg: contentText,
        messageKey: new Date().getTime(),
        status: "sending...",
      };
      setContentText("");
      setMessage([...message, newMessage]);
      scrollRef.current?.scrollToEnd();
      sendMessageApi(newMessage);
    }
  }, [contentText]);

  const fetchData = (scroll: boolean) => {
    scroll && setLoading(true);
    getMessageByIdApi(params, item._id)
      .then((res) => {
        setMessage([...res.messages.reverse(), ...message]);
        if (scroll) {
          scrollRef.current?.scrollToEnd();
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
          setRefreshing(false);
        }, 1000);
      });
  };

  const PrimaryMessage = useCallback(
    ({ item }: { item: MessageResponseType }) => {
      return (
        <View
          style={[
            styles.primaryMessage,
            item.status === "deleted"
              ? {
                  backgroundColor: "gray",
                }
              : {
                  ...styles.boxShadow,
                  backgroundColor: "#ECEAEA",
                },
          ]}
        >
          <ThemedText style={styles.textMessagePrimary}>{item.msg}</ThemedText>
        </View>
      );
    },
    [message]
  );
  const SecondMessage = useCallback(
    ({ item }: { item: MessageResponseType }) => {
      return (
        <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
          <View
            style={[
              styles.secondMessage,
              item.status === "deleted"
                ? {
                    backgroundColor: "gray",
                  }
                : {
                    ...styles.boxShadow,
                    backgroundColor: "#59CD30",
                  },
            ]}
          >
            <ThemedText style={styles.textMessageSecond}>{item.msg}</ThemedText>
          </View>
          {item.status === "seen" && <CheckIcon enable />}
          {item.status === "sent" && <CheckIcon enable={false} />}
          {item.status === "sending..." && <SendIcon width={15} height={15} />}
        </View>
      );
    },
    [message]
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            router.back();
          }}
        >
          <ArrowLeftSingleIcon />
        </TouchableOpacity>
        <View style={styles.justifySpace}>
          <Avatar size={50} uri={item?.avatar || ""} />
          <View style={{ marginLeft: 10 * scaleW }}>
            <ThemedText numberOfLines={1} style={styles.textName}>
              {item?.name}
            </ThemedText>
            <ThemedText numberOfLines={1} style={styles.textDes}>
              {item?.email}
            </ThemedText>
          </View>
        </View>
      </View>
      {loading && (
        <ThemedView style={styles.loading}>
          <ActivityIndicator size="large" />
        </ThemedView>
      )}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ref={scrollRef}
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 190 * scaleH }}
      >
        {message.map((mess, index) => {
          return (
            <View
              key={`key_message_${index}`}
              style={{
                alignItems: `flex-${mess.from === item._id ? "start" : "end"}`,
              }}
            >
              {mess.from === item._id ? (
                <PrimaryMessage item={mess} />
              ) : (
                <SecondMessage item={mess} />
              )}
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.bottom}>
        <Input
          placeholder="Chat some thing..."
          style={styles.inputText}
          multiline
          value={contentText}
          onChangeText={(val) => {
            setContentText(val);
          }}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <SendIcon />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 25 * scaleW,
    backgroundColor: "white",
    flex: 1,
  },
  header: {
    zIndex: 10,
    flexDirection: "row",
    position: "absolute",
    top: 0,
    width: widthScreen,
    paddingHorizontal: 10 * scaleW,
    paddingTop: 50 * scaleH,
    paddingBottom: 25 * scaleH,
    alignItems: "center",
    backgroundColor: "white",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  justifySpace: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  backButton: {
    marginRight: 15 * scaleW,
  },
  textName: {
    fontSize: normalize(20),
    fontWeight: "700",
  },
  textDes: {
    color: "gray",
    fontSize: normalize(18),
    fontWeight: "600",
  },
  content: {
    paddingLeft: 25 * scaleW,
    paddingRight: 10 * scaleW,
    width: "100%",
    height: "100%",
    paddingTop: 130 * scaleH,
  },

  bottom: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: widthScreen,
    height: 80 * scaleH,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    flexDirection: "row",
    zIndex: 10,
  },
  primaryMessage: {
    maxWidth: "80%",
    marginBottom: 16 * scaleW,
    backgroundColor: "#ECEAEA",
    paddingHorizontal: 24 * scaleW,
    paddingVertical: 16 * scaleH,
    borderTopLeftRadius: 18 * scaleW,
    borderTopRightRadius: 18 * scaleW,
    borderBottomLeftRadius: 4 * scaleW,
    borderBottomRightRadius: 18 * scaleW,
  },
  secondMessage: {
    maxWidth: "80%",
    marginBottom: 16 * scaleW,
    paddingHorizontal: 24 * scaleW,
    paddingVertical: 16 * scaleH,
    borderTopLeftRadius: 18 * scaleW,
    borderTopRightRadius: 18 * scaleW,
    borderBottomLeftRadius: 18 * scaleW,
    borderBottomRightRadius: 5 * scaleW,
  },
  sendButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10 * scaleW,
  },
  inputText: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    fontSize: normalize(24),
    flex: 1,
    padding: 15 * scaleW,
  },
  loading: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    opacity: 0.9,
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textMessagePrimary: {
    textAlign: "left",
    color: "black",
  },
  textMessageSecond: {
    color: "white",
  },
  textStatus: {
    color: "gray",
    fontSize: normalize(12),
    textAlign: "right",
  },
  boxShadow: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
});
