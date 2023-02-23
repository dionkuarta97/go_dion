import { HStack, View, Text, Box } from "native-base";
import RenderHTML from "react-native-render-html";
import { AntDesign } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import React from "react";
const SolusiPBS = ({ el, idx, answer, index, options }) => {
  return (
    <View>
      <HStack space={4} alignItems="center">
        <Text>{options[idx]}</Text>
        <Box
          borderWidth={2}
          width={Dimensions.get("screen").width / 1.5}
          borderColor={
            options[answer[index]["userAnswer"][0]] === options[idx]
              ? "#7DC579"
              : answer[index]["keyAnswer"][0] === options[idx]
              ? "#7DC579"
              : "gray.300"
          }
          borderRadius={10}
          backgroundColor={
            options[answer[index]["userAnswer"][0]] === options[idx]
              ? "#E1FFDF"
              : null
          }
          padding={2}
          marginBottom={2}
        >
          <RenderHTML
            source={{
              html: `${el.pilihan}`,
            }}
            contentWidth={Dimensions.get("screen").width / 1.8}
          />
        </Box>
        {answer[index]["keyAnswer"][0] === options[idx] && (
          <AntDesign name="checkcircleo" size={24} color="green" />
        )}
        {options[answer[index]["userAnswer"][0]] === options[idx] &&
          options[answer[index]["userAnswer"][0]] !==
            answer[index]["keyAnswer"][0] && (
            <AntDesign name="closecircleo" size={24} color="red" />
          )}
      </HStack>
    </View>
  );
};

export default SolusiPBS;
