import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import CustomeOnBoarding from "../component/CustomeOnBoarding";
import images from "../theme/Images";
import Strings from "../theme/Strings";
import CustomeButton from "../component/CustomeButton";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types"; // Import your navigation types
import Colors from "../theme/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setOnboarding } from "../redux/IsLoginSlice";
import { useAppSelector } from "../redux/hooks";
// import {AsyncStorage} from 'react-native';

const { width } = Dimensions.get("window");
type NavigationProps = StackNavigationProp<RootStackParamList, "OnBoarding">;

const data = [
  {
    id: 1,
    image: images.logo1,
    header: Strings.allProductSell,
    desc: Strings.allProductSellDescription,
  },
  {
    id: 2,
    image: images.logo2,
    header: Strings.productAtyour,
    desc: Strings.allProductSellDescription,
  },
];

const OnBoarding = () => {
  // const isOnboarding = useAppSelector((state) => state.login.isOnboarding);
  // const onboardinCheck = () => {
  //   if (isOnboarding) {
  //     navigation.replace("Login", {});
  //   }
  // };
  // useEffect(() => {
  //   onboardinCheck();
  // }, []);

  const navigation = useNavigation<NavigationProps>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null); // Reference for ScrollView // jo usestate to rerendering atle na use karay ahiya
  const dispatch = useDispatch();

  // Handle swipe scroll
  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setCurrentIndex(index);
  };

  // Handle Next Button Click
  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      scrollViewRef.current?.scrollTo({ x: nextIndex * width, animated: true });
    }
  };
  const hanldeNavigate = async () => {
    navigation.replace("Login", {});
    dispatch(setOnboarding(true));
  };

  return (
    <View style={styles.container}>
      {/* ScrollView with Ref */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        onMomentumScrollEnd={handleScroll}
        showsHorizontalScrollIndicator={false}
      >
        {data.map((item, index) => (
          <CustomeOnBoarding
            key={index}
            imageScreen={item.image}
            headerText={item.header}
            descriptionText={item.desc}
          />
        ))}
      </ScrollView>

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, currentIndex === index && styles.activeDot]}
          />
        ))}
      </View>

      {/* Next Button */}
      <CustomeButton
        name={currentIndex === data.length - 1 ? "Get Started" : "Next"}
        onPress={currentIndex === data.length - 1 ? hanldeNavigate : handleNext}
        style={styles.button}
      />
    </View>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  button: {
    borderRadius: 0,
    marginBottom: "4%",
  },
  pagination: {
    flexDirection: "row",
    position: "absolute",
    bottom: 120,
    alignSelf: "center",
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#dfd6d6",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "blue",
  },
});
