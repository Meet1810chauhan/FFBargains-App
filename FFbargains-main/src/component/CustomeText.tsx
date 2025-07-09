import { StyleSheet, Text, View } from "react-native";
import React from "react";
import scaleFont from "./ScallingUtility";
import Fonts from "../theme/Fonts";

interface CustomeTexts {
  style?: object;
  text: string;
  numberOfLines?: number;
  ellipsizeMode?: "head" | "middle" | "tail" | "clip";
}

const CustomeText: React.FC<CustomeTexts> = ({
  style,
  text,
  numberOfLines,
  ellipsizeMode,
}) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      style={[styles.defaultTextStyle, style]}
    >
      {text}
    </Text>
  );
};

export default CustomeText;

const styles = StyleSheet.create({
  defaultTextStyle: {
    fontSize: scaleFont(14),
    fontFamily: Fonts.PoppinsNormal,
    // lineHeight: 18,
  },
});
