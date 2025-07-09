import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import CustomeSearchBar from "../component/CustomeSearchBar";
import Colors from "../theme/Colors";
import CustomeHeader from "../component/CustomeHeader";
import CustomeModel from "../component/CustomeModel";
import CustomeCardComponent from "../component/CustomeCardComponent";
import images from "../theme/Images";
import CustomeProductDetails from "../component/ProductList";
import Strings from "../theme/Strings";

const Product = () => {
  const [allData, setAllData] = useState<
    Array<{
      id: number;
      producName: string;
      image: any;
      descriptionProduct: string;
      priceSell: number;
      price: number;
      offer: number;
    }>
  >([]);
  useEffect(() => {
    const initialData = [
      {
        id: 1,
        producName: "Pink Babies",
        image: images.logo8,
        descriptionProduct: "Teddy Bear for babies",
        priceSell: 40.92,
        price: 65.98,
        offer: 35,
      },
      {
        id: 2,
        producName: "Blue Dragon",
        image: images.logo9,
        descriptionProduct: "Gaming Desk",
        priceSell: 250.0,
        price: 500.0,
        offer: 50,
      },
      {
        id: 3,
        producName: "Pink Babies",
        image: images.logo8,
        descriptionProduct: "Teddy Bear for babies",
        priceSell: 40.92,
        price: 65.98,
        offer: 35,
      },
      {
        id: 4,
        producName: "Blue Dragon",
        image: images.logo9,
        descriptionProduct: "Gaming Desk",
        priceSell: 250.0,
        price: 500.0,
        offer: 50,
      },
      {
        id: 5,
        producName: "Pink Babies",
        image: images.logo8,
        descriptionProduct: "Teddy Bear for babies",
        priceSell: 40.92,
        price: 65.98,
        offer: 35,
      },
      {
        id: 6,
        producName: "Blue Dragon",
        image: images.logo9,
        descriptionProduct: "Gaming Desk",
        priceSell: 250.0,
        price: 500.0,
        offer: 50,
      },
      {
        id: 7,
        producName: "Blue Dragon",
        image: images.logo9,
        descriptionProduct: "Gaming Desk",
        priceSell: 250.0,
        price: 500.0,
        offer: 50,
      },
      {
        id: 8,
        producName: "Blue Dragon",
        image: images.logo9,
        descriptionProduct: "Gaming Desk",
        priceSell: 250.0,
        price: 500.0,
        offer: 50,
      },
      {
        id: 9,
        producName: "Blue Dragon",
        image: images.logo9,
        descriptionProduct: "Gaming Desk",
        priceSell: 250.0,
        price: 500.0,
        offer: 50,
      },
      {
        id: 10,
        producName: "Blue Dragon",
        image: images.logo9,
        descriptionProduct: "Gaming Desk",
        priceSell: 250.0,
        price: 500.0,
        offer: 50,
      },
      {
        id: 11,
        producName: "Blue Dragon",
        image: images.logo9,
        descriptionProduct: "Gaming Desk",
        priceSell: 250.0,
        price: 500.0,
        offer: 50,
      },
    ];
    // Load only once
    setAllData(initialData);
  }, []);
  return (
    <View style={styles.container}>
      <CustomeHeader title={Strings.product} />

      {/* <Text>Product</Text> */}
      {/* <CustomeSearchBar /> */}
      {/* <CustomeModel /> */}

      {/* <CustomeProductDetails dataofArray={allData} /> */}
      {/* <CustomeProductDetails dataofArray={allData} />
        <CustomeProductDetails dataofArray={allData} /> */}

      <FlatList
        data={allData}
        // style={{ backgroundColor: "blue" }}
        numColumns={2} // If horizontal to 1 column; otherwise- 2
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) =>
          item?.id ? item.id.toString() : Math.random().toString()
        }
        columnWrapperStyle={{
          justifyContent: "space-between",
        }}
        contentContainerStyle={{
          backgroundColor: Colors.white,
          // alignSelf: "center",s
          marginHorizontal: "4.5%",
        }}
        ItemSeparatorComponent={() => <View style={{ height: 8 }}></View>}
        ListHeaderComponent={() => <View style={{ marginTop: 16 }}></View>}
        renderItem={({ item }) => (
          <CustomeCardComponent
            image={item.image}
            headerText={item.producName}
            descriptionText={item.descriptionProduct}
            priceSell={item.priceSell}
            price={item.price}
            offer={item.offer}
          />
        )}
      />
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
});
