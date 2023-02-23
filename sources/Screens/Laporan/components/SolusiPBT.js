import { Box, HStack, Stack, Text } from "native-base";
import React from "react";
import { Dimensions } from "react-native";
import RenderHTML from "react-native-render-html";
import { AntDesign } from "@expo/vector-icons";
const SolusiPBT = (props) => {
  const { el, idx, answer, index, options } = props;

  console.log(JSON.stringify(answer[index], null, 2));
  return (
    <HStack space={4} alignItems="center">
      <Box
        borderRadius={10}
        borderWidth={0.5}
        paddingY={3}
        paddingX={2}
        mb={4}
        flex={1}
        borderColor={"gray.300"}
      >
        <RenderHTML
          source={{
            html: `${el.pertanyaan}`,
          }}
          contentWidth={Dimensions.get("screen").width / 1.8}
        />
        <Stack
          space={3}
          flexWrap="wrap"
          direction={{
            base: "row",
          }}
        >
          {el.jawaban.map((ele, inx) => (
            <Box
              mt={4}
              paddingY={0.5}
              paddingX={1}
              borderRadius={8}
              bg={
                answer[index].userAnswer[idx] === inx + 1
                  ? "amber.600"
                  : answer[index].keyAnswer[idx] === inx + 1 &&
                    answer[index].userAnswer[idx] !== inx + 1
                  ? "green.600"
                  : "#78716c"
              }
            >
              <Text color={"white"}>{ele.pilihan}</Text>
            </Box>
          ))}
        </Stack>
      </Box>
      {answer[index].userAnswer[idx] === answer[index].keyAnswer[idx] ? (
        <AntDesign name="checkcircleo" size={24} color="green" />
      ) : (
        <AntDesign name="closecircleo" size={24} color="red" />
      )}
    </HStack>
  );
};

export default SolusiPBT;
