import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import CustomeHeader from "../component/CustomeHeader";
import Strings from "../theme/Strings";
import Colors from "../theme/Colors";
import CustomeCardComponent from "../component/CustomeCardComponent";
import Fonts from "../theme/Fonts";
import scaleFont from "../component/ScallingUtility";
import ApiServices from "../services/ApiServices";
import { productArray, productDetails } from "../../types/ProductState";
import { isAnyOf } from "@reduxjs/toolkit";
const windowWidth = Dimensions.get("window").width;

const ViewAllProduct = ({ route }: any) => {
  const [data, setData] = useState<productArray[]>([]);
  const { categories } = route.params;
  const [page, setPage] = useState(1);
  const [isloader, setLoader] = useState(false);
  const [hasMore, sethasMore] = useState(true);
  const [endreach, setEndreach] = useState(true);
  // const maxPage = 1;
  // const pageRef = useRef(endreach);
  // const pageRef = useRef(true);

  const pageRef = useRef(false);
  // const pageRef = useRef(false);
  // let simpleVar = 0;

  const getData = async () => {
    // if (!hasMore) {
    //   return;
    // }

    if (!hasMore || isloader) return;

    //  if (!hasMore || isloader || pageRef.current) return;

    try {
      setLoader(true);
      // pageRef.current = true;
      pageRef.current = true;

      // if (categories == "flashSale") {
      //   const response = await ApiServices({
      //     method: "GET",
      //     apilasturlname: `products?flash_sale=true`,
      //   });
      //   if (response) {
      //     setData(response.payload.data);
      //   }
      // } else {
      //   const response = await ApiServices({
      //     method: "GET",
      //     apilasturlname: `products${categories ==='flashSale'?'products?flash_sale=true':'products'}`,
      //   });
      //   if (response) {
      //     setData(response.payload.data);
      //   }
      // }

      let endpoint = `products?page=${page}`;
      if (categories === "flashSale") {
        endpoint = `products?flash_sale=true&page=${page}`;
      }
      console.log(endpoint);

      const response = await ApiServices({
        method: "GET",
        // apilasturlname: `products${
        //   categories === "flashSale" ? "?flash_sale=true" : `?page=1`
        // }`,
        apilasturlname: endpoint,
      });
      console.log("Api Call : :  -- ");

      if (response.payload.data) {
        setLoader(false);
        setData((prevData) => [...(prevData || []), ...response.payload.data]);

        //  setData((prevData) => [...prevData, ...response.payload.data]);

        // pageRef.current = false;
        pageRef.current = false;

        console.log(" pageRef.current ", pageRef.current);
        // response.payload.meta.last_page === page && sethasMore(false);
        if (
          // response.payload.data.length === 0 ||
          response.payload.meta.last_page <= page
        ) {
          sethasMore(false);
        }

        //   if (response.payload.meta.last_page <= page) {
        //   setHasMore(false);
        // }
        console.log("Page N :", page);
      }
    } catch (error) {
      console.log("error -- ", error);
      setLoader(false);
    }
  };

  //  } catch (error) {
  //     console.log("API Error:", error);
  //   } finally {
  //     setLoader(false);
  //     pageRef.current = false;
  //   }
  // };
  useEffect(() => {
    getData();
    console.log("UseEffect Call ");
    console.log("Page ---- ", page);
  }, [page]);

  const handleLoadMorePage = () => {
    // setPage((prevPage) => prevPage + 1);
    if (!pageRef.current) setPage((prevPage) => prevPage + 1);

    // if (!pageRef.current) setPage((prevPage) => prevPage + 1);

    // simpleVar += 1;
    console.log("Page Number:", page);
    // console.log("Page Number:", simpleVar);
  };
  return (
    <View style={styles.container}>
      <CustomeHeader title={Strings.viewAll} showBackButton={true} />
      {/* <ActivityIndicator size={"large"} color={Colors.blue}></ActivityIndicator> */}
      {categories === "flashSale" ? (
        <View>
          <Text style={styles.categoriesText}>{Strings.flash}</Text>
        </View>
      ) : (
        <View>
          <Text style={styles.categoriesText}>{Strings.newestArrivals}</Text>
        </View>
      )}
      <FlatList
        data={data}
        numColumns={2} // If horizontal to 1 column; otherwise- 2
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        // keyExtractor={(item) =>
        // item?.id ? item.id.toString() : Math.random().toString()
        // }
        keyExtractor={(item) => item?.id?.toString() ?? `key-${Math.random()}`}
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
        // onEndReached={() => handleLoadMorePage()}
        onEndReached={() => !pageRef.current && handleLoadMorePage()}
        onEndReachedThreshold={0.9}
        // onMomentumScrollBegin={() => }
        ListFooterComponent={() => (
          <View style={styles.footerLoaderStyle}>
            {isloader && (
              <ActivityIndicator
                size={"large"}
                color={Colors.blue}
              ></ActivityIndicator>
            )}
          </View>
        )}
      />
    </View>
  );
};

export default ViewAllProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  footerLoaderStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  categoriesText: {
    marginVertical: "2%",
    fontFamily: Fonts.PoppinsMediium,
    fontSize: scaleFont(20),
    marginLeft: "4%",
  },
});
