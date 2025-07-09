import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import FastImage from "react-native-fast-image";
import Colors from "../theme/Colors";
import images from "../theme/Images";

const { width, height } = Dimensions.get("window");

interface CustomeFastImages {
  uriImage: string | undefined;
  imageStyle?: object;
  defaultImagestyle?: object;
  loader?: boolean;
}

const CustomeFastImage: React.FC<CustomeFastImages> = ({
  uriImage,
  imageStyle,
  defaultImagestyle,
  loader = true,
}) => {
  const [isLoading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<boolean>();
  const [isError, setIsError] = useState(false);

  function onLoadStart() {
    setLoading(true);
    setErrorMessage(false);
    setIsError(false);
  }

  function onLoadEnd() {
    setLoading(false);
  }

  // console.log("UriImage : -- -- - -", uriImage);
  function onError() {
    setLoading(false);
    setErrorMessage(true);
    setIsError(true);
  }
  useEffect(() => {
    // console.log("UriImage : -- -- - -", uriImage);
    setIsError(false);
    setLoading(true);
  }, [uriImage]);
  return (
    <View style={[{ flex: 1 }]}>
      {isError ? (
        <Image
          style={[styles.defaultimageStyle, defaultImagestyle]}
          source={images.logoDefaultImage}
        />
      ) : (
        <FastImage
          onLoadEnd={onLoadEnd}
          onLoadStart={onLoadStart}
          source={{
            uri: uriImage,
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.contain}
          style={[styles.imageStyle, imageStyle]}
          onError={() => setIsError(true)}
        />
      )}
      {isLoading && !isError && loader && (
        <ActivityIndicator
          size="small"
          color={Colors.blue}
          style={styles.loaderStyle}
        />
      )}
    </View>
  );
};

export default CustomeFastImage;

const styles = StyleSheet.create({
  defaultimageStyle: {
    height: 50,
    width: 50,
    // alignItems: "center",
    // justifyContent: "center",
    marginTop: "40%",
    marginLeft: "35%",
  },
  loaderStyle: {
    bottom: 90,
    // marginBottom: "60%",
  },
  imageStyle: {
    // height: 165,
    width: width * 0.43,
    height: width * 0.43,
    resizeMode: "contain",
    borderRadius: 5,
  },
});
