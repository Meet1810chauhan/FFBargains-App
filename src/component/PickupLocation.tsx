import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React from "react";
import Colors from "../theme/Colors";
import Fonts from "../theme/Fonts";
import CustomeText from "./CustomeText";
import images from "../theme/Images";
import CustomeButton from "./CustomeButton";

const { width } = Dimensions.get("window");

interface PickupLocations {
  selectOption?: boolean;
  onSelect: () => void;
  editAddress?: () => void;
}

const PickupLocation: React.FC<PickupLocations> = ({
  selectOption,
  onSelect,
  editAddress,
}) => {
  return (
    <TouchableOpacity onPress={onSelect} style={styles.container}>
      <View style={styles.selectButtonContainer}>
        {selectOption && <View style={styles.selectButton} />}
      </View>
      <View style={styles.addressContainer}>
        <CustomeText text={"OSWEGO, NY, USA "} style={styles.countryText} />
        <CustomeText
          text={"755 E Seneca St, Oswego, N127, Oswego, NY 1312 "}
          style={styles.addressText}
          numberOfLines={1}
        />
      </View>
      <TouchableOpacity>
        {editAddress ? (
          <Image source={images.logoPenEdit} />
        ) : (
          <Image source={images.logoRidhtForward} />
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default PickupLocation;

const styles = StyleSheet.create({
  container: {
    width: width * 0.91,
    // height: 52,
    borderWidth: 1,
    borderRadius: 7,
    marginTop: "2%",
    flexDirection: "row",
    alignItems: "center",
    borderColor: Colors.lightGray,
    paddingHorizontal: "2%",
    justifyContent: "space-between",
    paddingVertical: "2%",
  },
  selectButtonContainer: {
    height: 19,
    width: 19,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2C2C2C",
    justifyContent: "center",
    alignItems: "center",
  },
  selectButton: {
    height: 14,
    width: 14,
    borderRadius: 7,
    backgroundColor: Colors.darkBlue,
  },
  addressContainer: {
    width: width * 0.75,
    paddingLeft: "2%",
    // backgroundColor: "red",
    // alignItems: "center",
    // justifyContent: "center",
  },
  countryText: {
    fontSize: 14,
    fontFamily: Fonts.PoppinsMediium,
    color: Colors.darkBlue,
    lineHeight: 18,
  },
  addressText: {
    fontSize: 13,
    fontFamily: Fonts.PoppinsNormal,
    color: Colors.charlestonGreen,
    lineHeight: 18,
    maxWidth: "95%",
  },
});
