import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import Fonts from "../theme/Fonts";
import { Dimensions } from "react-native";
import scaleFont from "./ScallingUtility";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

interface CustomeDemoPage {
  imageScreen: object;
  headerText: string;
  descriptionText: string;
}
const CustomeOnBoarding: React.FC<CustomeDemoPage> = ({
  imageScreen,
  headerText,
  descriptionText,
}) => {
  return (
    <View style={styles.container}>
      <Image source={imageScreen} style={styles.imageScreen} />
      <Text style={styles.headerText}>{headerText}</Text>
      <View style={styles.ContainerOfDescription}>
        <Text style={styles.descriptionText}>{descriptionText}</Text>
      </View>
    </View>
  );
};

export default CustomeOnBoarding;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: windowHeight * 0.73,
    width: windowWidth,
    // backgroundColor: 'red',
  },
  imageScreen: {
    alignSelf: "center",
    marginTop: "6%",
    width: "90%",
    height: "63%",
    resizeMode: "contain",
    marginHorizontal: 12,
  },
  headerText: {
    fontSize: scaleFont(24),
    marginTop: "13%",
    fontFamily: Fonts.PoppinsMediium,
    alignSelf: "center",
  },
  descriptionText: {
    fontSize: scaleFont(20),
    marginTop: "3%",
    maxWidth: "90%",
    fontFamily: Fonts.PoppinsNormal,
    // alignSelf: 'flex-end',
    textAlign: "center",
  },
  ContainerOfDescription: {
    // maxWidth: '100%',
    // backgroundColor: 'red',
    justifyContent: "center",
    alignItems: "center",
  },
});
