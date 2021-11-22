import React from "react";
import {Text, View} from "react-native";

const VersionText = () => {
    return (
        <View
            style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Text>Version </Text>
        </View>
    );
};

export default VersionText;
