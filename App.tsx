import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import OnBoarding from "./src/screen/OnBoarding";
import CustomeOnBoarding from "./src/component/CustomeOnBoarding";
import images from "./src/theme/Images";
import Strings from "./src/theme/Strings";
import StackNav from "./src/navigation/StackNav";
import Login from "./src/screen/Login";
import { StatusBar } from "react-native";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import Fonts from "./src/theme/Fonts";
import { toastConfig } from "./config";

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />

        {/* <CustomeOnBoarding
          imageScreen={images.logo1}
          headerText={Strings.allProductSell}
          descriptionText={Strings.allProductSellDescription}
        /> */}
        {/* <OnBoarding /> */}
        <StackNav />
        {/* <Login /> */}
        <Toast config={toastConfig} />
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
