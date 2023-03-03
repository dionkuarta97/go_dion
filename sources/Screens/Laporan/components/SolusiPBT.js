import { Box, HStack, Stack, Text, View } from "native-base";
import React from "react";
import { Dimensions } from "react-native";
import RenderHTML from "react-native-render-html";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
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
              borderWidth={2}
              style={{
                borderColor:
                  answer[index].userAnswer[idx] === inx + 1
                    ? "#90b98d"
                    : "#e5e5e6",
              }}
              bg={
                answer[index].userAnswer[idx] === inx + 1 ? "#E1FEDF" : "white"
              }
            >
              {/* {answer[index].userAnswer[idx] ===
                answer[index].keyAnswer[idx]  && (
                <View
                  style={{
                    position: "absolute",
                    width: 18,
                    height: 18,
                    backgroundColor: "green",
                    top: -10,
                    zIndex: 100,
                    right: -9,
                    borderRadius: 13,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialIcons name="check" size={13} color="white" />
                </View>
              )} */}
              {answer[index].userAnswer[idx] !== answer[index].keyAnswer[idx] &&
                answer[index].userAnswer[idx] === inx + 1 && (
                  <View
                    style={{
                      position: "absolute",
                      width: 18,
                      height: 18,
                      backgroundColor: "#e11d48",
                      top: -10,
                      zIndex: 100,
                      right: -9,
                      borderRadius: 13,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <MaterialIcons name="close" size={13} color="white" />
                  </View>
                )}
              {answer[index].keyAnswer[idx] === inx + 1 && (
                <View
                  style={{
                    position: "absolute",
                    width: 18,
                    height: 18,
                    backgroundColor: "green",
                    top: -10,
                    zIndex: 100,
                    right: -9,
                    borderRadius: 13,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialIcons name="check" size={13} color="white" />
                </View>
              )}

              <Text color={"black"}>{ele.pilihan}</Text>
            </Box>
          ))}
        </Stack>
      </Box>
    </HStack>
  );
};

export default SolusiPBT;
