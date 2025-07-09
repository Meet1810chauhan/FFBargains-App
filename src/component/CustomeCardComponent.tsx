import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  DeviceEventEmitter,
} from "react-native";
import React, { useState } from "react";
import { Dimensions } from "react-native";
import scaleFont from "./ScallingUtility";
import Fonts from "../theme/Fonts";
import images from "../theme/Images";
import Colors from "../theme/Colors";
import FastImage from "react-native-fast-image";
import CustomeFastImage from "./CustomeFastImage";
import { productDetails } from "../../types/ProductState";

// import { TextInput } from "react-native-gesture-handler";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";
import showCustomToast from "./CustomeToast";
import ApiServices from "../services/ApiServices";
import { useAppSelector } from "../redux/hooks";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const { width, height } = Dimensions.get("window");
type NavigationProps = StackNavigationProp<
  RootStackParamList,
  "ProductDetails"
>;

// interface CustomeCardComponents {
//   image: string;
//   headerText: string;
//   descriptionText: string;
//   price: number;
//   priceSell: number;
//   offer?: number | string;
//   // count: number;
// }
interface CustomeCardComponentse {
  index?: number;
  product: productDetails;
  // count: number;
}
const CustomeCardComponent: React.FC<CustomeCardComponentse> = ({
  // image,
  // headerText,
  // descriptionText,
  // price,
  // priceSell,
  // offer,

  index,
  product,
}) => {
  const [isLoading, setLoading] = useState(true);
  const navigation = useNavigation<NavigationProps>();
  const [quantites, setQuantites] = useState<any>("1");
  // const [product, setProduct] = useState<any>({});

  const userAccessToken = useAppSelector((state) => state.user.access_token);

  // function toggleImageUrl() {
  //   setImageUri("https://cdn-icons-png.flaticon.com/128/4131/4131708.png");
  // }
  const addcartHandle = async () => {
    // InputRef.current =quantites;
    // console.log("Add To cart ----- ", quantites);

    // console.log("Cart in UserAccessToken", userAccessToken);

    if (product.quantity == 0) {
      // ShowErrorToast('Product is out of stock');
      showCustomToast({
        type: "error",
        text1: "Product is out of stock",
      });
      return;
    } else if (+quantites <= 0 || !parseFloat(quantites)) {
      // ShowErrorToast('Please enter valid quantity');
      showCustomToast({
        type: "error",
        text1: "Please enter valid quantity",
      });
      return;
    } else if (quantites > product?.quantity) {
      // ShowErrorToast("Maximum " + data?.quantity + "quantity can be added");
      showCustomToast({
        type: "error",
        text1: "Maximum " + product?.quantity + " quantity can be added",
      });
      return;
    }

    try {
      // AppLoader.start();
      setLoading(true);

      const response = await ApiServices({
        apilasturlname: "user/cart",
        access_token: userAccessToken,
        bodyRequest: {
          inventory_id: product.id,
          quantity: quantites,
        },
      });

      if (response.result) {
        // ShowSuccessToast('Added to Cart');
        console.log("add Cart Response ---- ", response);

        showCustomToast({
          type: "success",
          text1: "Added to Cart",
        });
        DeviceEventEmitter.emit("RefreshCartDetails");
      } else {
        // ShowErrorToast(response.message);

        showCustomToast({
          type: "error",
          text1: response.message,
        });
      }
    } catch (error) {
      console.log("error in cartApi", error);
    } finally {
      setLoading(false);
    }
  };

  const offer = (
    (product.amazon_price > +product.our_price
      ? ((product?.amazon_price - +product?.our_price) /
          product?.amazon_price) *
        100
      : 0) || 0
  )?.toFixed(0);

  const productDesNavigateFunction = () => {
    navigation.navigate("ProductDetails", {
      productId: product.id,
    });
    console.log("Product Id -- ", product.main_image);
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={productDesNavigateFunction}
    >
      {/* <View style={styles.container}> */}
      <View style={styles.imagecontainer}>
        <CustomeFastImage uriImage={product.main_image} />
      </View>

      <Text style={styles.headerText} numberOfLines={1} ellipsizeMode="tail">
        {product.title}
      </Text>
      <Text
        style={styles.descriptionTextStyle}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {product.description}
      </Text>

      <View style={styles.priceContainer}>
        <Text style={styles.pricesell} numberOfLines={1} ellipsizeMode="tail">
          ${product.our_price}
        </Text>
        <Text style={styles.price}>${product.amazon_price}</Text>
      </View>

      <View style={styles.offerContainer}>
        {/* <Text style={styles.offerStyle}> {product.make_an_offer}% off</Text> */}
        <Text style={styles.offerStyle}> {offer}% off</Text>
        <View style={styles.cartButtonContainerStyle}>
          <TouchableOpacity style={styles.cartStyleLogo}>
            <Text style={styles.numberPageText}>1</Text>
          </TouchableOpacity>
          {/* <TextInput style={styles.cartStyleLogo}>
            <Text style={styles.numberPageText}>1</Text>
          </TextInput> */}
          <TouchableOpacity
            style={styles.cartStyleLogoCart}
            onPress={addcartHandle}
          >
            <Image source={images.logo7} />
          </TouchableOpacity>
        </View>
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
    marginTop: "5%",
    fontFamily: Fonts.PoppinsMediium,
    marginLeft: "4%",
    width: "95%",
  },
  descriptionTextStyle: {
    fontSize: scaleFont(12),
    marginTop: "1.2%",
    marginLeft: "5%",
    fontFamily: Fonts.PoppinsLight,
    width: "90%",
  },
  priceContainer: {
    flexDirection: "row",
    marginTop: "1.2%",
  },
  pricesell: {
    color: Colors.darkBlue,
    fontFamily: Fonts.PoppinsSemiBold,
    marginLeft: "5%",
    fontSize: scaleFont(14),
  },
  price: {
    fontSize: scaleFont(12),
    marginLeft: "3%",
    marginTop: "2%",
    color: Colors.lightGray,
    textDecorationLine: "line-through",
  },
  offerContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: "2%",
    marginBottom: "4%",
    maxWidth: "100%",
    justifyContent: "space-between",
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
    // marginLeft: "25%",
    // alignSelf:

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
    marginLeft: 5,
    // marginTop: '2%',
    marginRight: 15,
    width: 24,
    height: 24,
    // backgroundColor: 'red',
    // borderWidth: 0.6,
    borderColor: Colors.black + "1A",
    borderRadius: 3,
    // marginEnd: 20,
  },
  defaultimageStyle: {
    height: 50,
    width: 50,
    // alignItems: "center",
    // justifyContent: "center",
    marginTop: "40%",
    marginLeft: "35%",
  },
  loaderStyle: {
    marginBottom: "60%",
  },
  cartButtonContainerStyle: {
    flexDirection: "row",
  },
});
