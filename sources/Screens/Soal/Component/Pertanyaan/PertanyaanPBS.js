import React, { useEffect, useState } from "react";
import { Text, View, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import CompStyles from "../../../../Theme/styles/globalStyles";
import { formatQuestion } from "../../Utils/formatQuestion";
import RenderHtml from "react-native-render-html";
import { HStack } from "native-base";
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
      >
        <HStack style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={{ marginRight: 10, marginTop: 10 }}>
            {options[index]}.
          </Text>
          <View
            style={{
              paddingHorizontal: 20,
              borderRadius: 10,
              borderWidth: 1,
              marginTop: 10,
              borderColor: selectedAnswer == index ? "#7DC579" : "#91919F",
              backgroundColor: selectedAnswer == index ? "#E1FFDF" : null,
              width: Dimensions.get("screen").width / 1.4,
            }}
          >
            <RenderHtml
              source={{ html: `${formatQuestion(answer.pilihan)}` }}
              contentWidth={Dimensions.get("screen").width / 1.2}
            />
          </View>
        </HStack>
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
