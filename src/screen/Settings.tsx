import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../theme/Colors";
import CustomeHeader from "../component/CustomeHeader";
import images from "../theme/Images";
import Strings from "../theme/Strings";
import ProfileMenu from "../component/ProfileMenu";
import CustomeButton from "../component/CustomeButton";
import Fonts from "../theme/Fonts";
import scaleFont from "../component/ScallingUtility";
import auth, { firebase } from "@react-native-firebase/auth";
import {
  CommonActions,
  NavigationContainer,
  useNavigation,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";
import showCustomToast from "../component/CustomeToast";
import CustomeModal from "../component/CustomeModal";
import ApiServices from "../services/ApiServices";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setIsLogin } from "../redux/IsLoginSlice";
import { logoutUser, setUser } from "../redux/UserSlice";

const { width } = Dimensions.get("window");
type NavigationProps = StackNavigationProp<RootStackParamList, "OnBoarding">;

const menuItem = [
  {
    id: 1,
    menuName: Strings.aboutus,
  },
  {
    id: 2,
    menuName: Strings.contactus,
  },
  {
    id: 3,
    menuName: Strings.applyKoalafi,
  },
  {
    id: 4,
    menuName: Strings.refundAndCancelation,
  },
  {
    id: 5,
    menuName: Strings.privacyPolicy,
  },
  {
    id: 6,
    menuName: Strings.termsAndConditions,
  },
];
const Setting = () => {
  const navigation = useNavigation<NavigationProps>();
  const [modalIsVisible, setmodalVisible] = useState(false);
  const userAccessToken = useAppSelector((state) => state.user.access_token);
  const userData = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  // useEffect(() => {

  //   }
  //   // dispatch(setUser());
  // });
  const handleLogoutFunctionm = async () => {
    setmodalVisible(false);
    dispatch(setIsLogin(false));

    // let idTokens: string = "";
    // const user = firebase.auth().currentUser;
    // console.log("++++++++++", user);

    // if (user) {
    //   const token = await user.getIdToken();
    //   idTokens = token;
    //   console.log("PPPPPPPP @!#!% ", token);
    // }

    // console.log("AccessToken --- ", userAccessToken);
    try {
      const response = await ApiServices({
        apilasturlname: "logout",
        // idToken: userAccessToken,
        access_token: userAccessToken,
      });

      dispatch(
        setUser({
          id: "",
          name: "",
          email: "",
          profile_image: "",
          country_code: 0,
          country_iso: "",
          contact_number: 0,
          address: null,
          access_token: "",
          default_delivery_method: "",
          pickup_location_id: null,
          stripe_customer_id: "",
          stripe_payment_id: null,
          is_offline_user: 0,
        })
      );
      // dispatch(logoutUser());

      console.log("UserData check :--");
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Login" }],
        })
      );
      // console.log("logout --- ", userAccessToken);
      // console.log("%%%%----", response);

      // auth()
      //   .signOut()
      //   .then(() => {
      //     console.log("LogOut");

      //     navigation.dispatch(
      //       CommonActions.reset({
      //         index: 0,
      //         routes: [{ name: "Login" }],
      //       })
      //     );
      //   });
    } catch (error: any) {
      showCustomToast({
        type: "error",
        text1: "Logout Failed",
        text2: error.message,
      });
    }
  };
  return (
    <View style={styles.container}>
      <CustomeHeader title="Settings" showBackButton={true} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {menuItem.map((item, idx) => (
          <View key={item.id}>
            <ProfileMenu menuItemName={item.menuName} />
            {idx == 2 && <View style={styles.menuItemBeteenSpace} />}
          </View>
        ))}
      </ScrollView>

      <CustomeButton
        name={Strings.logout}
        style={styles.logoutbuttonStyle}
        buttonTextStyle={styles.logoutTextStyle}
        onPress={() => setmodalVisible(true)}
      />

      <CustomeButton
        name={Strings.deleteAccount}
        style={styles.deleteAccountButtonStyle}
        buttonTextStyle={styles.deleteAccountTextStyle}
      />

      <CustomeModal
        isVisible={modalIsVisible}
        text1={Strings.confirmLogout}
        text2={Strings.areYouSureLogOut}
        text3={Strings.youWillLoginAgain}
        onPressBtn={handleLogoutFunctionm}
        onClose={() => setmodalVisible(false)}
      />
      <Text style={styles.verionTextStyle}> {Strings.version}</Text>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  menuItemBeteenSpace: { height: 5, backgroundColor: "#F1F1F1" },
  logoutbuttonStyle: {
    // marginTop: "60%",
    width: "90%",
    borderColor: "#1A117A",
    backgroundColor: Colors.white,
    borderRadius: 5,
    marginBottom: 0,
  },
  logoutTextStyle: {
    color: "#1A117A",
    fontFamily: Fonts.PoppinsMediium,
    fontSize: scaleFont(20),
  },
  deleteAccountButtonStyle: {
    marginTop: "3%",
    borderColor: Colors.red,
    backgroundColor: Colors.white,
    borderRadius: 5,
    width: "90%",
  },
  deleteAccountTextStyle: {
    color: Colors.red,
    fontFamily: Fonts.PoppinsMediium,
    fontSize: scaleFont(20),
  },
  verionTextStyle: {
    fontFamily: Fonts.PoppinsNormal,
    fontSize: scaleFont(16),
    alignSelf: "center",
    marginTop: "3%",
    marginBottom: "2%",
  },
});
