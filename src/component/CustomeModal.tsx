import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useState } from "react";

import Strings from "../theme/Strings";
import Colors from "../theme/Colors";
import CustomeButton from "./CustomeButton";
import scaleFont from "./ScallingUtility";
import Fonts from "../theme/Fonts";
import { useAppDispatch } from "../redux/hooks";

interface CustomeModals {
  text1?: string;
  text2?: string;
  text3?: string;
  isVisible?: boolean;
  onPressBtn?: () => void;
  onClose: () => void;
}
const CustomeModal: React.FC<CustomeModals> = ({
  isVisible,
  text1,
  text2,
  text3,
  onPressBtn,
  onClose,
}) => {
  // const [modalVisible, setModalVisible] = useState(false);

  return (
    <Modal animationType="none" transparent={true} visible={isVisible}>
      <View style={styles.container}>
        <View style={styles.viewModal}>
          <Text style={styles.areYouSureText}>{text1}</Text>
          <Text style={styles.areYouSureLogouttext}>{text2}</Text>
          <Text style={styles.loginAgainTextStyle}> {text3}</Text>
          <CustomeButton
            name={Strings.logout}
            style={styles.logoutbuttonStyle}
            onPress={onPressBtn}
            buttonTextStyle={styles.logoutText}
          />
          <CustomeButton
            name={Strings.cancel}
            style={styles.cancelButtonStyle}
            onPress={onClose}
            buttonTextStyle={styles.cancelBtntText}
          />
        </View>
      </View>
    </Modal>
  );
};

export default CustomeModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    // backgroundColor: Colors.black + "50",
  },

  viewModal: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 15,
    backgroundColor: Colors.white,
    width: "90%",
  },
  areYouSureText: {
    fontSize: scaleFont(24),
    fontFamily: Fonts.PoppinsMediium,
    marginTop: "4%",
    textAlign: "center",
    color: Colors.red,
  },
  areYouSureLogouttext: {
    marginTop: "2%",
    fontFamily: Fonts.PoppinsNormal,
    fontSize: scaleFont(16),
    textAlign: "center",
  },
  loginAgainTextStyle: {
    fontFamily: Fonts.PoppinsNormal,
    fontSize: scaleFont(16),
    textAlign: "center",
  },
  logoutbuttonStyle: {
    marginTop: "4%",
    width: "90%",
    borderColor: Colors.white,
    backgroundColor: Colors.red,
    borderRadius: 5,
    marginBottom: 0,
    fontFamily: Fonts.PoppinsNormal,
  },
  cancelButtonStyle: {
    marginTop: "2%",
    width: "90%",
    borderColor: Colors.white,
    backgroundColor: "#F9F9FA",
    borderRadius: 5,
    marginBottom: "6%",

    fontFamily: Fonts.PoppinsNormal,
  },
  cancelBtntText: {
    color: Colors.black,
    fontFamily: Fonts.PoppinsNormal,
  },
  logoutText: {
    fontFamily: Fonts.PoppinsNormal,
  },
});
