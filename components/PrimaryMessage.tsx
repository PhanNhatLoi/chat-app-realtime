import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import { normalize, scaleH, scaleW } from "@/utils/dimensionUtil";
import { ThemedText } from "./ThemedText";
import { MessageResponseType } from "@/api/messsage/types";
import Popover, { PopoverPlacement } from "react-native-popover-view";
import Emoji from "react-native-emoji";
import { reactMessageApi } from "@/api/messsage/actions";
const enmojiList = [
  {
    id: 1,
    name: "+1",
    unified: "1f44d",
  },
  {
    id: 2,
    name: "heart",
    unified: "2764-fe0f",
  },
  {
    id: 3,
    name: "smiley",
    unified: "1f603",
  },
  {
    id: 4,
    name: "cry",
    unified: "1f622",
  },
  {
    id: 5,
    name: "pray",
    unified: "1f64f",
  },
  {
    id: 6,
    name: "-1",
    unified: "1f44e",
  },
  {
    id: 7,
    name: "rage",
    unified: "1f621",
  },
];

const PrimaryMessage = ({ item }: { item: MessageResponseType }) => {
  const touchable = useRef<any>();
  const [showPopover, setShowPopover] = useState(false);
  return (
    <>
      <Popover
        from={touchable}
        placement={[PopoverPlacement.BOTTOM]}
        isVisible={showPopover}
        popoverStyle={{
          padding: 10 * scaleW,
          borderRadius: 8 * scaleW,
          flexDirection: "row",
        }}
        onRequestClose={() => setShowPopover(false)}
      >
        {enmojiList.map((emoji) => {
          return (
            <TouchableOpacity
              key={emoji.id}
              onPress={() => {
                item._id &&
                  reactMessageApi(item._id, {
                    react: `${emoji.unified}|${emoji.name}`,
                  })
                    .then((res) => {
                      setShowPopover(false);
                    })
                    .catch((err) => {
                      Alert.alert("Error", Object.values(err).join("; "));
                    });
              }}
            >
              <Emoji name={emoji.name} style={styles.emoji} />
            </TouchableOpacity>
          );
        })}
      </Popover>
      <TouchableOpacity
        ref={touchable}
        disabled={item.status === "deleted"}
        onLongPress={() => {
          setShowPopover(true);
        }}
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
        {item.react && item.status !== "deleted" && (
          <View
            style={{
              position: "absolute",
              bottom: -15 * scaleW,
              right: -15 * scaleW,
              backgroundColor: "white",
              borderRadius: 8 * scaleW,
            }}
          >
            <Emoji name={item.react.split("|")[1] || ""} style={styles.emoji} />
          </View>
        )}
      </TouchableOpacity>
    </>
  );
};

export default PrimaryMessage;

const styles = StyleSheet.create({
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
  boxShadow: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  textMessagePrimary: {
    textAlign: "left",
    color: "black",
  },
  emoji: {
    fontSize: normalize(30),
  },
});
