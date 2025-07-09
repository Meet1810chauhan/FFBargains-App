import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const IMAGE_SIZE = windowWidth * 0.42;

interface CustonBtn {
  style?: object;
  image: object;
  onPressLogo?: () => void;
}
const CustomelogoButton: React.FC<CustonBtn> = ({
  style,
  image,
  onPressLogo,
}) => {
  return (
    <View>
      <TouchableOpacity style={[styles.innercontainer, style]}>
        <Image source={image} style={styles.img} />
      </TouchableOpacity>
    </View>
  );
};

export default CustomelogoButton;

const styles = StyleSheet.create({
  innercontainer: {
    borderColor: "gray",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: 'red',
    height: 48,
    width: 48,
    borderWidth: 0.3,
    borderRadius: 10,
    // marginRight: '3%',
  },

  img: {
    resizeMode: "contain",
  },
});
