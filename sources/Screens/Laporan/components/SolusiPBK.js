import { HStack, View, Text, Box, Checkbox } from "native-base";
import RenderHTML from "react-native-render-html";
import { AntDesign } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import React from "react";
const SolusiPBK = ({ el, idx, answer, index, options }) => {
  console.log(JSON.stringify(el.pilihan, null, 2));
  return (
    <View>
      <HStack space={4} alignItems="center">
        <Checkbox
          _checked={{
            _disabled: {
              borderColor:
                answer[index].userAnswer[idx] !== -1
                  ? "primary.600"
                  : `green.600`,
              bg:
                answer[index].userAnswer[idx] !== -1
                  ? "primary.600"
                  : `green.600`,
              opacity: 1,
            },
          }}
          isDisabled
          defaultIsChecked={answer[index].userAnswer[idx] === 1 ? true : false}
        >
          <Box
            ml={3}
            borderWidth={2}
            width={Dimensions.get("screen").width / 1.5}
            borderColor={
              answer[index]["keyAnswer"][idx] === 1 ? "green.600" : "gray.300"
            }
            borderRadius={10}
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
        </Checkbox>
        {answer[index]["keyAnswer"][idx] !== -1 &&
          answer[index]["userAnswer"][idx] ===
            answer[index]["keyAnswer"][idx] && (
            <AntDesign name="checkcircleo" size={24} color="green" />
          )}
        {answer[index]["userAnswer"][idx] !== -1 &&
          answer[index]["userAnswer"][idx] !==
            answer[index]["keyAnswer"][idx] && (
            <AntDesign name="closecircleo" size={24} color="red" />
          )}
      </HStack>
    </View>
  );
};

export default SolusiPBK;
