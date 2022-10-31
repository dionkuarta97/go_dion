import { useNavigation } from "@react-navigation/native";
import { Button, HStack, Text } from "native-base";
import React from "react";
import { Alert, Dimensions } from "react-native";
import { useDispatch } from "react-redux";
import { setSoal } from "../../../Redux/Soal/soalActions";
import { Ionicons } from "@expo/vector-icons";
import firestore from "@react-native-firebase/firestore";
const TombolBawah = (props) => {
  const {
    index,
    setIndex,
    total,
    blockTime,
    setSesi,
    sesi,
    setDelay,
    sisaTime,
    setWaktuUjian,
    totalSesi,
    setFinish,
    setLoadingBawah,
    loadingSoal,
  } = props;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <HStack space={5} justifyContent={"center"}>
      {index > 0 ? (
        <Button
          bg={"light.300"}
          _pressed={{
            bg: "light.200",
          }}
          disabled={loadingSoal ? true : false}
          opacity={loadingSoal ? 0.3 : 1}
          width={Dimensions.get("screen").width / 3}
          onPress={() => {
            if (!blockTime) {
              setIndex(index - 1);
            } else {
              setLoadingBawah(true);
              setIndex(index - 1);
              setLoadingBawah(false);
            }
          }}
        >
          <Text bold>Sebelumnya</Text>
        </Button>
      ) : (
        <>
          {!blockTime && sesi === 0 && (
            <Button
              _pressed={{
                bg: "light.200",
              }}
              bg={"light.300"}
              disabled={loadingSoal ? true : false}
              opacity={loadingSoal ? 0.3 : 1}
              width={Dimensions.get("screen").width / 3}
              onPress={() => {
                Alert.alert("Peringatan", "Batal ikut kuis?", [
                  {
                    text: "Tidak",
                    onPress: () => {},
                  },
                  {
                    text: "Ya",
                    onPress: () => {
                      navigation.goBack(),
                        dispatch(
                          setSoal({ data: null, loading: false, error: null })
                        );
                    },
                  },
                ]);
              }}
            >
              <Text bold>Kembali</Text>
            </Button>
          )}
          {!blockTime && sesi > 0 && (
            <Button
              _pressed={{
                bg: "light.200",
              }}
              bg={"light.300"}
              disabled={loadingSoal ? true : false}
              opacity={loadingSoal ? 0.3 : 1}
              width={Dimensions.get("screen").width / 3}
              onPress={() => {
                setSesi(sesi - 1);
                setWaktuUjian(sisaTime);
                setDelay(true);
                setIndex(total - 1);
              }}
            >
              <Text bold>Sebelumnya</Text>
            </Button>
          )}
        </>
      )}
      {index !== total - 1 ? (
        <Button
          bg={"amber.400"}
          _pressed={{
            bg: "amber.300",
          }}
          disabled={loadingSoal ? true : false}
          opacity={loadingSoal ? 0.3 : 1}
          width={Dimensions.get("screen").width / 3}
          onPress={() => {
            if (!blockTime) {
              setIndex(index + 1);
            } else {
              setLoadingBawah(true);
              setIndex(index + 1);
              setLoadingBawah(false);
            }
          }}
        >
          <Text bold>Selanjutnya</Text>
        </Button>
      ) : (
        <>
          {!blockTime ? (
            <>
              {sesi + 1 < totalSesi ? (
                <Button
                  bg={"success.400"}
                  _pressed={{
                    bg: "success.300",
                  }}
                  disabled={loadingSoal ? true : false}
                  opacity={loadingSoal ? 0.3 : 1}
                  width={Dimensions.get("screen").width / 3}
                  onPress={() => {
                    setSesi(sesi + 1);
                    setDelay(true);
                    setIndex(0);
                    setWaktuUjian(sisaTime);
                  }}
                >
                  <Text bold>Pindah Sesi</Text>
                </Button>
              ) : (
                <Button
                  bg={"info.400"}
                  _pressed={{
                    bg: "info.300",
                  }}
                  width={Dimensions.get("screen").width / 3}
                  onPress={() => {
                    Alert.alert(
                      "Peringatan",
                      "Apakah kamu yakin untuk menyelesaikan sesi ini?",
                      [
                        {
                          text: "Tidak",
                          onPress: () => {},
                        },
                        {
                          text: "Ya, saya yakin",
                          onPress: () => {
                            setDelay(true);
                            setFinish(true);
                          },
                        },
                      ]
                    );
                  }}
                >
                  <Text bold>Selesai</Text>
                </Button>
              )}
            </>
          ) : (
            <>
              <Button
                bg={"warning.300"}
                _pressed={{ bg: "warning.200" }}
                disabled={loadingSoal ? true : false}
                opacity={loadingSoal ? 0.3 : 1}
                onPress={() => {
                  let msg = "";
                  if (sesi + 1 < totalSesi) {
                    msg =
                      "Tunggu sesi ini berakhir untuk melanjutkan sesi berikutnya.\n\nYuk review kembali jawaban kamu!";
                  } else {
                    msg =
                      "Kamu harus menunggu waktu sesi ini berakhir.\n\nYuk periksa kembali jawaban kamu!";
                  }
                  Alert.alert("Informasi", msg);
                }}
              >
                <Ionicons
                  name="md-information-circle-outline"
                  size={20}
                  color="black"
                />
              </Button>
            </>
          )}
        </>
      )}
    </HStack>
  );
};

export default TombolBawah;
