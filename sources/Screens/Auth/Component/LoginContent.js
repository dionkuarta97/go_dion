import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DefaultPrimaryButton from "../../../Components/Button/DefaultPrimaryButton";
import DefaultTextInput from "../../../Components/CustomTextInput/DefaultTextInput";
import PasswordTextInput from "../../../Components/CustomTextInput/PasswordTextInput";
import OneSignal from "react-native-onesignal";
import Fonts from "../../../Theme/Fonts";
import Sizes from "../../../Theme/Sizes";
import { useDispatch, useSelector } from "react-redux";
import {
  getLogin,
  setEmailCheck,
  setForgotPassword,
  setLoginData,
} from "../../../Redux/Auth/authActions";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LoadingModal from "../../../Components/Modal/LoadingModal";
import { useToast } from "native-base";
import checkInternet from "../../../Services/CheckInternet";
import ToastErrorContent from "../../../Components/ToastErrorContent";

const LoginContent = (props) => {
  const toast = useToast();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [playerId, setPlayerId] = useState("");
  const [usernameText, setUsernameText] = useState("");
  const [passwordText, setPasswordText] = useState("");

  const login = useSelector((state) => state.authReducer.login);

  useEffect(() => {
    dispatch(setLoginData({ error: null, loading: false, data: null }));
  }, []);

  console.log(props.section, "sadknjas");

  useEffect(() => {
    if (login.data) {
      if (props.item) {
        navigation.navigate("ProductDetailScreen", {
          item: props.item,
          section: props.section,
        });
      } else {
        navigation.navigate("MainScreen");
      }
    }
  }, [login.data]);

  const getPlayerId = async () => {
    const deviceState = await OneSignal.getDeviceState();
    setPlayerId(deviceState.userId);
    console.log(JSON.stringify(deviceState.userId, null, 2), "dsadas");
  };
  useEffect(() => {
    getPlayerId();
  }, []);
  const registerText = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          dispatch(setEmailCheck({ loading: false, data: null, error: null }));
          navigation.navigate("EmailCheckScreen");
        }}
      >
        <Text
          style={{
            ...Fonts.gray18Bold,
            textAlign: "center",
            marginTop: Sizes.fixPadding - 5.0,
            marginBottom: Sizes.fixPadding,
          }}
        >
          Daftar Sekarang
        </Text>
      </TouchableOpacity>
    );
  };

  const forgetPasswordText = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ForgotPasswordScreen");
          dispatch(
            setForgotPassword({ loading: false, error: null, data: null })
          );
        }}
      >
        <Text
          style={{
            ...Fonts.gray18Bold,
            textAlign: "center",
          }}
        >
          Lupa Password?
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <KeyboardAwareScrollView>
      <View
        style={{
          paddingVertical: Sizes.fixPadding * 7.0,
          paddingHorizontal: Sizes.fixPadding * 2.0,
        }}
      >
        {login.loading && <LoadingModal />}

        <DefaultTextInput
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(value) => setUsernameText(value)}
        />
        <PasswordTextInput
          placeholder="Password"
          onChangeText={(value) => setPasswordText(value)}
        />

        {login.error !== null && (
          <Text style={{ color: "red" }}>{login.error}</Text>
        )}

        <DefaultPrimaryButton
          text="Masuk"
          onPress={() => {
            checkInternet().then((connection) => {
              if (connection) {
                dispatch(
                  getLogin({
                    username: usernameText,
                    password: passwordText,
                    playerId,
                  })
                );
              } else {
                toast.show({
                  placement: "top",
                  duration: null,
                  width: Dimensions.get("screen").width / 1.3,
                  render: () => {
                    return (
                      <ToastErrorContent
                        content="Kamu tidak terhubung ke internet"
                        onPress={() => {
                          toast.closeAll();
                          navigation.goBack();
                        }}
                      />
                    );
                  },
                });
              }
            });
          }}
        />
        {registerText()}
        {forgetPasswordText()}
      </View>
    </KeyboardAwareScrollView>
  );
};

export default LoginContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
