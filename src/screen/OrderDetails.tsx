import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../theme/Colors";
import CustomeHeader from "../component/CustomeHeader";
import Strings from "../theme/Strings";
import images from "../theme/Images";
import CustomeText from "../component/CustomeText";
import scaleFont from "../component/ScallingUtility";
import Fonts from "../theme/Fonts";
import OrderDetailsItem from "../component/OrderDetailsItem";
import { AmountSta } from "../../types/ProductState";
import PriceDetails from "../component/PriceDetails";
import ApiServices from "../services/ApiServices";
import { useAppSelector } from "../redux/hooks";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
// import { OrderDetailsState } from "../../types/OrderHistory";
const { width, height } = Dimensions.get("window");

import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";
import { OrderDetailState } from "../../types/OrderHistory";
import CustomeActivityIndicator from "../component/ActivityIndicator";
import { useNavigation } from "@react-navigation/native";

type NavigationProps = StackNavigationProp<RootStackParamList, "OrderHistory">;
type Props = NativeStackScreenProps<RootStackParamList, "OrderDetails">;

// import Fonts from "../theme/Fonts";
// import { ScrollView } from "react-native-gesture-handler";

const OrderDetails = ({ route }: Props) => {
  const { orderId } = route.params;
  const [amounts, setAmounts] = useState<AmountSta>({
    grand_total: 0,
    discount: 0,
    tax: 0,
    tax_exempt: 0,
    gift_card: 0,
    payable_amount: 0,
  });
  const [loading, setLoading] = useState(false);
  const userData = useAppSelector((state) => state.user);
  const [orderDetailData, setOrderDetailData] = useState<OrderDetailState>();
  const navigation = useNavigation<NavigationProps>();

  //   interface PriceDetailss {
  //     amount: AmountSta;
  //     shippingFee?: number;
  //   }

  const getOrderDetailsApi = async () => {
    // console.log(!hasMore, loading);

    try {
      setLoading(true);

      const response = await ApiServices({
        method: "GET",
        apilasturlname: `user/order/orderitems?order_id=${orderId}`,
        access_token: userData.access_token,
      });

      if (response.payload) {
        setLoading(false);
        console.log("Successfull OrderHistory ");

        setOrderDetailData(response.payload);
        // setAmounts(response.payload.order_data)

        // console.log(
        //   "OrderHistory Deatils ---- +++ ++ +",
        //   response.payload.order_data
        // );
      }
    } catch (error) {
      console.log("error order details-- ", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getOrderDetailsApi();
    console.log("OrderDeatilsApi call");
  }, []);

  //   console.log("setOrderDeatils %%%%%", orderDetailData);

  const orderViewDetails = () => {
    navigation.navigate("OrderReceipt", { OrderReceiptData: orderDetailData });
  };

  if (!orderDetailData) {
    return (
      <View>
        <CustomeActivityIndicator isVisile={loading} />
      </View>
    );
  }
  console.log("orderDetailData 62473672");
  <CustomeActivityIndicator isVisile={loading} />;

  return (
    <View style={styles.container}>
      {/* <Text>OrderDetails</Text> */}
      <CustomeHeader title={Strings.orderDetails} showBackButton={true} />
      <View style={styles.detailOrderdelivery}>
        <View style={styles.locationDetailContainer}>
          <Image source={images.logoLocations} />
          <CustomeText
            text={`${orderDetailData.order_data.pickup_location}`}
            style={styles.textOrderLoc}
            numberOfLines={1}
          />
        </View>
        <View style={styles.locationDetailContainer}>
          <Image source={images.logoCall} />
          <CustomeText
            text={`${orderDetailData.order_data.phone_number}`}
            style={styles.textOrderLoc}
            numberOfLines={1}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        {/* {orderDetailData.map((item, idx) => {
          return (
            <View key={idx} style={styles.orderitemList}>
              <OrderDetailsItem product={item} />
            </View>
          );
        })} */}

        {orderDetailData.order_items.map((item, idx) => (
          <View key={idx} style={styles.orderitemList}>
            <OrderDetailsItem product={item} />
          </View>
        ))}
        <View style={styles.priceDetail}>
          <PriceDetails
            // amount={orderDetailData.order_data}
            grandTotal={orderDetailData.order_data.total_mrp}
            taxAmount={orderDetailData.order_data.tax}
            taxExempt={orderDetailData.order_data.tax_exempt}
            giftCard={orderDetailData.order_data.gift_card}
            shippingFee={orderDetailData.order_data.delivery_fee}
            discount={orderDetailData.order_data.discount}
            payableAmount={orderDetailData.order_data.total_amount}
          />
          {/* <PriceDetails grandTotal={orderDetailData.order_data.total_mrp} /> */}
        </View>
      </ScrollView>
      <View style={styles.viewDetailsOrderContainer}>
        <View style={styles.totalAmountContainer}>
          <CustomeText
            text={`$${orderDetailData.order_data.total_amount.toFixed(2)}`}
            style={styles.totalAmount}
            numberOfLines={1}
          />
          <CustomeText text={Strings.viewDetails} style={styles.viewDetails} />
        </View>

        <TouchableOpacity
          style={styles.viewDetailsOrderButton}
          onPress={orderViewDetails}
        >
          <Text style={styles.viewDetailOrder}>{Strings.viewDetails}</Text>
        </TouchableOpacity>
      </View>
      {/* <CustomeActivityIndicator isVisile={loading} /> */}
      {/* <CustomeActivityIndicator isVisile={loading} /> */}
    </View>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  detailOrderdelivery: {
    paddingHorizontal: "4.5%",
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
    paddingVertical: 3,
  },

  locationDetailContainer: {
    flexDirection: "row",
    paddingVertical: "1%",
  },
  textOrderLoc: {
    maxWidth: "85%",
    // backgroundColor: "red",
    fontSize: scaleFont(12),
    fontFamily: Fonts.PoppinsNormal,
    marginLeft: "2%",
  },
  viewDetailsOrderContainer: {
    width: width,
    height: width * 0.16,
    // height: 70,
    // backgroundColor: "red",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: "5%",
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
    justifyContent: "space-between",
  },
  totalAmountContainer: {
    flexWrap: "wrap",
    width: width * 0.4,
    // backgroundColor: "blue",
  },
  totalAmount: {
    fontFamily: Fonts.PoppinsMediium,
    fontSize: scaleFont(16),
    color: Colors.darkBlue,
  },
  viewDetails: {
    fontSize: scaleFont(14),
    color: Colors.green,
  },
  viewDetailsOrderButton: {
    backgroundColor: Colors.darkBlue,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  viewDetailOrder: {
    color: Colors.white,
    fontFamily: Fonts.PoppinsMediium,
    fontSize: scaleFont(14),
  },
  contentContainerStyle: {
    paddingVertical: 10,
  },
  orderitemList: {
    marginBottom: 15,
  },
  priceDetail: {
    marginTop: "2%",
  },
});
