import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import { normalize, scaleH, scaleW } from "@/utils/dimensionUtil";
import { ThemedText } from "./ThemedText";
import { MessageResponseType } from "@/api/messsage/types";
import CheckIcon from "@/assets/icons/CheckIcon";
import SendIcon from "@/assets/icons/SendIcon";
import Popover, { PopoverPlacement } from "react-native-popover-view";
import { deleteMessageApi } from "@/api/messsage/actions";
import Emoji from "react-native-emoji";

const SecondMessage = ({ item }: { item: MessageResponseType }) => {
  const touchable = useRef<any>();
  const [showPopover, setShowPopover] = useState(false);
  const [deleted, setDeleted] = useState<boolean>(item.status === "deleted");
  return (
    <>
      <Popover
        from={touchable}
        placement={PopoverPlacement.TOP}
        isVisible={showPopover}
        popoverStyle={{
          padding: 10 * scaleW,
          borderRadius: 8 * scaleW,
        }}
        onRequestClose={() => setShowPopover(false)}
      >
        <TouchableOpacity
          onPress={() => {
            item._id &&
              deleteMessageApi(item._id)
                .then(() => {
                  setDeleted(true);
                  setShowPopover(false);
                })
                .catch((err) => {
                  Alert.alert("Error", Object.values(err).join("; "));
                });
          }}
        >
          <ThemedText>Deleted Message</ThemedText>
        </TouchableOpacity>
      </Popover>
      <TouchableOpacity
        onLongPress={() => {
          setShowPopover(true);
        }}
        disabled={deleted || item.status === "deleted"}
        ref={touchable}
        style={{ flexDirection: "row", alignItems: "flex-end" }}
      >
        <View
          style={[
            styles.secondMessage,
            deleted || item.status === "deleted"
              ? {
                  backgroundColor: "gray",
                }
              : {
                  ...styles.boxShadow,
                  backgroundColor: "#59CD30",
                },
          ]}
        >
          <ThemedText style={styles.textMessageSecond}>
            {deleted ? "message deleted" : item.msg}
          </ThemedText>
          {item.react && item.status !== "deleted" && (
            <View
              style={{
                width: 30 * scaleW,
                position: "absolute",
                bottom: -15 * scaleW,
                left: -15 * scaleW,
                backgroundColor: "white",
                borderRadius: 8 * scaleW,
              }}
            >
              <Emoji
                name={item.react.split("|")[1] || ""}
                style={styles.emoji}
              />
            </View>
          )}
        </View>
        {item.status === "seen" && <CheckIcon enable />}
        {item.status === "sent" && <CheckIcon enable={false} />}
        {item.status === "sending..." && <SendIcon width={15} height={15} />}
      </TouchableOpacity>
    </>
  );
};

export default SecondMessage;

const styles = StyleSheet.create({
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
  boxShadow: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  textMessageSecond: {
    color: "white",
  },
  emoji: {
    fontSize: normalize(30),
  },
});
