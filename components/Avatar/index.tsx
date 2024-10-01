import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { scaleW } from "@/utils/dimensionUtil";

type Props = {
  uri: string;
  size?: number;
};
const Avatar = (props: Props) => {
  const { uri, size = 100 } = props;

  const styles = StyleSheet.create({
    avatar: {
      height: size * scaleW,
      width: size * scaleW,
      borderWidth: 1.5,
      borderColor: "gray",
      borderRadius: 100,
    },
  });

  return <Image source={{ uri: uri }} style={styles.avatar} />;
};

export default Avatar;
