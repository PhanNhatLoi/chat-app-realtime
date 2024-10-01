import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { normalize, scaleH, scaleW } from "@/utils/dimensionUtil";
import Avatar from "../Avatar";
import { useMessage } from "@/ctx/MessageContext";
import { UserType } from "@/api/auth/types";
import { useRouter } from "expo-router";
import Input from "../Inputs/Input";

const Friend = () => {
  const { allFriends } = useMessage();
  const router = useRouter();
  const [keyword, setKeyword] = useState<string>("");

  const RenderItemUser = ({ user }: { user: UserType }) => {
    return (
      <TouchableOpacity
        style={styles.messageItem}
        onPress={() => {
          //todo after
          router.push({
            pathname: "/message",
            params: {
              _id: user._id,
              avatar: user?.avatar,
              name: user?.name,
            },
          });
        }}
      >
        <Avatar uri={user?.avatar} size={50} />
        <View style={styles.leftContent}>
          <Text numberOfLines={1} style={styles.textTitle}>
            {user?.name}
          </Text>
          <Text numberOfLines={1} style={styles.textMessage}>
            {user?.email}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <View style={{ marginBottom: 10 }}>
        <Input
          value={keyword}
          onChangeText={(val) => setKeyword(val)}
          placeholder="Search name..."
        />
      </View>
      <FlatList
        data={allFriends.filter((f) => f.name.includes(keyword))}
        renderItem={({ item }) => <RenderItemUser user={item} />}
      />
    </View>
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
