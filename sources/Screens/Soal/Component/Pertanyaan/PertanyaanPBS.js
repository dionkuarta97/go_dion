import React, { useState } from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import CompStyles from "../../../../Theme/styles/globalStyles";

const PertanyaanPBS = () => {
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const renderOption = ({ opt }) => {
        return (
            <TouchableOpacity onPress={() => setSelectedAnswer(opt)}>
                <View
                    style={{
                        flexDirection: "row",
                        paddingVertical: 15,
                        paddingHorizontal: 20,
                        borderRadius: 10,
                        borderWidth: 1,
                        marginTop: 10,
                        borderColor:
                            selectedAnswer == opt ? "#7DC579" : "#91919F",
                        backgroundColor:
                            selectedAnswer == opt ? "#E1FFDF" : null,
                    }}
                >
                    <Text>{opt}.</Text>
                    <Text style={{ marginLeft: 10 }}>
                        sadasldkj alskj dlaksjd klasj dlasdlasjl as jlsakj
                        dlkasj kldasd .
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={CompStyles.defaultCard}>
            <View style={{ flexDirection: "row" }}>
                <Text>1. </Text>
                <Text style={{ flex: 1 }}>
                    Jika ada seorang murid dengan nilai 75, maka pasti ada murid
                    dengen nilai 85
                </Text>
            </View>

            <View>
                {renderOption({ opt: "A" })}
                {renderOption({ opt: "B" })}
                {renderOption({ opt: "C" })}
                {renderOption({ opt: "D" })}
            </View>
        </View>
    );
};

export default PertanyaanPBS;
