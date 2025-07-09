import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Colors from "../theme/Colors";
import CustomeText from "./CustomeText";
import Fonts from "../theme/Fonts";
import scaleFont from "./ScallingUtility";
import images from "../theme/Images";
import { useAppSelector } from "../redux/hooks";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";
const { width, height } = Dimensions.get("window");

interface DeliveryAddressItem {
  onPress?: () => void;
}
const DeliveryAddressListItem: React.FC<DeliveryAddressItem> = ({
  onPress,
}) => {
  const userData = useAppSelector((state) => state.user);
  const navigation = useNavigation();
  //   }, []);

  if (!userData) {
    return <View></View>;
  }
  return (
    <View style={styles.container}>
      {/* <Text>DeliveryAddressListItem</Text> */}
      <CustomeText
        text={userData.address?.name}
        style={styles.nameAndEmailtext}
        numberOfLines={1}
      />
      <CustomeText
        text={userData.email}
        numberOfLines={1}
        style={styles.nameAndEmailtext}
      />
      <CustomeText
        text={`+${userData.address?.country_code} ${userData.address?.phone_number}`}
        style={styles.mobilenodAddresstext}
        numberOfLines={1}
      />
      <CustomeText
        text={`${userData.address?.street_address}`}
        style={styles.mobilenodAddresstext}
        numberOfLines={2}
      />

      <CustomeText
        text={`${userData.address?.city} ${userData.address?.state} ${userData.address?.zipcode} ${userData.address?.country}`}
        style={styles.mobilenodAddresstext}
        numberOfLines={1}
      />
      <TouchableOpacity style={styles.editAddressImage} onPress={onPress}>
        <Image source={images.logoAddressEdit} />
      </TouchableOpacity>
    </View>
  );
};

export default DeliveryAddressListItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width * 0.92,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: Colors.white,
    backgroundColor: Colors.white,
    // backgroundColor: "red",
    borderRadius: 8,
    shadowColor: Colors.black,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      height: 2,
      width: 1,
    },
    elevation: 4,
    // padding: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  nameAndEmailtext: {
    fontFamily: Fonts.PoppinsMediium,
    fontSize: scaleFont(14),
    color: Colors.charlestonGreen,
    marginRight: 10,
  },
  mobilenodAddresstext: {
    color: Colors.darkGray,
    marginRight: 10,
  },
  editAddressImage: {
    position: "absolute",
    right: 10,
    top: 10,
  },
});
