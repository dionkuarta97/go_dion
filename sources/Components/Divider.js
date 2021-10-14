import React from "react";
import {View} from "react-native";
import {LpSizesUtils} from "../Theme/utils/learnProUtils";

const Divider = () => {
    return (
        <View
            style={{
                width: "100%",
                height: 1,
                backgroundColor: "black",
                marginVertical: LpSizesUtils.fixPadding,
                opacity: 0.1,
            }}
        />
    );
};

export default Divider;
