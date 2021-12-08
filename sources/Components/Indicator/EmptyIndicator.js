import React from "react";
import { Dimensions, Image, Text, View } from "react-native";

const EmptyIndicator = () => {
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
        </View>
    );
};

export default EmptyIndicator;
