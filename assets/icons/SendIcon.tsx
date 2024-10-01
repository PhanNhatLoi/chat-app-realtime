import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function SendIcon(props: SvgProps) {
  return (
    <Svg width={35} height={35} viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        d="M18.34 7.32l-14-7a3 3 0 00-4.08 3.9l2.4 5.37a1.06 1.06 0 010 .82l-2.4 5.37A3 3 0 003 20a3.14 3.14 0 001.35-.32l14-7a3 3 0 000-5.36h-.01zm-.89 3.57l-14 7a1 1 0 01-1.35-1.3l2.39-5.37a2 2 0 00.08-.22h6.89a1 1 0 000-2H4.57a1.998 1.998 0 00-.08-.22L2.1 3.41a1 1 0 011.35-1.3l14 7a1 1 0 010 1.78z"
        fill="#1E68D7"
      />
    </Svg>
  );
}

export default SendIcon;
