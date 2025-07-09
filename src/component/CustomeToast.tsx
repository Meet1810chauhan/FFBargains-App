import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

interface CustomeToasts {
  type: "success" | "error" | "info";
  text1: string;
  text2?: string;
  position?: "top" | "bottom";
  visibilityTime?: number;
  autoHide?: boolean;
  topOffset?: number;
  bottomOffset?: number;
  onShow?: () => void;
  onPress?: () => void;
  props?: any;
  style?: object;
}

const showCustomToast = ({
  type,
  text1,
  text2,
  position = "top",
  visibilityTime = 4000,
  autoHide = true,
  topOffset = 50,
  bottomOffset = 50,
  style,
}: CustomeToasts) => {
  Toast.show({
    type,
    text1,
    text2,
    autoHide,
    visibilityTime,
    topOffset,
    bottomOffset,
  });
};

export default showCustomToast;
