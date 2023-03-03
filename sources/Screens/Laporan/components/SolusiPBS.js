import { HStack, View, Text, Box } from "native-base";
import RenderHTML from "react-native-render-html";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import React from "react";
const SolusiPBS = ({ el, idx, answer, index, options }) => {
  return (
    <View>
      {options[answer[index]["keyAnswer"][0]] === options[idx] && (
        <View
          style={{
            position: "absolute",
            width: 25,
            height: 25,
            backgroundColor: "green",
            top: -3,
            zIndex: 100,
            right: -9,
            borderRadius: 13,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MaterialIcons name="check" size={16} color="white" />
        </View>
      )}
      {options[answer[index]["userAnswer"][0]] === options[idx] &&
        options[answer[index]["userAnswer"][0]] !==
          options[answer[index]["keyAnswer"][0]] && (
          <View
            style={{
              position: "absolute",
              width: 25,
              height: 25,
              backgroundColor: "#e11d48",
              top: -3,
              zIndex: 100,
              right: -9,
              borderRadius: 13,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialIcons name="close" size={16} color="white" />
          </View>
        )}

      <HStack space={4} alignItems="center">
        <Text>{options[idx]}</Text>
        <Box
          borderWidth={2}
          width={Dimensions.get("screen").width / 1.34}
          borderColor={
            options[answer[index]["userAnswer"][0]] === options[idx]
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
      </HStack>
    </View>
  );
};

export default SolusiPBS;
