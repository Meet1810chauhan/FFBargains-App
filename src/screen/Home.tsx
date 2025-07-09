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
import Toast from "react-native-toast-message";
import { ToastProvider } from "react-native-toast-notifications";
import { useToast } from "react-native-toast-notifications";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import ApiComponent from "../component/ApiComponent";
import ApiServices from "../services/ApiServices";
// import { setUser } from "../redux/UserSlice";

const { width } = Dimensions.get("window");
type NavigationProps = StackNavigationProp<RootStackParamList, "OnBoarding">;

const Home = () => {
  const navigation = useNavigation<NavigationProps>();
  const userToken = useAppSelector((state) => state.user.access_token);
  const dispatch = useAppDispatch();
  const [flashSaleData, setFlashSaleData] = useState([]);
  const [newArrivalData, setNewArrivalData] = useState([]);
  const [item, setItem] = useState(["ArrivalData", "flashsaleData"]);
  const isLogin = useAppSelector((state) => state.login.isLogin);

  // const [allData, setAllData] = useState<
  //   Array<{
  //     id: number;
  //     producName: string;
  //     image: any;
  //     descriptionProduct: string;
  //     priceSell: number;
  //     price: number;
  //     offer: number;
  //   }>
  // >([]);

  const getData = async () => {
    try {
      const response = await ApiServices({
        method: "GET",
        apilasturlname: "home",
        // idToken: userAccessToken,
      });
      if (response) {
        setFlashSaleData(response.payload.flash_sale);
        setNewArrivalData(response.payload.new_arrivals);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("Homeee Login True or false flage : -- ", isLogin);
    console.log("Access Tooken -+-+-+-+", userToken);

    getData();
  }, []);
  const viewallProductfunction = (item: string) => {
    navigation.navigate("ViewAllProduct", { categories: item });

    console.log("Data of ", item);
  };

  console.log("getData : -- ", getData);

  return (
    <View style={styles.container}>
      <CustomeHeader
        title="Home"
       
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <CustomeProductDetails
          leftHeaderText={Strings.newestArrivals}
          rightButtonText={Strings.viewAll}
          imageRightButton={images.logo10}
          dataofArray={newArrivalData}
          onPressProductList={() => viewallProductfunction("newestArrivals")}
          horizontalScroll={true}
        />
        <CustomeProductDetails
          leftHeaderText={Strings.flash}
          rightButtonText={Strings.viewAll}
          imageRightButton={images.logo10}
          dataofArray={flashSaleData}
          onPressProductList={() => viewallProductfunction("flashSale")}
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
