import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath, SvgProps} from 'react-native-svg';

function QuestionIcon(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <G clipPath="url(#clip0_122_6736)">
        <G clipPath="url(#clip1_122_6736)" fill="#ffff">
          <Path d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0zm0 21.981c-5.504 0-9.981-4.477-9.981-9.98 0-5.504 4.477-9.982 9.981-9.982 5.503 0 9.981 4.477 9.981 9.981S17.503 21.981 12 21.981z" />
          <Path d="M12 4.506a4.348 4.348 0 00-4.343 4.342 1.01 1.01 0 002.02 0A2.326 2.326 0 0112 6.525a2.326 2.326 0 012.324 2.323A2.326 2.326 0 0112 11.172a1.01 1.01 0 00-1.01 1.01v2.282a1.01 1.01 0 002.02 0v-1.391a4.35 4.35 0 003.333-4.225A4.348 4.348 0 0012 4.506zM12 19.307a1.413 1.413 0 100-2.826 1.413 1.413 0 000 2.826z" />
        </G>
      </G>
      <Defs>
        <ClipPath id="clip0_122_6736">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
        <ClipPath id="clip1_122_6736">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default QuestionIcon;
