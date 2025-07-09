import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";
import Strings from "../theme/Strings";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import Colors from "../theme/Colors";
import CustomeHeader from "../component/CustomeHeader";
import CustomeText from "../component/CustomeText";
import CustomTextInputs from "../component/CustomeTextInputs";
import CustomeButton from "../component/CustomeButton";
import Fonts from "../theme/Fonts";
import scaleFont from "../component/ScallingUtility";
import images from "../theme/Images";
import { setUser } from "../redux/UserSlice";
import ApiServices from "../services/ApiServices";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import CustomeActivityIndicator from "../component/ActivityIndicator";
const { width, height } = Dimensions.get("window");

type NavigationProps = StackNavigationProp<RootStackParamList, "AddressInfo">;
type adressinfoeditProps = NativeStackScreenProps<
  RootStackParamList,
  "AddressInfo"
>;

const AddressInfo = ({ route }: adressinfoeditProps) => {
  const { adrressId } = route.params;
  const navigation = useNavigation<NavigationProps>();
  const dispatch = useAppDispatch();

  const userData = useAppSelector((state) => state.user);
  const [name, setName] = useState(userData.address?.name);
  const [country, setCountry] = useState(userData.address?.country);
  const [mobileNum, setMobileNum] = useState(
    userData.contact_number?.toString()
  );
  const [countryCode, setCountryCode] = useState(
    userData.address?.country_code
  );

  const [streetAddress, setStreetAddress] = useState(
    userData.address?.street_address
  );
  const [city, setcity] = useState(userData.address?.city);
  const [stateAbbretion, setStateAbbretion] = useState(userData.address?.state);
  const [zipCode, setzipCode] = useState(userData.address?.zipcode.toString());
  const [loading, setLoading] = useState(false);

  const editAddressapi = async () => {
    setLoading(true);

    try {
      const response = await ApiServices({
        method: "PUT",
        apilasturlname: "user/address/9c36c693-ec58-4916-ae7a-31083ce6420e",
        access_token: userData.access_token,
        bodyRequest: {
          name: name,
          street_address: streetAddress,
          city: city,
          state: stateAbbretion,
          zipcode: zipCode,
          phone_number: mobileNum,
          country: country,
          country_code: countryCode,
        },
      });

      if (response.payload) {
        setLoading(false);
        console.log("Successfull updatedAddress --  ");
        // console.log("Update adreesDelivery name ", response.payload.name);
        // console.log("Successfull updated -=-=- ---  ", response.payload);

        // dispatch(setUser(response.payload));
        // console.log("userData 000----- ", userData);

        dispatch(
          setUser({
            ...userData,
            address: response.payload,
          })
        );

        navigation.goBack();
      }
    } catch (error) {
      console.log("Update profile error -- ", error);
      setLoading(false);
    }
  };
  const addressInfoeditHandle = () => {
    editAddressapi();
    console.log("Addresss id  addreess", adrressId);
  };
  return (
    <View style={styles.container}>
      <CustomeHeader title={Strings.addressInfo} showBackButton={true} />
      <ScrollView>
        <View>
          {/* <CustomeText text="Name" /> */}
          <CustomTextInputs
            placeholder={Strings.name}
            textStyle={styles.text}
            value={name}
            onChangeText={(txt) => setName(txt)}
          />
          <CustomTextInputs
            placeholder={Strings.streetAddress}
            textStyle={styles.text}
            value={streetAddress}
            onChangeText={(txt) => setStreetAddress(txt)}
          />
          <CustomTextInputs
            placeholder={Strings.city}
            textStyle={styles.text}
            value={city}
            onChangeText={(txt) => setcity(txt)}
          />

          <View style={styles.mobileNumberContainer}>
            <TouchableOpacity>
              <Image source={images.logoDownArrow} />
            </TouchableOpacity>
            <CustomeText
              text={`+${userData.country_code}`}
              numberOfLines={1}
              ellipsizeMode="tail"
            />
            <TextInput
              value={mobileNum}
              onChangeText={(txt) => setMobileNum(txt)}
              style={styles.mobileText}
            />
          </View>
          <View style={styles.zipCodeAndStateAbbresionContainer}>
            <CustomTextInputs
              placeholder={Strings.stateAbbreviation}
              styleConatiner={styles.stateAbbreviation}
              textStyle={styles.text}
              value={stateAbbretion}
              onChangeText={(txt) => setStateAbbretion(txt)}
            />

            <CustomTextInputs
              placeholder={Strings.zipCode}
              styleConatiner={styles.stateAbbreviation}
              textStyle={styles.text}
              value={zipCode}
              onChangeText={(txt) => setzipCode(txt)}
            />
          </View>
          <CustomTextInputs
            placeholder={Strings.countryAbbreviation}
            textStyle={styles.text}
            value={country}
            onChangeText={(txt) => setCountry(txt)}
            editable={false}
          />
          <CustomeButton
            name={Strings.saveAddress}
            style={styles.adrressEditInfoButton}
            buttonTextStyle={styles.buttonTextstyle}
            onPress={addressInfoeditHandle}
          />
          <CustomeActivityIndicator isVisile={loading} />
        </View>
      </ScrollView>
    </View>
  );
};

export default AddressInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  zipCodeAndStateAbbresionContainer: {
    flex: 1,
    flexDirection: "row",
    // justifyContent: "space-between",
  },
  stateAbbreviation: {
    width: "50%",
  },
  text: {
    fontSize: 16,
    marginTop: 15,
  },
  adrressEditInfoButton: {
    width: "90%",
    marginTop: "10%",
    borderRadius: 5,
    height: 45,
  },
  buttonTextstyle: {
    fontFamily: Fonts.PoppinsMediium,
    fontSize: scaleFont(17),
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
});
