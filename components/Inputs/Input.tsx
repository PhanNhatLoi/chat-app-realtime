import { useThemeColor } from "@/hooks/useThemeColor";
import { normalize, scaleH, scaleW } from "@/utils/dimensionUtil";
import { TextInput, TextInputBase, TextInputProps } from "react-native";

interface InputProps extends TextInputProps {
  // placeholder?: string;
  // fontSize?: string;
  // color?: string;
  // borderRadius?: string;
  // borderColor?: string;
  // [key: string]: unknown;
}

export default function Input(props: InputProps) {
  const color = useThemeColor({}, "text");
  const border = useThemeColor({}, "border");
  return (
    <TextInput
      style={{
        borderWidth: 1,
        borderColor: border,
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
