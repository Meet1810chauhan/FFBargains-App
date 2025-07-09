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

import images from "../theme/Images";
import Strings from "../theme/Strings";
import CustomeText from "../component/CustomeText";
import scaleFont from "../component/ScallingUtility";
import Fonts from "../theme/Fonts";
import { ShippingAndRecivers } from "../../types/ProductState";
const { width, height } = Dimensions.get("window");

const ShippingAndReciver: React.FC<ShippingAndRecivers> = ({
  name,
  imageButton,
  selectOption,
  onSelect,
}) => {
  return (
    <TouchableOpacity
      //   onPress={() => console.log(" Call meeeee 892========")}
      onPress={onSelect}
      style={[
        styles.pickupButtonContainer,
        {
          borderColor:
            selectOption === name ? Colors.darkBlue : Colors.lightGray,
        },
      ]}
    >
      <Image
        source={imageButton}
        style={[
          styles.buttonLogo,
          {
            tintColor:
              selectOption === name ? Colors.darkBlue : Colors.lightGray,
          },
        ]}
      />
      <Text
        style={[
          styles.pickupAndDeliveryText,
          {
            color: selectOption === name ? Colors.darkBlue : Colors.lightGray,
          },
        ]}
      >
        {name}
      </Text>

      {selectOption === name ? (
        <Image source={images.logocheck} style={styles.selectButton} />
      ) : null}
    </TouchableOpacity>

    /* <TouchableOpacity
        onPress={() => setSelectOption("Delivery")}
        style={[
          styles.pickupButtonContainer,
          {
            borderColor:
              selectOption === "Delivery" ? Colors.darkBlue : Colors.lightGray,
          },
        ]}
      >
        <Image
          source={images.logoDelivery}
          style={[
            styles.buttonLogo,
            {
              tintColor:
                selectOption === "Delivery"
                  ? Colors.darkBlue
                  : Colors.lightGray,
            },
          ]}
        />
        <Text
          style={[
            styles.pickupAndDeliveryText,
            {
              color:
                selectOption === "Delivery"
                  ? Colors.darkBlue
                  : Colors.lightGray,
            },
          ]}
        >
          {Strings.delivery}
        </Text>
        {selectOption === "Delivery" ? (
          <Image source={images.logocheck} style={styles.selectButton} />
        ) : null}
      </TouchableOpacity> */
  );
};

export default ShippingAndReciver;

const styles = StyleSheet.create({
  pickupAndDeliveryButtonContaner: {
    // marginTop: "4%",
    // marginHorizontal: "5%",
    // flexDirection: "row",
    // justifyContent: "space-between",
  },
  pickupButtonContainer: {
    // width: 160,
    height: 62,
    width: width * 0.425,
    // height: height * 0.08,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
  },
  pickupAndDeliveryText: { textAlign: "center", color: Colors.lightGray },
  buttonLogo: {
    alignSelf: "center",
  },
  selectButton: {
    position: "absolute",
    top: 4,
    right: 5,
  },
  pickupSelectLoactionContainer: {
    marginTop: "3%",
    marginHorizontal: "5%",
  },
  selectLocationText: {
    fontSize: scaleFont(14),
    fontFamily: Fonts.PoppinsMediium,
  },
});
