import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { useMessage } from "@/ctx/MessageContext";
import Avatar from "../Avatar";
import { GetAllMessageResponseType } from "@/api/messsage/types";
import { store } from "@/redux/store";
import Pusher from "pusher-js/react-native";
import { pusher_cluster, pusher_key } from "@/constants/env";
import { readMessageApi } from "@/api/messsage/actions";
import { router } from "expo-router";
import { normalize, scaleH, scaleW } from "@/utils/dimensionUtil";

const ListUser = () => {
  const { allMessageList, fetchAllMessage } = useMessage();
  const user = store.getState()?.auth?.user;

  useEffect(() => {
    if (user?._id) {
      fetchAllMessage();
      const pusher = new Pusher(pusher_key, {
        cluster: pusher_cluster,
      });
      const channelUser = pusher.subscribe(user._id);
      // event send-msg from user
      channelUser.bind("receive-msg", () => {
        fetchAllMessage();
      });

      return () => {
        pusher.unsubscribe(user._id);
        pusher.disconnect();
      };
    }
  }, [user?._id]);

  const RenderItemUser = ({ item }: { item: GetAllMessageResponseType }) => {
    const { user, lastedMessage } = item;
    return (
      <View style={styles.messageItem}>
        <Avatar uri={user?.avatar} size={50} />
        <View style={styles.leftContent}>
          <Text numberOfLines={1} style={styles.textTitle}>
            {user?.name}
          </Text>
          <Text numberOfLines={1} style={styles.textMessage}>
            {lastedMessage.msg}
          </Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <TimeText time={lastedMessage?.createdAt?.toString() || ""} />
          <Unread item={item} />
        </View>
      </View>
    );
  };

  const TimeText = ({ time }: { time: string }) => {
    const timeValue = new Date(time);
    let text = timeValue.toLocaleDateString();
    if (timeValue.getDate() === new Date().getDate()) {
      text = timeValue.toLocaleTimeString();
    }
    return <Text style={styles.time}>{text}</Text>;
  };

  const Unread = ({ item }: { item: GetAllMessageResponseType }) => {
    const unread = item.messages.filter(
      (f) => f.status === "sent" && f.to === user?._id
    ).length;
    if (unread === 0) return;
    return (
      <View style={styles.unread}>
        <Text style={styles.unreadText}>{unread > 9 ? "9+" : unread}</Text>
      </View>
    );
  };

  return (
    <FlatList
      style={{ marginTop: 30 }}
      contentContainerStyle={{ paddingBottom: 150 * scaleH }}
      data={allMessageList}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => {
            item?._id &&
              readMessageApi(item._id)
                .then(() => {
                  fetchAllMessage();
                })
                .catch((err) => {
                  console.log(err);
                });
            router.push({
              pathname: "/message",
              params: {
                _id: item._id,
                avatar: item?.user?.avatar,
                name: item?.user?.name,
                email: item.user.email,
              },
            });
          }}
        >
          <RenderItemUser item={item} />
        </TouchableOpacity>
      )}
    />
  );
};

export default ListUser;

const styles = StyleSheet.create({
  messageItem: {
    flexDirection: "row",
    marginBottom: 15 * scaleH,
  },
  leftContent: {
    marginHorizontal: 10 * scaleW,
    flex: 1,
  },

  textTitle: {
    color: "black",
    fontSize: normalize(18),
    fontWeight: "700",
    flex: 1,
  },
  textMessage: {
    color: "gray",
    fontSize: normalize(16),
    fontWeight: "600",
    flex: 1,
  },
  time: {
    color: "gray",
    fontSize: normalize(14),
    fontWeight: "600",
    flex: 1,
    textAlign: "right",
  },
  unread: {
    height: 20 * scaleW,
    width: 20 * scaleW,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E68D7",
    borderRadius: 100,
  },
  unreadText: {
    color: "white",
  },
});
