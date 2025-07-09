import {
  Dimensions,
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
} from "react-native";
import React from "react";
import Colors from "../theme/Colors";
import images from "../theme/Images";
// import {TextInput} from 'react-native-gesture-handler';
import scaleFont from "./ScallingUtility";
import Fonts from "../theme/Fonts";
import Strings from "../theme/Strings";
// import {Image} from 'react-native-feather';
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

interface CustomeSearchBars {
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  rigthImage?: object;
  style?: object;
  //   styleConatiner?: object;
  secureTextEntry?: boolean;
}

const CustomeSearchBar: React.FC<CustomeSearchBars> = ({
  placeholder,
  value,
  onChangeText,
  rigthImage,
  style,
  secureTextEntry,
}) => {
  return (
    <View style={styles.searchbarContainer}>
      <Image source={images.logo15} style={styles.searchBarImageStyle} />
      <TextInput
        style={styles.input}
        placeholder={Strings.searchByProduct}
        // value = {value}
        onChangeText={onChangeText}
        autoCapitalize="none"
      />
    </View>
  );
};

export default CustomeSearchBar;

const styles = StyleSheet.create({
  searchbarContainer: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.05,
    backgroundColor: "#F1F1F1",
    flexDirection: "row",
    // justifyContent: 'center',
    alignItems: "center",
    paddingLeft: "3%",
    borderRadius: 4,
  },
  searchBarImageStyle: {
    width: 20,
    height: 20,
  },
  input: {
    fontSize: scaleFont(16),
    fontFamily: Fonts.PoppinsNormal,
    marginLeft: "4%",
  },
});
