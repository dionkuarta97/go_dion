import { useNavigation } from "@react-navigation/native";
import { View, Text, Button } from "native-base";
import React from "react";
import { Image, Dimensions } from "react-native";

const ErrorScreen = (props) => {
  const { related_to } = props;
  const navigation = useNavigation();
  return (
    <View justifyContent={"center"} alignItems={"center"} flex={1}>
      <Image
        style={{ height: 200 }}
        resizeMode="contain"
        source={require("../../../../assets/Images/soal/ongagal.png")}
      />

      <Text style={{ marginTop: 30, fontWeight: "bold" }}>Error</Text>
      <Text style={{ color: "grey" }} paddingX={10} textAlign={"center"}>
        Telah terjadi kesalahan, coba beberapa saat lagi
      </Text>
      <Button
        width={Dimensions.get("screen").width / 1.4}
        bg={"amber.400"}
        _pressed={{ bg: "amber.300" }}
        mt={20}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text bold fontSize={17}>
          Kembali
        </Text>
      </Button>
    </View>
  );
};

export default ErrorScreen;
