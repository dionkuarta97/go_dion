import { useNavigation } from "@react-navigation/native";
import { Button, Heading, HStack, View, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { Dimensions, SafeAreaView } from "react-native";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import SolusiContent from "./components/SolusiContent";

const SolusiScreen = (props) => {
  const { route } = props;
  const [loading, setLoading] = useState(false);
  const { solution, quiz, answer, quiz_options, title } = route.params;
  const [index, setIndex] = useState(0);
  const navigation = useNavigation();
  console.log(JSON.stringify(answer, null, 2));

  useEffect(() => {
    if (loading) {
      setTimeout(() => setLoading(false), 500);
    }
  }, [loading]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DefaultAppBar backEnabled={true} title="Solusi Soal" />
      <SolusiContent
        solution={solution}
        quiz={quiz}
        answer={answer}
        index={index}
        title={title}
        loading={loading}
        quiz_options={quiz_options}
        setIndex={setIndex}
      />
      <View
        paddingY={3}
        paddingX={5}
        bg={"white"}
        shadow={3}
        borderTopLeftRadius={20}
        borderTopRightRadius={20}
      >
        <HStack space={5} justifyContent={"center"}>
          {index > 0 ? (
            <Button
              bg={"light.300"}
              disabled={loading}
              width={Dimensions.get("screen").width / 3}
              onPress={() => {
                setLoading(true);
                setIndex(index - 1);
              }}
            >
              <Text bold>Sebelumnya</Text>
            </Button>
          ) : (
            <Button
              bg={"light.300"}
              disabled={loading}
              width={Dimensions.get("screen").width / 3}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Text bold>Kembali</Text>
            </Button>
          )}
          {index !== solution.length - 1 && (
            <Button
              bg={"amber.400"}
              disabled={loading}
              width={Dimensions.get("screen").width / 3}
              onPress={() => {
                setLoading(true);
                setIndex(index + 1);
              }}
            >
              <Text bold>Selanjutnya</Text>
            </Button>
          )}
        </HStack>
      </View>
    </SafeAreaView>
  );
};

export default SolusiScreen;
