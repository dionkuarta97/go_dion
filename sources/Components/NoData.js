import React from "react";
import { View, Text, Image } from "react-native";
import NoMateriImage from "../../assets/Images/No_Image_Purple_No_BG.png";

const NoData = (props) => {
  const { msg } = props;
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
        <Text style={{ alignSelf: "center" }}>{msg}</Text>
      </View>
    </>
  );
};

export default NoData;
