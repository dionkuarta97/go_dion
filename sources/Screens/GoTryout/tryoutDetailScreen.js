import React, { useEffect, useState } from "react";
import { Alert, SafeAreaView } from "react-native";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import CountDown from "react-native-countdown-component";
import TryoutCard from "./Component/TryoutCard";
import { Box, Center, HStack, ScrollView, Text, View } from "native-base";
import { Ionicons } from "@expo/vector-icons";

const TryoutDetailScreen = (props) => {
  const { route } = props;
  const { data, tryoutId, title, mulai, akhir, status, detik } = route.params;
  const [realStatus, setRealstatus] = useState(status);
  console.log(JSON.stringify({ mulai, akhir, status, detik }, null, 2));
  useEffect(() => {}, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DefaultAppBar title={title} backEnabled={true} />
      <View paddingY={4}>
        <Center>
          <Ionicons name="information-circle" size={20} color="black" />
          <Text marginBottom={4} fontSize={17} fontWeight={"semibold"}>
            {mulai > 0
              ? "Dimulai dalam"
              : akhir > 0 && mulai < 0
              ? "Berakhir dalam"
              : "Tryout sudah berakhir"}
          </Text>

          <Box bg={"amber.400"} rounded={15}>
            {detik !== null ? (
              <CountDown
                key={"Count 1"}
                until={detik}
                digitStyle={{
                  backgroundColor: "transparent",
                }}
                showSeparator={true}
                onFinish={() => {
                  if (status) {
                    setRealstatus(false);
                    Alert.alert("Informasi", "Tryout sudah berakhir");
                  } else {
                    setRealstatus(true);
                    Alert.alert("Informasi", "Tryout dapat dikerjakan");
                  }
                }}
                size={20}
                timeToShow={["H", "M", "S"]}
                timeLabels={{ h: null, m: null, s: null }}
              />
            ) : (
              <>
                {mulai > 0 && (
                  <Text>
                    <Text color={"green.600"} fontWeight={"bold"} fontSize={17}>
                      {Math.floor(mulai)} hari
                    </Text>
                  </Text>
                )}
                {akhir > 0 && mulai < 0 && (
                  <Text color={"red.600"} fontWeight={"bold"} fontSize={17}>
                    {Math.floor(akhir)} hari
                  </Text>
                )}
              </>
            )}
          </Box>
        </Center>
      </View>
      <ScrollView>
        {data.map((el) => (
          <TryoutCard
            detail={el}
            tryoutId={tryoutId}
            key={el._id}
            status={realStatus}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default TryoutDetailScreen;
