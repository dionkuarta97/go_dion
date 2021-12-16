import React, { useEffect } from "react";
import { SafeAreaView, StatusBar, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import SliverAppBar from "../../Components/sliverAppBar";
import Colors from "../../Theme/Colors";
import Fonts from "../../Theme/Fonts";
import ProfileContent from "./Component/ProfileContent";
import { useNavigation } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getListCity, getListProvince } from "../../Redux/Data/dataActions";
const ProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profileReducer.profile);
  const listProvince = useSelector((state) => state.dataReducer.listProvince);

  const getIdProfinsiSchool = (provinsi) => {
    const id = listProvince.data?.filter((value) => value.provinsi === provinsi);
    if (id !== undefined) return id[0]?.idprovinsi;
  };
  useEffect(() => {
    dispatch(getListProvince());
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SliverAppBar
        leftItem={<MaterialIcons name="arrow-back-ios" size={24} color={Colors.blackColor} onPress={() => navigation.goBack()} />}
        rightItem={
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                dispatch(getListCity(getIdProfinsiSchool(profile.provinsi_sekolah)));
                navigation.navigate("ProfileEditScreen", {
                  profile: profile,
                });
              }}
            >
              <Text style={{ paddingHorizontal: 15, paddingVertical: 5, borderRadius: 50, backgroundColor: Colors.blackColor, color: Colors.primaryColor, fontWeight: "bold", letterSpacing: 1.2, fontSize: 14 }}>
                <MaterialIcons size={14} name="edit" /> Edit Profile
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
            <Text style={Fonts.black25Bold}>Akun Profil</Text>
          </View>
        }
        toolbarColor={Colors.primaryColor}
        toolBarMinHeight={40}
        toolbarMaxHeight={230}
        src={require("../../../assets/Images/appbar_bg.png")}
      >
        <ProfileContent />
        <StatusBar backgroundColor={Colors.primaryColor} />
      </SliverAppBar>
    </SafeAreaView>
  );
};

export default ProfileScreen;
