import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import images from "../theme/Images";
import CustomeCardComponent from "./CustomeCardComponent";
import scaleFont from "./ScallingUtility";
import Fonts from "../theme/Fonts";
import Colors from "../theme/Colors";
import Strings from "../theme/Strings";
import {
  CustomeCardProductDetails,
  productArray,
  productDetails,
} from "../../types/ProductState";

const windowWidth = Dimensions.get("window").width;

// interface CustomeCardProductDetails {
//   leftHeaderText?: string;
//   rightButtonText?: string;
//   imageRightButton?: object;
//   horizontalScroll?: boolean;
//   onPressProductList?: (() => void) | null;
//   // dataofArray?: Array<{
//   //   id: number;
//   //   title: string;
//   //   main_image: string;
//   //   description: string;
//   //   our_price: number;
//   //   amazon_price: number;
//   //   make_an_offer: number | undefined;
//   // }>;

//   // dataofArray?: Array<{
//   //   id: number;
//   //   title: string;
//   //   main_image: string;
//   //   description: string;
//   //   our_price: number;
//   //   amazon_price: number;
//   //   make_an_offer: number | undefined;
//   // }>;

//   dataofArray?: Array<productArray>;
// }

const CustomeProductDetails: React.FC<CustomeCardProductDetails> = ({
  leftHeaderText,
  rightButtonText,
  imageRightButton,

  dataofArray,
  onPressProductList,
  horizontalScroll = false,
}) => {
  const handlefunction = () => {
    if (onPressProductList) {
      onPressProductList();
    }
  };

  return (
    <View style={styles.container}>
      {rightButtonText && (
        <View style={styles.saleContainer}>
          <View style={styles.saleinnerContainer}>
            <Text style={styles.flashSaleText}>{leftHeaderText}</Text>
            <View style={styles.viewAllBtn}>
              <TouchableOpacity onPress={() => handlefunction()}>
                <Text style={styles.ViewAllText}>{rightButtonText}</Text>
              </TouchableOpacity>
              {imageRightButton && <Image source={imageRightButton} />}
            </View>
          </View>
        </View>
      )}

      <View style={styles.cardOfListSyle}>
        <FlatList
          data={dataofArray}
          // style={{ backgroundColor: "blue" }}
          horizontal={horizontalScroll} // Set horizontal scrolling manually
          numColumns={horizontalScroll ? 1 : 2} // If horizontal to 1 column; otherwise- 2
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) =>
            item?.id ? item.id.toString() : Math.random().toString()
          }
          ItemSeparatorComponent={() => (
            <View style={styles.itemSepratorStyle}></View>
          )}
          contentContainerStyle={{
            paddingHorizontal: 10,
            // backgroundColor: "red",
          }}
          renderItem={({ item }) => (
            // <View
            //   style={{
            //     marginRight: horizontalScroll ? 0 : "3%",
            //   }}
            // >
            <View>
              <CustomeCardComponent product={item} />
              {/* <CustomeCardComponent
                image={item.main_image}
                // image={item.main_image}
                headerText={item.title}
                descriptionText={item.description}
                priceSell={item.our_price}
                price={item.amazon_price}
                offer={(
                  (item.amazon_price > +item.our_price
                    ? ((item?.amazon_price - +item?.our_price) /
                        item?.amazon_price) *
                      100
                    : 0) || 0
                )?.toFixed(0)}
              /> */}
            </View>
            // </View>
          )}
        />
      </View>
    </View>
  );
};

export default CustomeProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: "0.8%",
    // marginTop: "5%",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F1F1",
    // backgroundColor: "red",
    paddingBottom: "4%",
  },
  saleContainer: {
    width: windowWidth,
    paddingLeft: "2%",
    marginTop: "2%",
    // borderBottomWidth: 1,
    // borderBottomColor: "#F1F1F1",
  },
  saleinnerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: "1%",
  },
  flashSaleText: {
    fontSize: scaleFont(23),
    fontFamily: Fonts.PoppinsMediium,
  },
  viewAllBtn: {
    width: "23%",
    borderWidth: 1,
    borderColor: "#1A117A",
    height: 30,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginRight: "5%",
    borderRadius: 4,
  },
  ViewAllText: {
    textAlign: "center",
    color: "#1A117A",
    fontFamily: Fonts.PoppinsNormal,
  },
  cardOfListSyle: {
    marginTop: "2%",
  },
  itemSepratorStyle: {
    width: 10,
  },
});
