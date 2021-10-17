import React from "react";
import {View} from "react-native";
import Sizes from "../Theme/Sizes";

const Divider = () => {
    return (
        <View
            style={{
                width: "100%",
                height: 1,
                backgroundColor: "black",
                marginVertical: Sizes.fixPadding,
                opacity: 0.1,
            }}
        />
    );
};

export default Divider;
