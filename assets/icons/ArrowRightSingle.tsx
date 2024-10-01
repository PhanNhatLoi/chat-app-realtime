import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function ArrowRightSingleIcon(props: SvgProps) {
  return (
    <Svg width={8} height={14} viewBox="0 0 8 14" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.707 6.294a1 1 0 010 1.414L2.05 13.365A1 1 0 11.636 11.95L5.586 7 .636 2.05A1 1 0 012.05.637l5.657 5.657z"
        fill="#171717"
      />
    </Svg>
  );
}

export default ArrowRightSingleIcon;
