import { HStack, Text, Button, View } from "native-base";
import React, { useRef, useEffect, useState } from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import RenderHTML from "react-native-render-html";
const options = ["A", "B", "C", "D", "E", "F"];

const RenderOptionPBS = ({
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
    <TouchableOpacity
      disabled={
        loading || loadingBawah
          ? true
          : pilihan.user_answer[0] === idx
          ? true
          : false
      }
      style={{
        borderWidth: 0.5,
        paddingHorizontal: 15,
        marginBottom: 20,
        borderRadius: 10,
        backgroundColor: pilihan.user_answer[0] === idx ? "#E1FEDF" : "white",
      }}
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
    >
      <HStack space={4} alignItems="center">
        <Text>{options[idx]}.</Text>

        <View flex={1}>
          <RenderHTML
            source={{
              html: `${el.pilihan}`,
            }}
            contentWidth={Dimensions.get("screen").width / 1.6}
          />
        </View>
      </HStack>
    </TouchableOpacity>
  );
};

export default RenderOptionPBS;
