import {
   Box,
   Button,
   Center,
   HStack,
   Text,
   useToast,
   View,
   VStack,
} from "native-base";
import React, { useEffect, useState } from "react";
import {
   Alert,
   Dimensions,
   ScrollView,
   TouchableHighlight,
   AppState,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
   VictoryChart,
   VictoryPolarAxis,
   VictoryArea,
   VictoryTheme,
   VictoryGroup,
   VictoryLabel,
} from "victory-native";
import {
   generateToken,
   getDetailTryout,
   setDetailTryout,
} from "../../../Redux/Laporan/LaporanAction";
import { MaterialIcons } from "@expo/vector-icons";

import { AntDesign } from "@expo/vector-icons";
import Colors from "../../../Theme/Colors";
import { useNavigation } from "@react-navigation/native";
import checkInternet from "../../../Services/CheckInternet";
import ToastErrorContent from "../../../Components/ToastErrorContent";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Linking } from "react-native";
import LoadingModal from "../../../Components/Modal/LoadingModal";

export default function ProgressTryoutContent(props) {
   const { _id, type } = props;
   const OpenWEB = (url) => {
      Linking.openURL(url);
   };
   const profile = useSelector((state) => state.profileReducer.profile);
   const baseUrl = useSelector((state) => state.initReducer.baseUrl);
   const toast = useToast();
   const navigation = useNavigation();
   const { detailTryout } = useSelector((state) => state.laporanReducer);
   const dispatch = useDispatch();
   const [loading, setLoading] = useState(true);
   const [link, setLink] = useState(null);
   const [data, setData] = useState();
   const [maxima, setMaxima] = useState();
   const token = useSelector((state) => state.authReducer.token);
   const [tokenOneTime, setTokenOneTime] = useState(null);

   useEffect(() => {
      checkInternet().then((data) => {
         if (data) {
            dispatch(getDetailTryout({ _id, type }));
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

      return () => {
         dispatch(setDetailTryout({ data: null, loading: false, error: null }));
         setTokenOneTime(null);
      };
   }, []);

   useEffect(() => {
      if (detailTryout.data !== null) {
         let temp = [];
         for (const key in detailTryout.data.matpel) {
            if (type === "sbmptn") {
               if (detailTryout.data.matpel[key].score === null) {
                  detailTryout.data.matpel[key].score = 0;
               }
               temp.push({
                  x: detailTryout.data.matpel[key].key.toUpperCase(),
                  y: detailTryout.data.matpel[key].score / 1000,
               });
            } else {
               temp.push({
                  x: detailTryout.data.matpel[key].title.toUpperCase(),
                  y: detailTryout.data.matpel[key].score / 100,
               });
            }
         }
         setData(temp);
         let obj = {};
         for (const key in temp) {
            if (temp[key]["y"] === null) {
               temp[key]["y"] = 0;
            }
            obj = { ...obj, [temp[key]["x"]]: temp[key]["y"] };
         }
         setMaxima(obj);
         setLoading(false);
      }
   }, [detailTryout]);

   useEffect(() => {
      dispatch(generateToken())
         .then((val) => {
            setTokenOneTime(val);
         })
         .catch((err) => {});
      const appStateListener = AppState.addEventListener(
         "change",
         (nextAppState) => {
            if (nextAppState === "active") {
               dispatch(generateToken())
                  .then((val) => {
                     setTokenOneTime(val);
                  })
                  .catch((err) => {});
            } else {
               setTokenOneTime(null);
            }
         }
      );
      return () => {
         appStateListener?.remove();
      };
   }, []);

   return (
      <>
         <ScrollView
            style={{ paddingHorizontal: 15, paddingVertical: 10, flex: 1 }}
         >
            <View>
               {loading && <LoadingModal />}
               <Box
                  bg={"white"}
                  shadow={4}
                  style={{
                     alignItems: "center",
                     borderRadius: 15,
                     marginBottom: 30,
                  }}
               >
                  <Text
                     mt={2}
                     bold
                     fontSize={15}
                  >
                     Skill Radar
                  </Text>
                  {!loading && (
                     <VictoryChart
                        polar
                        theme={VictoryTheme.material}
                        domain={{ y: [0, 1] }}
                     >
                        <VictoryGroup
                           colorScale={["gold", "orange", "tomato"]}
                           style={{
                              data: { fillOpacity: 0.2, strokeWidth: 2 },
                           }}
                        >
                           <VictoryArea data={data} />
                        </VictoryGroup>
                        {Object.keys(maxima).map((key, i) => {
                           return (
                              <VictoryPolarAxis
                                 dependentAxis
                                 key={i}
                                 style={{
                                    axisLabel: { padding: 10 },
                                    axis: { stroke: "none" },
                                    grid: {
                                       stroke: "grey",
                                       strokeWidth: 0.25,
                                       opacity: 0.3,
                                    },
                                    tickLabels: { fontSize: 9, padding: 15 },
                                 }}
                                 tickLabelComponent={
                                    <VictoryLabel labelPlacement="vertical" />
                                 }
                                 labelPlacement="perpendicular"
                                 axisValue={i + 1}
                                 label={key}
                                 tickValues={[0.2, 0.4, 0.6, 0.8]}
                                 tickFormat={(t) =>
                                    type === "sbmptn"
                                       ? `${t * 1000}`
                                       : `${t * 100}`
                                 }
                              />
                           );
                        })}
                        <VictoryPolarAxis
                           labelPlacement="parallel"
                           tickFormat={() => ""}
                           style={{
                              axis: { stroke: "none" },
                              grid: { stroke: "grey", opacity: 0.5 },
                           }}
                        />
                     </VictoryChart>
                  )}
                  {detailTryout.data !== null && type === "uas" && (
                     <Box
                        bg={"amber.50"}
                        mb={2}
                        padding={2}
                        borderRadius={20}
                        borderWidth={1}
                        borderColor={"amber.400"}
                     >
                        <Text>
                           <Text
                              bold
                              color={"amber.400"}
                           >
                              {detailTryout.data.score.toFixed(2)}
                           </Text>
                           <Text color={"light.400"}>/100</Text>
                        </Text>
                     </Box>
                  )}
               </Box>
            </View>
            {detailTryout.data !== null && (
               <>
                  {detailTryout.data.matpel.map((el, idx) => (
                     <TouchableHighlight
                        style={{
                           borderRadius: 15,
                           marginBottom:
                              detailTryout.data.matpel.length - 1 === idx
                                 ? 30
                                 : 15,
                        }}
                        key={el.title + el.score}
                        onPress={() => {
                           if (el.solution.length === 0) {
                              Alert.alert("Informasi", "Solusi belum tersedia");
                           } else {
                              navigation.navigate("SolusiScreen", {
                                 solution: el.solution,
                                 quiz: el.quiz,
                                 answer: el.answer,
                                 quiz_options: el.quiz_options,
                                 title: el.title.toUpperCase(),
                              });
                           }
                        }}
                     >
                        <Box
                           shadow={3}
                           style={{
                              padding: 10,
                              backgroundColor: "white",
                              borderRadius: 15,
                           }}
                        >
                           <HStack>
                              <VStack marginEnd={"auto"}>
                                 <Text
                                    style={{
                                       maxWidth:
                                          Dimensions.get("screen").width / 1.4,
                                    }}
                                 >
                                    <AntDesign
                                       name="book"
                                       size={15}
                                       color={Colors.primaryColor}
                                    />{" "}
                                    {el.title.toUpperCase()}{" "}
                                    {type !== "uas" &&
                                       `(${el.key.toUpperCase()})`}
                                 </Text>
                                 <HStack mt={1}>
                                    <Text
                                       style={{
                                          marginEnd:
                                             Dimensions.get("screen").width /
                                             2.1,
                                       }}
                                    >
                                       <AntDesign
                                          size={15}
                                          name="rocket1"
                                          color={Colors.neutralRedColor}
                                       />{" "}
                                       Nilai :
                                    </Text>
                                    <Box
                                       bg={"green.600"}
                                       paddingX={1}
                                       paddingY={0.3}
                                       borderRadius={5}
                                    >
                                       <Text
                                          bold
                                          color={"light.50"}
                                       >
                                          {el.score === null
                                             ? 0
                                             : el.score.toFixed(1)}
                                       </Text>
                                    </Box>
                                 </HStack>
                              </VStack>
                              <View
                                 style={{
                                    justifyContent: "center",
                                    borderLeftWidth: 1,
                                    paddingLeft: 10,
                                    borderLeftColor: "#a3a3a3",
                                 }}
                              >
                                 <MaterialIcons
                                    name="arrow-forward-ios"
                                    size={30}
                                    color="#a3a3a3"
                                 />
                              </View>
                           </HStack>
                        </Box>
                     </TouchableHighlight>
                  ))}
               </>
            )}
            <Center marginBottom={50}>
               {type !== "uas" && tokenOneTime !== null && (
                  <Button
                     bg={"red.500"}
                     _pressed={{
                        bg: "red.400",
                     }}
                     onPress={() => {
                        OpenWEB(
                           baseUrl +
                              "/report/v1/pdf/" +
                              type +
                              "/" +
                              _id +
                              "?uid=" +
                              profile._id +
                              "&mode=html&token=" +
                              tokenOneTime
                        );
                     }}
                  >
                     <HStack space={1}>
                        <MaterialCommunityIcons
                           name="file-pdf-box"
                           size={24}
                           color="white"
                        />
                        <Text
                           color={"white"}
                           bold
                        >
                           Lihat Laporan
                        </Text>
                     </HStack>
                  </Button>
               )}
            </Center>
         </ScrollView>
      </>
   );
}
