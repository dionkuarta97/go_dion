import { HStack, Text, View, Checkbox, Box, Stack, Button } from "native-base";
import React, { useRef, useEffect, useState } from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import RenderHTML from "react-native-render-html";

const RenderOptionPBT = (props) => {
  const {
    el,
    jawab,
    pilihJawaban,
    pilihan,
    setPilihan,
    idx,
    loading,
    loadingBawah,
  } = props;
  const [value, setValue] = useState(0);
  const countInterval = useRef(null);
  useEffect(() => {
    countInterval.current = setInterval(() => setValue((old) => old + 1), 1000);
    return () => {
      clearInterval(countInterval); //when user exits, clear this interval.
    };
  }, []);

  return (
    <>
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
          contentWidth={Dimensions.get("screen").width / 1.6}
        />
        <Stack
          space={3}
          flexWrap="wrap"
          direction={{
            base: "row",
          }}
        >
          {el.jawaban.map((el, index) => (
            <TouchableOpacity
              disabled={
                loading || loadingBawah
                  ? true
                  : jawab.user_answer[idx] === index + 1
                  ? true
                  : false
              }
              style={{
                borderWidth: 0.5,
                borderRadius: 8,
                paddingVertical: 2,
                marginTop: 10,
                borderColor:
                  jawab.user_answer[idx] === index + 1 ? "#90b98d" : "#e5e5e6",
                backgroundColor:
                  jawab.user_answer[idx] === index + 1 ? "#E1FEDF" : "white",
              }}
              key={index + "soal" + idx}
              onPress={() => {
                let temp = jawab.user_answer;
                temp[idx] = index + 1;
                pilihJawaban({
                  duration:
                    pilihan.duration === -1
                      ? pilihan.duration + value + 1
                      : pilihan.duration + value,
                  user_answer: temp,
                });
                setPilihan({
                  duration: -1,
                  user_answer: temp,
                });
              }}
            >
              <Text marginX={2} color={"black"}>
                {el.pilihan}
              </Text>
            </TouchableOpacity>
          ))}
        </Stack>
      </Box>
    </>
  );
};

export default RenderOptionPBT;
