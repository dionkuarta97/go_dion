import { View, Progress, Box, Text } from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { Image } from "react-native";

const DelayFinish = (props) => {
  const { setDelay } = props;
  const countInterval = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    countInterval.current = setInterval(
      () => setValue((old) => old + 20),
      1000
    );
    return () => {
      clearInterval(countInterval); //when user exits, clear this interval.
    };
  }, []);

  useEffect(() => {
    if (value === 100) {
      setDelay(false);
    }
  }, [value]);

  return (
    <View justifyContent={"center"} alignItems={"center"} flex={1}>
      <Image
        style={{ height: 200 }}
        resizeMode="contain"
        source={require("../../../../assets/Images/soal/ondone.png")}
      />
      <Box w="90%" mt={30} maxW="400">
        <Progress
          bg="coolGray.300"
          _filledTrack={{
            bg: "amber.400",
          }}
          value={value}
          mx="4"
        />
      </Box>
      <Text style={{ marginTop: 30, fontWeight: "bold" }}>
        Jawaban sedang dikirim
      </Text>
      <Text style={{ color: "grey" }} paddingX={10} textAlign={"center"}>
        Tunggu sebentar ya, hasil pengiriman akan segera muncul
      </Text>
    </View>
  );
};

export default DelayFinish;
