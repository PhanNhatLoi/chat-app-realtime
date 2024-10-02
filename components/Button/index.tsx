import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import React from "react";

type Props = {
  style?: StyleProp<ViewStyle>;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  loading?: boolean;
  disabled?: boolean;
};
const LoadingButton = (props: Props) => {
  const {
    style,
    onPress,
    label,
    labelStyle,
    loading = false,
    disabled = false,
  } = props;
  return (
    <TouchableOpacity
      disabled={disabled || loading}
      style={[style, disabled ? { backgroundColor: "gray" } : {}]}
      onPress={onPress}
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text style={labelStyle}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

export default LoadingButton;

const styles = StyleSheet.create({});
