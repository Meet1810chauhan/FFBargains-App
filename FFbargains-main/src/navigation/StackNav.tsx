import { Button, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { NavigationContainer } from "@react-navigation/native";
import OnBoarding from "../screen/OnBoarding";
import Login from "../screen/Login";
import Home from "../screen/Home";
import { useAppSelector } from "../redux/hooks";
import BottomNav from "./BottomNav";

const Stack = createNativeStackNavigator();

const MyStack = () => {
  const isLogin = useAppSelector((state) => state.login.isLogin);
  return (
    <Stack.Navigator
      screenOptions={{ headerTitle: "", headerShown: false }}
      // initialRouteName={isLogin ? "BottomNav" : "Login"}
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
