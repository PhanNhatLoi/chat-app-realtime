import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { normalize, scaleH, scaleW } from "@/utils/dimensionUtil";
import Avatar from "../Avatar";
import { useMessage } from "@/ctx/MessageContext";
import { UserType } from "@/api/auth/types";
import { useRouter } from "expo-router";
import Input from "../Inputs/Input";
import Pusher from "pusher-js/react-native";
import { pusher_channel, pusher_cluster, pusher_key } from "@/constants/env";

const Friend = () => {
  const { allFriends, fetchAllUser } = useMessage();
  const router = useRouter();
  const [keyword, setKeyword] = useState<string>("");

  useEffect(() => {
    const pusher = new Pusher(pusher_key, {
      cluster: pusher_cluster,
    });
    const channelApp = pusher.subscribe(pusher_channel);
    // event send-msg from user
    channelApp.bind("user-register", () => {
      fetchAllUser();
    });

    // event update info from user
    channelApp.bind("user-update", () => {
      fetchAllUser();
    });
  }, []);

  const RenderItemUser = ({ user }: { user: UserType }) => {
    return (
      <View style={styles.messageItem}>
        <Avatar uri={user?.avatar} size={50} />
        <View style={styles.leftContent}>
          <Text numberOfLines={1} style={styles.textTitle}>
            {user?.name}
          </Text>
          <Text numberOfLines={1} style={styles.textMessage}>
            {user?.email}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={{ marginBottom: 10 }}>
        <Input
          value={keyword}
          onChangeText={(val) => setKeyword(val)}
          placeholder="Search name..."
        />
      </View>
      <FlatList
        contentContainerStyle={{ paddingBottom: 75 * scaleH }}
        data={allFriends.filter((f) =>
          f.name.toLowerCase().includes(keyword.toLowerCase())
        )}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              //todo after
              router.push({
                pathname: "/message",
                params: {
                  _id: item?._id,
                  avatar: item?.avatar,
                  name: item?.name,
                },
              });
            }}
          >
            <RenderItemUser user={item} />
          </TouchableOpacity>
        )}
      />
    </KeyboardAvoidingView>
  );
};

export default Friend;

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
