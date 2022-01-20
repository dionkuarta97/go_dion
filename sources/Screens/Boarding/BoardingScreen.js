import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, Image, Dimensions, ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import img1 from "../../../assets/Images/onboarding/1.jpg";
import img2 from "../../../assets/Images/onboarding/2.jpg";
import img3 from "../../../assets/Images/onboarding/3.jpg";
import DefaultPrimaryButton from "../../Components/Button/DefaultPrimaryButton";
import { setFirstLogin } from "../../Redux/Auth/authActions";
import Colors from "../../Theme/Colors";
import Fonts from "../../Theme/Fonts";

const win = Dimensions.get("window");
const BoardingScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [payload, setPayload] = useState(1);

  return (
    <>
      <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <View
            style={{
              height: Dimensions.get("screen").height / 1.8,
            }}
          >
            <Text
              style={{
                ...Fonts.black25Bold,
                alignSelf: "center",
                marginTop: win.height / 12,
                textAlign: "center",
                paddingStart: 15,
                paddingEnd: 15,
              }}
            >
              {payload === 1
                ? "Selamat datang di GO Online"
                : payload === 2
                ? "Ribuan Soal dan Video Pembelajaran"
                : "Menjadi Ahli bersama Kami"}
            </Text>
            <View
              style={{
                marginTop: win.height / 14,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={payload === 1 ? img1 : payload === 2 ? img2 : img3}
                style={{
                  width: win.height / 2.8,
                  height: win.height / 2.8,
                }}
              />
            </View>
            <Text
              style={{
                alignSelf: "center",
                ...Fonts.black15Regular,
                marginTop: 10,
                textAlign: "center",
                paddingStart: 15,
                paddingEnd: 15,
              }}
            >
              {payload === 1
                ? "Tempat paling nyaman untuk belajar online. Belajar menjadi mudah."
                : payload === 2
                ? "Soal dan video pembelajaran disesuaikan dengan kebutuhanmu di sekolah dan mempersiapkanmu menghadapi ujian."
                : "Tunggu apa lagi, ayo segera belajar sekarang juga."}
            </Text>
          </View>
          {payload !== 3 ? (
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
                marginTop: Dimensions.get("screen").height / 3.6,
                padding: 25,
              }}
            >
              <Text
                onPress={() => {
                  dispatch(setFirstLogin(false));
                  navigation.replace("MainScreen");
                }}
                style={{ ...Fonts.black20Regular, color: Colors.primaryColor }}
              >
                SKIP
              </Text>
              <Text
                style={{
                  marginStart: win.width / 5,
                  backgroundColor:
                    payload === 1 ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0.2)",
                  width: payload === 1 ? 15 : 10,
                  height: payload === 1 ? 15 : 10,
                  borderRadius: win.width / 2,
                }}
              />
              <Text
                style={{
                  backgroundColor:
                    payload === 2 ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0.2)",
                  width: payload === 2 ? 15 : 10,
                  height: payload === 2 ? 15 : 10,
                  borderRadius: win.width / 2,
                }}
              />
              <Text
                style={{
                  backgroundColor:
                    payload === 3 ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0.2)",
                  width: payload === 3 ? 15 : 10,
                  height: payload === 3 ? 15 : 10,
                  borderRadius: win.width / 2,
                  marginEnd: win.width / 5,
                }}
              />
              <Text
                onPress={() => setPayload(payload + 1)}
                style={{ ...Fonts.black20Regular, color: Colors.primaryColor }}
              >
                NEXT
              </Text>
            </View>
          ) : (
            <View
              style={{
                paddingEnd: 15,
                paddingStart: 15,
                marginTop: win.height / 3.6,
              }}
            >
              <DefaultPrimaryButton
                text="GET STARTED NOW"
                onPress={() => {
                  // setPayload(1)
                  dispatch(setFirstLogin(false));
                  navigation.replace("MainScreen");
                }}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default BoardingScreen;
