import React, { useEffect, useState } from "react";
import { Text, View, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import CompStyles from "../../../../Theme/styles/globalStyles";
import { formatQuestion } from "../../Utils/formatQuestion";
import RenderHtml from "react-native-render-html";
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
            paddingVertical: 15,
            paddingHorizontal: 20,
            borderRadius: 10,
            borderWidth: 1,
            marginTop: 10,
            borderColor: selectedAnswer == index ? "#7DC579" : "#91919F",
            backgroundColor: selectedAnswer == index ? "#E1FFDF" : null,
          }}
        >
          <Text style={{ marginRight: 10 }}>{options[index]}.</Text>
          <RenderHtml
            source={{ html: `${formatQuestion(answer.pilihan)}` }}
            contentWidth={Dimensions.get("screen").width / 1.3}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View
        style={{
          ...CompStyles.defaultCard,
        }}
        key={question._id}
      >
        <RenderHtml
          source={{ html: `${formatQuestion(question.pertanyaan)}` }}
          contentWidth={Dimensions.get("screen").width / 1.2}
        />
        {question.jawaban.map((item, index) => renderOption(item, index))}
      </View>
    </>
  );
};

export default PertanyaanPBS;
