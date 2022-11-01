import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { Dimensions, Text, View, Platform, TextInput } from "react-native";
import DefaultPrimaryButton from "../../../Components/Button/DefaultPrimaryButton";
import DefaultTextInput from "../../../Components/CustomTextInput/DefaultTextInput";
import { Fontisto } from "@expo/vector-icons";

import Fonts from "../../../Theme/Fonts";
import Sizes from "../../../Theme/Sizes";
import Colors from "../../../Theme/Colors";
import { useDispatch, useSelector } from "react-redux";
import {
  getForgotPassword,
  setForgotPassword,
} from "../../../Redux/Auth/authActions";
import LoadingModal from "../../../Components/Modal/LoadingModal";
import { useToast } from "native-base";
import checkInternet from "../../../Services/CheckInternet";
import ToastErrorContent from "../../../Components/ToastErrorContent";
import { Button } from "native-base";

const ForgotPasswordContent = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const forgotPassword = useSelector(
    (state) => state.authReducer.forgotPassword
  );

  const [email, setEmail] = useState("");
  const [isEmail, setIsEmail] = useState(false);

  useEffect(() => {
    dispatch(setForgotPassword({ loading: false, error: null, data: null }));
    setEmail("");
  }, []);

  const formatEmail = (email) => {
    const emailReg = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.){1,2}[a-zA-Z]{2,}))$/
    );

    if (emailReg.test(email)) {
      return true;
    } else {
      false;
    }
  };

  useEffect(() => {
    if (formatEmail(email)) {
      setIsEmail(true);
    }
    return () => {
      if (isEmail === true) setIsEmail(false);
    };
  }, [email]);

  return (
    <View
      style={{
        paddingVertical: Sizes.fixPadding * 7.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
      }}
    >
      {forgotPassword.loading && <LoadingModal />}
      {forgotPassword.data === null ? (
        <View>
          <View style={{ marginBottom: Sizes.fixPadding }}>
            <Text style={{ ...Fonts.black17Regular }}>
              Untuk mengatur ulang password, silakan masukkan email yang telah
              kamu daftarkan.
            </Text>
          </View>
          <View style={{ marginVertical: 30 }}>
            <TextInput
              style={{
                height: 40,
                padding: 10,
                backgroundColor: "white",
                borderRadius: 5,
                borderWidth: email ? 1 : 0,
                borderColor: email && !isEmail ? "red" : "green",
              }}
              keyboardType="email-address"
              onChangeText={setEmail}
              autoCapitalize="none"
              value={email}
              placeholder="ketikkan email kamu"
            />
          </View>

          {forgotPassword.error !== null && (
            <Text style={{ color: "red", opacity: 0.8 }}>
              {forgotPassword.error}
            </Text>
          )}
          <Button
            mt={10}
            paddingTop={5}
            paddingBottom={5}
            bg={isEmail ? "amber.400" : "amber.300"}
            disabled={isEmail ? false : true}
            _pressed={{
              bg: "amber.300",
            }}
            onPress={() => {
              checkInternet().then((connenction) => {
                if (connenction) {
                  dispatch(getForgotPassword(email, Platform.OS));
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
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Kirim</Text>
          </Button>
        </View>
      ) : (
        <View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Fontisto
              name="paper-plane"
              size={100}
              color={Colors.primaryColor}
            />
            <View style={{ marginVertical: 50, alignItems: "center" }}>
              <Text style={{ ...Fonts.black17Bold, textAlign: "center" }}>
                Cek Email Kamu
              </Text>
              <Text style={{ ...Fonts.black17Regular, textAlign: "center" }}>
                Email pengaturan ulang password kamu sudah terkirim
              </Text>
              <Text
                style={{
                  ...Fonts.black17Bold,
                  marginTop: 20,
                }}
              >
                {email}
              </Text>
            </View>
          </View>
          <DefaultPrimaryButton
            text="Kembali Ke Halaman Login"
            onPress={() => navigation.goBack()}
          />
        </View>
      )}
    </View>
  );
};

export default ForgotPasswordContent;
