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
import CustomeHeader from "../component/CustomeHeader";
import CustomeText from "./CustomeText";
import Fonts from "../theme/Fonts";
import scaleFont from "./ScallingUtility";
import images from "../theme/Images";
import CustomeFastImage from "./CustomeFastImage";
import { OrderHistoryItemState } from "../../types/OrderHistory";
import moment from "moment";
import Strings from "../theme/Strings";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";
import { useNavigation } from "@react-navigation/native";

type NavigationProps = StackNavigationProp<RootStackParamList, "OrderHistory">;

// type NavigationProps = StackNavigationProp<RootStackParamList, "OrderHistory">;
const { width, height } = Dimensions.get("window");

interface OrderHistoryItems {
  product: OrderHistoryItemState;
  selectOrderHistoryOption?: string;
  onPress?: () => void;
}

const OrderHistoryItem: React.FC<OrderHistoryItems> = ({
  product,
  selectOrderHistoryOption,
  onPress,
}) => {
  const navigation = useNavigation<NavigationProps>();

  if (!product) {
    return;
  }
  // product.order_date = new Date(product.order_date);
  // console.log("product.order_date", product.status);
  // console.log(moment(product.order_date).format("MMM-DD-YYYY"));
  // console.log("IIiiiiiiiDDDDDDDDD", product.id);

  const OrderItemHandle = () => {
    // navigation.navigate("OrderDetails", {});
    navigation.navigate("OrderDetails", {
      orderId: product.id,
    });
    console.log("Order Id  -- ", product.id);
  };
  return (
    <TouchableOpacity style={styles.container} onPress={OrderItemHandle}>
      <View style={styles.imageContainer}>
        <CustomeFastImage
          uriImage={product.image}
          imageStyle={styles.imagestyle}
          loader={false}
          defaultImagestyle={styles.defaulImageStyle}
        />
      </View>
      <View style={styles.orderDateAndItemContainer}>
        <CustomeText
          // text={product?.order_date}
          text={
            selectOrderHistoryOption === "pending"
              ? // ? `Ordered On ${product.order_date}`
                `${Strings.orederdOn} ${moment(product.order_date).format(
                  "MMM DD YYYY"
                )}`
              : `${product.status} ${Strings.on} ${moment(
                  product.order_date
                ).format("MMM DD YYYY")}`
          }
          style={[
            styles.orderDateText,
            {
              color:
                product.status === "confirmed" ||
                product.status === "picked" ||
                product.status === "shipped"
                  ? Colors.green
                  : product.status === "rejected"
                  ? Colors.red
                  : product.status === "pending"
                  ? Colors.darkBlue
                  : Colors.black,
            },
          ]}
          numberOfLines={1}
        />
        <CustomeText
          text={
            selectOrderHistoryOption === "pending"
              ? `${product.items_count} ${Strings.items}`
              : `${
                  product.approved_items_count
                    ? product.approved_items_count
                    : 0
                } ${Strings.itemApprovede}, ${
                  product.rejected_items_count
                    ? product.rejected_items_count
                    : 0
                } ${Strings.itemRejected}`
          }
          style={styles.itemText}
          numberOfLines={1}
        />
      </View>
      <TouchableOpacity style={styles.buttonStyle}>
        <Image source={images.logoProfileArrow} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default OrderHistoryItem;

const styles = StyleSheet.create({
  container: {
    width: width,
    // height: height * 0.1,
    height: 89,
    // backgroundColor: "red",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: "3%",
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  imageContainer: {
    width: 65,
    height: 65,
    // backgroundColor: "blue",
    borderRadius: 5,
    borderColor: Colors.lightGray,
    borderWidth: 1,
    // padding: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
  imagestyle: {
    resizeMode: "contain",
    // resizeMode: "cover",
    width: 61,
    height: 61,
    // backgroundColor: "red",
  },
  orderDateAndItemContainer: {
    width: "65%",
    marginLeft: 8,
  },
  orderDateText: {
    fontFamily: Fonts.PoppinsMediium,
    fontSize: 14,
    color: Colors.darkBlue,
    // marginLeft: "4%",
    // maxWidth: "75%",
    // backgroundColor: "red",
  },
  itemText: {
    fontFamily: Fonts.PoppinsNormal,
    fontSize: 12,
    color: Colors.charlestonGreen,
  },
  buttonStyle: {
    marginLeft: "10%",
  },
  defaulImageStyle: {
    alignSelf: "center",
    height: 25,
    width: 25,
    marginRight: 22,
    bottom: 6,
  },
});
