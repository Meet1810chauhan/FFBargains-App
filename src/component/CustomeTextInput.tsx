import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import images from "../theme/images";
import Colors from "../theme/colors";

interface CustomTextInputProps {
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  rightImageClose?: object;
  rightImageOpen?: object;
  style?: object;
  styleConatiner?: object;
  secureTextEntry?: boolean;
  textStyle?: object;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  placeholder,
  // setSecureText = false,
  value,
  onChangeText,
  rightImageClose,
  rightImageOpen,
  style,
  styleConatiner,
  secureTextEntry = false, // Controls whether text should be hidden by default
}) => {
  const [secureText, setSecureText] = useState(secureTextEntry); // State for toggling visibility
  return (
    <View style={[styles.container, styleConatiner]}>
      <View style={[styles.inputContainer, style]}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          secureTextEntry={secureText}
          onChangeText={onChangeText}
          autoCapitalize="none"
        />
        {rightImageClose && rightImageOpen ? ( // Only show icon if both images are provided
          <TouchableOpacity onPress={() => setSecureText(!secureText)}>
            <Image
              style={styles.imgStyle}
              source={secureText ? rightImageOpen : rightImageClose} // Toggle images
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default CustomTextInput;
const styles = StyleSheet.create({
  container: {
    marginTop: "5%",
    // overflow :'visible',
    // marginTop: 300,
    // height: '80%',
    width: "100%",
    // alignItems: 'flex-start',
    // flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    // borderWidth: 1,
    borderRadius: 23,
    paddingHorizontal: 10,
    width: "95%",
    height: 50,
    borderBottomColor: "black",
    // backgroundColor: Colors.aqua,
    borderBottomWidth: 1,
    marginLeft: "0%",
    marginRight: "7%",
    // backgroundColor: 'red',
  },
  input: {
    // flex: 1,

    fontSize: 20,
    paddingVertical: 12,
    width: "80%",
    // width: "90%",
    marginLeft: 8,
    marginRight: 3,
  },
  eyeIcon: {
    marginLeft: 10,
  },
  imgStyle: {
    marginLeft: 3,
    height: 20,
    width: 20,
  },
});
