import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { Dimensions, Text, View } from "react-native";
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

const ForgotPasswordContent = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const forgotPassword = useSelector(
    (state) => state.authReducer.forgotPassword
  );

  useEffect(() => {
    dispatch(setForgotPassword({ loading: false, error: null, data: null }));
    setEmail("");
  }, []);

  const [email, setEmail] = useState("");

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
              Masukkan email yang kamu daftarkan. Kami akan mengirimkan link
              untuk informasi password
            </Text>
          </View>
          <DefaultTextInput placeholder="email kamu" onChangeText={setEmail} />

          {forgotPassword.error !== null && (
            <Text style={{ color: "red", opacity: 0.8 }}>
              {forgotPassword.error}
            </Text>
          )}

          <DefaultPrimaryButton
            text="Kirim Permintaan"
            onPress={() => {
              checkInternet().then((connenction) => {
                if (connenction) {
                  dispatch(getForgotPassword(email));
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
              <Text style={{ ...Fonts.black17Regular }}>
                Kami mengirimkan reset link ke email kamu
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
            text="Kembali ke halaman login"
            onPress={() => navigation.goBack()}
          />
        </View>
      )}
    </View>
  );
};

export default ForgotPasswordContent;
