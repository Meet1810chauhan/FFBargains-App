import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useState } from "react";
import scaleFont from "./ScallingUtility";
import Fonts from "../theme/Fonts";

interface CustomeTextss {
  style?: object;
  // text: string | number | null | undefined;
  text: any;
  numberOfLines?: number;
  ellipsizeMode?: "head" | "middle" | "tail" | "clip";
  viewMoreandless?: boolean;
}

const CustomeTexts: React.FC<CustomeTextss> = ({
  style,
  text,
  numberOfLines,
  ellipsizeMode,
  viewMoreandless = false,
}) => {
  const [showButton, setShowButton] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);

  const onTextLayout = useCallback((event: any) => {
    // setShowButton(e.nativeEvent.lines.length >= 2);
    // console.log(e.nativeEvent);
    console.log("without callBack function", event.nativeEvent.lines.length);
    if (event.nativeEvent.lines.length > numberOfLines - 1) {
      setShowButton(true);
    }
  }, []);

  return (
    <View>
      <Text
        numberOfLines={lengthMore ? undefined : numberOfLines}
        ellipsizeMode={ellipsizeMode}
        style={[styles.defaultTextStyle, style]}
        onTextLayout={onTextLayout}
      >
        {text}
      </Text>
      {showButton && viewMoreandless && (
        <TouchableOpacity onPress={() => setLengthMore(!lengthMore)}>
          <Text style={styles.buttonText}>
            {lengthMore ? "View Less" : "View More"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomeTexts;

const styles = StyleSheet.create({
  defaultTextStyle: {
    fontSize: scaleFont(14),
    fontFamily: Fonts.PoppinsNormal,
    // lineHeight: 18,
  },
  buttonText: {
    color: "blue",
    fontFamily: Fonts.PoppinsNormal,
    fontSize: 14,
  },
});
