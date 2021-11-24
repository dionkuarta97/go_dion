import React, {useEffect, useState} from "react";
import {Text, View} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";
import HTMLView from "react-native-htmlview";
import CompStyles from "../../../../Theme/styles/globalStyles";
import {formatQuestion} from "../../Utils/formatQuestion";

const options = ["A", "B", "C", "D", "E", "F"];
const PertanyaanPBK = (props) => {
    const question = props.question;

    const [selectedAnswer, setSelectedAnswer] = useState([]);

    useEffect(() => {
        if (props.answer === null) {
            const initAnswer = [...Array(question.jawaban.length).keys()].map(
                (val) => -1
            );
            setSelectedAnswer(initAnswer);
        } else {
            setSelectedAnswer(props.answer);
        }
    }, [question]);

    const isOnAnswer = (index) => {
        return selectedAnswer[index] === 1;
    };

    const changeAnswer = (index) => {
        let userAnswer = [];
        if (isOnAnswer(index)) {
            const newState = [...selectedAnswer];
            newState[index] = -1;
            userAnswer = newState;
            setSelectedAnswer(newState);
        } else {
            const newState = [...selectedAnswer];
            newState[index] = 1;
            userAnswer = newState;
            setSelectedAnswer(newState);
        }
        console.log(userAnswer);
        props.onSelect(userAnswer);
    };

    const renderOption = (answer, index) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    changeAnswer(index);
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
                        borderColor: isOnAnswer(index) ? "#7DC579" : "#91919F",
                        backgroundColor: isOnAnswer(index) ? "#E1FFDF" : null,
                    }}
                >
                    <Text style={{marginRight: 10}}>{options[index]}.</Text>
                    <HTMLView value={answer.pilihan} />
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={CompStyles.defaultCard}>
            <View style={{flexDirection: "row"}}>
                {/* <HTMLView value={formatQuestion(question.pertanyaan)} /> */}
            </View>

            <View>
                {question.jawaban.map((item, index) =>
                    renderOption(item, index)
                )}
            </View>
        </View>
    );
};

export default PertanyaanPBK;
