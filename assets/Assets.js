import WelcomeFox from "./animations/WelcomeFox.json";
import SadFox from "./animations/SadFox.json";
const Assets = {
  Banner: {
    dark: require("../assets/BannerDark.jpeg"),
    light: require("../assets/BannerLight.jpeg"),
  },
};

const Animations = {
  welcome: WelcomeFox,
  sad: SadFox,
};
export { Animations, Assets };
