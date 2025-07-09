import { Button, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { NavigationContainer } from "@react-navigation/native";
import OnBoarding from "../screen/OnBoarding";
import Login from "../screen/Login";
import Home from "../screen/Home";
import { useAppSelector } from "../redux/hooks";
import BottomNav from "./BottomNav";
import Setting from "../screen/Settings";
import ViewAll from "../screen/ViewAllProduct";
import ViewAllProduct from "../screen/ViewAllProduct";
import ProductDetails from "../screen/ProductDetails";
import EditProfile from "../screen/EditProfile";
import OrderHistory from "../screen/OrderHistory";
import OrderDetails from "../screen/OrderDetails";
import OrderReceipt from "../screen/OrderReceipt";
import DeliveryAddress from "../screen/DeliveryAddress";
import AddressInfo from "../screen/AddressInfo";
import Payment from "../screen/Payment";

const Stack = createNativeStackNavigator();

const MyStack = () => {
  // const isLogin = useAppSelector((state) => state.reducer.login.isLogin);
  const isLogin = useAppSelector((state) => state.login.isLogin);

  const isOnboarding = useAppSelector(
    // (state) => state.reducer.login.isOnboarding
    (state) => state.login.isOnboarding
  );
  console.log("flage ---- - -- - -", isLogin);
  return (
    <Stack.Navigator
      screenOptions={{ headerTitle: "", headerShown: false }}
      // initialRouteName={isLogin ? "BottomNav" : "Login"}
      // Correct but  EditProfile time any error :
      // initialRouteName={isOnboarding ? "Login" : "OnBoarding"}
      initialRouteName={
        !isOnboarding ? "OnBoarding" : isLogin ? "BottomNav" : "Login"
      }

      // initialRouteName={
      //   isOnboarding ? "OnBoarding" : isLogin ? "BottomNav" : "Login"
      // }
    >
      <Stack.Screen
        name="OnBoarding"
        component={OnBoarding}
        // options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        // options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="Home"
        component={Home}
        // options={{headerShown: false}}
      /> */}
      <Stack.Screen name="BottomNav" component={BottomNav} />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="ViewAllProduct" component={ViewAllProduct} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="OrderHistory" component={OrderHistory} />
      <Stack.Screen name="OrderDetails" component={OrderDetails} />
      <Stack.Screen name="OrderReceipt" component={OrderReceipt} />
      <Stack.Screen name="DeliveryAddress" component={DeliveryAddress} />
      <Stack.Screen name="AddressInfo" component={AddressInfo} />
      <Stack.Screen name="Payment" component={Payment} />

      {/* /* <Stack.Screen name="DrawerTab" component={DrawerTab}  /> */}
    </Stack.Navigator>
  );
};

const StackNav = () => {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
};

export default StackNav;

const styles = StyleSheet.create({});
