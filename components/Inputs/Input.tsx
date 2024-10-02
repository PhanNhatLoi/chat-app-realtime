import { useThemeColor } from "@/hooks/useThemeColor";
import { normalize, scaleH, scaleW } from "@/utils/dimensionUtil";
import { TextInput, TextInputBase, TextInputProps } from "react-native";

interface InputProps extends TextInputProps {}

export default function Input(props: InputProps) {
  const color = useThemeColor({}, "text");
  const border = useThemeColor({}, "border");
  const { editable = true } = props;
  return (
    <TextInput
      placeholderTextColor="#A0A4A2"
      style={{
        borderWidth: editable ? 1 : 0.5,
        borderColor: editable ? border : "gray",
        borderRadius: 8 * scaleH,
        paddingHorizontal: 10 * scaleW,
        width: "100%",
        fontSize: normalize(24),
        height: 54 * scaleH,
        lineHeight: 24 * scaleH,
        color: color,
      }}
      {...props}
    />
  );
}
