import React, { useEffect, useState } from "react";
import { Text, View, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../../../Theme/Colors";
import Fonts from "../../../Theme/Fonts";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { Progress, Box, VStack, HStack } from "native-base";
import moment from "moment";
import Analytics from "../../../Services/goAnalytics";
import { EventAnalytic } from "../../../Utils/event_analytic";

const GoTryoutCard = (props) => {
   const navigation = useNavigation();
   const { data, tryoutId } = props;
   const [time, setTime] = useState(0);
   const [soal, setSoal] = useState(0);
   const [value, setValue] = useState(0);
   const [complete, setComplete] = useState(0);
   const [givenAwal, setGivenAwal] = useState(null);
   const [givenAkhir, setGivenAkhir] = useState(null);
   const [current, setCurrent] = useState(null);
   const waktu = () => {
      let temp = 0;
      let temp2 = 0;
      let temp3 = 0;
      let temp4 = 100;
      for (const key in data.includes) {
         temp += data.includes[key]["total_time"];
         temp2 += data.includes[key]["total_question"];
         if (data.includes[key]["touched"]) {
            temp3 += 1;
         }
      }
      temp4 = temp4 / data.includes.length;
      temp4 = temp4 * temp3;
      setTime(temp);
      setSoal(temp2);
      setComplete(temp3);
      setValue(temp4);
   };
   useEffect(() => {
      waktu();
      setGivenAwal(moment(data.details?.tanggal_awal));
      setGivenAkhir(moment(data.details?.tanggal_akhir));
      setCurrent(moment().utcOffset(7).startOf("second"));
   }, []);

   return (
      <TouchableOpacity
         onPress={() => {
            /** send analytic : Tryout */
            if (props.status == "untouched") {
               Analytics.logCustomEvent(EventAnalytic.GoTryoutPending);
            } else if (props.status == "touched") {
               Analytics.logCustomEvent(EventAnalytic.GoTryoutProgress);
            } else {
               Analytics.logCustomEvent(EventAnalytic.GoTryoutDone);
            }

            navigation.navigate("TryoutDetailScreen", {
               data: data.includes,
               tryoutId: tryoutId,
               title: data.title,
               tipe: props.status,
               mulai: moment.duration(givenAwal?.diff(current)).asDays(),
               akhir: moment.duration(givenAkhir?.diff(current)).asDays(),
               status:
                  moment.duration(givenAwal?.diff(current)).asDays() > 0
                     ? false
                     : moment.duration(givenAkhir?.diff(current)).asDays() < 0
                     ? false
                     : true,
               detik:
                  moment.duration(givenAwal?.diff(current)).asDays() < 1 &&
                  moment.duration(givenAwal?.diff(current)).asDays() > 0
                     ? moment.duration(givenAwal?.diff(current)).asSeconds()
                     : moment.duration(givenAkhir?.diff(current)).asDays() <
                          1 &&
                       moment.duration(givenAkhir?.diff(current)).asDays() > 0
                     ? moment.duration(givenAkhir?.diff(current)).asSeconds()
                     : null,
            });
         }}
      >
         <View
            style={{
               marginEnd: 10,
               marginStart: 10,
               borderRadius: 10,
               borderWidth: 1,
               borderColor: Colors.ligthGreyColor,
               marginTop: 15,
               backgroundColor: "white",
               padding: 10,
               elevation: 4,
            }}
         >
            <HStack>
               <VStack marginRight={"auto"}>
                  <Text style={{ ...Fonts.black17Bold }}>{data.title}</Text>
                  <Text
                     style={{
                        ...Fonts.black15Regular,
                        maxWidth: Dimensions.get("screen").width / 1.3,
                     }}
                  >
                     {data.desc}
                  </Text>
                  <Text style={{ ...Fonts.black15Regular }}>{data.level}</Text>
                  <Text style={{ ...Fonts.black17Bold }}>
                     TPS ( {soal} Soal -{" "}
                     {time < 60 ? time + " Detik" : time / 60 + " Menit"} )
                  </Text>
               </VStack>
               <View style={{ justifyContent: "center" }}>
                  <MaterialIcons
                     name="arrow-forward-ios"
                     size={30}
                     color="black"
                  />
               </View>
            </HStack>

            {complete > 0 && props.status !== "done" && (
               <HStack
                  mt={2}
                  justifyContent={"center"}
                  alignItems={"center"}
               >
                  <Box
                     w="80%"
                     marginRight={"auto"}
                  >
                     <Progress
                        bg="coolGray.300"
                        _filledTrack={{
                           bg: "green.400",
                        }}
                        value={value}
                     />
                  </Box>
                  <Text>
                     {complete} / {data.includes.length}
                  </Text>
               </HStack>
            )}
            {complete === 0 && (
               <HStack
                  space={4}
                  mt={2}
                  mb={2}
               >
                  <Text style={{ ...Fonts.black15Bold }}>Total Sub Tryout</Text>
                  <Text style={{ ...Fonts.black15Bold }}>
                     ( {data.includes.length} )
                  </Text>
               </HStack>
            )}

            {data.type_label && (
               <>
                  {data.type_label !== "" && (
                     <HStack>
                        <Box
                           paddingX={2}
                           borderRadius={5}
                           paddingY={0.5}
                           bg={"#0D9CC9"}
                           marginBottom={2}
                           marginTop={complete === 0 ? 0 : 2}
                        >
                           <Text
                              style={{
                                 fontSize: 15,
                                 fontWeight: "bold",
                                 color: "white",
                              }}
                           >
                              {data.type_label}
                           </Text>
                        </Box>
                     </HStack>
                  )}
               </>
            )}
            {props.status === "done" && (
               <Text style={{ fontSize: 17, color: "red", fontWeight: "bold" }}>
                  {data.reason ? data.reason : "kosong"}
               </Text>
            )}
            {props.status !== "done" && (
               <>
                  {moment.duration(givenAkhir?.diff(current)).asDays() > 0 ? (
                     <>
                        {moment.duration(givenAwal?.diff(current)).asDays() >
                        0 ? (
                           <View style={{ maxWidth: 500 }}>
                              <Text style={{ color: Colors.neutralGreenColor }}>
                                 Dimulai{" "}
                                 {moment
                                    .duration(givenAwal?.diff(current))
                                    .asDays() > 1
                                    ? "dalam " +
                                      Math.floor(
                                         moment
                                            .duration(givenAwal?.diff(current))
                                            .asDays()
                                      ) +
                                      " hari lagi"
                                    : moment
                                         .duration(givenAwal?.diff(current))
                                         .asHours() > 1
                                    ? "dalam " +
                                      Math.floor(
                                         moment
                                            .duration(givenAwal?.diff(current))
                                            .asHours()
                                      ) +
                                      " jam lagi"
                                    : "kurang 1 jam lagi"}
                              </Text>
                           </View>
                        ) : (
                           <View style={{ maxWidth: 500 }}>
                              <Text style={{ color: Colors.neutralRedColor }}>
                                 Berakhir{" "}
                                 {moment
                                    .duration(givenAkhir?.diff(current))
                                    .asDays() > 1
                                    ? "dalam " +
                                      Math.floor(
                                         moment
                                            .duration(givenAkhir?.diff(current))
                                            .asDays()
                                      ) +
                                      " hari lagi"
                                    : moment
                                         .duration(givenAkhir?.diff(current))
                                         .asHours() > 1
                                    ? "dalam " +
                                      Math.floor(
                                         moment
                                            .duration(givenAkhir?.diff(current))
                                            .asHours()
                                      ) +
                                      " jam lagi"
                                    : "kurang 1 jam lagi"}
                              </Text>
                           </View>
                        )}
                     </>
                  ) : (
                     <View style={{ maxWidth: 500 }}>
                        <Text style={{ color: "red" }}>
                           Waktu pengerjaan tryout sudah berakhir
                        </Text>
                     </View>
                  )}
               </>
            )}
         </View>
      </TouchableOpacity>
   );
};

export default GoTryoutCard;
