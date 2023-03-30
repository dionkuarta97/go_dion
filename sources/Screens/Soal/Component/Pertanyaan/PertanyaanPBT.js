import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import HTMLView from "react-native-htmlview";
import Sizes from "../../../../Theme/Sizes";
import CompStyles from "../../../../Theme/styles/globalStyles";
import Colors from "../../../../Theme/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";

const PertanyaanPBT = (props) => {
   const question = props.question;

   const [selectedAnswer, setSelectedAnswer] = useState([]);

   useEffect(() => {
      if (props.answer === null) {
         const initAnswer = [...Array(question.table.length).keys()].map(
            (val) => -1
         );

         setSelectedAnswer(initAnswer);
      } else {
         setSelectedAnswer(props.answer);
      }
   }, [question]);

   const renderOption = (answer, index, subIndex) => {
      return (
         <TouchableOpacity
            onPress={() => {
               const currentAnswer = [...selectedAnswer];
               currentAnswer[index] = answer.value;

               setSelectedAnswer(currentAnswer);
               props.onSelect(currentAnswer);
            }}
            activeOpacity={0.6}
         >
            <View
               style={{
                  ...styles.answer,
                  backgroundColor:
                     selectedAnswer[index] === answer.value
                        ? "#E1FFDF"
                        : "white",
                  borderColor: "#7DC579",
               }}
            >
               <View style={{ ...styles.dot, borderColor: "#7DC579" }}>
                  <View
                     style={{
                        ...styles.innerDot,
                        backgroundColor: "#7DC579",
                     }}
                  />
               </View>
               <HTMLView value={answer.pilihan} />
            </View>
         </TouchableOpacity>
      );
   };

   return (
      <View
         style={CompStyles.defaultCard}
         key={question._id}
      >
         <View style={{ flexDirection: "row" }}>
            <HTMLView value={question.pertanyaan} />
         </View>
         <View>
            {question.table.map((item, index) => {
               return (
                  <View
                     style={{ marginVertical: Sizes.fixPadding * 1.5 }}
                     key={`PBT${index}`}
                  >
                     <View style={{}}>
                        <View style={{ flexDirection: "row" }}>
                           <Text style={{ marginRight: Sizes.fixPadding }}>
                              {index + 1}.
                           </Text>
                           <HTMLView value={item.pertanyaan} />
                        </View>
                     </View>
                     <View
                        style={{
                           flexDirection: "row",
                           flexWrap: "wrap",
                           justifyContent: "center",
                        }}
                     >
                        {item.jawaban.map((val, subIndex) =>
                           renderOption(val, index, subIndex)
                        )}
                     </View>
                  </View>
               );
            })}
         </View>
      </View>
   );
};
export default PertanyaanPBT;

const styles = StyleSheet.create({
   answer: {
      flexDirection: "row",
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "grey",
      marginTop: 10,
      marginHorizontal: 5,
      alignItems: "center",
   },
   dot: {
      borderRadius: 100,
      borderWidth: 1,
      borderColor: "grey",
      padding: 5,
      marginRight: 5,
   },
   innerDot: {
      width: 10,
      height: 10,
      borderRadius: 100,
   },
});
