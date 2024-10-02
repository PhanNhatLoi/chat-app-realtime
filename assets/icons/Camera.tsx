import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath, SvgProps} from 'react-native-svg';

function CameraIcon(props: SvgProps) {
  return (
    <Svg width={18} height={17} viewBox="0 0 18 17" fill="none" {...props}>
      <G clipPath="url(#clip0_263_2133)">
        <Path
          d="M15.275 2.587H13.27l-.975-1.464a.941.941 0 00-.784-.419H6.49a.941.941 0 00-.784.419L4.73 2.587H2.725A2.196 2.196 0 00.529 4.783v8.785a2.196 2.196 0 002.196 2.197h12.55a2.196 2.196 0 002.196-2.197V4.783a2.196 2.196 0 00-2.196-2.196zm.314 10.981a.313.313 0 01-.314.314H2.725a.314.314 0 01-.314-.314V4.783a.314.314 0 01.314-.314h2.51a.941.941 0 00.784-.419l.975-1.463h4.012l.975 1.463a.942.942 0 00.784.42h2.51a.314.314 0 01.314.313v8.785zM9 5.097a3.765 3.765 0 100 7.53 3.765 3.765 0 000-7.53zm0 5.647a1.883 1.883 0 110-3.766 1.883 1.883 0 010 3.766z"
          fill="#414141"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_263_2133">
          <Path fill="#fff" transform="translate(.5)" d="M0 0H17V17H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default CameraIcon;
