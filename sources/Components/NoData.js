import React from "react";
import { View, Text, Image } from "react-native";
import NoMateriImage from "../../assets/Images/No_Image_Purple_No_BG.png";
import NoImage2 from "../../assets/Images/helper/noimage2.png";

const NoData = (props) => {
  const { msg, img } = props;
  return (
    <>
      <View style={{ justifyContent: "center", flex: 1 }}>
        <Image
          source={!img ? NoMateriImage : NoImage2}
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
