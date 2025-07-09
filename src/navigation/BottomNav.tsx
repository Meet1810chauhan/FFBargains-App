import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import React from "react";
import {
  BottomTabBar,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

import { NavigationContainer } from "@react-navigation/native";

import Home from "../screen/Home";
import Cart from "../screen/Cart";
import Product from "../screen/Product";
import Profile from "../screen/Profile";
import images from "../theme/Images";
import Colors from "../theme/Colors";

const Tab = createBottomTabNavigator();

const MyBottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { height: "9%" },
        // headerLeft: () => {
        //   return (
        //     <TouchableOpacity>
        //       <Image
        //         source={images.logo11}
        //         style={{width: 20, height: 20, marginLeft: 10}}
        //       />
        //     </TouchableOpacity>
        //   );
        // },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          // headerRight: () => {
          //   return (
          //     <TouchableOpacity>
          //       <Image
          //         source={images.logo12}
          //         style={{width: 20, height: 20, marginRight: 10}}
          //       />
          //     </TouchableOpacity>
          //   );
          // },
          headerTitle: "Product List",
          tabBarLabel: ({ focused }) => {
            return (
              <View>
                <Text
                  style={{
                    color: focused ? Colors.darkBlue : Colors.lightGray,
                    marginTop: 8,
                    fontSize: 12,
                  }}
                >
                  Home
                </Text>
              </View>
            );
          },
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center" }}>
                {focused && <View style={styles.activeTabIndicator} />}
                <Image
                  source={images.logo11}
                  style={{
                    width: 24,
                    height: 24,
                    marginTop: 10,
                    tintColor: focused ? Colors.darkBlue : Colors.lightGray,
                  }}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Product"
        component={Product}
        options={{
          headerShown: false,
          tabBarLabel: ({ focused }) => {
            return (
              <View>
                <Text
                  style={{
                    color: focused ? Colors.darkBlue : Colors.lightGray,
                    marginTop: 8,
                    fontSize: 12,
                  }}
                >
                  Products
                </Text>
              </View>
            );
          },

          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center" }}>
                {focused && <View style={styles.activeTabIndicator} />}
                <Image
                  source={images.logo12}
                  style={{
                    width: 24,
                    height: 24,
                    marginTop: 10,
                    tintColor: focused ? Colors.darkBlue : Colors.lightGray,
                  }}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarLabel: ({ focused }) => {
            return (
              <View>
                <Text
                  style={{
                    color: focused ? Colors.darkBlue : Colors.lightGray,
                    marginTop: 8,
                    fontSize: 12,
                  }}
                >
                  Cart
                </Text>
              </View>
            );
          },
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center" }}>
                {focused && <View style={styles.activeTabIndicator} />}
                <Image
                  source={images.logo13}
                  style={{
                    width: 24,
                    height: 24,
                    marginTop: 10,
                    tintColor: focused ? Colors.darkBlue : Colors.lightGray,
                  }}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: ({ focused }) => {
            return (
              <View>
                <Text
                  style={{
                    color: focused ? Colors.darkBlue : Colors.lightGray,
                    fontSize: 12,
                    marginTop: 8,
                  }}
                >
                  Profile
                </Text>
              </View>
            );
          },
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center" }}>
                {focused && <View style={styles.activeTabIndicator} />}
                <Image
                  source={images.logo14}
                  style={{
                    width: 24,
                    height: 24,
                    marginTop: 10,
                    tintColor: focused ? "darkblue" : "gray",
                  }}
                />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const BottomNav = () => {
  return <MyBottomTab />;
};

export default BottomNav;

const styles = StyleSheet.create({
  activeTabIndicator: {
    position: "absolute",
    top: -1.5,
    width: 51,
    height: 5,
    backgroundColor: Colors.darkBlue,
    borderRadius: 2,
    // marginBottom: 6,
  },
});
