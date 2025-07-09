import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Colors from "../theme/Colors";
import CustomeText from "./CustomeText";
import Strings from "../theme/Strings";
import Fonts from "../theme/Fonts";
import scaleFont from "./ScallingUtility";
import PriceDetailName from "./PriceDetailName";
import { AmountProduct, AmountSta } from "../../types/ProductState";
const { width, height } = Dimensions.get("window");

// const priceList = [
//   "Grand Total",
//   "Tax Amount(8.00%)",
//   "Text Exempt",
//   "Gift Card",
//   "Shipping Fee",
// ];

// const priceList = [
//   { lable: "Grand Total", price: "grand_total" },
//   { lable: "Tax Amount(8.00%)", price: "tax" },
//   { lable: "Text Exempt", price: "tax_exempt" },
//   { lable: "Gift Card", price: "gift_card" },
//   { lable: "Shipping Fee", price: "shipping.fee" },
//   // {lable:"Grand Total",price:'grand_total'},
// ];

const priceList = [
  { lable: "Grand Total", price: "grandTotal" },
  { lable: "Tax Amount(8.00%)", price: "taxAmount" },
  { lable: "Text Exempt", price: "taxExempt" },
  { lable: "Gift Card", price: "giftCard" },
  { lable: "Shipping Fee", price: "shipping.fee" },
  // {lable:"Grand Total",price:'grand_total'},
];

interface PriceDetailss {
  // amount?: AmountSta;
  shippingFee?: number;

  grandTotal?: number;
  taxAmount?: number;
  taxExempt?: number;
  giftCard?: number;
  discount?: number;
  payableAmount?: number;
  promocode?: boolean;
}

const PriceDetails: React.FC<PriceDetailss> = ({
  // amount,
  shippingFee,
  grandTotal,
  taxAmount,
  taxExempt,
  giftCard,
  discount,
  payableAmount,
  promocode,
}) => {
  // if (!amount) {
  //   return null;
  // }
  const prices = {
    grandTotal: grandTotal || 0,
    taxAmount: taxAmount || 0,
    taxExempt: taxExempt || 0,
    giftCard: giftCard || 0,
    shippingFee: shippingFee || 0,
  };

  return (
    <View style={styles.container}>
      <View style={styles.priceDetailsHeaderTextContainer}>
        <CustomeText
          text={Strings.priceDetails}
          style={styles.priceDetailsHeaderText}
        />
        {promocode ? (
          <TouchableOpacity style={styles.promocodeButton}>
            <CustomeText
              text={Strings.promoCode}
              style={styles.promocodeButtonText}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={styles.priceListContainer}>
        {priceList.map((item, idx) => {
          // const priceValue = `${item.price}`;
          const priceValue = prices[item.price] || 0;
          // console.log("priceValue ----- <><>", priceValue);

          const isNegative = ["discount", "taxExempt", "giftCard"].includes(
            item.price
          );
          return (
            // <View key={idx} style={styles.pricelistTextandPrice}>
            //   <CustomeText
            //     text={item.lable}
            //     numberOfLines={1}
            //     ellipsizeMode="tail"
            //     style={styles.pricelistText}
            //   />
            //   <CustomeText
            //     // text={`$${amount[item.price as keyof AmountSta] || 0}`}
            //     text={`${isNegative ? "-" : ""}$${priceValue.toFixed(2)}`}
            //     style={styles.pricelistText}
            //   />
            // </View>
            <View key={idx}>
              <PriceDetailName
                title={item.lable}
                price={`${isNegative ? "-" : ""}$${priceValue.toFixed(2)}`}
              />
            </View>
          );
        })}

        {/* <View style={styles.pricelistTextandPrice}> */}
        {/* <CustomeText
            text={Strings.discount}
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.discounttext}
          />
          <CustomeText
            text={`-$${amount.discount}` || 0}
            style={styles.discounttext}
          /> */}
        {/* </View> */}
        {/* <PriceDetailName
          title={Strings.shippingFee}
          price={`-$${shippingFee}` || 0}
          // titleStyle={styles.discounttext}
          // priceStyle={styles.discounttext}
        /> */}

        <PriceDetailName
          title={Strings.discount}
          price={`-$${discount?.toFixed(2)}` || 0}
          titleStyle={styles.discounttext}
          priceStyle={styles.discounttext}
        />
      </View>
      <View style={styles.payableContainer}>
        <CustomeText text={Strings.payableAmount} style={styles.payableText} />
        <CustomeText
          text={`$${payableAmount?.toFixed(2)}` || 0}
          style={styles.payableText}
        />
      </View>
    </View>
  );
};

export default PriceDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width * 0.91,
    // height: 52,
    // borderWidth: 1,
    // borderRadius: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: Colors.white,
    backgroundColor: Colors.white,
    borderRadius: 5,
    shadowColor: Colors.black,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      height: 2,
      width: 1,
    },
    elevation: 4,
  },
  priceDetailsHeaderTextContainer: {
    width: width * 0.91,
    // height: 38,
    // backgroundColor: "red",
    flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
    justifyContent: "space-between",
    paddingHorizontal: "2%",
    paddingVertical: "2%",
  },
  priceDetailsHeaderText: {
    fontFamily: Fonts.PoppinsMediium,
    fontSize: scaleFont(16),
  },
  promocodeButton: {
    paddingHorizontal: "3%",
    paddingVertical: "1%",
    // padding: 3,
    borderWidth: 1,
    backgroundColor: Colors.darkBlue,
    borderRadius: 5,
  },
  promocodeButtonText: {
    fontSize: scaleFont(12),
    color: Colors.white,
    fontFamily: Fonts.PoppinsMediium,
  },
  priceListContainer: {
    paddingHorizontal: "2%",
    width: "100%",
    alignSelf: "center",
  },
  pricelistTextandPrice: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: "2%",
  },
  pricelistText: {
    fontFamily: Fonts.PoppinsNormal,
    fontSize: scaleFont(14),
    color: "#2C2C2C",
  },
  discounttext: {
    fontFamily: Fonts.PoppinsNormal,
    fontSize: scaleFont(14),
    color: Colors.red,
    marginBottom: "2%",
    // marginVertical: "1%",
  },
  payableContainer: {
    width: width * 0.91,
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
    justifyContent: "space-between",
    paddingHorizontal: "2%",
    paddingVertical: "2%",
  },
  payableText: {
    color: Colors.green,
    fontFamily: Fonts.PoppinsNormal,
    fontSize: scaleFont(14),
  },
});
