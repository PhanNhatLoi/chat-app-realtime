import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function ArrowLeftSingleIcon(props: SvgProps) {
  return (
    <Svg width={40} height={40} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M11.29 12l3.54-3.54a1 1 0 10-1.42-1.41l-4.24 4.24a1.001 1.001 0 000 1.42L13.41 17a1 1 0 00.71.29 1 1 0 00.71-.29 1 1 0 000-1.41L11.29 12z"
        fill="#1E68D7"
      />
    </Svg>
  );
}

export default ArrowLeftSingleIcon;
