import { useNavigation } from "@react-navigation/native";
import { View, Text, Button } from "native-base";
import React from "react";
import { Image, Dimensions } from "react-native";
import { useDispatch } from "react-redux";
import { setSoal } from "../../../Redux/Soal/soalActions";

const Finish = (props) => {
  const { related_to, setFinish } = props;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <View justifyContent={"center"} alignItems={"center"} flex={1}>
      <Image
        style={{ height: 200 }}
        resizeMode="contain"
        source={require("../../../../assets/Images/soal/ondone.png")}
      />

      <Text style={{ marginTop: 30, fontWeight: "bold" }}>
        Jawaban kamu berhasil dikirim
      </Text>
      <Text style={{ color: "grey" }} paddingX={10} textAlign={"center"}>
        Klik tombol dibawah ini untuk cek skor kamu
      </Text>
      <Button
        width={Dimensions.get("screen").width / 1.4}
        bg={"amber.400"}
        _pressed={{ bg: "amber.300" }}
        mt={20}
        onPress={() => {
          dispatch(
            setSoal({
              data: null,
              error: null,
              loading: false,
            })
          );
          navigation.navigate("TryoutScoreScreen", {
            fromSoal: true,
            related_to: {
              product_type: related_to.key,
              product_id: related_to.key_id,
              quiz_id: related_to.bab_id,
            },
          });
        }}
      >
        <Text bold fontSize={17}>
          Cek Skor Kamu
        </Text>
      </Button>
    </View>
  );
};

export default Finish;
