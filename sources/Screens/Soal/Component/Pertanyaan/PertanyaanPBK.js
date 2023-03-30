import React, { useEffect, useState } from "react";
import { Text, View, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import CompStyles from "../../../../Theme/styles/globalStyles";
import { formatQuestion } from "../../Utils/formatQuestion";
import AutoHeightWebView from "react-native-autoheight-webview";

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

      props.onSelect(userAnswer);
   };

   const renderOption = (answer, index) => {
      return (
         <TouchableOpacity
            key={"answer" + index}
            onPress={() => {
               setSelectedAnswer(index);
               props.onSelect([index]);
            }}
         >
            <View
               style={{
                  flexDirection: "row",
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
               <AutoHeightWebView
                  style={{
                     width: Dimensions.get("window").width - 80,
                  }}
                  customStyle={`
              body {
                height: 100%;
                overflow-y: hidden;
              }
            `}
                  files={[
                     {
                        href: "cssfileaddress",
                        type: "text/css",
                        rel: "stylesheet",
                     },
                  ]}
                  source={{
                     html: `${formatQuestion(answer.pilihan)}`,
                  }}
                  viewportContent={"width=device-width, user-scalable=no"}
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
            <AutoHeightWebView
               style={{
                  width: Dimensions.get("window").width - 80,
                  marginTop: 10,
                  marginBottom: 35,
               }}
               customStyle={`
            body {
              height: 100%;
              overflow-y: hidden;
            }
          `}
               files={[
                  {
                     href: "cssfileaddress",
                     type: "text/css",
                     rel: "stylesheet",
                  },
               ]}
               source={{
                  html: `${formatQuestion(question.pertanyaan)}`,
               }}
               viewportContent={"width=device-width, user-scalable=no"}
            />
            {question.jawaban.map((item, index) => renderOption(item, index))}
         </View>
      </>
   );
};

export default PertanyaanPBK;
