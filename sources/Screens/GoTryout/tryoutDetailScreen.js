import React, { useEffect, useState } from "react";
import { Alert, SafeAreaView, Dimensions } from "react-native";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import CountDown from "react-native-countdown-component";
import TryoutCard from "./Component/TryoutCard";
import {
  Box,
  Button,
  Center,
  HStack,
  ScrollView,
  Text,
  View,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import DefaultModal from "../../Components/Modal/DefaultModal";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import LoadingIndicator from "../../Components/Indicator/LoadingIndicator";

const TryoutDetailScreen = (props) => {
  const { route } = props;
  const { data, tryoutId, title, mulai, akhir, status, detik, tipe } =
    route.params;
  const [realStatus, setRealstatus] = useState(status);
  const token = useSelector((state) => state.authReducer.token);
  const [modal, setModal] = useState(false);
  const navigation = useNavigation();
  console.log(JSON.stringify({ mulai, akhir, status, detik }, null, 2));
  const urlBase = useSelector((state) => state.initReducer.baseUrl);
  const [sukses, setSukses] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const forceScoring = async () => {
    try {
      const response = await fetch(
        urlBase + "/scoring/v1/scoring/createscore/" + tryoutId,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      console.log(result);
      if (result.status) setSukses(true);
      else setError(true);
      setLoading(false);
    } catch (err) {
      setError(true);
      setLoading(false);
      console.log(err);
    }
  };
  useEffect(() => {
    if (!realStatus && tipe !== "done") {
      setModal(true);
    }
  }, [realStatus]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DefaultAppBar title={title} backEnabled={true} />
      {modal && (
        <DefaultModal>
          <Center>
            {loading ? (
              <View height={50}>
                <LoadingIndicator />
              </View>
            ) : (
              <>
                {sukses ? (
                  <>
                    <Text mb={5} fontSize={19} fontWeight={"bold"}>
                      Tryout kamu berhasil di proses
                    </Text>
                    <Button
                      bg={"amber.400"}
                      _pressed={{
                        bg: "amber.200",
                      }}
                      width={Dimensions.get("screen").width / 1.6}
                      onPress={() => {
                        navigation.goBack();
                      }}
                    >
                      Tutup
                    </Button>
                  </>
                ) : error ? (
                  <>
                    <Text
                      mb={5}
                      textAlign={"center"}
                      fontSize={19}
                      fontWeight={"bold"}
                    >
                      Terjadi kesalahan pada server, silahkan coba dalam
                      beberapa saat lagi
                    </Text>
                    <Button
                      bg={"amber.400"}
                      _pressed={{
                        bg: "amber.200",
                      }}
                      width={Dimensions.get("screen").width / 1.6}
                      onPress={() => {
                        navigation.goBack();
                      }}
                    >
                      Tutup
                    </Button>
                  </>
                ) : (
                  <>
                    <Text mb={1} fontSize={19} fontWeight={"bold"}>
                      Informasi
                    </Text>
                    <Text mb={5} textAlign={"center"}>
                      Sayang sekali tryout kamu sudah berakhir, silahkan akhiri
                      tryout ini untuk melanjutkan ke proses laporan
                    </Text>
                    <Button
                      bg={"amber.400"}
                      _pressed={{ bg: "amber.200" }}
                      mb={1}
                      width={Dimensions.get("screen").width / 1.6}
                      onPress={() => {
                        setLoading(true);
                        forceScoring();
                      }}
                    >
                      Akhiri
                    </Button>
                    <Button
                      variant="ghost"
                      colorScheme="dark"
                      width={Dimensions.get("screen").width / 1.6}
                      onPress={() => {
                        navigation.goBack();
                      }}
                    >
                      Tutup
                    </Button>
                  </>
                )}
              </>
            )}
          </Center>
        </DefaultModal>
      )}
      {tipe !== "done" && (
        <View paddingY={4}>
          <Center>
            <Text marginBottom={4} fontSize={17} fontWeight={"semibold"}>
              <AntDesign name="warning" size={20} color="black" />{" "}
              {mulai > 0
                ? "Dimulai dalam"
                : akhir > 0 && mulai < 0
                ? "Berakhir dalam"
                : "Tryout sudah berakhir"}
            </Text>

            {realStatus && (
              <Box
                padding={2}
                bg={akhir > 0 && mulai < 0 ? "red.600" : "green.600"}
                rounded={15}
              >
                {detik !== null ? (
                  <CountDown
                    key={"Count 1"}
                    until={detik}
                    digitStyle={{
                      backgroundColor: "transparent",
                    }}
                    separatorStyle={{ color: "#FFFFFF" }}
                    showSeparator={true}
                    digitTxtStyle={{ color: "#FFFFFF" }}
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
                        <Text color={"white"} fontWeight={"bold"} fontSize={17}>
                          {Math.floor(mulai)} hari
                        </Text>
                      </Text>
                    )}
                    {akhir > 0 && mulai < 0 && (
                      <Text color={"white"} fontWeight={"bold"} fontSize={17}>
                        {Math.floor(akhir)} hari
                      </Text>
                    )}
                  </>
                )}
              </Box>
            )}
          </Center>
        </View>
      )}

      <ScrollView>
        {data.map((el) => (
          <TryoutCard
            detail={el}
            tryoutId={tryoutId}
            key={el._id}
            status={realStatus}
            tipe={tipe}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default TryoutDetailScreen;
