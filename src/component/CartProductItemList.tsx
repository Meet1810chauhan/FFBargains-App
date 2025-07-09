import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";

import { ProductDetail, productDetails } from "../../types/ProductState";
import CartProductItem from "./CartProductItem";

interface CartProductItemList {
  dataOfArray: Array<ProductDetail>;
}

const CartProductItemList: React.FC<CartProductItemList> = ({
  dataOfArray,
}) => {
  return (
    // <View>
    //   <Text>CartProductItemList</Text>
    // </View>
    <FlatList
      data={dataOfArray}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) =>
        item?.id ? item.id.toString() : Math.random().toString()
      }
      renderItem={({ item }) => (
        <View>{/* <CartProductItem product={item} /> */}</View>
      )}
    />
  );
};

export default CartProductItemList;

const styles = StyleSheet.create({});
