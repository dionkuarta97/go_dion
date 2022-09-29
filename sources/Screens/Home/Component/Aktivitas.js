import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  HStack,
  Progress,
  ScrollView,
  Text,
  View,
  VStack,
} from "native-base";
import { Image } from "react-native";
import { Dimensions } from "react-native";
import gambar from "../../../../assets/Images/soal/onscoring.png";
import { useNavigation } from "@react-navigation/native";
import { singkatNama } from "../../../Services/helper";

const Aktivitas = (props) => {
  const { tryout } = props;

  const navigation = useNavigation();

  const complete = (data) => {
    let temp3 = 0;

    for (const key in data.includes) {
      if (data.includes[key]["touched"]) {
        temp3 += 1;
      }
    }

    return temp3;
  };

  const value = (int, length) => {
    let temp4 = 100;
    temp4 = temp4 / length;
    temp4 = temp4 * int;
    return temp4;
  };

  const tryoutCard = (data, idx) => {
    return (
      <Button
        mt={2}
        ml={idx === 0 ? 0 : 3}
        _pressed={{
          bg: "coolGray.200",
        }}
        bg={"white"}
        padding={2}
        shadow={3}
        borderRadius={5}
        width={Dimensions.get("window").width / 1.5}
        key={data._id}
        onPress={() => {
          navigation.navigate("TryoutDetailScreen", {
            data: data.includes,
            tryoutId: data._id,
            title: data.title,
          });
        }}
      >
        <HStack space={3} alignItems={"center"}>
          <Image
            source={gambar}
            style={{
              width: Dimensions.get("window").width / 4.8,
              height: Dimensions.get("window").width / 5,
            }}
          />
          <VStack>
            <View maxWidth={Dimensions.get("window").width / 2.4}>
              <Text bold>{singkatNama(data.title, 15)}</Text>
            </View>
            <View maxWidth={Dimensions.get("window").width / 2.4}>
              <Text>{singkatNama(data.desc, 15)}</Text>
            </View>
          </VStack>
        </HStack>
        <HStack mt={2} justifyContent={"center"} alignItems={"center"}>
          <Box w="80%" marginRight={"auto"}>
            <Progress
              bg="coolGray.300"
              _filledTrack={{
                bg: "green.400",
              }}
              value={value(complete(data), data.includes.length)}
            />
          </Box>
          <Text fontSize={13} color={"coolGray.500"}>
            {complete(data)} / {data.includes.length}
          </Text>
        </HStack>
      </Button>
    );
  };

  return (
    <View paddingX={5} paddingY={2}>
      <Text bold fontSize={17}>
        Lanjutkan Aktivitas Kamu
      </Text>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal>
        {tryout.map((el, idx) => tryoutCard(el, idx))}
      </ScrollView>
    </View>
  );
};

export default Aktivitas;
