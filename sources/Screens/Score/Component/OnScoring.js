import React from "react";
import { Text, View } from "react-native";

const OnScoring = () => {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Text style={{ fontWeight: "bold" }}>
                Jawaban kamu sedang dinilai,
            </Text>
            <Text style={{ color: "grey", textAlign: "center" }}>
                Jadi tunggu beberapa saat lagi, lakukan Refresh Skor untuk
                melihat kondisi nilai kamu
            </Text>
        </View>
    );
};

export default OnScoring;
