import React, {useEffect, useState} from "react";
import {Text, View} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";
import HTMLView from "react-native-htmlview";
import CompStyles from "../../../../Theme/styles/globalStyles";

const options = ["A", "B", "C", "D", "E", "F"];
const PertanyaanPBS = (props) => {
    const question = props.question;
    const [selectedAnswer, setSelectedAnswer] = useState(-1);

    useEffect(() => {
        if (props.answer === null) setSelectedAnswer(-1);
        else setSelectedAnswer(props.answer);
    }, [question]);

    const renderOption = (answer, index) => {
        return (
            <TouchableOpacity
                key={"answer" + index}
                onPress={() => {
                    setSelectedAnswer(index);
                    props.onSelect([index]);
                }}
                key={`answer${index}`}
            >
                <View
                    style={{
                        flexDirection: "row",
                        paddingVertical: 15,
                        paddingHorizontal: 20,
                        borderRadius: 10,
                        borderWidth: 1,
                        marginTop: 10,
                        borderColor:
                            selectedAnswer == index ? "#7DC579" : "#91919F",
                        backgroundColor:
                            selectedAnswer == index ? "#E1FFDF" : null,
                    }}
                >
                    <Text style={{marginRight: 10}}>{options[index]}.</Text>
                    <HTMLView value={answer.pilihan} />
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={CompStyles.defaultCard} key={question._id}>
            <View style={{flexDirection: "row"}}>
                <HTMLView value={question.pertanyaan} />
            </View>

            <View>
                {question.jawaban.map((item, index) =>
                    renderOption(item, index)
                )}
            </View>
        </View>
    );
};

export default PertanyaanPBS;
