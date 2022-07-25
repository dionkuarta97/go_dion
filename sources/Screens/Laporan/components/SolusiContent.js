import {
  Box,
  HStack,
  Text,
  View,
  ScrollView,
  Center,
  Button,
} from "native-base";
import React, { useState } from "react";
import RenderHtml from "react-native-render-html";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SolusiContent = (props) => {
  const { solution, quiz, answer, index } = props;

  const navigation = useNavigation();

  return (
    <ScrollView padding={15}>
      <Text bold fontSize={18}>
        Soal {index + 1}
      </Text>
      <Box
        bg={"white"}
        paddingX={5}
        paddingY={3}
        borderRadius={15}
        marginTop={5}
        shadow={2}
      >
        <RenderHtml
          source={{
            html: `${
              quiz[index] !== undefined
                ? quiz[index]
                : "<p>Soal tidak tersedia</p>"
            }`,
          }}
          contentWidth={Dimensions.get("screen").width / 1.2}
        />
        <HStack marginTop={5} space={5}>
          <Text bold fontSize={15}>
            Jawaban Kamu :
          </Text>
          <Text>{answer[index]["userAnswer"][0]}</Text>
        </HStack>
        <HStack marginTop={5} space={5}>
          <Text bold fontSize={15}>
            Jawaban Benar :
          </Text>
          <Text>{answer[index]["keyAnswer"][0]}</Text>
        </HStack>
      </Box>
      <Text bold fontSize={18} marginTop={5}>
        Solusi Jawaban
      </Text>
      {solution[index]["type"] === "VIDEO" ? (
        <Center marginTop={10}>
          <Button
            bg={"amber.400"}
            width={Dimensions.get("screen").width / 1.8}
            onPress={() => {
              navigation.navigate("TestVideo", {
                video: solution[index]["video"],
              });
            }}
          >
            <Text bold>Lihat Video</Text>
          </Button>
        </Center>
      ) : (
        <Box
          bg={"white"}
          paddingX={5}
          paddingY={3}
          borderRadius={15}
          marginTop={5}
          shadow={2}
          marginBottom={50}
        >
          <Text>{solution[index]["text"]}</Text>
        </Box>
      )}
    </ScrollView>
  );
};

export default SolusiContent;
