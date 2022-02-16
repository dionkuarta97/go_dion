import React, { useEffect } from "react";
import { Alert, Image, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Fonts from "../../../Theme/Fonts";
import Sizes from "../../../Theme/Sizes";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../../../Redux/Profile/profileActions";
import DefaultPrimaryButton from "../../../Components/Button/DefaultPrimaryButton";
import checkInternet from "../../../Services/CheckInternet";

const ProfileContent = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.profileReducer.profile);

  useEffect(() => {
    checkInternet().then((data) => {
      if (data) {
        dispatch(getMe());
      }
    });
  }, []);

  const renderInfoTile = (lable, value, icon) => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: Sizes.fixPadding * 2,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ ...Fonts.black17Bold }}>{lable}</Text>
          <Text
            style={{
              ...Fonts.gray15Bold,
              marginTop: Sizes.fixPadding / 2,
            }}
          >
            {value}
          </Text>
        </View>
        <MaterialIcons name={icon} size={28} color="gray" />
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: Sizes.fixPadding * 2,
        paddingVertical: Sizes.fixPadding * 3,
        alignItems: "center",
      }}
    >
      {/* <Image
                style={{width: 120, height: 120, borderRadius: 60}}
                source={require("../../../../assets/Images/user_profile/user_2.jpg")}
                resizeMode="contain"
            /> */}

      <View
        style={{
          width: 300,
        }}
      >
        <DefaultPrimaryButton
          onPress={() => {
            if (profile.kelas !== "12 IPA" && profile.kelas !== "12 IPS") {
              Alert.alert("Warning", "Anda Belum Kelas 12 SMA");
            } else {
              if (profile.program_studi) {
                navigation.navigate("LihatProdiScreen", {
                  prodi: profile.program_studi,
                });
              } else {
                navigation.navigate("PilihProdiScreen", {
                  profile,
                });
              }
            }
          }}
          text={profile.program_studi ? "LIHAT PRODI" : "PILIH PRODI"}
        />
      </View>

      <Text style={{ ...Fonts.black19Bold, marginTop: Sizes.fixPadding }}>
        {profile.full_name}
      </Text>

      <View
        style={{
          alignItems: "flex-start",
          marginTop: Sizes.fixPadding * 3,
        }}
      >
        {renderInfoTile("Email", profile.email, "email")}
        {renderInfoTile("Phone Number", profile.phone, "phone")}
        {renderInfoTile("Class Level", profile.kelas, "class")}
        {/* Data Alamat */}
        <Text
          style={{
            ...Fonts.orangeColor16Bold,
            marginVertical: Sizes.fixPadding,
          }}
        >
          Address Info
        </Text>
        {renderInfoTile("Province", profile.provinsi, "map")}
        {renderInfoTile("City", profile.kota, "apartment")}
        {renderInfoTile("Address", profile.alamat, "pin-drop")}
        {/* Data Sekolah */}
        <Text
          style={{
            ...Fonts.orangeColor16Bold,
            marginVertical: Sizes.fixPadding,
          }}
        >
          School Info
        </Text>
        {renderInfoTile("School Province", profile.provinsi_sekolah, "map")}
        {renderInfoTile("School City", profile.kota_sekolah, "apartment")}
        {renderInfoTile("School Name", profile.sekolah, "school")}

        {/* Data Wali */}
        <Text
          style={{
            ...Fonts.orangeColor16Bold,
            marginVertical: Sizes.fixPadding,
          }}
        >
          Wali Info
        </Text>
        {renderInfoTile("Wali Name", profile.nama_wali, "person")}
        {renderInfoTile("Wali Email", profile.email_wali, "email")}
        {renderInfoTile("Wali Phone Number", profile.phone_wali, "phone")}
      </View>
    </View>
  );
};

export default ProfileContent;
