import React from "react";
import {ActivityIndicator, View} from "react-native";
import Colors from "../../Theme/Colors";

const LoadingIndicator = () => {
    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <ActivityIndicator color={Colors.orangeColor} size={30} />
        </View>
    );
};

export default LoadingIndicator;
