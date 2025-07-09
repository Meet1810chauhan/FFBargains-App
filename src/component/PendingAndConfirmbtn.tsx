import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Colors from "../theme/Colors";
import Strings from "../theme/Strings";
import Fonts from "../theme/Fonts";

interface PendingAndConfirmbtns {
  name: "pending" | "confirmed";
  onPressBtn: () => void;
  style?: object;
  selectOrderHistory: string;
}

const PendingAndConfirmbtn: React.FC<PendingAndConfirmbtns> = ({
  name,
  onPressBtn,
  style,
  selectOrderHistory,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.pendingbutton,
        {
          backgroundColor:
            selectOrderHistory === "pending"
              ? Colors.darkBlue
              : selectOrderHistory === "confirmed"
              ? Colors.green
              : Colors.white,
        },
      ]}
      onPress={onPressBtn}
    >
      <Text
        style={[
          styles.buttonText,
          {
            color:
              selectOrderHistory === "pending" ? Colors.white : Colors.black,
          },
        ]}
      >
        {Strings.name}
      </Text>
    </TouchableOpacity>
  );
};

export default PendingAndConfirmbtn;

const styles = StyleSheet.create({
  pendingbutton: {
    width: "49%",
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: Fonts.PoppinsMediium,
    color: Colors.black,
  },
});
