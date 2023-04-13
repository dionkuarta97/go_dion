import { Text, View, Center, Switch, HStack, Button } from "native-base";
import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useDispatch, useSelector } from "react-redux";
import NoData from "../../../Components/NoData";
import { getChartTryout, setProdi } from "../../../Redux/Laporan/LaporanAction";

import { Rect, Text as TextSVG, Svg } from "react-native-svg";
import LoadingModal from "../../../Components/Modal/LoadingModal";
const screenWidth = Dimensions.get("window").width;

const chartConfig = {
   backgroundColor: "transparent",
   backgroundGradientTo: "white",
   backgroundGradientFromOpacity: 0,
   backgroundGradientFrom: "white",
   backgroundGradientToOpacity: 0,
   color: (opacity = 1) => `rgba(0,  0, 0, ${opacity})`,
   // optional, default 3
   useShadowColorFromDataset: false, // optional
};

const TryoutChart = (props) => {
   const dispatch = useDispatch();
   const { type } = props;
   const { chartTryout, prodi } = useSelector((state) => state.laporanReducer);
   let [tooltipPos, setTooltipPos] = useState({
      x: 0,
      y: 0,
      visible: false,
      value: 0,
   });

   useEffect(() => {
      if (type) dispatch(getChartTryout({ type, prodi }));
      dispatch(setProdi(1));
   }, [type]);

   useEffect(() => {
      if (type === "sbmptn") {
         dispatch(getChartTryout({ type, prodi }));
      }
   }, [prodi]);

   useEffect(() => {
      if (tooltipPos.visible)
         setTimeout(() => {
            setTooltipPos({ ...tooltipPos, visible: false });
         }, 1000);
   }, [tooltipPos]);

   const toBeNumber = (arr) => {
      let temp = [];
      for (const key in arr) {
         temp.push(Number(key) + 1);
      }

      return temp;
   };

   return (
      <>
         {chartTryout.error && type && (
            <View
               style={{
                  marginTop: 50,
               }}
            >
               <NoData msg="Laporan tidak ditemukan" />
            </View>
         )}
         {chartTryout.loading && <LoadingModal />}
         {chartTryout.data !== null && (
            <>
               <View
                  style={{
                     backgroundColor: "white",
                     padding: 10,
                     marginBottom: 20,
                     borderRadius: 15,
                     elevation: 3,
                  }}
               >
                  {type !== "uas" && (
                     <Center>
                        <Button.Group
                           isAttached
                           colorScheme="dark"
                           marginBottom={10}
                           marginTop={5}
                           mx={{
                              base: "auto",
                              md: 0,
                           }}
                        >
                           <Button
                              width={Dimensions.get("screen").width / 3.4}
                              disabled={prodi === 1 ? true : false}
                              onPress={() => {
                                 dispatch(setProdi(1));
                              }}
                              variant={prodi === 1 ? "solid" : "outline"}
                              bg={prodi === 1 ? "red.600" : "white"}
                              borderColor={"amber.400"}
                           >
                              Pilihan 1
                           </Button>
                           <Button
                              width={Dimensions.get("screen").width / 3.4}
                              disabled={prodi === 2 ? true : false}
                              onPress={() => {
                                 dispatch(setProdi(2));
                              }}
                              variant={prodi === 2 ? "solid" : "outline"}
                              bg={prodi === 2 ? "amber.400" : "white"}
                              borderColor={"red.600"}
                           >
                              Pilihan 2
                           </Button>
                        </Button.Group>
                     </Center>
                  )}

                  <ScrollView horizontal={true}>
                     <LineChart
                        style={{ borderRadius: 15 }}
                        yLabelsOffset={10}
                        data={
                           type === "uas"
                              ? {
                                   labels: [
                                      ...toBeNumber(chartTryout.data.labels),
                                   ],
                                   datasets: [
                                      {
                                         data: [...chartTryout.data.datasets],
                                         strokeWidth: 2,
                                         color: (opacity = 1) =>
                                            `rgba(0,102,0, ${opacity})`, // optional
                                      },
                                      {
                                         data: [0],
                                         color: () => "transparent",
                                         strokeWidth: 0,
                                         withDots: false,
                                      },
                                      {
                                         data: [100],
                                         color: () => "transparent",
                                         strokeWidth: 0,
                                         withDots: false,
                                      },
                                   ],
                                }
                              : prodi === 1
                              ? {
                                   labels: [
                                      ...toBeNumber(chartTryout.data.labels),
                                   ],
                                   datasets: [
                                      {
                                         data: [...chartTryout.data.datasets],
                                         strokeWidth: 2,
                                         color: (opacity = 1) =>
                                            `rgba(0,102,0, ${opacity})`, // optional
                                      },
                                      {
                                         data: [...chartTryout.data.prodi1],
                                         strokeWidth: 2,
                                         color: (opacity = 1) =>
                                            `rgba(255,0,0,${opacity})`, // optional
                                      },
                                      {
                                         data: [0],
                                         color: () => "transparent",
                                         strokeWidth: 0,
                                         withDots: false,
                                      },
                                      {
                                         data: [1000],
                                         color: () => "transparent",
                                         strokeWidth: 0,
                                         withDots: false,
                                      },
                                   ],
                                }
                              : {
                                   labels: [
                                      ...toBeNumber(chartTryout.data.labels),
                                   ],
                                   datasets: [
                                      {
                                         data: [...chartTryout.data.datasets],
                                         strokeWidth: 2,
                                         color: (opacity = 1) =>
                                            `rgba(0,102,0, ${opacity})`, // optional
                                      },
                                      {
                                         data: [...chartTryout.data.prodi2],
                                         strokeWidth: 2,
                                         color: (opacity = 1) =>
                                            `rgba(252, 165, 3, ${opacity})`, // optional
                                      },
                                      {
                                         data: [0],
                                         color: () => "transparent",
                                         strokeWidth: 0,
                                         withDots: false,
                                      },
                                      {
                                         data: [1000],
                                         color: () => "transparent",
                                         strokeWidth: 0,
                                         withDots: false,
                                      },
                                   ],
                                }
                        }
                        width={
                           chartTryout.data.labels.length > 5
                              ? (screenWidth *
                                   (12 +
                                      (chartTryout.data.labels.length - 3))) /
                                13.5
                              : (screenWidth * 12) / 13.5
                        }
                        height={Dimensions.get("screen").height / 2.5}
                        xLabelsOffset={10}
                        chartConfig={chartConfig}
                        withHorizontalLines={true}
                        withInnerLines={false}
                        onDataPointClick={(data) => {
                           let isSamePoint =
                              tooltipPos.x === data.x &&
                              tooltipPos.y === data.y;

                           isSamePoint
                              ? setTooltipPos((previousState) => {
                                   return {
                                      ...previousState,
                                      value: data.value.toFixed(0),
                                      visible: !previousState.visible,
                                   };
                                })
                              : setTooltipPos({
                                   x: data.x,
                                   value: data.value.toFixed(0),
                                   y: data.y,
                                   visible: true,
                                });
                        }}
                        decorator={() => {
                           return tooltipPos.visible ? (
                              <View>
                                 <Svg>
                                    <Rect
                                       x={tooltipPos.x - 15}
                                       y={tooltipPos.y + 10}
                                       width="40"
                                       height="30"
                                       fill="black"
                                       rx="10"
                                    />
                                    <TextSVG
                                       x={tooltipPos.x + 5}
                                       y={tooltipPos.y + 30}
                                       fill="white"
                                       fontSize="10"
                                       fontWeight="bold"
                                       textAnchor="middle"
                                    >
                                       {tooltipPos.value}
                                    </TextSVG>
                                 </Svg>
                              </View>
                           ) : null;
                        }}
                        bezier
                     />
                  </ScrollView>
               </View>
            </>
         )}
      </>
   );
};

export default TryoutChart;
