import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomeText from "./CustomeText";
import Fonts from "../theme/Fonts";
import scaleFont from "./ScallingUtility";
import Colors from "../theme/Colors";
import { PriceDetailNames } from "../../types/ProductState";
// import { Colors } from "react-native/Libraries/NewAppScreen";

const PriceDetailName: React.FC<PriceDetailNames> = ({
  title,
  price,
  titleStyle,
  priceStyle,
}) => {
  return (
    <View style={styles.pricelistTextandPrice}>
      <CustomeText
        text={title}
        numberOfLines={1}
        ellipsizeMode="tail"
        style={[styles.pricelistText, titleStyle]}
      />
      <CustomeText
        text={`${price}`}
        style={[styles.pricelistText, priceStyle]}
      />
    </View>
  );
};

export default PriceDetailName;

const styles = StyleSheet.create({
  pricelistTextandPrice: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: "2%",
  },
  pricelistText: {
    fontFamily: Fonts.PoppinsNormal,
    fontSize: scaleFont(14),
    color: Colors.charlestonGreen,
    // marginTop: "2%",
  },
});
