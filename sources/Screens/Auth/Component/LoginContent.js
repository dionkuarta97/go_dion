import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DefaultPrimaryButton from "../../../Components/Button/DefaultPrimaryButton";
import DefaultTextInput from "../../../Components/CustomTextInput/DefaultTextInput";
import PasswordTextInput from "../../../Components/CustomTextInput/PasswordTextInput";
import OneSignal from "react-native-onesignal";
import Fonts from "../../../Theme/Fonts";
import Sizes from "../../../Theme/Sizes";
import Colors from "../../../Theme/Colors";
import { useDispatch, useSelector } from "react-redux";
import {
  getLogin,
  setLoginData,
  setLoginStatus,
} from "../../../Redux/Auth/authActions";
import LoadingModal from "../../../Components/Modal/LoadingModal";
import DefaultModal from "../../../Components/Modal/DefaultModal";

const LoginContent = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [playerId, setPlayerId] = useState("");
  const [usernameText, setUsernameText] = useState("");
  const [passwordText, setPasswordText] = useState("");

  const login = useSelector((state) => state.authReducer.login);

  useEffect(() => {
    dispatch(setLoginData({ error: null, loading: false, data: null }));
  }, []);

  useEffect(() => {
    if (login.data) {
      navigation.goBack();
    }
  }, [login.data]);

  const getPlayerId = async () => {
    const deviceState = await OneSignal.getDeviceState();
    setPlayerId(deviceState.userId);
  };
  useEffect(() => {
    getPlayerId();
  }, []);
  const registerText = () => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate("EmailCheckScreen")}>
        <Text
          style={{
            ...Fonts.gray18Bold,
            textAlign: "center",
            marginTop: Sizes.fixPadding - 5.0,
            marginBottom: Sizes.fixPadding,
          }}
        >
          Sign Up
        </Text>
      </TouchableOpacity>
    );
  };

  const forgetPasswordText = () => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("ForgotPasswordScreen")}
      >
        <Text
          style={{
            ...Fonts.gray18Bold,
            textAlign: "center",
          }}
        >
          Forgot your password?
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        paddingVertical: Sizes.fixPadding * 7.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
      }}
    >
      {login.loading && <LoadingModal />}

      <DefaultTextInput
        placeholder="Email"
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
        text="Sign In"
        onPress={() => {
          dispatch(
            getLogin({
              username: usernameText,
              password: passwordText,
              playerId,
            })
          );
        }}
      />
      {registerText()}
      {forgetPasswordText()}
    </View>
  );
};

export default LoginContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
