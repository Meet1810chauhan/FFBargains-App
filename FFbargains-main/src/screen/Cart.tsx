import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomeHeader from "../component/CustomeHeader";
import Colors from "../theme/Colors";

const cart = () => {
  return (
    <View style={styles.container}>
      <CustomeHeader title="Cart" />
      <Text>cart</Text>
    </View>
  );
};

export default cart;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
});
