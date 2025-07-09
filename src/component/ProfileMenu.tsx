import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Colors from "../theme/Colors";
import CustomeText from "./CustomeText";
import images from "../theme/Images";
import Fonts from "../theme/Fonts";
import scaleFont from "./ScallingUtility";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";
const { width, height } = Dimensions.get("window");
type NavigationProps = StackNavigationProp<RootStackParamList, "Profile">;

interface CustomeProfileMenu {
  menuItemName: string;
  menuItemScreenImage?: object;
  style?: object;
  onPressMenu?: (() => void) | null;
  onPressnav?: string;
}
const ProfileMenu: React.FC<CustomeProfileMenu> = ({
  menuItemName,
  menuItemScreenImage,
  style,
  onPressMenu,
  onPressnav,
}) => {
  const navigation = useNavigation<NavigationProps>();

  const handlefunc = () => {
    if (onPressMenu) {
      onPressMenu();
    }
    // if (onPressnav) {
    //   navigation.navigate(onPressnav,{})
    // }
  };
  return (
    <TouchableOpacity
      style={[styles.profilemenuContainer, style]}
      onPress={handlefunc}
    >
      <CustomeText text={menuItemName} style={styles.menuTextStyle} />
      {/* <Image source={images.logobackButton} style={styles} /> */}
      <TouchableOpacity onPress={handlefunc}>
        {/* {menuItemScreenImage ? (
          <Image source={menuItemScreenImage} />
        ) : (
          <Image source={images.logoProfileArrow} />
        )} */}
        <Image source={images.logoProfileArrow} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ProfileMenu;

const styles = StyleSheet.create({
  //   container: {
  //     backgroundColor: Colors.white,
  //   },
  profilemenuContainer: {
    backgroundColor: Colors.white,
    width: width,
    // height: height * 0.055,
    height: 48,
    // backgroundColor: "red",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: "4%",
    borderBottomWidth: 1,
    borderBlockColor: "#F1F1F1",
  },
  menuTextStyle: {
    fontFamily: Fonts.PoppinsNormal,
    fontSize: scaleFont(16),
  },
});
