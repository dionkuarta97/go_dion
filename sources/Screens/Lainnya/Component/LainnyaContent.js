import React from "react";
import { Alert, Text, TouchableOpacity, View, Linking } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Sizes from "../../../Theme/Sizes";
import Colors from "../../../Theme/Colors";
import Fonts from "../../../Theme/Fonts";
import { useNavigation } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoginData,
  setLoginStatus,
  setToken,
} from "../../../Redux/Auth/authActions";
import { defaultInitState } from "../../../Redux/helper";
import { setMe, setProfile } from "../../../Redux/Profile/profileActions";
import VersionText from "../../../Components/VersionText";
import { Box } from "native-base";
import { Platform } from "expo-modules-core";

const LainnyaContent = () => {
  const isLogin = useSelector((state) => state.authReducer.isLogin);
  const navigation = useNavigation();
  const OpenWEB = (url) => {
    Linking.openURL(url);
  };
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.authReducer);

  const renderTile = (lable, icon, onPress) => {
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={() => onPress()}>
        <View
          style={{
            flexDirection: "row",
            padding: Sizes.fixPadding * 2,
            backgroundColor: "white",
            elevation: 2,
            marginBottom: Sizes.fixPadding * 2,
            alignItems: "center",
          }}
        >
          <MaterialIcons name={icon} size={28} color="gray" />
          <Text
            style={{
              flex: 1,
              ...Fonts.gray17Regular,
              fontWeight: "bold",
              marginLeft: Sizes.fixPadding,
            }}
          >
            {lable}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{ flex: 1, paddingVertical: Sizes.fixPadding * 2 }}>
      {!isLogin && (
        <Box mt={4} alignItems={"center"}>
          <Text style={{ fontSize: 15 }}>Login terlebih dahulu</Text>
          <Text style={{ fontSize: 15 }}>untuk melihat halaman ini</Text>
        </Box>
      )}
      {isLogin &&
        renderTile("Profil", "person", () => {
          if (isLogin) {
            navigation.navigate("ProfileScreen");
          } else {
            Alert.alert(
              "Tidak Bisa Masuk",
              "Anda belum punya akun untuk mengakses menu ini"
            );
          }
        })}
      {/* {isLogin && renderTile("Score History", "history", () => {
                if (isLogin) {
                    navigation.navigate("ScoreListScreen");
                } else {
                    Alert.alert(
                        "Tidak Bisa Masuk",
                        "Anda belum punya akun untuk mengakses menu ini"
                    );
                }
            })} */}
      {/* {renderTile("Base Url", "link", () => {
                navigation.navigate("BaseurlScreen");
            })} */}

      {isLogin &&
        renderTile("Keluar", "logout", () => {
          dispatch(setLoginStatus(false));
          dispatch(setToken(null));
          dispatch(setProfile(null));
          dispatch(
            setLoginData({
              data: null,
              loading: false,
              error: null,
            })
          );
          navigation.replace("MainScreen");
        })}
      {isLogin &&
        Platform.OS === "ios" &&
        renderTile("Hapus Akun", "delete", () => {
          Alert.alert("Peringatan", "Apakah kamu yakin untuk menghapus akun?", [
            {
              text: "Ya, Saya Yakin",
              onPress: () => {
                OpenWEB(
                  "https://student.gobimbelonline.net/setting/unactive?token=" +
                    token
                );
              },
            },
            { text: "Tidak", onPress: () => {} },
          ]);
        })}
      <VersionText />
    </View>
  );
};

export default LainnyaContent;
