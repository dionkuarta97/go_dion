import React from "react";
import { View, Text, Image, Dimensions } from "react-native";

import errorImg from "../../../assets/Images/helper/error.png";
import Fonts from "../../Theme/Fonts";

const win = Dimensions.get("window");
const ErrorIndicator = (props) => {
   const { msg } = props;
   return (
      <>
         <View
            style={{ justifyContent: "center", flex: 1, alignItems: "center" }}
         >
            <Image
               source={errorImg}
               style={{
                  borderRadius: 15,
                  width: win.width / 1.6,
                  height: win.width / 1.9,
                  alignSelf: "center",
                  marginBottom: 15,
               }}
            />
            <Text
               style={{
                  padding: 13,
                  alignSelf: "center",
                  textAlign: "center",
                  ...Fonts.black17Regular,
               }}
            >
               {msg}
            </Text>
         </View>
      </>
   );
};

export default ErrorIndicator;
