import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  View,
  Text,
  Alert,
  DeviceEventEmitter,
  Dimensions,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Fonts from "../../../Theme/Fonts";
import Sizes from "../../../Theme/Sizes";
import { useDispatch, useSelector } from "react-redux";
import {
  saveAnswer,
  setJawaban,
  setSaveAnswer,
  setSoalUrl,
  setSoal,
} from "../../../Redux/Soal/soalActions";
import { urlQuests } from "../../../Services/ApiUrl";
import { MaterialIcons } from "@expo/vector-icons";
import checkInternet from "../../../Services/CheckInternet";
import { useToast, Progress, Box } from "native-base";

import ToastErrorContent from "../../../Components/ToastErrorContent";
import Colors from "../../../Theme/Colors";

const TryoutCard = (props) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigation = useNavigation();
  const { detail, tryoutId } = props;
  const profile = useSelector((state) => state.profileReducer.profile);

  const [idx, setIdx] = useState(null);

  return (
    <>
      {detail.quiz ? (
        <TouchableOpacity
          onPress={() => {
            checkInternet().then((data) => {
              if (data) {
                if (!detail.touched) {
                  if (detail.type === "UAS") {
                    let title = "Peringatan";
                    let msg = "";
                    if (detail.blocking_time) {
                      msg =
                        "1. Kamu harus menunggu waktu mata uji sebelumnya habis untuk masuk ke mata uji berikutnya\n\n" +
                        "2. Kamu wajib mengerjakan tryout hingga mata uji terakhir\n\n" +
                        "3. Perhitungan waktu uji akan tetap berjalan sekalipun aplikasi dalam keadaan tertutup\n\n\n\n";
                    } else {
                      msg =
                        "Kamu akan mengerjakan tryout dengan sistem non blocking time.\n\nMulai mengerjakan?";
                    }
                    Alert.alert(title, msg, [
                      {
                        text: "TIDAK",
                        onPress: () => {},
                      },
                      {
                        text: "YA",
                        onPress: () => {
                          dispatch(setJawaban(null));
                          dispatch(
                            setSaveAnswer({
                              data: null,
                              error: null,
                              loading: false,
                            })
                          );
                          dispatch(
                            setSoal({ data: null, error: null, loading: false })
                          );
                          dispatch(
                            setSoalUrl(
                              urlQuests +
                                `/tryout/${tryoutId}/bab/${detail._id}`
                            )
                          );
                          console.log(tryoutId, detail._id);
                          navigation.navigate("SoalScreen", {
                            title: detail.title,
                            blockTime: detail.blocking_time,
                            soalUrl:
                              urlQuests +
                              `/tryout/${tryoutId}/bab/${detail._id}`,
                          });
                        },
                      },
                    ]);
                  } else {
                    if (!profile.program_studi) {
                      Alert.alert(
                        "Peringatan",
                        "Tipe soal ini adalah SBMPTN. Kamu perlu memilih prodi terlebih dahulu untuk mengerjakan soal.",
                        [
                          { text: "TIDAK", onPress: () => {} },
                          {
                            text: "PILIH",
                            onPress: () => {
                              navigation.navigate("ProfileScreen", {
                                from: "tryout",
                              });
                            },
                          },
                        ]
                      );
                    } else {
                      let title = "Peringatan !";
                      let msg = "";
                      if (detail.blocking_time) {
                        msg =
                          "1. Kamu harus menunggu waktu mata uji sebelumnya habis untuk masuk ke mata uji berikutnya\n\n" +
                          "2. Kamu wajib mengerjakan tryout hingga mata uji terakhir\n\n" +
                          "3. Perhitungan waktu uji akan tetap berjalan sekalipun aplikasi dalam keadaan tertutup\n\n\n\n";
                      } else {
                        msg =
                          "Kamu akan mengerjakan try out dengan sistem non blocking time.\n\nMulai mengerjakan?";
                      }
                      Alert.alert(title, msg, [
                        {
                          text: "TIDAK",
                          onPress: () => {},
                        },
                        {
                          text: "YA",
                          onPress: () => {
                            dispatch(
                              setSaveAnswer({
                                data: null,
                                error: null,
                                loading: false,
                              })
                            );

                            dispatch(
                              setSoalUrl(
                                urlQuests +
                                  `/tryout/${tryoutId}/bab/${detail._id}`
                              )
                            );
                            navigation.navigate("SoalScreen", {
                              title: detail.title,
                              blockTime: detail.blocking_time,
                              soalUrl:
                                urlQuests +
                                `/tryout/${tryoutId}/bab/${detail._id}`,
                            });
                          },
                        },
                      ]);
                    }
                  }
                } else if (detail.score) {
                  if (detail.score === "processing") {
                    Alert.alert(
                      "Proses",
                      "Mohon bersabar ya.. tryout kamu masih dinilai :)"
                    );
                  } else {
                    navigation.navigate("TryoutScoreScreen", {
                      scores: detail.score.sessions,
                    });
                  }
                }
              } else {
                toast.show({
                  placement: "top",
                  duration: null,
                  width: Dimensions.get("screen").width / 1.3,
                  render: () => {
                    return (
                      <ToastErrorContent
                        content="Kamu tidak terhubung ke internet"
                        onPress={() => {
                          toast.closeAll();
                          navigation.goBack();
                        }}
                      />
                    );
                  },
                });
              }
            });
          }}
        >
          <View
            style={{
              marginEnd: 10,
              marginStart: 10,
              borderRadius: 8,
              marginTop: Sizes.fixPadding,
              padding: Sizes.fixPadding,
              backgroundColor: "white",
              elevation: 2,
            }}
          >
            <Text style={{ ...Fonts.orangeColor20Bold }}>{detail.title}</Text>
            <Text style={{ ...Fonts.black17Bold }}>
              TPS ({detail.total_question} Soal - {detail.total_time / 60}{" "}
              menit)
            </Text>

            <Text style={{ marginTop: 10 }}>{detail.desc}</Text>
            <Box mt={1}>
              <Text
                style={{
                  color: detail.blocking_time
                    ? Colors.neutralRedColor
                    : Colors.neutralGreenColor,
                  fontWeight: "bold",
                }}
              >
                {detail.blocking_time ? "Blocking Time" : "Non-Blocking Time"}
              </Text>
            </Box>
            {detail.touched && (
              <View
                style={{
                  position: "absolute",
                  width: 25,
                  height: 25,
                  backgroundColor: "green",
                  top: 10,
                  right: 10,
                  borderRadius: 13,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MaterialIcons name="check" size={12} color="white" />
              </View>
            )}
          </View>
        </TouchableOpacity>
      ) : (
        <View
          style={{
            marginEnd: 10,
            marginStart: 10,
            borderRadius: 8,
            marginTop: Sizes.fixPadding,
            padding: Sizes.fixPadding,
            backgroundColor: "white",
            elevation: 2,
          }}
        >
          <Text style={{ ...Fonts.orangeColor20Bold }}>{detail.title}</Text>
          <Text style={{ ...Fonts.black17Bold }}>
            TPS ({detail.total_question} Soal - {detail.total_time} menit)
          </Text>
          <Text style={{ marginTop: 10 }}>{detail.desc}</Text>
          <Box mt={1}>
            <Text
              style={{
                color: detail.blocking_time
                  ? Colors.neutralRedColor
                  : Colors.neutralGreenColor,
                fontWeight: "bold",
              }}
            >
              {detail.blocking_time ? "Blocking Time" : "Non-Blocking Time"}
            </Text>
          </Box>
          {detail.touched && (
            <View
              style={{
                position: "absolute",
                width: 25,
                height: 25,
                backgroundColor: "green",
                top: 10,
                right: 10,
                borderRadius: 13,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialIcons name="check" size={12} color="white" />
            </View>
          )}
        </View>
      )}
    </>
  );
};

export default TryoutCard;
