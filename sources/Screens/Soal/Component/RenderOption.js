import { HStack, Text, Button } from "native-base";
import React, { useRef, useEffect, useState } from "react";
import { Dimensions } from "react-native";
import RenderHTML from "react-native-render-html";
const options = ["A", "B", "C", "D", "E", "F"];

const RenderOption = ({
  el,
  idx,
  pilihan,
  pilihJawaban,
  setPilihan,
  nomor,
  loading,
  loadingBawah,
}) => {
  const countInterval = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    countInterval.current = setInterval(() => setValue((old) => old + 1), 1000);
    return () => {
      clearInterval(countInterval); //when user exits, clear this interval.
    };
  }, []);

  useEffect(() => {
    setValue(0);
  }, [nomor]);

  return (
    <HStack space={4} alignItems="center">
      <Text>{options[idx]}</Text>
      <Button
        bg={pilihan.user_answer[0] === idx ? "#E1FFDF" : "white"}
        disabled={
          loading || loadingBawah
            ? true
            : pilihan.user_answer[0] === idx
            ? true
            : false
        }
        _pressed={{
          bg: "green.50",
        }}
        opacity={loading || loadingBawah ? 0.3 : 1}
        borderWidth={0.5}
        onPress={() => {
          pilihJawaban({
            duration:
              pilihan.duration === -1
                ? pilihan.duration + value + 1
                : pilihan.duration + value,
            user_answer: [idx],
          });
          setValue(0);
          clearInterval(countInterval);
          setPilihan({
            duration: -1,
            user_answer: [idx],
          });
        }}
        flex={1}
        borderRadius={10}
        paddingY={2}
        paddingX={4}
        marginBottom={3}
      >
        <RenderHTML
          source={{
            html: `${el.pilihan}`,
          }}
          contentWidth={Dimensions.get("screen").width / 1.6}
        />
      </Button>
    </HStack>
  );
};

export default RenderOption;
