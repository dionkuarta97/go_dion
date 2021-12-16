import React from "react";
import { View, Text, Image } from "react-native";
import NoMateriImage from "../../../../assets/Images/No_Image_Purple_No_BG.png";
import DefaultPrimaryButton from "../../../Components/Button/DefaultPrimaryButton";
import { useNavigation } from "@react-navigation/core";

const noMateri = () => {
  const navigation = useNavigation();
  return (
    <>
      <View style={{ justifyContent: "center", flex: 1 }}>
        <Image
          source={NoMateriImage}
          style={{
            width: 299,
            height: 253,
            alignSelf: "center",
            marginBottom: 15,
          }}
        />
        <Text style={{ alignSelf: "center" }}>Kamu Belum Memiliki Materi Apapun</Text>
      </View>
      <DefaultPrimaryButton text="Beli Sekarang" onPress={() => navigation.navigate("ProductScreen")} />
    </>
  );
};

export default noMateri;
