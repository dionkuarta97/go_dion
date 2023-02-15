import { HStack, Text, View, Checkbox, Box } from "native-base";
import React, { useRef, useEffect, useState } from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import RenderHTML from "react-native-render-html";

const RenderOptionPBK = (props) => {
  const {
    el,
    idx,
    loading,
    loadingBawah,
    setPilihan,
    pilihan,
    pilihJawaban,
    jawab,
  } = props;

  const [value, setValue] = useState(0);
  const [check, setCheck] = useState(
    jawab.user_answer[idx] === 1 ? true : false
  );
  const countInterval = useRef(null);
  useEffect(() => {
    countInterval.current = setInterval(() => setValue((old) => old + 1), 1000);
    return () => {
      clearInterval(countInterval); //when user exits, clear this interval.
    };
  }, []);

  return (
    <Checkbox
      mb={2}
      isDisabled={loading || loadingBawah ? true : false}
      defaultIsChecked={jawab.user_answer[idx] === 1 ? true : false}
      onChange={() => {
        let temp = jawab.user_answer;
        console.log(temp);
        if (!check) {
          temp[idx] = 1;
          setCheck(true);
        } else {
          temp[idx] = -1;
          setCheck(false);
        }
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
      <Box
        ml={2}
        mb={1}
        borderRadius={10}
        paddingY={1}
        paddingX={2}
        width={Dimensions.get("screen").width / 1.3}
        borderWidth={0.5}
      >
        <RenderHTML
          source={{
            html: `${el.pilihan}`,
          }}
          contentWidth={Dimensions.get("screen").width / 1.6}
        />
      </Box>
    </Checkbox>
  );
};

export default RenderOptionPBK;
