import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import scaleFont from "./ScallingUtility";
import Fonts from "../theme/Fonts";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import images from "../theme/Images";

interface CustomeHeaders {
  title: string;
  leftSideButtonImage?: any;
  navigation?: NavigationProp<any>;
  showBackButton?: boolean;
  showRightButton?: boolean;
  rightSideButtonImageSource?: object;
}

const CustomeHeader: React.FC<CustomeHeaders> = ({
  title,
  leftSideButtonImage,
  navigation,
  showBackButton = false,
  showRightButton = false,
  rightSideButtonImageSource,
}) => {
  const nav = useNavigation(); // Use navigation directly

  return (
    <View style={styles.container}>
      {showBackButton ? (
        <TouchableOpacity
          onPress={() => nav.goBack()}
          style={styles.backButton}
        >
          {leftSideButtonImage ? (
            <Image source={leftSideButtonImage} style={styles.iconImage} />
          ) : (
            <Image source={images.logobackButton} style={styles.iconImage} />
          )}
        </TouchableOpacity>
      ) : null}

      <Text style={styles.headerTitle}>{title}</Text>
      {showRightButton ? (
        <TouchableOpacity
          // onPress={() => nav.goBack()}
          style={showBackButton ? styles.rightBtn : styles.rightBtnwithLeftBtn}
        >
          {rightSideButtonImageSource ? (
            <Image
              source={rightSideButtonImageSource}
              style={styles.iconImage}
            />
          ) : (
            <Image source={images.logoSetting} style={styles.iconImage} />
          )}
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default CustomeHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "red",
    height: 50,
    width: "100%",

    borderBottomWidth: 1,
    paddingLeft: "4%",
    // marginBottom: 20,
  },
  headerTitle: {
    fontSize: scaleFont(19),
    fontFamily: Fonts.PoppinsMediium,
    // textAlign: "left",
    // marginLeft: "4%",
  },

  backButton: {
    paddingRight: "3%",
  },
  iconImage: {
    width: 20,
    height: 20,
  },
  rightBtn: {
    // position: "absolute",
    paddingLeft: "66.5%",
  },
  rightBtnwithLeftBtn: {
    paddingLeft: "75%",
  },
});
