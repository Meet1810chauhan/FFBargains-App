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
import { CartProState } from "../../types/CartProduct";
import { ProductDetail } from "../../types/ProductState";
import { OrderData, OrderProductDetails } from "../../types/OrderHistory";

const { width, height } = Dimensions.get("window");

interface CartProductLists {
  index?: number;
  product: OrderProductDetails;

  // product: CartProductData;
  //   product: CartProState;
}

type NavigationProps = StackNavigationProp<RootStackParamList, "Cart">;
type EditprofileNavProps = StackNavigationProp<
  RootStackParamList,
  "ProductDetails"
>;

const OrderDetailsItem: React.FC<CartProductLists> = ({ index, product }) => {
  // const [quantites, setQuantites] = useState("1");
  const [quantites, setQuantites] = useState<number>(product.quantity);
  const [size, setSize] = useState("M");
  const navigation = useNavigation<NavigationProps>();

  if (!product) {
    return;
  }
  //   console.log("Product Title Issues --- ", product.quantity);

  return (
    <TouchableOpacity
      style={styles.orderProductDetailsContainer}
      // onPress={cartProductItemHandle}
    >
      <View style={styles.productimageAndDetailContainer}>
        <View style={styles.imageStyleContainer}>
          {/* <Image source={images.logoTady} style={styles.imageStyle} /> */}
          <CustomeFastImage
            uriImage={product.product.main_image}
            imageStyle={styles.imageStyle}
            defaultImagestyle={styles.defaultimageStyle}
            loader={false}
          />
        </View>
        <TouchableOpacity></TouchableOpacity>
        <View style={styles.detailTextContainer}>
          <TouchableOpacity
            style={[
              styles.statusOrderButton,
              {
                backgroundColor:
                  product?.status === "pending"
                    ? Colors.blue
                    : product?.status === "confirmed" ||
                      product?.status === "approved"
                    ? Colors.green
                    : Colors.red,
              },
            ]}
          >
            <CustomeText
              //  {item.shipment_status ||
              //   (item?.status == 'rejected' ? 'Unavailable' : item.status)}
              text={
                product?.status == "rejected" ? "Unavailable" : product?.status
              }
              style={styles.stausText}
              numberOfLines={1}
            />
          </TouchableOpacity>
          <CustomeText
            text={product.product.title}
            // text={product.
            //   "Ouddy Decor Valentine's Day Wreath, 20 Inch Artificial Red Pink White Heart Berry Valentines Day Wreaths for Front Door Anniversary Wedding Home Indoor Outdoor Valentines Day Decorations"
            // }
            style={styles.productTitle}
            numberOfLines={1}
            ellipsizeMode="tail"
          />
          <CustomeText
            text={product.product.description}
            // text={"Visit the visit store"}
            style={styles.descriptionText}
            numberOfLines={1}
            ellipsizeMode="tail"
          />
          <View style={styles.colorSizeQuantityContainer}>
            <View>
              <CustomeText text={"Qty"} style={styles.colorSizeQuantityText} />

              <TextInput
                value={quantites.toString()}
                // value={quantites}

                style={styles.quantityTextStyles}
                editable={false}
              />
            </View>
          </View>

          <View style={styles.offerpriceContainer}>
            <CustomeText
              text={`$${product.product.our_price}`}
              // text={"$20.222"}
              style={styles.ourPriceTextStyle}
            />
            <CustomeText
              text={`$${product.product.amazon_price}`}
              // text={"$20.222"}
              style={styles.amazonPriceText}
            />
          </View>
        </View>
      </View>

      <View style={styles.statusAndRemoveButtonContainer}>
        <CustomeText
          text={product.reason_of_rejection}
          style={[
            styles.instockOroutofstock,
            {
              color: product.reason_of_rejection && Colors.red,
            },
          ]}
        />

        {product.refunded_amount > 0 && (
          <View style={styles.refundedAmountContainer}>
            <CustomeText text="Refunded:" style={styles.refundedText} />
            <CustomeText
              text={`$${product.refunded_amount}`}
              style={styles.refundedAmountPositive}
            />
          </View>
        )}
        {/* <CustomeText
          text={
            product.refunded_amount > 0 &&
            `Refunded:$${product.refunded_amount}`
          }
          style={styles.refundedText}
        /> */}
      </View>
    </TouchableOpacity>
  );
};

export default OrderDetailsItem;

const styles = StyleSheet.create({
  orderProductDetailsContainer: {
    width: width * 0.91,
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
    flexDirection: "row",
    borderRadius: 8,
  },
  imageStyle: {
    width: width * 0.301,
    height: width * 0.34,
    resizeMode: "contain",
  },
  imageStyleContainer: {
    // padding: 10,
    width: width * 0.301,
    height: width * 0.34,
    resizeMode: "contain",
    borderTopLeftRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
  },
  defaultimageStyle: { marginRight: "30%", bottom: 3 },
  detailTextContainer: {
    marginLeft: "3%",
    // backgroundColor: "red",
    flex: 1,
  },
  productTitle: {
    // fontSize: scaleFont(14),
    fontSize: 15,
    fontFamily: Fonts.PoppinsMediium,
    // marginTop: "2%",
    // maxWidth: "80%",
    // backgroundColor: "red",
    marginRight: 15,
  },
  descriptionText: {
    marginTop: "1%",
    fontSize: 13,
    fontFamily: Fonts.PoppinsNormal,
    color: Colors.charlestonGreen,
    marginRight: 10,
    // maxWidth: "80%",
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
    height: 20,
    alignItems: "center",

    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  statusOrderButton: {
    // position: "absolute",
    backgroundColor: Colors.blue,
    // borderWidth: 1,
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    // marginRight: "14%",
    paddingHorizontal: 10,
    // borderRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    right: 0,
    paddingVertical: 2,
  },
  stausText: {
    fontSize: 12,
    color: Colors.white,
    fontFamily: Fonts.PoppinsMediium,
  },
  instockOroutofstock: {
    fontSize: scaleFont(12),
    // lineHeight: 18,
    fontFamily: Fonts.PoppinsMediium,
  },
  refundedAmountContainer: {
    flexDirection: "row",
  },
  refundedText: {
    fontSize: scaleFont(12),
    fontFamily: Fonts.PoppinsMediium,
    color: Colors.green,
  },
  refundedAmountPositive: {
    color: Colors.black,
    fontSize: scaleFont(12),
    fontFamily: Fonts.PoppinsMediium,
    marginLeft: 2,
  },
});
