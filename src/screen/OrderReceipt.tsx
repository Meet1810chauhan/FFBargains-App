import { Dimensions, StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
// import { OrderDetailsState } from "../../types/OrderHistory";
const { width, height } = Dimensions.get("window");

import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";
import Colors from "../theme/Colors";
import CustomeHeader from "../component/CustomeHeader";
import Strings from "../theme/Strings";
import CustomeText from "../component/CustomeText";
import scaleFont from "../component/ScallingUtility";
import Fonts from "../theme/Fonts";
import { Component } from "react";

import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from "react-native-table-component";
// import { ScrollView } from "react-native-gesture-handler";

type OrderReceiptProps = NativeStackScreenProps<
  RootStackParamList,
  "OrderReceipt"
>;
const headerData = [
  Strings.si,
  Strings.qty,
  Strings.price,
  Strings.status,
  Strings.refund,
  Strings.refunded,
  Strings.rejectreason,
];

const OrderReceipt = ({ route }: OrderReceiptProps) => {
  const { OrderReceiptData } = route.params;
  return (
    <View style={styles.container}>
      <CustomeHeader title={Strings.orderReceipt} showBackButton={true} />
      <ScrollView
        style={styles.innerContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* <Text>OrderReceipt</Text> */}
        <CustomeText
          text={`${Strings.orderSummary}:`}
          style={styles.titleText}
        />
        <CustomeText
          text={`${Strings.orderStatus}:  ${OrderReceiptData?.order_data.status}`}
          style={styles.texts}
        />
        <CustomeText
          text={`${Strings.deliveryType}: ${OrderReceiptData?.order_data.delivery_type}`}
          style={styles.texts}
        />
        <CustomeText
          text={`${Strings.pickupLocation}: ${OrderReceiptData?.order_data.pickup_location}`}
          style={styles.texts}
        />
        <CustomeText
          text={`${Strings.paymentStatus}: ${OrderReceiptData?.order_data.payment_status}`}
          style={styles.texts}
        />

        {/* contact details */}

        <CustomeText
          text={`${Strings.customerContactdetail}:`}
          style={styles.titleText}
        />

        <CustomeText
          text={`${Strings.phoneNumber}: +${OrderReceiptData?.order_data.country_code} ${OrderReceiptData?.order_data.phone_number}`}
          style={styles.texts}
        />

        <CustomeText text={`${Strings.addressOrder}: `} style={styles.texts} />

        {/* details */}

        <CustomeText text={`${Strings.detail}:`} style={styles.titleText} />

        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            // contentContainerStyle={styles.contentVontainestyle}
          >
            {/* <View style={styles.header}> */}
            {/* {headerData.map((item) => (
              <View style={styles.headerContainer}>
                <CustomeText text={item} style={styles.textHeader} />
              </View>
            ))} */}
            {/* <Table borderStyle={{ borderWidth: 1 }}>
            <Row data={headerData} style={styles.headrText} />
          </Table> */}
            {/* <View */}
            <Table
              borderStyle={{
                borderWidth: 1,
                borderColor: "#c8e1ff",
              }}
            >
              <Row
                data={headerData}
                style={styles.head}
                textStyle={styles.text}
                widthArr={[40, 40, 80, 120, 90, 100, 160]}
              />
              {/* <Rows/> */}

              <Rows
                data={OrderReceiptData?.order_items.map((item, idx) => [
                  idx + 1,
                  item.quantity,
                  `$${item.ordered_our_price}`,
                  item.status,
                  `$${item.refunded_amount}`,
                  `${item.refunded == 0 ? "No" : "yes"}`,
                  item.reason_of_rejection,
                ])}
                textStyle={styles.text2}
                widthArr={[40, 40, 80, 120, 90, 100, 160]}
              />
            </Table>
            {/* </View> */}
            {/* </View> */}
          </ScrollView>
        </View>

        {/* payment summary */}
        <CustomeText
          text={`${Strings.paymentsummary}:`}
          style={styles.titleText}
        />
        <CustomeText
          text={`${Strings.grandTotal}: $${OrderReceiptData?.order_data.total_mrp}`}
          style={styles.texts}
        />

        <CustomeText
          text={`${Strings.giftCard}: $${OrderReceiptData?.order_data.gift_card}`}
          style={styles.texts}
        />
        <CustomeText
          text={`${Strings.taxAmount}: $${OrderReceiptData?.order_data.tax}`}
          style={styles.texts}
        />
        <CustomeText
          text={`${Strings.taxExempt}: -$${OrderReceiptData?.order_data.tax_exempt}`}
          style={styles.texts}
        />
        <CustomeText
          text={`${Strings.deliveryFee}: $${OrderReceiptData?.order_data.delivery_fee}`}
          style={styles.texts}
        />
        <CustomeText
          text={`${Strings.discount}: -$${OrderReceiptData?.order_data.discount}`}
          style={styles.texts}
        />

        <CustomeText
          text={`${Strings.payableAmount}: $${OrderReceiptData?.order_data.total_amount}`}
          style={styles.titleText}
        />
      </ScrollView>
    </View>
  );
};

export default OrderReceipt;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  innerContainer: {
    paddingHorizontal: "3%",
  },
  titleText: {
    fontSize: scaleFont(16),
    fontFamily: Fonts.PoppinsMediium,
    marginTop: "2%",
    marginBottom: "1%",
  },
  texts: { fontSize: scaleFont(14), fontFamily: Fonts.PoppinsLight },

  contentVontainestyle: {
    paddingHorizontal: 0,
  },

  head: { height: 30, backgroundColor: Colors.aliceBlue },
  text: { margin: 6, textAlign: "center", fontFamily: Fonts.PoppinsMediium },
  text2: { margin: 3, textAlign: "center", fontFamily: Fonts.PoppinsLight },
});
