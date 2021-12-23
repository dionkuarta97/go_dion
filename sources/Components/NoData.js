import React from "react";
import { View, Text, Image, Dimensions } from "react-native";
import NoMateriImage from "../../assets/Images/No_Image_Purple_No_BG.png";
import NoImage2 from "../../assets/Images/helper/noimage2.png";
import NoImage from "../../assets/Images/helper/noimage.png";
import Fonts from "../Theme/Fonts";


const win = Dimensions.get('window')
const NoData = (props) => {
  const { msg, img } = props;
  return (
    <>
      <View style={{ justifyContent: "center", flex: 1 }}>
        <Image
          source={!img ? NoMateriImage : img === "NoImage2" ? NoImage2 : img === "noimage" ? NoImage : ""}
          style={{
            width: win.width / 1.6,
            height: win.width / 1.9,
            alignSelf: "center",
            marginBottom: 15,
          }}
        />
        <Text style={{ padding: 13, alignSelf: "center", textAlign: "center", ...Fonts.black17Regular }}>{msg}</Text>
      </View>
    </>
  );
};

export default NoData;
