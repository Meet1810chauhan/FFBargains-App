import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
  DeviceEventEmitter,
} from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import CustomeHeader from "../component/CustomeHeader";
import Colors from "../theme/Colors";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import images from "../theme/Images";
import Strings from "../theme/Strings";
import CustomeText from "../component/CustomeText";
import scaleFont from "../component/ScallingUtility";
import Fonts from "../theme/Fonts";
import PickupLocation from "../component/PickupLocation";
import PriceDetails from "../component/PriceDetails";
import CartProductItem from "../component/CartProductItem";
import ShippingAndReciver from "../component/ShippingAndReciver";
import ApiServices from "../services/ApiServices";
import CustomeActivityIndicator from "../component/ActivityIndicator";
import { useAppSelector } from "../redux/hooks";

// import { getDeliveryAmountApi } from "../services/DeliveryApi";
import showCustomToast from "../component/CustomeToast";
import {
  amountState,
  CartDataState,
  CartProState,
  DeliveryShippingState,
} from "../../types/CartProduct";
import { OrderData, OrderData1 } from "../../types/OrderHistory";
import ApiServicesAxios from "../services/Apiaxios";
import { all } from "axios";
type NavigationProps = StackNavigationProp<RootStackParamList, "Cart">;

const { width, height } = Dimensions.get("window");

