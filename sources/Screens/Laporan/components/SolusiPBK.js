import { HStack, View, Text, Box, Checkbox } from "native-base";
import RenderHTML from "react-native-render-html";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import React from "react";
const SolusiPBK = ({ el, idx, answer, index, options }) => {
  return (
    <View>
      {answer[index]["keyAnswer"][idx] !== -1 &&
        answer[index]["userAnswer"][idx] ===
          answer[index]["keyAnswer"][idx] && (
          <View
            style={{
              position: "absolute",
              width: 25,
              height: 25,
              backgroundColor: "green",
              top: -3,
              zIndex: 100,
              right: -13,
              borderRadius: 13,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialIcons name="check" size={16} color="white" />
          </View>
        )}
      {answer[index]["keyAnswer"][idx] === 1 && (
        <View
          style={{
            position: "absolute",
            width: 25,
            height: 25,
            backgroundColor: "green",
            top: -3,
            zIndex: 100,
            right: -13,
            borderRadius: 13,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MaterialIcons name="check" size={16} color="white" />
        </View>
      )}
      {answer[index]["userAnswer"][idx] !== -1 &&
        answer[index]["userAnswer"][idx] !==
          answer[index]["keyAnswer"][idx] && (
          <View
            style={{
              position: "absolute",
              width: 25,
              height: 25,
              backgroundColor: "#e11d48",
              top: -3,
              zIndex: 100,
              right: -13,
              borderRadius: 13,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialIcons name="close" size={16} color="white" />
          </View>
        )}
      <HStack space={4} alignItems="center">
        <Checkbox
          _checked={{
            _disabled: {
              borderColor:
                answer[index].userAnswer[idx] !== -1 ? "#90b98d" : `green.600`,
              bg:
                answer[index].userAnswer[idx] !== -1 ? "#90b98d" : `green.600`,
              opacity: 1,
            },
          }}
          isDisabled
          defaultIsChecked={answer[index].userAnswer[idx] === 1 ? true : false}
        >
          <Box
            ml={3}
            borderWidth={2}
            width={Dimensions.get("screen").width / 1.35}
            borderColor={
              answer[index].userAnswer[idx] !== -1 ? "#7DC579" : "gray.300"
            }
            backgroundColor={
              answer[index].userAnswer[idx] !== -1 ? "#E1FFDF" : "white"
            }
            borderRadius={10}
            padding={2}
            marginTop={2}
            marginBottom={4}
          >
            <RenderHTML
              source={{
                html: `${el.pilihan}`,
              }}
              contentWidth={Dimensions.get("screen").width / 1.8}
            />
          </Box>
        </Checkbox>
      </HStack>
    </View>
  );
};

export default SolusiPBK;
