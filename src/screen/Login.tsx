import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
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
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setIsLogin } from "../redux/IsLoginSlice";
// import {ScrollView} from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import auth, { firebase } from "@react-native-firebase/auth";
import ApiComponent from "../component/ApiComponent";
import ApiServices from "../services/ApiServices";
import Toast from "react-native-toast-message";
import { ToastProvider } from "react-native-toast-notifications";
import { useToast } from "react-native-toast-notifications";
import { setUser } from "../redux/UserSlice";
import showCustomToast from "../component/CustomeToast";
import CustomeActivityIndicator from "../component/ActivityIndicator";

const { width } = Dimensions.get("window");
type NavigationProps = StackNavigationProp<RootStackParamList, "OnBoarding">;

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const IMAGE_SIZE = windowWidth * 0.42;

const Login = () => {
  const toast = useToast();
  const navigation = useNavigation<NavigationProps>();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>(
    "bisworanjan.silversky+t4@gmail.com"
  );
  const [pass, setPass] = useState("Athal@123");
  const [emailError, setemailError] = useState("");
  const [passError, setPassError] = useState("");
  const [invalid, setInvalid] = useState("");
  // const isuser = useAppSelector((state) => state.reducer.user);
  const [isLoading, setLoading] = useState(false);
  const isLogin = useAppSelector((state) => state.login.isLogin);

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

  const showToast = () => {
    Toast.show({
      type: "error",
      text1: "invalid email or pass",
      autoHide: true,
      visibilityTime: 2000,
      position: "bottom",
      bottomOffset: 30,
      text1Style: { fontFamily: Fonts.PoppinsNormal, fontSize: scaleFont(14) },
    });
  };

  const loginUser = () => {
    if (!isCheckValid()) {
      return;
    }
    setLoading(true);

    const user = firebase.auth().currentUser;
    console.log("++++++++++___", user);
    auth()
      .signInWithEmailAndPassword(email, pass)
      .then(async (userCredential) => {
        const userId = userCredential.user.uid; // userId male  je unique j hoy
        console.log("Login Successfull login with", email);
        let idTokens: string = "";

        const user = firebase.auth().currentUser;
        console.log("++++++++++", user);

        if (user) {
          const token = await user.getIdToken();
          idTokens = token;
          console.log("getIdtoken ------ -- ", token);
        }
        try {
          const response = await ApiServices({
            apilasturlname: "login",

            bodyRequest: {
              firebase_token: idTokens,
              push_token: "dummy",
            },
          });

          setLoading(false);
          console.log("API Response: 000", response.payload);

          if (response) {
            dispatch(setUser(response.payload));

            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "BottomNav" }],
              })
            );
            // console.log("1213123123",);

            dispatch(setIsLogin(true));
          }
        } catch (Error: any) {
          console.error("API Error: - @#", Error);
          showCustomToast({
            type: "error",
            text1: "Login failed, please try again!",
            text2: Error.message,
          });
        }
      })
      .catch((error) => {
        console.log("Meet error -", error);
        // Alert.alert("Invalid Email or Password", error);
        // setInvalid("Invalid Email or Password");
        // showToast();
        showCustomToast({
          type: "error",
          text1: "invalid email and password",
        });
      });
  };
  useEffect(() => {
    console.log("Login True or false flage : -- ", isLogin);
  }, [setUser]);
  // const handleFun = () => {
  //   return <CustomeActivityIndicator isVisile={true} />;
  // };
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <Image source={images.logo4} style={styles.imageLogoProfile} />
        <Text style={styles.welcomeBackTextStyle}> {Strings.WelcomeBack}</Text>
        <CustomTextInput
          placeholder={Strings.email}
          styleConatiner={styles.inputContainer}
          value={email}
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
        {/* <CustomeButton
          name={Strings.login}
          style={styles.loginbtn}
          onPress={loginUser}
        /> */}
        {/* {isLoading ? (
          <ActivityIndicator
            size="small"
            color={Colors.darkBlue}
            style={styles.activityIndicator}
          />
        ) : (
          <CustomeButton
            name={Strings.login}
            style={styles.loginbtn}
            onPress={loginUser}
          />
          
        )} */}

        <CustomeButton
          name={Strings.login}
          style={styles.loginbtn}
          onPress={loginUser}
        />
        <CustomeActivityIndicator isVisile={isLoading} />

        {/* {invalid ? <Text style={[styles.errorText]}>{invalid}</Text> : null} */}

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
    marginBottom: 20,
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
  activityIndicator: {
    // marginBottom: -100,
    // backgroundColor: "red",
    // top: -450,
    // bottom: 440,
  },
});
