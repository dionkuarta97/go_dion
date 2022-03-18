import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, Image, Dimensions, ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import img1 from "../../../assets/Images/onboarding/1.jpg";
import img2 from "../../../assets/Images/onboarding/2.jpg";
import img3 from "../../../assets/Images/onboarding/3.jpg";
import DefaultPrimaryButton from "../../Components/Button/DefaultPrimaryButton";
import { setFirstLogin } from "../../Redux/Auth/authActions";
import Fonts from "../../Theme/Fonts";
import { Box, HStack } from "native-base";

const win = Dimensions.get("window");
const BoardingScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [payload, setPayload] = useState(0);

  const onChange = (nativeEvent) => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
      );
      setPayload(slide);
    }
  };

  return (
    <>
      <View
        style={{
          backgroundColor: "white",
          flex: 1,
        }}
      >
        <ScrollView
          onScroll={({ nativeEvent }) => onChange(nativeEvent)}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
        >
          <Box
            style={{
              width: Dimensions.get("screen").width,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                ...Fonts.black25Bold,
                textAlign: "center",
              }}
            >
              Selamat datang di GO Online
            </Text>

            <Image
              source={img1}
              style={{
                width: win.height / 2.8,
                height: win.height / 2.8,
              }}
            />
            <View style={{ padding: 10 }}>
              <Text style={{ textAlign: "center" }}>
                Tempat paling nyaman untuk belajar online. Belajar menjadi mudah
              </Text>
            </View>
          </Box>
          <Box
            style={{
              width: Dimensions.get("screen").width,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                ...Fonts.black25Bold,
                textAlign: "center",
              }}
            >
              Ribuan Soal dan Video Pembelajaran
            </Text>

            <Image
              source={img2}
              style={{
                width: win.height / 2.8,
                height: win.height / 2.8,
              }}
            />
            <View style={{ padding: 10 }}>
              <Text style={{ textAlign: "center" }}>
                Soal dan video pembelajaran disesuaikan dengan kebutuhanmu di
                sekolah dan mempersiapkanmu menghadapi ujian.
              </Text>
            </View>
          </Box>
          <Box
            style={{
              width: Dimensions.get("screen").width,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                ...Fonts.black25Bold,
                textAlign: "center",
              }}
            >
              Menjadi Ahli bersama Kami
            </Text>

            <Image
              source={img3}
              style={{
                width: win.height / 2.8,
                height: win.height / 2.8,
              }}
            />
            <View style={{ padding: 10 }}>
              <Text style={{ textAlign: "center" }}>
                Tunggu apa lagi, ayo segera belajar sekarang juga.
              </Text>
            </View>
          </Box>
        </ScrollView>
        <HStack
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
          space={7}
        >
          <Text
            style={{
              backgroundColor:
                payload === 0 ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0.2)",
              width: payload === 0 ? 15 : 10,
              height: payload === 0 ? 15 : 10,
              borderRadius: 50,
            }}
          />
          <Text
            style={{
              backgroundColor:
                payload === 1 ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0.2)",
              width: payload === 1 ? 15 : 10,
              height: payload === 1 ? 15 : 10,
              borderRadius: 50,
            }}
          />
          <Text
            style={{
              backgroundColor:
                payload === 2 ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0.2)",
              width: payload === 2 ? 15 : 10,
              height: payload === 2 ? 15 : 10,
              borderRadius: 50,
            }}
          />
        </HStack>
        <View
          style={{
            paddingHorizontal: 50,
            paddingBottom: 10,
          }}
        >
          <DefaultPrimaryButton
            text="GET STARTED NOW"
            onPress={() => {
              dispatch(setFirstLogin(false));
              navigation.replace("MainScreen");
            }}
          />
        </View>
      </View>
    </>
  );
};

export default BoardingScreen;
