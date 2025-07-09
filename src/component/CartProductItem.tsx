import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

import Colors from "../theme/Colors";
import CustomeText from "./CustomeText";
import scaleFont from "./ScallingUtility";
import Fonts from "../theme/Fonts";
import images from "../theme/Images";
import Strings from "../theme/Strings";
import Product from "../screen/Product";
import FastImage from "react-native-fast-image";
import CustomeFastImage from "./CustomeFastImage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";
import { CartProState, DeliveryShippingState } from "../../types/CartProduct";

const { width, height } = Dimensions.get("window");

interface CartProductLists {
  index?: number;
  // product?: ProductDetail;
  // product: CartProductData;
  product: CartProState;
  shipmentCharge?: DeliveryShippingState;
}

type NavigationProps = StackNavigationProp<RootStackParamList, "Cart">;
type EditprofileNavProps = StackNavigationProp<
  RootStackParamList,
  "ProductDetails"
>;

const CartProductItem: React.FC<CartProductLists> = ({
  index,
  product,
  shipmentCharge,
}) => {
  // const [quantites, setQuantites] = useState(product.quantity);
  const [quantites, setQuantites] = useState<number>(product.quantity);
  const [size, setSize] = useState("M");
  const navigation = useNavigation<NavigationProps>();

  // console.log("HSipment Charge --- ", shipmentCharge?.shipments.rate);
  if (!product && product) {
    return;
  }
  // const cartProductItemHandle = () => {
  //   navigation.navigate("ProductDetails", {
  //     productId: product.product.id,
  //   });
  // };
  // console.log("Product Title Issues --- ", product.quantity);

  return (
    <TouchableOpacity
      style={styles.addcartProductDetailsContainer}
      // onPress={cartProductItemHandle}
    >
      <View style={styles.productimageAndDetailContainer}>
        <View style={styles.imageStyleContainer}>
          {/* <Image source={images.logoTady} style={styles.imageStyle} /> */}
          <CustomeFastImage
            uriImage={product.product.main_image}
            imageStyle={styles.imageStyle}
          />
        </View>
        <View style={styles.detailTextContainer}>
          <CustomeText
            text={product.product.title}
            // text={
            //   "Ouddy Decor Valentine's Day Wreath, 20 Inch Artificial Red Pink White Heart Berry Valentines Day Wreaths for Front Door Anniversary Wedding Home Indoor Outdoor Valentines Day Decorations"
            // }
            style={styles.productTitle}
            numberOfLines={1}
            ellipsizeMode="tail"
          />
          <CustomeText
            text={product.product.description}
            // text={"ausydgvahsd asjdh"}
            style={styles.descriptionText}
            numberOfLines={1}
            ellipsizeMode="tail"
          />
          <View style={styles.colorSizeQuantityContainer}>
            <View>
              <CustomeText text={"Qty"} style={styles.colorSizeQuantityText} />

              <TextInput
                value={quantites.toString()}
                keyboardType="numeric"
                onChangeText={(txt) => setQuantites(Number(txt) || 0)}
                style={styles.quantityTextStyles}
                // editable={true}
              />
            </View>
          </View>

          <View style={styles.offerpriceContainer}>
            <CustomeText
              text={`$${product.product.our_price}`}
              // text={'$20.222'}
              style={styles.ourPriceTextStyle}
            />
            <CustomeText
              text={`$${product.product.amazon_price}`}
              style={styles.amazonPriceText}
            />
          </View>
        </View>
      </View>

      <View style={styles.statusAndRemoveButtonContainer}>
        <CustomeText
          // text={`Shipment Charge: $${product.rate}`}
          text={`${
            product.rate > 0 ? `Shipment Charge: $${product.rate}` : ""
          }`}
          style={styles.statusText}
          numberOfLines={1}
          ellipsizeMode="tail"
        />

        <TouchableOpacity style={styles.removeButton}>
          <Text style={styles.removeText}>{Strings.remove}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default CartProductItem;

const styles = StyleSheet.create({
  addcartProductDetailsContainer: {
    width: width * 0.91,
    // height: height * 0.19,
    // height: 157,
    // marginHorizontal: "5%",
    // backgroundColor: "blue",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: Colors.white,
    backgroundColor: Colors.white,
    borderRadius: 8,
    shadowColor: Colors.black,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      height: 2,
      width: 1,
    },
    elevation: 4,
  },
  productimageAndDetailContainer: {
    // width: "100%",
    // height: 122,s
    // backgroundColor: "red",
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
    flexDirection: "row",
    borderRadius: 8,
    // flexWrap: "wrap",
  },
  imageStyle: {
    width: width * 0.29,
    height: width * 0.29,
    resizeMode: "contain",
  },
  imageStyleContainer: {
    // padding: 10,
    width: width * 0.301,
    height: width * 0.3,
    resizeMode: "contain",
    borderTopLeftRadius: 8,
  },
  detailTextContainer: {
    marginHorizontal: "3%",
  },
  productTitle: {
    // fontSize: scaleFont(14),
    fontSize: 14,
    fontFamily: Fonts.PoppinsMediium,
    marginTop: "2%",
    maxWidth: "80%",
    // backgroundColor: "red",
  },
  descriptionText: {
    marginTop: "1%",
    fontSize: 12,
    fontFamily: Fonts.PoppinsNormal,
    color: Colors.charlestonGreen,
    maxWidth: "80%",
  },
  colorSizeQuantityContainer: {
    flexDirection: "row",
    marginTop: "1%",
    gap: 10,
    flexWrap: "wrap",
    maxWidth: "80%",
  },
  colorSizeQuantityText: {
    fontSize: 12,
    fontFamily: Fonts.PoppinsNormal,
    lineHeight: 18,
  },
  colorCircleContainer: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    // padding: 2,
    justifyContent: "center",
    alignSelf: "center",
  },
  circleButton: {
    width: 13,
    height: 13,
    borderRadius: 13 / 2,
    backgroundColor: "#B38561",
    alignSelf: "center",
  },
  quantityTextStyles: {
    borderWidth: 1,
    height: 20,
    width: 20,
    borderRadius: 5,
    marginLeft: "3%",
    textAlign: "center",
    fontSize: 10,
    fontFamily: Fonts.PoppinsNormal,
  },
  offerpriceContainer: {
    flexDirection: "row",
    // flexWrap: "wrap",
    // justifyContent: "center",
    alignItems: "center",
    marginTop: "2%",
  },
  ourPriceTextStyle: {
    fontSize: 16,
    fontFamily: Fonts.PoppinsMediium,
    color: Colors.darkBlue,
  },
  amazonPriceText: {
    fontSize: 14,
    color: Colors.lightGray,
    textDecorationLine: "line-through",
    fontFamily: Fonts.PoppinsNormal,
    marginLeft: "3%",
  },
  statusAndRemoveButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // height: 34,
    alignItems: "center",
    // backgroundColor: "blue",
    marginHorizontal: 8,
    paddingVertical: "1.5%",
  },
  statusText: {
    fontSize: scaleFont(12),
    fontFamily: Fonts.PoppinsNormal,
    color: Colors.green,
    width: "80%",
    // backgroundColor: "red",
  },
  removeButton: {
    height: 24,
    width: 70,
    borderWidth: 1,
    backgroundColor: Colors.darkBlue,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  removeText: {
    color: Colors.white,
    fontFamily: Fonts.PoppinsMediium,
    fontSize: 12,
    // alignSelf: "center",
  },
});
