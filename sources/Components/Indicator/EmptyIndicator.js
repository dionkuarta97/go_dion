import React from "react";
import { Dimensions, Image, Text, View } from "react-native";

const EmptyIndicator = (props) => {
   const { msg } = props;
   return (
      <View
         style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
         }}
      >
         <Image
            style={{
               height: Dimensions.get("screen").width / 2,
               width: Dimensions.get("screen").width / 2,
               borderRadius: 50,
            }}
            source={require("../../../assets/Images/helper/empty.png")}
            resizeMode="contain"
         />
         {msg && <Text>{msg}</Text>}
      </View>
   );
};

export default EmptyIndicator;
