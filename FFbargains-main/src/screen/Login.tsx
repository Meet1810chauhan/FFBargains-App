import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Dimensions } from "react-native";
import images from "../theme/Images";
import Colors from "../theme/Colors";
import Strings from "../theme/Strings";
import Fonts from "../theme/Fonts";
import scaleFont from "../component/ScallingUtility";
import CustomTextInput from "../component/CustomeTextInput";
import CustomeButton from "../component/CustomeButton";
import CustomelogoButton from "../component/CustomelogoButton";
import {
  CommonActions,
  NavigationContainer,
  useNavigation,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types"; // Import your navigation types
import { useAppDispatch } from "../redux/hooks";
import { setIsLogin } from "../redux/IsLoginSlice";
// import {ScrollView} from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import auth, { firebase } from "@react-native-firebase/auth";
import ApiComponent from "../component/ApiComponent";
import ApiServices from "../services/ApiServices";

const { width } = Dimensions.get("window");
type NavigationProps = StackNavigationProp<RootStackParamList, "OnBoarding">;

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const IMAGE_SIZE = windowWidth * 0.42;

const Login = () => {
  const navigation = useNavigation<NavigationProps>();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState("");
  const [emailError, setemailError] = useState("");
  const [passError, setPassError] = useState("");
  const [invalid, setInvalid] = useState("");

  const isCheckValid = () => {
    const isCheckEmail = /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/;

    let isValid = true;
    if (!email.trim()) {
      setemailError("Please type youe email");
      isValid = false;
    } else if (!isCheckEmail.test(email)) {
      setemailError("Enter your valid email");
      isValid = false;
    } else {
      setemailError("");
    }

    if (!pass.trim()) {
      setPassError("Password is required");
      isValid = false;
    } else if (pass.length < 6) {
      setPassError("Password must be at least 6 characters");
      isValid = false;
    } else {
      setPassError("");
    }
    return isValid;
  };

  // const handleFunction = () => {
  //   if (!isCheckValid()) {
  //     return;
  //   }

  //   navigation.dispatch(
  //     CommonActions.reset({
  //       index: 0,
  //       routes: [{ name: "BottomNav" }],
  //     })
  //   );

  //   dispatch(setIsLogin(true));
  // };

  const loginUser = () => {
    if (!isCheckValid()) {
      return;
    }
    try {
      auth()
        .signInWithEmailAndPassword(email, pass)
        .then(async (userCredential) => {
          const userId = userCredential.user.uid; // userId male  je unique j hoy
          console.log("Login Successfull login with", email);

          // navigation.dispatch(
          //   CommonActions.reset({
          //     index: 0,
          //     routes: [{ name: "BottomNav" }],
          //   })
          // );
          // dispatch(setIsLogin(true));
          let idTokens: string = "";
          const user = firebase.auth().currentUser;
          if (user) {
            const token = await user.getIdToken();
            idTokens = token;
            console.log("getIdtoken ------ -- ", token);
          }

          const response = await ApiServices({
            apilasturlname: "login",
            idToken: idTokens,
          });
          console.log(response);

          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "BottomNav" }],
            })
          );
          dispatch(setIsLogin(true));
        })
        .catch((error) => {
          console.log(error);
          // Alert.alert("Invalid Email or Password", error);
          setInvalid("Invalid Email or Password");
        });
    } catch (error) {
      console.error("Login Error:", error);
      // setInvalid("Invalid Email or Password");
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <Image source={images.logo4} style={styles.imageLogoProfile} />
        <Text style={styles.welcomeBackTextStyle}> {Strings.WelcomeBack}</Text>
        <CustomTextInput
          placeholder={Strings.email}
          styleConatiner={styles.inputContainer}
          value={pass}
          onChangeText={(txt) => setEmail(txt)}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        <CustomTextInput
          placeholder={Strings.password}
          styleConatiner={styles.inputContainer}
          rightImageOpen={images.logo17}
          rightImageClose={images.logo3}
          value={pass}
          onChangeText={(txt) => setPass(txt)}
          secureTextEntry={true}
        />

        {passError ? <Text style={styles.errorText}>{passError}</Text> : null}
        <View style={styles.forgotePssContainer}>
          <Text style={styles.forgottextStyle}>{Strings.forgotPass}</Text>
          <TouchableOpacity>
            <Text style={styles.resettextStyle}>{Strings.reset}</Text>
          </TouchableOpacity>
        </View>
        <CustomeButton
          name={Strings.login}
          style={styles.loginbtn}
          onPress={loginUser}
        />
        {invalid ? <Text style={[styles.errorText]}>{invalid}</Text> : null}

        <View style={styles.orContainer}>
          <View style={styles.orOptionStyle}></View>
          <Text style={styles.orText}> or </Text>
          <View style={styles.orOptionStyle}></View>
        </View>

        <View style={styles.logoBtnContainer}>
          <CustomelogoButton
            image={images.logo19}
            style={styles.goolgleBtnStyle}
          />
          {/* <CustomelogoButton image={images.logo6} /> */}
          <CustomelogoButton
            image={images.logo18}
            style={styles.appleBtnStyle}
          />
        </View>

        {/* <View style={styles.forgotePssContainer}>
          <Text style={styles.forgottextStyle}>{Strings.dontAccount}</Text>
          <TouchableOpacity>
            <Text style={styles.resettextStyle}>{Strings.register}</Text>
          </TouchableOpacity>
        </View> */}
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  imageLogoProfile: {
    marginTop: "3%",
    alignSelf: "center",
    resizeMode: "contain",
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: IMAGE_SIZE / 2,
    backgroundColor: Colors.black,
  },
  welcomeBackTextStyle: {
    fontFamily: Fonts.PoppinsBold,
    fontSize: scaleFont(32),
    textAlign: "center",
    marginTop: "5%",
  },
  inputContainer: {
    marginLeft: "2%",
    marginTop: "6%",
    // borderBottomWidth: 1,
  },
  forgotePssContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "4%",
  },
  forgottextStyle: {
    fontSize: scaleFont(17),
    fontFamily: Fonts.PoppinsNormal,
  },
  resettextStyle: {
    fontSize: scaleFont(18),
    fontFamily: Fonts.PoppinsSemiBold,
  },
  loginbtn: {
    borderRadius: 2,
    fontFamily: Fonts.PoppinsMediium,
    marginTop: "4%",
  },
  orContainer: {
    flexDirection: "row",
    justifyContent: "center",
    // backgroundColor: 'red',
    marginTop: "2%",
  },
  orOptionStyle: {
    borderBottomWidth: 1,
    width: "40%",
    alignSelf: "center",
    paddingRight: 20,
  },
  orText: {
    fontSize: scaleFont(18),
  },
  logoBtnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "3%",
    marginHorizontal: "36%",
    // alignItems: 'center',
    // textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    color: Colors.red,
    marginLeft: "7%",
  },
  goolgleBtnStyle: { backgroundColor: Colors.white },
  appleBtnStyle: { backgroundColor: Colors.black },
});
