import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../theme/Colors";
import CustomeHeader from "../component/CustomeHeader";
import Strings from "../theme/Strings";
import images from "../theme/Images";
import CustomTextInput from "../component/CustomeTextInput";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import CustomTextInputs from "../component/CustomeTextInputs";
import scaleFont from "../component/ScallingUtility";
import Fonts from "../theme/Fonts";
import CustomeText from "../component/CustomeText";
import PickupLocation from "../component/PickupLocation";
import CustomeButton from "../component/CustomeButton";
// import { TextInput } from "react-native-gesture-handler";
// import { ScrollView } from "react-native-gesture-handler";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import FastImage from "react-native-fast-image";
import CustomeFastImage from "../component/CustomeFastImage";
import ApiServices from "../services/ApiServices";
import CustomeActivityIndicator from "../component/ActivityIndicator";
import { useNavigation } from "@react-navigation/native";
import { setUser, userSlice } from "../redux/UserSlice";
import { State } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

const EditProfile = () => {
  const userData = useAppSelector((state) => state.user);

  const profileName = useAppSelector((state) => state.user.name);
  const profileEmail = useAppSelector((state) => state.user.email);
  const profileCountry_code = useAppSelector(
    (state) => state.user.country_code
  );
  const profileImage = useAppSelector((state) => state.user.profile_image);

  const profileContactNumber = useAppSelector(
    (state) => state.user.contact_number
  );
  // const [email, setEmail] = useState(profileEmail);
  const [name, setName] = useState(userData.name);
  const [mobileNum, setMobileNum] = useState(
    userData.contact_number?.toString()
  );
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  // const userAccessToken = useAppSelector((state) => state.user.access_token);
  const userAccessToken = userData.access_token;
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const galaryImage = () => {
    const options = {
      mediaType: "photo",
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        console.log("image uri :--", imageUri);

        setSelectedImage(imageUri);
      }
    });
  };
  // const cameraImage = () => {
  //   const options = {
  //     mediaType: "photo",
  //     includeBase64: false,
  //     maxHeight: 2000,
  //     maxWidth: 2000,
  //   };

  //   launchCamera(options, (response) => {
  //     if (response.didCancel) {
  //       console.log("User cancelled camera");
  //     } else if (response.error) {
  //       console.log("Camera Error: ", response.error);
  //     } else {
  //       let imageUri = response.uri || response.assets?.[0]?.uri;
  //       setSelectedImage(imageUri);
  //       console.log(imageUri);
  //     }
  //   });
  // };

  const updateProfileApi = async () => {
    setLoading(true);

    try {
      const response = await ApiServices({
        method: "PUT",
        apilasturlname: "user/profile/update",
        access_token: userAccessToken,
        bodyRequest: {
          name: name,
          email: profileEmail,
          // country_code:
          // contact_number: mobileNum,
        },
      });

      if (response.payload) {
        setLoading(false);
        console.log("Successfull updated ");
        console.log("Update Profile name ", response.payload.name);
        console.log("Successfull updated -=-=- ---  ", response.payload);

        // dispatch(setUser(response.payload));
        // console.log("userData 000----- ", userData);

        dispatch(
          setUser({
            ...userData,
            name: response.payload.name,
          })
        );

        navigation.goBack();
      }
    } catch (error) {
      console.log("Update profile error -- ", error);
      setLoading(false);
    }
  };

  // <CustomeActivityIndicator isVisile={loading} />;
  const updateProfileHandle = () => {
    // console.log("userData 000----- ", userData);
    updateProfileApi();
    // navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <CustomeHeader title={Strings.profileInfo} showBackButton={true} />

      <ScrollView>
        {/* <Text>EditProfile</Text> */}

        <View style={styles.imageStyle}>
          {/* <Image source={{ uri: profileImage }} style={styles.imageStyle} /> */}
          <Image
            source={
              selectedImage === null
                ? { uri: profileImage }
                : { uri: selectedImage }
            }
            style={styles.imageStyle}
          />

          <TouchableOpacity
            style={styles.imageEdit}
            onPress={() => galaryImage()}
          >
            <Image source={images.logoEditImageProfire} />
          </TouchableOpacity>

          {/* <View style={styles.imageStyle}></View> */}
        </View>

        <CustomeText text={Strings.name} style={styles.nameText} />
        <CustomTextInputs
          placeholder={Strings.name}
          // styleConatiner={styles.inputText}
          value={name}
          onChangeText={(txt: any) => setName(txt)}
          textStyle={styles.inputText}
        />
        <CustomeText text={Strings.email} style={styles.emailText} />

        <CustomTextInputs
          placeholder={Strings.email}
          value={profileEmail}
          // onChangeText={(txt: any) => setEmail(txt)}
          textStyle={styles.inputText}
          editable={false}
        />

        <View style={styles.mobileNumberContainer}>
          <TouchableOpacity>
            <Image source={images.logoDownArrow} />
          </TouchableOpacity>
          <CustomeText
            text={`+${profileCountry_code}`}
            numberOfLines={1}
            ellipsizeMode="tail"
          />
          <TextInput
            value={mobileNum}
            onChangeText={(txt) => setMobileNum(txt)}
            style={styles.mobileText}
          />
        </View>
        <View style={styles.defaultLocaContainer}>
          <CustomeText
            text={Strings.defaultPickupLocation}
            style={styles.defaultPickupLoc}
          />
          {[1, 2, 3].map((id) => (
            <PickupLocation
              key={id}
              selectOption={selectedOption === id}
              onSelect={() => setSelectedOption(id)}
            />
          ))}

          <CustomeButton
            name="Update Profile"
            style={styles.updateProfileButton}
            buttonTextStyle={styles.buttonTextstyle}
            onPress={updateProfileHandle}
          />
          <CustomeActivityIndicator isVisile={loading} />
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  imageStyle: {
    marginTop: "4%",
    height: 100,
    width: 100,
    borderRadius: 50,
    // backgroundColor: "red",
    alignSelf: "center",
  },
  imageEdit: {
    position: "absolute",
    right: 0,
    bottom: -3,
  },
  inputText: {
    fontSize: scaleFont(16),
    fontFamily: Fonts.PoppinsNormal,
  },
  nameText: {
    fontSize: scaleFont(15),
    marginTop: "6%",
    marginLeft: "5%",
    top: 8,
    color: Colors.charlestonGreen,
  },
  emailText: {
    fontSize: scaleFont(15),
    marginTop: "2%",
    marginLeft: "5%",
    top: 8,
    color: Colors.charlestonGreen,
    fontFamily: Fonts.PoppinsNormal,
  },
  mobileNumberContainer: {
    flexDirection: "row",
    paddingVertical: "4%",
    // backgroundColor: "red",
    borderBottomWidth: 1,
    marginHorizontal: "5%",
    marginTop: "4%",
  },
  mobileText: {
    marginLeft: "2%",
    lineHeight: 18,
  },
  defaultLocaContainer: {
    paddingHorizontal: "5%",
    marginTop: "2%",
  },
  defaultPickupLoc: {
    marginTop: "4%",
    fontSize: scaleFont(14),
    fontFamily: Fonts.PoppinsMediium,
  },
  updateProfileButton: {
    width: "100%",
    marginTop: "10%",
    borderRadius: 5,
    height: 45,
  },
  buttonTextstyle: {
    fontFamily: Fonts.PoppinsMediium,
    fontSize: scaleFont(17),
  },
});
