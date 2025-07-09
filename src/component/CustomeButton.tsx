import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Colors from "../theme/Colors";
import Fonts from "../theme/Fonts";
import scaleFont from "./ScallingUtility";

interface CustonBtn {
  style?: object;
  buttonTextStyle?: object;
  name: string;
  onPress?: () => void;
}

const CustomeButton: React.FC<CustonBtn> = ({
  style,
  name,
  onPress,
  buttonTextStyle,
}) => {
  const handlePress = () => {
    if (onPress) {
      onPress(); // Call the function jyare aapde pass karvi tyare
    }
  };
  return (
    <View style={[styles.container]}>
      <TouchableOpacity
        style={[styles.touchable, style]}
        onPress={() => {
          handlePress();
        }}
      >
        <Text style={[styles.touchableOpacityText, buttonTextStyle]}>
          {name}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomeButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    // marginBottom: 20,
    // backgroundColor: 'red',
  },
  touchable: {
    backgroundColor: "#1A117A",

    borderWidth: 1,
    width: "85%",
    height: 53,
    borderRadius: 23,
    justifyContent: "center",
    alignItems: "center",
  },

  touchableOpacityText: {
    color: Colors.white,
    fontSize: scaleFont(20),
    // fontWeight: 'bold',
    fontFamily: Fonts.PoppinsBold,
  },
});
