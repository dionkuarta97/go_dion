import React, { useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Fonts from "../../../Theme/Fonts";
import Sizes from "../../../Theme/Sizes";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";
import { useSelector } from "react-redux";
import DefaultPrimaryButton from "../../../Components/Button/DefaultPrimaryButton";

import { Button } from "native-base";
import ImageView from "react-native-image-viewing";

import defaultImage from "../../../../assets/Images/user_profile/no-user.jpg";
import { capitalizeFirstLetter } from "../../../Services/helper";

import Analytics from "../../../Services/goAnalytics";
import { EventAnalytic } from "../../../Utils/event_analytic";

const DEFAULT_IMAGE = Image.resolveAssetSource(defaultImage).uri;

const ProfileContent = (props) => {
   const navigation = useNavigation();

   const [visible, setIsVisible] = useState(false);
   const profile = useSelector((state) => state.profileReducer.profile);

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
            <MaterialIcons
               name={icon}
               size={28}
               color="gray"
            />
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
         <TouchableOpacity
            onPress={() => {
               setIsVisible(true);
            }}
         >
            <Image
               style={{
                  height: 150.0,
                  width: 150.0,
                  borderRadius: 200.0,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.8,
                  shadowRadius: 2,
               }}
               source={{
                  uri:
                     profile !== null && profile.avatar !== null
                        ? profile.avatar
                        : DEFAULT_IMAGE,
               }}
               resizeMode="contain"
            />
         </TouchableOpacity>
         <ImageView
            images={[
               {
                  uri:
                     profile !== null && profile.avatar !== null
                        ? profile.avatar
                        : DEFAULT_IMAGE,
               },
            ]}
            imageIndex={0}
            visible={visible}
            onRequestClose={() => setIsVisible(false)}
         />
         <Button
            shadow={3}
            style={{
               position: "absolute",
               top: 133,
               right: 130,
               borderRadius: 100,
            }}
            colorScheme={"amber"}
            onPress={() =>
               navigation.navigate("GantiFotoScreen", {
                  poto:
                     profile !== null && profile.avatar !== null
                        ? profile.avatar
                        : DEFAULT_IMAGE,
               })
            }
         >
            <MaterialIcons
               style={{ margin: 1 }}
               name="enhance-photo-translate"
               size={35}
               color="black"
            />
         </Button>

         <Text style={{ ...Fonts.black19Bold, marginTop: 30 }}>
            {capitalizeFirstLetter(profile.full_name)}
         </Text>

         <View
            style={{
               marginTop: 20,
               width: 300,
            }}
         >
            <DefaultPrimaryButton
               onPress={() => {
                  if (
                     profile.kelas !== "12 IPA" &&
                     profile.kelas !== "12 IPS"
                  ) {
                     Alert.alert(
                        "Peringatan",
                        "Maaf kamu belum bisa pilih prodi. Tunggu kelas 12 ya, semangat!"
                     );
                  } else {
                     if (profile.program_studi) {
                        navigation.navigate("LihatProdiScreen", {
                           prodi: profile.program_studi,
                        });
                     } else {
                        /** send analytic : Pilih Prodi */
                        Analytics.logCustomEvent(EventAnalytic.GoProfileProdi);

                        navigation.navigate("PilihProdiScreen", {
                           profile,
                           from: props.from,
                        });
                     }
                  }
               }}
               text={profile.program_studi ? "Lihat Prodi" : "Pilih Prodi"}
            />
         </View>

         <View
            style={{
               alignItems: "flex-start",
               marginTop: Sizes.fixPadding * 3,
            }}
         >
            {renderInfoTile("Email", profile.email, "email")}
            {renderInfoTile("Nomor Telepon/HP", profile.phone, "phone")}
            {renderInfoTile("Tingkatan Kelas", profile.kelas, "class")}
            {/* Data Alamat */}
            <Text
               style={{
                  ...Fonts.orangeColor16Bold,
                  marginVertical: Sizes.fixPadding,
               }}
            >
               Informasi Alamat
            </Text>
            {renderInfoTile("Provinsi", profile.provinsi, "map")}
            {renderInfoTile("Kab/Kota", profile.kota, "apartment")}
            {renderInfoTile("Alamat", profile.alamat, "pin-drop")}
            {/* Data Sekolah */}
            <Text
               style={{
                  ...Fonts.orangeColor16Bold,
                  marginVertical: Sizes.fixPadding,
               }}
            >
               Alamat Sekolah
            </Text>
            {renderInfoTile("Provinsi", profile.provinsi_sekolah, "map")}
            {renderInfoTile("Kab/Kota", profile.kota_sekolah, "apartment")}
            {renderInfoTile("Nama Sekolah", profile.sekolah, "school")}

            {/* Data Wali */}
            <Text
               style={{
                  ...Fonts.orangeColor16Bold,
                  marginVertical: Sizes.fixPadding,
               }}
            >
               Informasi Wali
            </Text>
            {renderInfoTile("Nama Wali", profile.nama_wali, "person")}
            {renderInfoTile("Email Wali", profile.email_wali, "email")}
            {renderInfoTile(
               "Nomor Telepon/HP Wali",
               profile.phone_wali,
               "phone"
            )}
         </View>
      </View>
   );
};

export default ProfileContent;
