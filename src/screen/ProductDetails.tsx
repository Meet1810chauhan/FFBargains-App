import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
  ActivityIndicator,
  FlatList,
  Keyboard,
  DeviceEventEmitter,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Colors from "../theme/Colors";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import CustomeFastImage from "../component/CustomeFastImage";
import images from "../theme/Images";
import CustomeText from "../component/CustomeText";
import Fonts from "../theme/Fonts";
import scaleFont from "../component/ScallingUtility";
import CustomeTexts from "../component/CustomeTexts";
import Strings from "../theme/Strings";
import CustomTextInput from "../component/CustomeTextInput";
import CustomeButton from "../component/CustomeButton";
import ApiServices from "../services/ApiServices";
import {
  productArray,
  ProductDetail,
  productDetails,
} from "../../types/ProductState";
import CustomeActivityIndicator from "../component/ActivityIndicator";
import { useAppSelector } from "../redux/hooks";
import showCustomToast from "../component/CustomeToast";

const { width, height } = Dimensions.get("window");

const sizes = ["Smalllll", "Medium", "L", "Xl", "XXl"];
const unavailable = ["L"];
type Props = NativeStackScreenProps<RootStackParamList, "ProductDetails">;

const ProductDetails = ({ route }: Props) => {
  // const { product } = route.params;
  const { productId } = route.params;
  const navigation = useNavigation();
  const [quantites, setQuantites] = useState<any>("1");
  // const [product, setProduct] = useState<any>({});
  const [product, setProduct] = useState<ProductDetail>();
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const address = useAppSelector((state) => state.user.address);
  const userAccessToken = useAppSelector((state) => state.user.access_token);
  // const InputRef = useRef<any>(quantites);

  const goBackScreen = () => {
    navigation.goBack();
  };

  const productData = async () => {
    setLoading(true);
    console.log("address -- -  -", address);

    try {
      const response = await ApiServices({
        method: "GET",
        apilasturlname: `product/${productId}`,
      });
      // console.log();

      if (response.payload) {
        setLoading(false);
        setProduct(response.payload);
        // console.log("Response set with product : --", response.payload);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    productData();
  }, []);

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  if (!product) {
    return <CustomeActivityIndicator isVisile={loading} />;
  }

  const offers = (
    (product.amazon_price > +product.our_price
      ? ((product.amazon_price - +product.our_price) / product.amazon_price) *
        100
      : 0) || 0
  )?.toFixed(0);

  // const combinedFeatures = product.features.join("\n");
  // const displayedFeatures = showAllFeatures
  //   ? combinedFeatures
  //   : combinedFeatures.split("\n").slice(0, 4).join("\n");

  // const quantity = InputRef.current;
  // const quantity = product.quantity;

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

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: "16%" }}
      >
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          onMomentumScrollEnd={handleScroll}
          showsHorizontalScrollIndicator={false}
        >
          {product.images && product.images.length > 0 ? (
            product.images.map((item, idx) => {
              // console.log("Map Call : ");
              // console.log("address -- -  -", address)

              console.log("Quantity ----- --- - ", quantites);

              return (
                <View key={idx} style={styles.imageContainer}>
                  <CustomeFastImage
                    uriImage={item}
                    imageStyle={styles.imagestyle}
                  />
                </View>
              );
            })
          ) : (
            <View style={styles.defaulimageContainer}>
              <CustomeFastImage
                uriImage={Strings.defaultImage}
                imageStyle={styles.imagestyle}
              />
            </View>
          )}
        </ScrollView>

        <View style={styles.pagination}>
          {product.images.map((_, index: number) => (
            <View
              key={index}
              style={[
                styles.dot,
                activeIndex === index ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>
        <View style={styles.productDetailsContainer}>
          <CustomeTexts
            text={product.title}
            style={styles.productTitleTextStyle}
            numberOfLines={3}
            viewMoreandless={true}
          />
          <CustomeTexts
            text={product.description}
            style={styles.descriptionTitleTextStyle}
            numberOfLines={3}
            viewMoreandless={true}
          />
          <View style={styles.offerpriceContainer}>
            <CustomeText
              text={`$${product.our_price}`}
              style={styles.ourPriceTextStyle}
            />
            <CustomeText
              text={`$${product.amazon_price}`}
              style={styles.amazonPriceText}
            />
            <CustomeText
              text={`${offers}% off`}
              style={styles.offerTextStyle}
            />
            <TouchableOpacity style={styles.locationContainer}>
              <Image
                source={images.logoLocation}
                style={styles.locationImage}
              />
              <CustomeText text={"Location"} style={styles.locationText} />
            </TouchableOpacity>
          </View>
          <CustomeTexts
            text={Strings.productDetails}
            style={styles.productDetailText}
          />
          {product.weight && (
            <CustomeText
              text={`${Strings.productDetails}: ${product.weight}`}
              style={styles.productDetailTextDesciptionText}
            />
          )}
          {product.dimensions && (
            <CustomeText
              text={`${Strings.productDetails}: ${product.dimensions}`}
              style={styles.productDetailTextDesciptionText}
            />
          )}
          {product.brand && (
            <CustomeText
              text={`${Strings.productDetails}: ${product.brand}`}
              style={styles.productDetailTextDesciptionText}
            />
          )}
          {product.features
            .slice(0, showAllFeatures ? product.features.length : 1)
            .map((item, index: number) => (
              <View key={index}>
                <CustomeText style={styles.feature} text={`- ${item}`} />
              </View>
            ))}
          {product.features.length > 1 && (
            <TouchableOpacity
              onPress={() => setShowAllFeatures(!showAllFeatures)}
            >
              <Text style={styles.toggleText}>
                {showAllFeatures ? "View Less" : "View More"}
              </Text>
            </TouchableOpacity>
          )}

          {/* <CustomeText style={styles.feature} text={displayedFeatures} />

          {combinedFeatures.split("\n").length > 4 && (
            <TouchableOpacity
              onPress={() => setShowAllFeatures(!showAllFeatures)}
            >
              <Text style={styles.toggleText}>
                {showAllFeatures ? "View Less" : "View More"}
              </Text>
            </TouchableOpacity>
          )} */}

          {product.sizes.length > 0 && (
            <>
              <CustomeText
                text={Strings.selectSize}
                style={styles.selectSizeText}
              />
              <View style={styles.selectSizeContainer}>
                {product.sizes.map((item) => {
                  return (
                    <TouchableOpacity
                      onPress={() => setSelectedSize(item)}
                      style={[
                        styles.selectSizeInputTextConatiner,

                        selectedSize === item && styles.selectedSize,
                      ]}
                    >
                      <Text>{item}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </>
          )}
          <CustomeText text={product.status} style={styles.statusText} />

          <View style={styles.quantityContainer}>
            <CustomeText text={Strings.quantity} style={styles.quantityText} />
            <TextInput
              value={quantites}
              onChangeText={(txt) => setQuantites(txt)}
              style={styles.quantityTextStyles}
            />
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.backArrowBtnStyle} onPress={goBackScreen}>
        <Image source={images.logoBackArrow} style={styles.backArrowStyle} />
      </TouchableOpacity>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.addtoCartandBuyNowButton}
          onPress={addcartHandle}
        >
          <Image source={images.logoAddToCartWhite} />
          <CustomeText
            text={Strings.addToCart}
            style={styles.addtoCartandBuyNowButtonText}
          />
        </TouchableOpacity>
        <View style={styles.buttonBetweenSpace}></View>
        <TouchableOpacity style={styles.addtoCartandBuyNowButton}>
          <Image source={images.logoBuyNow} />

          <CustomeText
            text={Strings.buyNow}
            style={styles.addtoCartandBuyNowButtonText}
          />
        </TouchableOpacity>
        {/* <CustomeActivityIndicator isVisile={loading} />; */}
      </View>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  imageContainer: {
    // width: width,
    height: height * 0.37,
    justifyContent: "center",
    alignItems: "center",
    // height: 375,
  },
  defaulimageContainer: {
    height: height * 0.37,
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  imagestyle: {
    height: height * 0.37,
    width: width,
    resizeMode: "contain",
    // backgroundColor: "blue",
  },
  // imagestyle2: {
  //   height: "100%",
  //   width: "100%",
  //   resizeMode: "cover",
  //   backgroundColor: "blue",
  // },
  backArrowBtnStyle: {
    // padding: 8,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    backgroundColor: Colors.lightGray,
    width: 34,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 17,
    position: "absolute",
    marginTop: "4%",
    marginLeft: "4%",
  },
  backArrowStyle: {
    // resizeMode: "",
  },
  productDetailsContainer: {
    marginHorizontal: "5%",
    // marginHorizontal: 20,
  },
  productTitleTextStyle: {
    marginTop: "3%",
    fontFamily: Fonts.PoppinsMediium,
    fontSize: scaleFont(17),
    // fontSize: scaleFont(19),
    flexWrap: "wrap",
    flexDirection: "row",
  },
  descriptionTitleTextStyle: {
    fontSize: scaleFont(14),
    fontFamily: Fonts.PoppinsNormal,
    marginTop: "1%",
    // marginBottom: "4%",
    flexWrap: "wrap",
    flexDirection: "row",
    color: Colors.green,
  },
  offerpriceContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    // justifyContent: "center",
    alignItems: "center",
    marginTop: "4%",
  },
  ourPriceTextStyle: {
    fontSize: scaleFont(18),
    fontFamily: Fonts.PoppinsMediium,
    color: Colors.darkBlue,
  },
  amazonPriceText: {
    fontSize: scaleFont(18),
    color: Colors.lightGray,
    textDecorationLine: "line-through",
    fontFamily: Fonts.PoppinsNormal,
    marginLeft: "3%",
  },
  offerTextStyle: {
    fontSize: scaleFont(18),
    fontFamily: Fonts.PoppinsNormal,
    marginLeft: "2%",
    color: Colors.green,
  },
  locationContainer: {
    flexDirection: "row",
    borderWidth: 1,
    padding: 3,
    marginLeft: "4%",
    borderColor: Colors.darkBlue,
    borderRadius: 4,
  },
  locationImage: {
    width: 25,
    height: 25,
    marginLeft: 5,
    marginRight: 10,
    color: Colors.blue,
  },
  locationText: {
    color: Colors.darkBlue,
    fontFamily: Fonts.PoppinsMediium,
    fontSize: scaleFont(15),
    marginRight: 6,
  },
  productDetailText: {
    fontFamily: Fonts.PoppinsMediium,
    fontSize: scaleFont(17),
    marginTop: "3%",
  },
  productDetailTextDesciptionText: {
    fontSize: scaleFont(15),
    fontFamily: Fonts.PoppinsNormal,
    //   flexWrap: "wrap",
  },
  featuresText: {
    fontSize: scaleFont(15),
    fontFamily: Fonts.PoppinsNormal,
    color: Colors.lightGray,
    // flexWrap: "wrap",
  },
  quantityContainer: { flexDirection: "row", marginTop: "3%" },
  quantityText: {
    fontSize: scaleFont(17),
    fontFamily: Fonts.PoppinsMediium,
    color: Colors.charlestonGreen,
  },
  statusText: {
    marginTop: "3%",
    color: Colors.green,
    fontSize: scaleFont(17),
    fontFamily: Fonts.PoppinsMediium,
  },
  buttonsContainer: {
    flexDirection: "row",
    // width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
  },
  buttonBetweenSpace: {
    width: 2,
    backgroundColor: "white",
  },
  addtoCartandBuyNowButton: {
    width: width * 0.499,
    height: width * 0.125,
    backgroundColor: Colors.darkBlue,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  addtoCartandBuyNowButtonText: {
    marginLeft: "5%",
    color: Colors.white,
    fontFamily: Fonts.PoppinsMediium,
    fontSize: scaleFont(16),
  },
  quantityTextStyles: {
    borderWidth: 1,
    height: 28,
    width: 28,
    borderRadius: 5,
    marginLeft: "3%",
    textAlign: "center",
  },
  selectSizeContainer: {
    flexDirection: "row",
    marginTop: "3%",
    flexWrap: "wrap",
  },
  selectSizeInputTextConatiner: {
    width: 26,
    height: 26,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: "2%",
    borderRadius: 5,
    flexWrap: "wrap",
  },
  selectSizeText: {
    fontSize: scaleFont(16),
    fontFamily: Fonts.PoppinsMediium,
    marginTop: "3%",
    flexWrap: "wrap",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: Colors.blue,
  },
  inactiveDot: {
    backgroundColor: Colors.lightGray,
  },
  feature: {
    fontSize: 14,
    color: Colors.lightGray,
    marginBottom: 4,
  },
  toggleText: {
    fontSize: 14,
    color: Colors.blue,
    marginTop: 4,
    textDecorationLine: "underline",
  },
  unavailableText: {
    // textDecorationLine: "line-through",
    width: 30,
    borderBottomWidth: 1,
    transform: [{ rotate: "-45deg" }],
    position: "absolute",
    top: 0,
    right: -6,
    bottom: 6,
  },
  selectedSize: {
    backgroundColor: Colors.brigtGray,
  },

  // });
});
