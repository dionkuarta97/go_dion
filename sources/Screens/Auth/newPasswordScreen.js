import { useNavigation, useFocusEffect } from "@react-navigation/core";
import React, { useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import DefaultPrimaryButton from "../../Components/Button/DefaultPrimaryButton";
import PasswordTextInput from "../../Components/CustomTextInput/PasswordTextInput";
import Colors from "../../Theme/Colors";
import Fonts from "../../Theme/Fonts";
import Sizes from "../../Theme/Sizes";
import { useDispatch, useSelector } from "react-redux";
import DefaultModal from "../../Components/Modal/DefaultModal";
import {
  newChangePassword,
  updatePassword,
} from "../../Redux/Profile/profileActions";
import LoadingModal from "../../Components/Modal/LoadingModal";
import { passwordValidations } from "../../Services/helper";
import { Center } from "native-base";

const NewPasswordScreen = ({ route }) => {
  const navigation = useNavigation();
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const params = route.params;

  const dispatch = useDispatch();

  const _updatePassword = useSelector(
    (state) => state.profileReducer.updatePassword
  );

  useEffect(() => {
    console.log("params ===> ", params);
  }, []);

  useFocusEffect(
    useCallback(() => {
      setError(null);
      setSuccess(false);
      setPassword("");
      setRepeatPassword("");
      setLoading(false);
    }, [])
  );

  function updateParams() {
    console.log("update params...");
    var par = {
      email: params.email,
      token: params.token,
      password: password,
    };

    dispatch(updatePassword(par));
  }

  function passwordValidation(text) {
    if (text.length < 8)
      return "Password minimal 8 karakter, mengandung huruf besar, huruf kecil, dan angka";
    if (!text.match(new RegExp("[A-Z]")))
      return "Password harus mengandung huruf besar, huruf kecil, dan angka";
    if (!text.match(new RegExp("[a-z]")))
      return "Password harus mengandung huruf kecil dan angka";
    if (text.search(/[0-9]/) < 0) {
      return "Password harus mengandung angka";
    }
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DefaultAppBar title="Password Baru" />
      <View style={{ flex: 1, padding: Sizes.fixPadding * 2 }}>
        <Text style={{ ...Fonts.black15Bold }}>
          Masukkan password baru kamu
        </Text>
        <PasswordTextInput
          placeholder="Password"
          onChangeText={setPassword}
          value={passwordValidations(password).valid}
        />
        {passwordValidations(password).valid === false &&
          passwordValidations(password).error.map((val, idx) => (
            <Text
              key={idx}
              style={{ fontSize: 12, color: "red", opacity: 0.5 }}
            >
              - {val}
            </Text>
          ))}
        <PasswordTextInput
          placeholder="Ulang Password Baru"
          onChangeText={setRepeatPassword}
          value={passwordValidations(repeatPassword).valid}
        />
        {password !== repeatPassword && (
          <Text style={{ fontSize: 12, color: "red", opacity: 0.5 }}>
            Password Tidak Sama
          </Text>
        )}
        <View style={{ flex: 1 }} />

        {password !== "" &&
          password === repeatPassword &&
          passwordValidations(password).valid && (
            <DefaultPrimaryButton
              text="Kirim"
              onPress={() => {
                setLoading(true);
                dispatch(
                  newChangePassword({
                    email: params.email,
                    token: params.token,
                    password: password,
                  })
                )
                  .then((data) => {
                    setSuccess(true);
                  })
                  .catch(({ error }) => {
                    console.log(error);
                    if (error.message) {
                      setError(error.message);
                    } else {
                      setError(error);
                    }
                  })
                  .finally(() => {
                    setLoading(false);
                  });
              }}
            />
          )}

        {loading && Platform.OS !== "ios" && <LoadingModal />}

        {success && (
          <DefaultModal>
            <Text style={{ textAlign: "center" }}>
              Password berhasil diperbarui
            </Text>
            <DefaultPrimaryButton
              text="Ke Halaman Login"
              onPress={() => {
                navigation.goBack();
              }}
            />
          </DefaultModal>
        )}

        {error && (
          <DefaultModal>
            <Center>
              <Text style={{ textAlign: "center" }}>
                Password gagal diperbarui
              </Text>
              <Text>{error}</Text>
            </Center>
            <DefaultPrimaryButton
              text="Kembali ke Beranda"
              onPress={() => {
                // todo : replace route
                // _updatePassword.data = 0
                navigation.navigate("MainScreen");
              }}
            />
          </DefaultModal>
        )}

        {/* {_updatePassword.error !== null && (
          <Text style={{ color: "red" }}>{login.error}</Text>
        )} */}
      </View>
      <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
    </SafeAreaView>
  );
};

export default NewPasswordScreen;
