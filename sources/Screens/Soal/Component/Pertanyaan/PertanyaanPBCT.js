import React, { useState } from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import CompStyles from "../../../../Theme/styles/globalStyles";

const PertanyaanPBCT = () => {
    const [selectedAnswer, setSelectedAnswer] = useState([]);

    const isOnAnswer = (opt) => {
        const answer = selectedAnswer.find((val) => val == opt) ?? false;
        return answer;
    };

    const changeAnswer = (opt) => {
        if (isOnAnswer(opt) === opt) {
            setSelectedAnswer((prevState) =>
                prevState.filter((val) => val !== opt)
            );
        } else {
            if (selectedAnswer.length < 2)
                setSelectedAnswer((prevState) => [...prevState, opt]);
        }
    };

    const renderOption = ({ opt }) => {
        return (
            <TouchableOpacity onPress={() => changeAnswer(opt)}>
                <View
                    style={{
                        flexDirection: "row",
                        paddingVertical: 15,
                        paddingHorizontal: 20,
                        borderRadius: 10,
                        borderWidth: 1,
                        marginTop: 10,
                        borderColor:
                            isOnAnswer(opt) == opt ? "#7DC579" : "#91919F",
                        backgroundColor:
                            isOnAnswer(opt) == opt ? "#E1FFDF" : null,
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
                {renderOption({ opt: "E" })}
            </View>
        </View>
    );
};

export default PertanyaanPBCT;
