import React from "react";
import {Text, View} from "react-native";
import {useSelector} from "react-redux";
import Sizes from "../Theme/Sizes";

const VersionText = () => {
    const androidVersion = useSelector(
        (state) => state.versionReducer.androidVersion
    );
    return (
        <View
            style={{
                flexDirection: "row",
                paddingVertical: Sizes.fixPadding * 2,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Text>Version {androidVersion}</Text>
        </View>
    );
};

export default VersionText;