const Cart = () => {
  const navigation = useNavigation<NavigationProps>();
  const userData = useAppSelector((state) => state.user);

  const [loading, setLoading] = useState(false);
  const address = useAppSelector((state) => state.user.address);
  // const [alldata, setAllData] = useState([]);
  // const [alldata, setAllData] = useState<ProductDetail[]>([]);
  const [alldata, setAllData] = useState<CartDataState>();

  const [DeliveryData, setDeliveryData] = useState<DeliveryShippingState>();

  // const [useraddress, setUseraddress] = useState<addressState>();

  // const [amounts, setAmounts] = useState<amountState>();

  const userAccessToken = useAppSelector((state) => state.user.access_token);

  const cartData = async () => {
    setLoading(true);

    try {
      const response = await ApiServices({
        method: "GET",
        apilasturlname: "user/cart",
        access_token: userAccessToken,
      });
      // console.log("Adressssss --- ", address?.name);

      if (response.payload) {
        setLoading(false);
        setAllData(response.payload);

        // [...(prevData || []), ...response.payload.data]
        // console.log(
        //   "Response set with cart  : --",
        //   JSON.stringify(response.payload)
        // );

        // console.log("Response set with cart  : --", JSON.stringify(alldata));
        // console.log("All Data 0---  : --", address);
      }
    } catch (error) {
      console.log("Cart -- Api -- error - ", error);
      setLoading(false);
    }
  };

  // const getDeliveryAmountApi = async (d: { ids: string[]; offer: "0" }) => {
  //   // setLoading(true);
  //   try {
  //     // const quaryParams = `ids=${encodeURIComponent(
  //     //   JSON.stringify(d.ids)
  //     // )}&offer=${encodeURIComponent(d.offer)}`;
  //     const response = await ApiServices({
  //       method: "GET",
  //       // apilasturlname: `order/calculate/shipping?ids=${d.ids}&offer=${d.offer}`,
  //       apilasturlname: `order/calculate/shipping?ids=${JSON.stringify(
  //         d.ids
  //       )}&offer=${JSON.stringify(d.offer)}`,
  //       access_token: userAccessToken,
  //     });
  //     console.log("Delivery API Response:", response.payload);
  //   } catch (error) {
  //     console.log("Delivery Cart API error:", error);
  //   } finally {
  //     // setLoading(false);
  //   }
  // };

  const getDeliveryAmountApi = async (d: { ids: string[]; offer: "0" }) => {
    // setLoading(true);
    try {
      // const quaryParams = `ids=${encodeURIComponent(
      //   JSON.stringify(d.ids)
      // )}&offer=${encodeURIComponent(d.offer)}`;
      const response = await ApiServicesAxios({
        method: "GET",
        // apilasturlname: `order/calculate/shipping?ids=${d.ids}&offer=${d.offer}`,
        apilasturlname: `order/calculate/shipping`,
        access_token: userAccessToken,
        params: d,
      });
      console.log("Delivery API Response:", response.payload);
      return response;
      // setDeliveryData(response.payload);
    } catch (error) {
      console.log("Delivery Cart API error:", error);
    } finally {
      // setLoading(false);
    }
  };
  useEffect(() => {
    cartData();

    const eventReceiver = DeviceEventEmitter.addListener(
      "RefreshCartDetails",
      () => {
        cartData();
      }
    );

    return () => eventReceiver.remove();
  }, []);

  // const ids2 = alldata?.products.map((item) => {
  //   return item.product.id;
  // });
  // console.log("Product ids Array---- ", ids2);

  // const ids11 = alldata?.products?.map(
  //   (item: CartDataState["products"][0]) => item?.product?.id
  // );

  // console.log("Ids all \\\\\\_------", ids11);

  const [selectOption, setSelectOption] = useState("");
  // const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [selectedPickupLocId, setSelectedPickupLocId] = useState<number | null>(
    null
  );


  const selectHandler = useCallback(
    async (type: "Delivery" | "Pickup") => {
      if (type == "Delivery" && !userData.address) {
        showCustomToast({
          type: "error",
          text1: "Please add your delivery address",
        });
        navigation.navigate("AddressInfo", { adrressId: address?.id });
        return;
      }
      setSelectOption(type);
      let ids: any;
      if (type == "Delivery" && !DeliveryData) {
        // setLoading(true);
        try {
          setLoading(true);
          ids = alldata?.products?.map(
            (item: CartDataState["products"][0]) => item?.product?.id
          );
          if (!ids) {
            return;
          }
          if (ids.length > 0) {
            const response = await getDeliveryAmountApi({ ids, offer: "0" });
            if (response.result && Array.isArray(response.payload?.shipments)) {
              setDeliveryData(response.payload);
              setAllData((prev: any) => ({
                ...prev,
                products: prev.products.map((i: any) => {
                  const exist = response.payload?.shipments.find(
                    (j: any) => j.inventory_id == i.product.id
                  );
                  if (exist) {
                    return {
                      ...i,
                      rate: exist?.rate,
                      success: exist.success,
                      message: exist?.message,
                    };
                  } else {
                    return i;
                  }
                }),
              }));
            }
          } else {
            showCustomToast({
              type: "error",
              text1: "Something went Wrong!, Clear your cart and try again.",
            });
          }
        } catch (error) {
          setSelectOption("Pickup");
          // console.log("ajksdhasd ");
        } finally {
          setLoading(false);
        }
      }
    },
    [alldata, DeliveryData, navigation, userData]
  );

  // const pickupLocationhandle = () => setSelectOption("Pickup");
  // const deliveryHandle = () => setSelectOption("Delivery");

  const pickupLocationhandle = () => selectHandler("Pickup");
  const deliveryHandle = () => selectHandler("Delivery");

  const pickupLoactio = useMemo(() => {
    // console.log("pickUpLocation ----------");

    if (selectOption !== "Pickup") return;
    return (
      <View style={styles.pickupSelectLoactionContainer}>
        <CustomeText
          text={Strings.selectLocation}
          style={styles.selectLocationText}
        />
        {[1, 2, 3].map((id) => (
          <PickupLocation
            key={id}
            selectOption={selectedPickupLocId === id}
            onSelect={() => setSelectedPickupLocId(id)}
          />
        ))}
      </View>
    );
  }, [selectOption, selectedPickupLocId]);

  const changeAddresshandle = () => {
    navigation.navigate("AddressInfo", { adrressId: address?.id });
  };
  const delivery = useMemo(() => {
    // console.log("Delivery  ---------------");

    if (selectOption !== "Delivery") return;
    console.log("Delevery 6736274689123");
    // console.log("Delivery Shippment data --- ", DeliveryData);
    // getDeliveryAmountApi();
    // console.log("Log Address print ", address);

    return (
      <View style={styles.deliveryContainer}>
        <View>
          <CustomeText
            // text={`${Strings.deliveryTo}: Jack Jen`}
            text={`${Strings.deliveryTo}: ${address?.name}`}
            style={styles.deliverytext}
          />
          <CustomeText
            // text={`755 E Seneca St, Oswego, NY13126, united states oswego Ny 13126`}
            text={`${address?.street_address}${address?.city} ${address?.state}${address?.zipcode}`}
            style={styles.addressText}
            numberOfLines={2}
          />
        </View>

        <TouchableOpacity
          style={styles.changeButton}
          onPress={changeAddresshandle}
        >
          <CustomeText text={Strings.change} style={styles.changeText} />
        </TouchableOpacity>
      </View>
    );
  }, [selectOption]);

  if (!alldata) {
    return <View></View>;
  }

  const placeOrderV1Api = async (placeOrdeData: OrderData) => {
    // setLoading(true);
    try {
      const response = await ApiServicesAxios({
        method: "POST",
        apilasturlname: `user/orders/v1`,
        access_token: userAccessToken,
        // params: d,
        bodyRequest: placeOrdeData,
      });
      console.log("PlaceOrder Api Call-=--- ", response.payload);
      return response;
      // setDeliveryData(response.payload);
    } catch (error) {
      console.log("PlaceOrder Api Error-- ", error);
    } finally {
      // setLoading(false);
    }
  };
  const placeOrderHandler = useCallback(async () => {
    console.log("placeOrder call ----- ");
    const DeliveryFiltered =
      DeliveryData?.shipments?.filter((item) => item?.success) || [];

    if (alldata?.products.length === 0) {
      showCustomToast({
        type: "error",
        text1: "Add some Products to cart.",
      });
    } else if (!selectOption) {
      console.log("Please Select opton Delivery");
    } else if (!userData.address) {
      showCustomToast({
        type: "error",
        text1: "Please add your address in order to proceed",
      });
      navigation.navigate("AddressInfo", { adrressId: address?.id });
    } else {
      // setLoading(true);
      const OrderDatas = alldata?.products.map(
        (item: CartDataState["products"][0]) => ({
          // CartDataState - types of payload
          inventory_id: item?.product.id,
          quantity: item.quantity,
          ordered_store_price: item.product?.amazon_price,
          ordered_our_price: item.product?.our_price,
          // ...(item.coupon && {coupon: item.coupon}),
        })
      );
      console.log("Orderdata +_++++\\||| ", OrderDatas);

      let image: string | undefined;
      for (let item of alldata.products) {
        if (!image) image = item.product.main_image.split("/").pop();
        else break;
      }

      console.log("placeOrder Call Image variable -- ", image);
    }

    const placeOrderData: OrderData1 = {
      // image: image || 'no_image.jpg',
      // image: image || "no_image.jpg",
      country_code: address?.country_code,
      delivery_fee: 3,
      delivery_type: selectOption === "Delivery" ? "delivery" : "pickup",
      // inventories: OrderDatas,
      total_amount: alldata?.amounts.payable_amount,
      total_mrp: alldata?.amounts?.grand_total,
      discount: alldata?.amounts?.discount,
      make_an_offer: false,
      phone_number: address?.phone_number || userData.contact_number,
      tax: alldata?.amounts?.tax,
      tax_exempt: alldata?.amounts?.tax_exempt,
      gift_card: alldata?.amounts?.gift_card,
      payment_type: "pre_paid",
    };

    if (selectOption === "Delivery") {
      let shipments = DeliveryFiltered.map((item) => ({
        inventory_id: item.inventory_id,
        shipment_id: item.shipment_id,
        rate_id: item.rate_id,
        service: item.service,
        carrier: item.carrier,
        rate: item.rate,
      }));
      placeOrderData.street_address = `${userData.address?.street_address} ${userData?.address?.city} ${userData?.address?.state} ${userData?.address?.zipcode}`;
      placeOrderData.city = userData?.address?.city;
      placeOrderData.country = userData?.address?.country;
      placeOrderData.state = userData?.address?.state;
      placeOrderData.zipcode = userData?.address?.zipcode;
      placeOrderData.shipments = shipments;
    } else {
      console.log("!@# 123 !@# ");
    }
    const response = await placeOrderV1Api(placeOrderData);
  }, [alldata, selectOption, userData, DeliveryData]);

  return (
    <View style={styles.container}>
      <CustomeHeader title="Cart" />

      {/* <CartProductItemList dataOfArray={alldata} /> */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.cardProductList}
        contentContainerStyle={styles.contentContainerStyle}
      >
        {/* <CartProductItem /> */}
        <View>
          {alldata?.products.map((item, idx) => (
            <View key={item?.id ? item.id.toString() : idx.toString()}>
              <CartProductItem product={item} />
              <View style={styles.itemSepratorStyle}></View>
            </View>
          ))}
        </View>
        <View style={styles.lineStyle}></View>

        <View style={styles.shippingAndReciverContainer}>
          <ShippingAndReciver
            name="Pickup"
            imageButton={images.logoPickup}
            selectOption={selectOption}
            onSelect={pickupLocationhandle}
          />
          <ShippingAndReciver
            name="Delivery"
            imageButton={images.logoDelivery}
            selectOption={selectOption}
            onSelect={deliveryHandle}
          />
        </View>

        {pickupLoactio}
        {delivery}

        <View style={styles.lineStyle}></View>
        <View style={styles.priceDetails}>
          <PriceDetails
            // grandTotal={amounts.grand_total}
            grandTotal={alldata?.amounts.grand_total}
            taxAmount={alldata?.amounts.tax}
            taxExempt={alldata?.amounts.tax_exempt}
            giftCard={alldata?.amounts.gift_card}
            discount={alldata?.amounts.discount}
            payableAmount={alldata?.amounts.payable_amount}
            promocode={true}
          />
        </View>
      </ScrollView>

      <View style={styles.placeOrderContainer}>
        <View style={styles.totalAmountContainer}>
          <CustomeText
            // text={`$${alldata?.amounts?.payable_amount?.toFixed(2)}`}
            text={`$${
              alldata?.amounts?.payable_amount + (DeliveryData?.total || 0)
            } `}
            style={styles.totalAmount}
            numberOfLines={1}
          />
          <CustomeText text={Strings.viewDetails} style={styles.viewDetails} />
        </View>

        <TouchableOpacity
          style={[
            styles.placeOrderButton,
            {
              backgroundColor: selectOption
                ? Colors.darkBlue
                : Colors.ghostWhite,
            },
          ]}
          onPress={() =>
            selectOption === "Delivery" ? placeOrderHandler() : null
          }
        >
          <Text
            style={[
              styles.placeOrder,
              { color: selectOption ? Colors.white : Colors.sonicSilver },
            ]}
          >
            {Strings.placeOrder}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.continueOrEmptyCart}>
          <Image source={images.logoCart} />
        </TouchableOpacity>
      </View>

      <CustomeActivityIndicator isVisile={loading} />
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  cardProductList: {
    // paddingTop: "3%",
  },
  lineStyle: {
    color: Colors.antiflashWhite,
    borderWidth: 1,
    borderColor: Colors.antiflashWhite,
    height: 2,
    marginTop: "4%",
  },
  pickupAndDeliveryButtonContaner: {
    marginTop: "4%",
    marginHorizontal: "5%",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  pickupSelectLoactionContainer: {
    marginTop: "3%",
    marginHorizontal: "5%",
  },
  selectLocationText: {
    fontSize: scaleFont(14),
    fontFamily: Fonts.PoppinsMediium,
  },

  shippingAndReciverContainer: {
    marginTop: "4%",
    marginHorizontal: "5%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  priceDetails: { marginTop: "3%" },
  placeOrderContainer: {
    width: width,
    height: width * 0.16,
    // height: 70,
    // backgroundColor: "red",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: "5%",
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
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
  placeOrderButton: {
    // backgroundColor: Colors.darkBlue,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
    marginLeft: "14%",
  },
  continueOrEmptyCart: {
    marginLeft: "4%",
  },
  placeOrder: {
    color: Colors.white,
    fontFamily: Fonts.PoppinsMediium,
    fontSize: scaleFont(14),
  },
  deliveryContainer: {
    flexDirection: "row",
    paddingHorizontal: "5%",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "4%",
  },
  deliverytext: {
    fontFamily: Fonts.PoppinsMediium,
    fontSize: scaleFont(14),
  },
  addressText: {
    fontFamily: Fonts.PoppinsNormal,
    fontSize: scaleFont(14),
    maxWidth: width * 0.75,
    flexWrap: "wrap",
    marginTop: "2%",
  },
  changeButton: {
    borderWidth: 1,
    borderColor: Colors.green,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 5,
  },
  changeText: {
    color: Colors.darkBlue,
    fontFamily: Fonts.PoppinsNormal,
  },
  contentContainerStyle: { paddingBottom: 15, paddingTop: 15 },
  itemSepratorStyle: {
    height: 10,
  },
});
