import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import SliverAppBar from "../../Components/sliverAppBar";
import Colors from "../../Theme/Colors";
import Fonts from "../../Theme/Fonts";
import ProfileContent from "./Component/ProfileContent";
import { useNavigation } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getListCity, getListProvince } from "../../Redux/Data/dataActions";
import { Box, useToast } from "native-base";
import checkInternet from "../../Services/CheckInternet";
import ToastErrorContent from "../../Components/ToastErrorContent";
const ProfileScreen = (props) => {
  const navigation = useNavigation();
  const toast = useToast();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profileReducer.profile);
  const listProvince = useSelector((state) => state.dataReducer.listProvince);
  const listCity = useSelector((state) => state.dataReducer.listCity);
  const getIdProfinsiSchool = (provinsi) => {
    const id = listProvince.data?.filter(
      (value) => value.provinsi === provinsi
    );
    if (id !== undefined) return id[0]?.idprovinsi;
  };
  useEffect(() => {
    checkInternet().then((data) => {
      if (data) {
        dispatch(getListProvince());
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
  }, []);

  useEffect(() => {
    checkInternet().then((data) => {
      if (data) {
        dispatch(getListCity(getIdProfinsiSchool(profile.provinsi_sekolah)));
      }
    });
  }, [listProvince.loading]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {listProvince.loading || listCity.loading ? (
        <View style={{ justifyContent: "center", flex: 1 }}>
          <ActivityIndicator color={Colors.orangeColor} size={30} />
        </View>
      ) : (
        <SliverAppBar
          leftItem={
            <Box
              style={{
                paddingLeft: 5,
                paddingVertical: 3,
                borderRadius: 10,
                backgroundColor: "rgba(245,158,11, 0)",
              }}
            >
              <MaterialIcons
                name="arrow-back-ios"
                size={24}
                color={Colors.blackColor}
                onPress={() => navigation.goBack()}
              />
            </Box>
          }
          rightItem={
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                  navigation.navigate("ProfileEditScreen", {
                    profile: profile,
                  });
                }}
              >
                <Text
                  style={{
                    paddingHorizontal: 15,
                    paddingVertical: 5,
                    borderRadius: 50,
                    backgroundColor: Colors.blackColor,
                    color: Colors.primaryColor,
                    fontWeight: "bold",
                    letterSpacing: 1.2,
                    fontSize: 14,
                  }}
                >
                  <MaterialIcons size={14} name="edit" /> Ubah Profile
                </Text>
              </TouchableOpacity>
            </View>
          }
          element={
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
              }}
            >
              <Text style={Fonts.black25Bold}>Profil Saya</Text>
            </View>
          }
          toolbarColor={Colors.primaryColor}
          toolBarMinHeight={40}
          toolbarMaxHeight={230}
          src={require("../../../assets/Images/appbar_bg.png")}
        >
          <ProfileContent from={props.route.params?.from} />
          <StatusBar backgroundColor={Colors.primaryColor} />
        </SliverAppBar>
      )}
    </SafeAreaView>
  );
};

export default ProfileScreen;
