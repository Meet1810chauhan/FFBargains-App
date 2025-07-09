import { Dimensions, StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../theme/Colors";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import CustomeHeader from "../component/CustomeHeader";
import Strings from "../theme/Strings";
import DeliveryAddressListItem from "../component/DeliveryAddressListItem";
import ApiServices from "../services/ApiServices";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";
import { useAppSelector } from "../redux/hooks";
// import { ScrollView } from "react-native-gesture-handler";
// import { OrderDetailsState } from "../../types/OrderHistory";
const { width, height } = Dimensions.get("window");
type NavigationProps = StackNavigationProp<
  RootStackParamList,
  "DeliveryAddress"
>;

const DeliveryAddress = () => {
  const navigation = useNavigation<NavigationProps>();

  const [loading, setLoading] = useState(false);
  const userData = useAppSelector((state) => state.user);
  const [addressData, setAddressData] = useState();
  const DeliveryAddressApi = async () => {
    try {
      setLoading(true);
      const response = await ApiServices({
        method: "GET",
        apilasturlname: "user/address",
        access_token: userData.access_token,
      });

      if (response.payload) {
        setLoading(false);
        setAddressData(response.payload.data);
        console.log(" Delivery Address payload ------- --- -- - ", addressData);
      }
    } catch (error) {
      console.log("Error of delivery address", error);
      setLoading(false);
    }
  };
  //   useEffect(() => {
  //     DeliveryAddressApi();
  //     console.log("UseEffect Call");
  const deliveryAddressHandle = () => {
    navigation.navigate("AddressInfo", { adrressId: userData.address?.id });
  };
  console.log("Address Id --- ", userData.address?.id);

  return (
    <View style={styles.container}>
      <CustomeHeader title={Strings.deliveryAddress} showBackButton={true} />

      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <DeliveryAddressListItem onPress={deliveryAddressHandle} />
      </ScrollView>
    </View>
  );
};

export default DeliveryAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  contentContainerStyle: {
    paddingVertical: 15,
  },
});
