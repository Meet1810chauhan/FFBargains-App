import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import scaleFont from "./ScallingUtility";
import Fonts from "../theme/Fonts";

interface CustomeTexts {
  style?: object;
  text: string | number | null | undefined;
  numberOfLines?: number;
  ellipsizeMode?: "head" | "middle" | "tail" | "clip";
  moreTextHide?: boolean;
}

const CustomeText: React.FC<CustomeTexts> = ({
  style,
  text,
  numberOfLines,
  ellipsizeMode,
  moreTextHide,
}) => {
  // const [showButton, setShowButton] = useState(true);
  const [lengthMore, setLengthMore] = useState(false);
  return (
    <Text
      numberOfLines={lengthMore ? undefined : numberOfLines}
      ellipsizeMode={ellipsizeMode}
      style={[styles.defaultTextStyle, style]}
    >
      {text}

      {/* {showButton && (
        <TouchableOpacity onPress={() => setLengthMore(!lengthMore)}>
          <Text>{lengthMore ? "View Less" : "View More"}</Text>
        </TouchableOpacity>
      )} */}
    </Text>

    // {showButton && (
    //   <TouchableOpacity onPress={() => setLengthMore(!lengthMore)}>
    //     <Text>{lengthMore ? "View Less" : "View More"}</Text>
    //   </TouchableOpacity>
    // )}
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
