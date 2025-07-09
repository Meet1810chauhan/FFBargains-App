import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import CustomeSearchBar from "../component/CustomeSearchBar";
import Colors from "../theme/Colors";
import CustomeHeader from "../component/CustomeHeader";
import CustomeModel from "../component/CustomeModal";
import CustomeCardComponent from "../component/CustomeCardComponent";
import images from "../theme/Images";
import CustomeProductDetails from "../component/ProductList";
import Strings from "../theme/Strings";
import { productArray } from "../../types/ProductState";
import ApiServices from "../services/ApiServices";
import CustomeActivityIndicator from "../component/ActivityIndicator";

const Product = () => {
  // const [allData, setAllData] = useState<Array<productArray>>([]);
  const [allData, setAllData] = useState<productArray[]>([]);

  const [loading, setLoading] = useState(false);

  const product = async () => {
    setLoading(true);

    try {
      const response = await ApiServices({
        method: "GET",
        apilasturlname: `products`,
      });
      // console.log();

      if (response.payload.data) {
        setLoading(false);
        setAllData(response.payload.data);
        // console.log("Response set with product : --", response.payload.data);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    product();
  }, []);

  if (!allData) {
    return <CustomeActivityIndicator isVisile={loading} />;
  }
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
        renderItem={({ item }) => <CustomeCardComponent product={item} />}
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
