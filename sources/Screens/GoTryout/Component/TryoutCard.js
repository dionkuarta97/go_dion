import React from "react";
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
import { setSoalUrl } from "../../../Redux/Soal/soalActions";
import { urlQuests } from "../../../Services/ApiUrl";
import { MaterialIcons } from "@expo/vector-icons";
import checkInternet from "../../../Services/CheckInternet";
import { useToast } from "native-base";
import ToastErrorContent from "../../../Components/ToastErrorContent";

const TryoutCard = (props) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigation = useNavigation();
  const { detail, tryoutId } = props;
  console.log(JSON.stringify(detail, null, 2));
  const profile = useSelector((state) => state.profileReducer.profile);

  return (
    <>
      {detail.quiz ? (
        <TouchableOpacity
          onPress={() => {
            checkInternet().then((data) => {
              if (data) {
                if (!detail.touched) {
                  if (detail.type === "UAS") {
                    let title = "Peringatan !";
                    let msg = "";
                    if (detail.blocking_time) {
                      msg =
                        "Anda akan mengerjakan try out dengan sistem blocking time dan harus menunggu waktu tiap mata uji habis, untuk pindah ke mata uji berikutnya.\n\nAnda harus mengerjakan try out hingga mata uji terakhir. Mulai mengerjakan? ";
                    } else {
                      msg =
                        "Anda akan mengerjakan try out dengan sistem non blocking time. Mulai mengerjakan?";
                    }
                    Alert.alert(title, msg, [
                      {
                        text: "cancel",
                        onPress: () => {},
                      },
                      {
                        text: "yakin",
                        onPress: () => {
                          dispatch(
                            setSoalUrl(
                              urlQuests +
                                `/tryout/${tryoutId}/bab/${detail._id}`
                            )
                          );
                          navigation.navigate("SoalScreen", {
                            title: detail.title,
                            blockTime: detail.blocking_time,
                          });
                        },
                      },
                    ]);
                  } else {
                    if (!profile.program_studi) {
                      Alert.alert(
                        "Peringatan",
                        "Tipe soal ini adalah SBMPTN, untuk mengerjakan soal ini anda perlu memilih prodi, silahkan pilih prodi terlebih dahulu",
                        [
                          { text: "Cancel", onPress: () => {} },
                          {
                            text: "Pilih Prodi",
                            onPress: () => {
                              navigation.navigate("ProfileScreen");
                            },
                          },
                        ]
                      );
                    } else {
                      let title = "Peringatan !";
                      let msg = "";
                      if (detail.blocking_time) {
                        msg =
                          "Anda akan mengerjakan try out dengan sistem blocking time dan harus menunggu waktu tiap mata uji habis, untuk pindah ke mata uji berikutnya.\n\nAnda harus mengerjakan try out hingga mata uji terakhir. Mulai mengerjakan? ";
                      } else {
                        msg =
                          "Anda akan mengerjakan try out dengan sistem non blocking time. Mulai mengerjakan?";
                      }
                      Alert.alert(title, msg, [
                        {
                          text: "cancel",
                          onPress: () => {},
                        },
                        {
                          text: "yakin",
                          onPress: () => {
                            dispatch(
                              setSoalUrl(
                                urlQuests +
                                  `/tryout/${tryoutId}/bab/${detail._id}`
                              )
                            );
                            navigation.navigate("SoalScreen", {
                              title: detail.title,
                              blockTime: detail.blocking_time,
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
                      "mohon bersabar ya.. score anda masih di nilai :)"
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
