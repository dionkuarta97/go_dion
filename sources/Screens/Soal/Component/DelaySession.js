import React from "react";
import { Dimensions, Text, View } from "react-native";
import Fonts from "../../../Theme/Fonts";

const DelaySession = () => {
    return (
        <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            <View
                style={{
                    width: Dimensions.get("screen").width * 0.8,
                    alignItems: "center",
                }}
            >
                <Text style={{ ...Fonts.black17Bold }}>Sabar dulu ya,</Text>
                <Text style={{ textAlign: "center" }}>
                    Sesi akan segera berakhir dimohon untuk menunggu sebentar
                </Text>
            </View>
        </View>
    );
};

export default DelaySession;
