import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  PixelRatio,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useEffect } from "react";
import Colors from "../theme/Colors";
import CustomeHeader from "../component/CustomeHeader";
import scaleFont from "../component/ScallingUtility";
import Fonts from "../theme/Fonts";
import images from "../theme/Images";
import CustomeText from "../component/CustomeText";
import ProfileMenu from "../component/ProfileMenu";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";
import ResponsiveImage from "react-native-responsive-image";
import Strings from "../theme/Strings";
import { useAppSelector } from "../redux/hooks";
import { UserDatas } from "../../types/UserState";

// import { Image } from "react-native-feather";
const { width, height } = Dimensions.get("window");
const scaleSize = (size: number) => size * PixelRatio.get();

type NavigationProps = StackNavigationProp<RootStackParamList, "OnBoarding">;
type EditprofileNavProps = StackNavigationProp<
  RootStackParamList,
  "EditProfile"
>;

const menuItem = [
  {
    id: 1,
    menuName: Strings.orderHistory,
  },
  // {
  //   id: 2,
  //   menuName: Strings.liveAuction,
  // },
  // {
  //   id: 3,
  //   menuName: Strings.ffsteals,
  // },
  // {
  //   id: 4,
  //   menuName: Strings.waffels,
  // },
  // {
  //   id: 6,
  //   menuName: Strings.referandEarn,
  // },
  {
    id: 7,
    menuName: Strings.address,
  },
  {
    id: 8,
    menuName: Strings.paymentMethods,
  },
  {
    id: 9,
    menuName: Strings.setting,
  },
];

const Profile = () => {
  const navigation = useNavigation<NavigationProps>();
  // const userData = useAppSelector((state) => state.user);
  const pofileName = useAppSelector((state) => state.user.name);
  const profileEmail = useAppSelector((state) => state.user.email);
  const address = useAppSelector((state) => state.user.address);
  const profileCountry_code = useAppSelector(
    (state) => state.user.country_code
  );
  const profileImage = useAppSelector((state) => state.user.profile_image);

  const profileContactNumber = useAppSelector(
    (state) => state.user.contact_number
  );

  // const itemMenuhandlefun = () => {
  //   navigation.navigate("Home", {});
  // };
  // useEffect(() => {
  //   console.log(" user data : ", userData);
  //   // console.log(" isuser data : ", isuser.payload.name);
  //   // console.log("------ --- -- ", isuser.name);
  // });

  const Setting = () => {
    navigation.navigate("Setting", {});
  };

  const EditProfileHandle = () => {
    navigation.navigate("EditProfile", {});
  };

  const OrderHistory = () => {
    navigation.navigate("OrderHistory", {});
  };
  const DeliveryAddress = () => {
    navigation.navigate("DeliveryAddress", {});
  };
  return (
    <View style={styles.container}>
      {/* console.log(" isuser data : " ,isuser); */}
      <CustomeHeader title={Strings.profile} showRightButton={true} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileimageAndEmailContainer}>
          {/* <Image source={images.logoProfile} style={styles.profileImageStyle} /> */}
          <Image
            source={{ uri: profileImage }}
            style={styles.profileImageStyle}
          />

          {/* <ResponsiveImage
          source={images.logoProfile}
          initWidth="64"
          initHeight="64"
          borderRadius={42.5}
        /> */}
          <View style={styles.profileInfoContainer}>
            <View style={styles.profileTextContainer}>
              <CustomeText
                text={pofileName}
                style={styles.profileNameStyle}
                numberOfLines={1}
                ellipsizeMode="tail"
              />
              <CustomeText
                text={profileEmail}
                style={styles.profileEmailStyle}
                numberOfLines={1}
                ellipsizeMode="tail"
              />

              <CustomeText
                text={`+${profileCountry_code} ${profileContactNumber}`}
                style={styles.profilephoneStyle}
                numberOfLines={1}
                ellipsizeMode="tail"
              />
            </View>

            <TouchableOpacity
              style={styles.editProfileBtnStyle}
              onPress={EditProfileHandle}
            >
              <Text style={styles.editProfileText}>{Strings.editProfile}</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* <View style={styles.profileContainerAnddMenuItemSpace}></View> */}

        {menuItem.map((item, idx) => (
          <View key={item.id}>
            <ProfileMenu
              menuItemName={item.menuName}
              onPressMenu={
                item.id == 9
                  ? Setting
                  : item.id == 1
                  ? OrderHistory
                  : item.id == 7
                  ? DeliveryAddress
                  : null
              }
            />
            {/* {(idx == 2 || idx == 5 || idx == 1 || idx == 3 || idx == 0) && (
              <View style={styles.profileContainerAnddMenuItemSpace} />
            )} */}
            {(idx == 2 || idx == 0) && (
              <View style={styles.profileContainerAnddMenuItemSpace} />
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  profileimageAndEmailContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "4%",
    paddingHorizontal: "3%",
    paddingBottom: "3%",
  },
  profileImageStyle: {
    height: width * 0.18,
    width: width * 0.18,
    borderRadius: width * 0.09,
  },
  profileInfoContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    // justifyContent: "space-between",
    marginLeft: "3%",
    // backgroundColor: "red",
  },
  profileTextContainer: {
    flex: 1,
    // backgroundColor: "blue",
  },
  profileNameStyle: {
    fontSize: scaleFont(16),
    lineHeight: 22,
    fontFamily: Fonts.PoppinsMediium,
  },
  profileEmailStyle: {
    fontSize: scaleFont(12),
    marginTop: "1%",
    lineHeight: 18,
    fontFamily: Fonts.PoppinsNormal,
    maxWidth: "100%",
  },
  profilephoneStyle: {
    fontSize: scaleFont(12),
    lineHeight: 18,
    fontFamily: Fonts.PoppinsNormal,
    maxWidth: "80%",
  },
  editProfileBtnStyle: {
    marginLeft: "3%",
    paddingVertical: 0,
    paddingHorizontal: 1,
    marginBottom: "16%",
  },
  editProfileText: {
    textDecorationLine: "underline",
    color: Colors.darkBlue,
    fontSize: scaleFont(13),
    fontFamily: Fonts.PoppinsMediium,
  },
  profileContainerAnddMenuItemSpace: {
    height: 5,
    backgroundColor: "#F1F1F1",
  },
});
