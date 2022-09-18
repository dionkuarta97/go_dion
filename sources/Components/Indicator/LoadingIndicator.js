import React from "react";
import { ActivityIndicator, View } from "react-native";
import Colors from "../../Theme/Colors";

const LoadingIndicator = (props) => {
  const { from } = props;
  return (
    <View
      style={{
        marginTop: from ? 30 : 0,
        flex: 1,
        justifyContent: from ? "flex-start" : "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator color={Colors.orangeColor} size={30} />
    </View>
  );
};

export default LoadingIndicator;
