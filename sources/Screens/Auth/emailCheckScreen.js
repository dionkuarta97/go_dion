import { useNavigation, useFocusEffect } from "@react-navigation/core";
import { useToast } from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Keyboard,
  SafeAreaView,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import DefaultPrimaryButton from "../../Components/Button/DefaultPrimaryButton";
import ToastErrorContent from "../../Components/ToastErrorContent";
import { getEmailCheck, setEmailCheck } from "../../Redux/Auth/authActions";
import checkInternet from "../../Services/CheckInternet";
import Colors from "../../Theme/Colors";
import Sizes from "../../Theme/Sizes";

const EmailCheckScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const checkEmail = useSelector((state) => state.authReducer.checkEmail);

  useFocusEffect(
    useCallback(() => {
      dispatch(setEmailCheck({ loading: false, data: null, error: null }));
    }, [])
  );

  useEffect(() => {
    if (checkEmail.data !== null) {
      navigation.navigate("RegisterScreen", {
        email: email,
      });
    }
  }, [checkEmail]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DefaultAppBar title="Check Email" backEnabled={true} />
      <View style={{ padding: Sizes.fixPadding * 2 }}>
        <Text>Ketikkan alamat email yang akan kamu gunakan.</Text>
        <View style={{ marginVertical: 30 }}>
          <TextInput
            style={{
              height: 40,
              padding: 10,
              backgroundColor: "white",
              borderRadius: 5,
            }}
            keyboardType="email-address"
            onChangeText={setEmail}
            autoCapitalize="none"
            value={email}
            placeholder="ketikkan email kamu"
          />
        </View>
        {checkEmail.error !== null && (
          <Text style={{ color: Colors.neutralRedColor, textAlign: "center" }}>
            {checkEmail.error}
          </Text>
        )}
        {checkEmail.loading ? (
          <ActivityIndicator color={Colors.orangeColor} size={24} />
        ) : (
          <DefaultPrimaryButton
            text="Check"
            onPress={() => {
              checkInternet().then((check) => {
                if (check) {
                  dispatch(getEmailCheck(email));
                } else {
                  toast.show({
                    placement: "top",
                    width: Dimensions.get("screen").width / 1.3,
                    duration: null,
                    render: () => {
                      return (
                        <ToastErrorContent
                          content="Kamu Tidak Terhubung Ke Internet"
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

              Keyboard.dismiss();
            }}
          />
        )}
      </View>

      {/* {checkEmail.data !== null && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: Sizes.fixPadding * 2,
          }}
        >
          <Text>{checkEmail.data}</Text>
          <View
            style={{
              width: "100%",
            }}
          >
            <DefaultPrimaryButton
              text="Continue Register"
              onPress={() =>
                navigation.navigate("RegisterScreen", {
                  email: email,
                })
              }
            />
          </View>
        </View>
      )} */}
    </SafeAreaView>
  );
};

export default EmailCheckScreen;
