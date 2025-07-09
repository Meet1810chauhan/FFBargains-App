import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Dimensions } from "react-native";
import scaleFont from "./ScallingUtility";
import Fonts from "../theme/Fonts";
import images from "../theme/Images";
import Colors from "../theme/Colors";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const { width, height } = Dimensions.get("window");

interface CustomeCardComponents {
  image: object;
  headerText: string;
  descriptionText: string;
  price: number;
  priceSell: number;
  offer?: number;
  // count: number;
}

const CustomeCardComponent: React.FC<CustomeCardComponents> = ({
  image,
  headerText,
  descriptionText,
  price,
  priceSell,
  offer,
}) => {
  return (
    <TouchableOpacity style={styles.container}>
      {/* <View style={styles.container}> */}
      <View style={styles.imagecontainer}>
        <Image style={styles.imageStyle} source={image} />
      </View>

      <Text style={styles.headerText}> {headerText}</Text>
      <Text style={styles.descriptionTextStyle}>{descriptionText}</Text>

      <View style={styles.priceContainer}>
        <Text style={styles.pricesell}>${priceSell}</Text>
        <Text style={styles.price}>${price}</Text>
      </View>

      <View style={styles.offerContainer}>
        <Text style={styles.offerStyle}> {offer}% off</Text>
        <TouchableOpacity style={styles.cartStyleLogo}>
          <Text style={styles.numberPageText}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cartStyleLogoCart}>
          <Image source={images.logo7} />
        </TouchableOpacity>
      </View>
      {/* </View> */}
    </TouchableOpacity>
  );
};

export default CustomeCardComponent;

const styles = StyleSheet.create({
  container: {
    width: width * 0.44,
    borderWidth: 1,
    borderColor: Colors.white,
    // borderColor: "black",
    backgroundColor: Colors.white,
    // backgroundColor: "red",
    borderRadius: 5,

    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {
      height: 2,
      width: 1,
    },
    elevation: 3,
    // marginLeft: 17,
    // marginTop: "2%",
    marginBottom: "2%",
  },

  imagecontainer: {
    // backgroundColor: "blue",
    width: width * 0.43,
    height: width * 0.43,

    // height: 165,
  },
  imageStyle: {
    // height: 165,
    width: width * 0.43,
    height: width * 0.43,
    resizeMode: "contain",
    borderRadius: 5,
  },
  headerText: {
    fontSize: scaleFont(14),
    marginTop: "3%",
    fontFamily: Fonts.PoppinsMediium,
    marginLeft: "3%",
  },
  descriptionTextStyle: {
    fontSize: scaleFont(12),
    marginTop: "1.2%",
    marginLeft: "5%",
    fontFamily: Fonts.PoppinsLight,
  },
  priceContainer: {
    flexDirection: "row",
    marginTop: "1.2%",
  },
  pricesell: {
    color: "#1A117A",
    fontFamily: Fonts.PoppinsSemiBold,
    marginLeft: "5%",
    fontSize: scaleFont(14),
  },
  price: {
    fontSize: scaleFont(12),
    marginLeft: "3%",
    marginTop: "2%",
    color: "#9E9E9ECC",
    textDecorationLine: "line-through",
  },
  offerContainer: {
    flexDirection: "row",
    marginTop: "2%",
    marginBottom: "4%",
    width: "100%",
    // backgroundColor: "#0c0a0a",
  },
  offerStyle: {
    color: "#009C5A",
    fontSize: scaleFont(16),
    fontFamily: Fonts.PoppinsSemiBold,
    marginLeft: 5,
  },
  cartStyleLogo: {
    width: 24,
    height: 24,

    borderWidth: 0.6,
    borderColor: "#DDDDDD",
    borderRadius: 3,
    marginLeft: "20%",

    // shadowOffset: {
    //   height: 3,
    //   width: 1,
    // },
    // marginTop: '3%',
  },
  numberPageText: {
    textAlign: "center",
    marginTop: "22%",
    color: Colors.black,
    fontSize: scaleFont(12),
  },
  cartStyleLogoCart: {
    marginLeft: 2,
    // marginTop: '2%',
    // marginRight: 26,
    width: 24,
    height: 24,
    // backgroundColor: 'red',
    // borderWidth: 0.6,
    borderColor: Colors.black + "1A",
    borderRadius: 3,
    // marginEnd: 20,
  },
});
