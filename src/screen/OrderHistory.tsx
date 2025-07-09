import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  CommonActions,
  NavigationContainer,
  useNavigation,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";
import Colors from "../theme/Colors";
import CustomeHeader from "../component/CustomeHeader";
import OrderHistoryItem from "../component/OrderHistoryItem";
import ApiServices from "../services/ApiServices";
import { useAppSelector } from "../redux/hooks";
import {
  OrderHistoryItemState,
  OrderItemState,
} from "../../types/OrderHistory";
import Strings from "../theme/Strings";
import Fonts from "../theme/Fonts";
import { isAllOf } from "@reduxjs/toolkit";
import CustomeActivityIndicator from "../component/ActivityIndicator";
import PendingAndConfirmbtn from "../component/PendingAndConfirmbtn";

const { width, height } = Dimensions.get("window");
type NavigationProps = StackNavigationProp<RootStackParamList, "OrderHistory">;

const OrderHistory = () => {
  const navigation = useNavigation<NavigationProps>();

  const [loading, setLoading] = useState(false);
  const userData = useAppSelector((state) => state.user);
  const [orderData, setOrderData] = useState<OrderHistoryItemState[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  const [orderItemId, setOrderItemId] = useState<number>();

  const engreachRef = useRef(false);
  const [selectOrderHistory, setSelectOrderHistory] = useState<
    "pending" | "confirmed"
  >("pending");

  const pageRef = useRef(1);

  const getOrderHistoryApi = async () => {
    // console.log(!hasMore, loading);

    if (!hasMore || loading) return;

    try {
      setLoading(true);
      engreachRef.current = true;

      let endpoint = "user/orders";

      if (selectOrderHistory === "pending") {
        endpoint = `user/orders?pending=${pageRef.current}`;
      } else if (selectOrderHistory === "confirmed") {
        endpoint = `user/orders?confirmed=${pageRef.current}`;
      }

      // console.log("endpont Order", endpoint);

      const response = await ApiServices({
        method: "GET",
        apilasturlname: endpoint,
        access_token: userData.access_token,
      });

      if (response.payload) {
        setLoading(false);
        // console.log(
        //   "Successfull OrderHistory -----+++++++",
        //   response.payload.data.id
        // );
        // console.log("Successfull OrderHistory", response.payload.data);
        // console.log(
        //   "Successfull updated -=-=- ---  ",
        //   response.payload.meta.per_page
        // );

        // setOrderData(response.payload.data);
        setOrderData((prevData) => [...prevData, ...response.payload.data]);
        engreachRef.current = false;
        console.log(
          " response.payload.meta.last_page ",
          response.payload.meta.last_page
        );

        // console.log(
        //   "Successfull OrderHistory -----+++++++",
        //   response.payload.data.id
        // );
        // console.log(" pageRef.current ", pageRef.current);
        // console.log("Order Id 156 ___--- ", response.payload.id);

        if (response.payload.meta.last_page <= pageRef.current) {
          sethasMore(false);
        }
        // console.log("Page N :", pageRef.current);
      }
    } catch (error) {
      console.log("Update profile error -- ", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getOrderHistoryApi();
    console.log("UseEffect Call ");
    // console.log("Page ---- ", page);
  }, [selectOrderHistory]);

  // console.log("AllData Printed ---()()() ", orderData);

  const handleLoadMorePage = () => {
    console.log("handleLoadMorePage");
    console.log("handleLoadMorePage---", !engreachRef.current);

    // if (!engreachRef.current) setPage((prevPage) => prevPage + 1);
    if (!engreachRef.current) {
      pageRef.current = pageRef.current + 1;
      getOrderHistoryApi();
    }
    // console.log("HandleMore Page--- ", page);
    // console.log("HandleMore Page--- ", pageRef);
    // console.log("engreachRef Page--- ", pageRef);
  };
  // const OrderItemHandle = () => {
  //   // navigation.navigate("OrderDetails", {});
  //   navigation.navigate("OrderDetails", {
  //     orderId: orderItemId,
  //   });
  //   console.log("Product Id -- ");
  // };

  return (
    <View style={styles.container}>
      <CustomeHeader title="Your Orders" showBackButton={true} />

      {/* <OrderHistoryItem /> */}
      <View style={styles.pendingAndConfirmedButton}>
        <TouchableOpacity
          style={[
            styles.pendingbutton,
            {
              backgroundColor:
                selectOrderHistory === "pending"
                  ? Colors.darkBlue
                  : Colors.white,
            },
          ]}
          onPress={() => {
            if (loading) return;
            setSelectOrderHistory("pending");
            setOrderData([]);
            pageRef.current = 1;
            sethasMore(true);
            // getOrderHistoryApi();
            // console.log("pending Page -- ", pageRef);
          }}
        >
          <Text
            style={[
              styles.buttonText,
              {
                color:
                  selectOrderHistory === "pending"
                    ? Colors.white
                    : Colors.black,
              },
            ]}
          >
            {Strings.pending}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.pendingbutton,
            {
              backgroundColor:
                selectOrderHistory === "confirmed"
                  ? Colors.green
                  : Colors.white,
            },
          ]}
          onPress={() => {
            if (loading) return;
            setSelectOrderHistory("confirmed");
            setOrderData([]);
            pageRef.current = 1;
            sethasMore(true);
            // getOrderHistoryApi();

            // console.log("confirm Page -- ", pageRef);
          }}
        >
          <Text
            style={[
              styles.buttonText,
              {
                color:
                  selectOrderHistory === "confirmed"
                    ? Colors.white
                    : Colors.black,
              },
            ]}
          >
            {Strings.confirmed}
          </Text>
        </TouchableOpacity>
      </View>

      {/* <View style={styles.pendingAndConfirmedButton}>
        <PendingAndConfirmbtn
          name="pending"
          onPressBtn={() => {
            if (loading) return;
            setSelectOrderHistory("pending");
            setOrderData([]);
            pageRef.current = 1;
            sethasMore(true);
            // getOrderHistoryApi();
          }}
          selectOrderHistory="pending"
        />
      </View> */}
      <FlatList
        data={orderData}
        numColumns={2} // If horizontal to 1 column; otherwise- 2
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        // keyExtractor={(item) =>
        // item?.id ? item.id.toString() : Math.random().toString()
        // }

        keyExtractor={(item) => item?.id?.toString() ?? `key-${Math.random()}`}
        // ListHeaderComponent={() => <View style={{ marginTop: 16 }}></View>}
        renderItem={({ item }) => (
          <OrderHistoryItem
            product={item}
            selectOrderHistoryOption={selectOrderHistory}
            // onPress={OrderItemHandle}
          />
        )}
        onEndReached={() => !engreachRef.current && handleLoadMorePage()}
        onEndReachedThreshold={0.9}
        ListFooterComponent={() => (
          <View style={styles.footerLoaderStyle}>
            {loading && (
              <ActivityIndicator
                size={"large"}
                color={Colors.blue}
              ></ActivityIndicator>
            )}
          </View>
        )}
      />
      {/* <CustomeActivityIndicator isVisile={loading} /> */}
    </View>
  );
};

export default OrderHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    width: width,
    height: height * 0.1,
  },
  footerLoaderStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  pendingAndConfirmedButton: {
    height: 50,
    marginHorizontal: "2.5%",
    borderWidth: 1,
    borderColor: Colors.lightGray,
    flexDirection: "row",
    borderRadius: 8,
    marginVertical: 5,
    // alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
  },
  pendingbutton: {
    width: "49%",
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: Fonts.PoppinsMediium,
    color: Colors.black,
  },
});
