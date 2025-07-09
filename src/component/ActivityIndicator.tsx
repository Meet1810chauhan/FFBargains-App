import { StyleSheet, Text, View, ActivityIndicator, Modal } from "react-native";
import React, { useState } from "react";
import Colors from "../theme/Colors";
import Strings from "../theme/Strings";
import scaleFont from "./ScallingUtility";
import Fonts from "../theme/Fonts";

interface ActivityIndicators {
  //   loading: boolean,
  size?: "small" | "large";
  isVisile?: boolean;
}

const CustomeActivityIndicator: React.FC<ActivityIndicators> = ({
  //   loading,
  size = "small",
  isVisile = false,
}) => {
  return (
    <Modal animationType="none" transparent={true} visible={isVisile}>
      <View style={styles.container}>
        <View style={styles.viewModal}>
          <ActivityIndicator size={size} color={Colors.darkBlue} />
          <Text style={styles.textPleaseWait}>{Strings.pleaseWait}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default CustomeActivityIndicator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "rgba(0,0,0,0.5)",
    backgroundColor: Colors.black + "50",
  },

  viewModal: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 15,
    backgroundColor: Colors.white,
  },
  textPleaseWait: {
    fontSize: scaleFont(16),
    fontFamily: Fonts.PoppinsNormal,
    color: Colors.lightGray,
  },
});
