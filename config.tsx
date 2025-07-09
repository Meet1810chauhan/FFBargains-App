import { BaseToast, ErrorToast } from "react-native-toast-message";
import Fonts from "./src/theme/Fonts";

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "blue" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontFamily: Fonts.PoppinsNormal,
        // height: 50,
        flexDirection: "row",
        flexWrap: "wrap",
        textAlign: "center",
      }}
      text1NumberOfLines={2}
      text2NumberOfLines={2}
      text2Style={{
        fontSize: 16,
        fontFamily: Fonts.PoppinsNormal,

        flexDirection: "row",
        flexWrap: "wrap",
        textAlign: "center",
      }}
    />
  ),

  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: "red" }}
      text1Style={{
        fontSize: 16,
        fontFamily: Fonts.PoppinsNormal,
        // height: 50,
        flexDirection: "row",
        flexWrap: "wrap",
        textAlign: "center",
      }}
      text1NumberOfLines={2}
      text2NumberOfLines={2}
      text2Style={{
        fontSize: 16,
        fontFamily: Fonts.PoppinsNormal,
        // height: 50,
        flexDirection: "row",
        flexWrap: "wrap",
        textAlign: "center",
      }}
    />
  ),
};
