import { Dimensions, PixelRatio } from "react-native";
const { width, height } = Dimensions.get("window");

const width_current = 375;
const height_current = 812;

const scaleW = width / width_current;
const scaleH = height / height_current;
const widthScreen = width;
const heightScreen = height;

const normalize = (size: number, multiplier = 2) => {
  return Math.round(
    PixelRatio.roundToNearestPixel(size * (width / height) * multiplier)
  );
};

export { scaleW, scaleH, widthScreen, heightScreen, normalize };
