import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import React from "react";
import { normalize, scaleH, scaleW, widthScreen } from "@/utils/dimensionUtil";
import { useRouter } from "expo-router";
import ArrowLeftSingleIcon from "@/assets/icons/ArrowLeftSingle";

type Props = {
  title?: string;
  goBack?: () => void;
};
const HeaderCard = (props: Props) => {
  const router = useRouter();
  const { title = "", goBack = () => router.back() } = props;
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.item} onPress={goBack}>
        <ArrowLeftSingleIcon />
      </TouchableOpacity>
      <View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.item}></View>
    </View>
  );
};

export default HeaderCard;

const styles = StyleSheet.create({
  header: {
    zIndex: 10,
    position: "absolute",
    top: 0,
    width: widthScreen,
    backgroundColor: "white",
    height: 100 * scaleH,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10 * scaleW,
    paddingTop: 10 * scaleW,
  },
  item: {
    height: 40 * scaleH,
    width: 40 * scaleW,
  },
  title: {
    color: "black",
    fontSize: normalize(24),
    fontWeight: "700",
  },
});
