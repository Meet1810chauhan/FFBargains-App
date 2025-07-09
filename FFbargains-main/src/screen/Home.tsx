import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types"; // Import your navigation types
import CustomeCardComponent from "../component/CustomeCardComponent";
import Fonts from "../theme/Fonts";
import images from "../theme/Images";
import Colors from "../theme/Colors";
import scaleFont from "../component/ScallingUtility";
import Strings from "../theme/Strings";
import CustomeProductDetails from "../component/ProductList";
import CustomeHeader from "../component/CustomeHeader";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const { width } = Dimensions.get("window");
type NavigationProps = StackNavigationProp<RootStackParamList, "OnBoarding">;

const Home = () => {
  const navigation = useNavigation<NavigationProps>();

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
  const viewallProductfunction = () => {
    navigation.navigate("Product", {});
  };
  return (
    <View style={styles.container}>
      <CustomeHeader
        title="Home"
        // leftSideButtonImage={images.logobackButton}
        // showBackButton={true}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <CustomeProductDetails
          leftHeaderText={Strings.flash}
          rightButtonText={Strings.viewAll}
          imageRightButton={images.logo10}
          dataofArray={allData}
          onPressProductList={viewallProductfunction}
          horizontalScroll={true}
        />
        <CustomeProductDetails
          leftHeaderText={Strings.newestArrivals}
          rightButtonText={Strings.viewAll}
          imageRightButton={images.logo10}
          dataofArray={allData}
          onPressProductList={viewallProductfunction}
          horizontalScroll={true}
        />
        <CustomeProductDetails
          leftHeaderText={Strings.newestArrivals}
          rightButtonText={Strings.viewAll}
          imageRightButton={images.logo10}
          dataofArray={allData}
          onPressProductList={viewallProductfunction}
          horizontalScroll={true}
        />
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
});
