import { View, Progress, Box, Text } from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { Image } from "react-native";
let random = Math.floor(Math.random() * 10);
const DelaySoal = (props) => {
  const { setDelay, loading } = props;
  const countInterval = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    let penambah = 2;
    if (loading === true) {
      penambah = random;
    } else {
      penambah = 20;
    }

    countInterval.current = setInterval(
      () => setValue((old) => old + penambah),
      1000
    );
    return () => {
      clearInterval(countInterval); //when user exits, clear this interval.
    };
  }, [loading]);

  useEffect(() => {
    if (value >= 100) {
      setDelay(false);
    }
  }, [value]);

  return (
    <View justifyContent={"center"} alignItems={"center"} flex={1}>
      <Image
        style={{ height: 200 }}
        resizeMode="contain"
        source={require("../../../../assets/Images/soal/sesidone.png")}
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
      <Text style={{ marginTop: 30, fontWeight: "bold" }}>Mohon Tunggu</Text>
      <Text style={{ color: "grey" }}>Sesi sedang dipersiapkan</Text>
    </View>
  );
};

export default DelaySoal;
