import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  BackHandler,
  Platform,
} from "react-native";
import * as Font from "expo-font";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../Redux/Auth/authActions";
import { getMe, setProfile } from "../../Redux/Profile/profileActions";
import { getVersion } from "../../Redux/Version/versionActions";
import checkInternet from "../../Services/CheckInternet";
import { useToast } from "native-base";

import ToastErrorContent from "../../Components/ToastErrorContent";
export default InitialScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.authReducer.login);
  const { firstLogin } = useSelector((state) => state.authReducer);
  const baseUrl = useSelector((state) => state.initReducer.baseUrl);
  const toast = useToast();

  const _loadFontsAsync = async () => {
    await Font.loadAsync({
      SignikaNegative_Bold: require("../../../assets/Fonts/SignikaNegative-Bold.ttf"),
      SignikaNegative_Regular: require("../../../assets/Fonts/SignikaNegative-Regular.ttf"),
    });

    //TODO:Navigate to Splashscreen
    checkInternet().then((connection) => {
      if (connection) {
        dispatch(getVersion(Platform.OS));
        setTimeout(() => {
          // navigation.replace("MainScreen");
          if (!firstLogin) navigation.replace("MainScreen");
          else navigation.replace("BoardingScreen");
        }, 2000);
      } else {
        toast.show({
          placement: "top",
          width: Dimensions.get("screen").width / 1.3,
          duration: null,
          render: (props) => {
            return (
              <ToastErrorContent
                content="Kamu Tidak Tersambung Ke Internet"
                onPress={() => {
                  toast.closeAll();
                  BackHandler.exitApp();
                }}
              />
            );
          },
        });
      }
    });
  };

  useEffect(() => {
    _loadFontsAsync();

    if (login.data !== null) {
      console.log("Load kepanggil");
      dispatch(getMe());
      dispatch(setToken(login.data.token));
    }

    // dispatch(setToken(null));
    // dispatch(setLoginStatus(false));
    // dispatch(setProfile(null));
    // dispatch(setLoginData({loading: false, error: null, data: null}));
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={{
          height: 100.0,
          width: 100.0,
          borderRadius: 40.0,
        }}
        source={require("../../../assets/Images/icon.png")}
        resizeMode="contain"
      />
      <View style={{ height: 20 }}></View>
      <Text>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});
