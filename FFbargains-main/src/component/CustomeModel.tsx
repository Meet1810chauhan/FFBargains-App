import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import Strings from "../theme/Strings";

// const sortData: any[] = [
//   "Newest",
//   "Popular",
//   "Price: High to Low",
//   "Price: Low to High",
// ];
const CustomeModel = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Button title={Strings.openModal} onPress={() => setModalVisible(true)} />
      <Modal
        isVisible={modalVisible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropColor="rgba(0,0,0,0.5)"
        backdropOpacity={1} // Controls transparency
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)} // Closes when clicking outside
      >
        <View style={styles.modalContent}>
          {/* <Text>Hello, this is a modal!</Text>
          <Button title="Close" onPress={() => setModalVisible(false)} /> */}
          <Text>Sort By</Text>
          {/* {sortData.map((item, idx) => (
            <TouchableOpacity key={idx}>
              <Text style={styles.sortbyTextStyle}> {item}</Text>
            </TouchableOpacity>
          ))} */}
        </View>
      </Modal>
    </View>
  );
};

export default CustomeModel;

const styles = StyleSheet.create({
  container: { flex: 1 },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  sortbyTextStyle: {
    fontSize: 16,
  },
});
