import React from "react";
import { Text, View, Platform } from "react-native";
import { useSelector } from "react-redux";
import Sizes from "../Theme/Sizes";

const VersionText = () => {
  const androidVersion = useSelector(
    (state) => state.versionReducer.androidVersion
  );
  const iosVersion = useSelector((state) => state.versionReducer.iosVersion);
  return (
    <View
      style={{
        flexDirection: "row",
        paddingVertical: Sizes.fixPadding * 2,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>
        Version {Platform.OS === "android" ? androidVersion : iosVersion}
      </Text>
    </View>
  );
};

export default VersionText;
