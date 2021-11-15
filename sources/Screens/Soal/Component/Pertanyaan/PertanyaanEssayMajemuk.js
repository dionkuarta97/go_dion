import React, { useState } from "react";
import { Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Sizes from "../../../../Theme/Sizes";
import CompStyles from "../../../../Theme/styles/globalStyles";

const PertanyaanEssayMajemuk = () => {
    const [selectedAnswer, setSelectedAnswer] = useState([]);

    return (
        <View style={CompStyles.defaultCard}>
            <View style={{ flexDirection: "row" }}>
                <Text>1. </Text>
                <Text style={{ flex: 1 }}>
                    Jika ada seorang murid dengan nilai 75, maka pasti ada murid
                    dengen nilai 85
                </Text>
            </View>

            <View
                style={{
                    marginTop: Sizes.fixPadding,
                    padding: Sizes.fixPadding,
                    backgroundColor: "whitesmoke",
                    borderRadius: 5,
                }}
            >
                <TextInput
                    numberOfLines={3}
                    style={{ textAlignVertical: "top" }}
                    placeholder="Jawaban kamu.."
                    multiline={true}
                />
            </View>

            <View style={{ flexDirection: "row", marginTop: 20 }}>
                <Text>2. </Text>
                <Text style={{ flex: 1 }}>
                    Jika ada seorang murid dengan nilai 75, maka pasti ada murid
                    dengen nilai 85
                </Text>
            </View>

            <View
                style={{
                    marginTop: Sizes.fixPadding,
                    padding: Sizes.fixPadding,
                    backgroundColor: "whitesmoke",
                    borderRadius: 5,
                }}
            >
                <TextInput
                    numberOfLines={3}
                    style={{ textAlignVertical: "top" }}
                    placeholder="Jawaban kamu.."
                    multiline={true}
                />
            </View>

            <View style={{ flexDirection: "row", marginTop: 20 }}>
                <Text>3. </Text>
                <Text style={{ flex: 1 }}>
                    Jika ada seorang murid dengan nilai 75, maka pasti ada murid
                    dengen nilai 85
                </Text>
            </View>

            <View
                style={{
                    marginTop: Sizes.fixPadding,
                    padding: Sizes.fixPadding,
                    backgroundColor: "whitesmoke",
                    borderRadius: 5,
                }}
            >
                <TextInput
                    numberOfLines={3}
                    style={{ textAlignVertical: "top" }}
                    placeholder="Jawaban kamu.."
                    multiline={true}
                />
            </View>
        </View>
    );
};

export default PertanyaanEssayMajemuk;
