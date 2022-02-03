import { Text, View, Center, Switch, HStack } from "native-base";
import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useDispatch, useSelector } from "react-redux";
import NoData from "../../../Components/NoData";
import { getChartTryout, setProdi } from "../../../Redux/Laporan/LaporanAction";

import { Rect, Text as TextSVG, Svg } from "react-native-svg";
const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: "black",
  backgroundGradientFromOpacity: 0.1,
  backgroundGradientTo: "white",
  backgroundGradientToOpacity: 0.8,
  color: (opacity = 1) => `rgba(0,  0, 0, ${opacity})`,
  strokeWidth: 4, // optional, default 3
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

  console.log(prodi);

  return (
    <>
      {chartTryout.error && type && (
        <View
          style={{
            marginTop: 50,
          }}
        >
          <NoData msg="Tryout tidak ditemukan" />
        </View>
      )}
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
                <HStack mb={5} mt={2} space={7}>
                  <View
                    bg={prodi === 1 ? "red.400" : "light.300"}
                    style={{
                      borderRadius: 10,
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                    }}
                  >
                    <Text color={prodi === 1 ? "amber.50" : "black"} bold>
                      Pilihan 1
                    </Text>
                  </View>

                  <Switch
                    colorScheme="success"
                    defaultIsChecked={prodi === 1 ? false : true}
                    onChange={() => {
                      if (prodi === 1) {
                        dispatch(setProdi(2));
                      } else {
                        dispatch(setProdi(1));
                      }
                    }}
                  />
                  <View
                    bg={prodi === 2 ? "amber.400" : "light.300"}
                    style={{
                      borderRadius: 10,
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                    }}
                  >
                    <Text color={prodi === 2 ? "amber.50" : "black"} bold>
                      Pilihan 2
                    </Text>
                  </View>
                </HStack>
              </Center>
            )}

            <ScrollView horizontal={true}>
              <LineChart
                style={{ borderRadius: 15 }}
                formatXLabel={(value) => value.replace("TOBK ", "")}
                data={
                  type === "uas"
                    ? {
                        labels: [...chartTryout.data.labels],
                        datasets: [
                          {
                            data: [...chartTryout.data.datasets],
                            strokeWidth: 2,
                            color: (opacity = 1) => `rgba(0,102,0, ${opacity})`, // optional
                          },
                        ],
                      }
                    : prodi === 1
                    ? {
                        labels: [...chartTryout.data.labels],
                        datasets: [
                          {
                            data: [...chartTryout.data.datasets],
                            strokeWidth: 2,
                            color: (opacity = 1) => `rgba(0,102,0, ${opacity})`, // optional
                          },
                          {
                            data: [...chartTryout.data.prodi1],
                            strokeWidth: 2,
                            color: (opacity = 1) => `rgba(255,0,0,${opacity})`, // optional
                          },
                        ],
                      }
                    : {
                        labels: [...chartTryout.data.labels],
                        datasets: [
                          {
                            data: [...chartTryout.data.datasets],
                            strokeWidth: 2,
                            color: (opacity = 1) => `rgba(0,102,0, ${opacity})`, // optional
                          },
                          {
                            data: [...chartTryout.data.prodi2],
                            strokeWidth: 2,
                            color: (opacity = 1) =>
                              `rgba(252, 165, 3, ${opacity})`, // optional
                          },
                        ],
                      }
                }
                width={
                  chartTryout.data.labels.length > 3
                    ? (screenWidth * (12 + (chartTryout.data.length - 3))) / 10
                    : (screenWidth * 12) / 10
                }
                height={Dimensions.get("screen").height / 2.5}
                xLabelsOffset={10}
                chartConfig={chartConfig}
                withHorizontalLines={true}
                withInnerLines={false}
                onDataPointClick={(data) => {
                  let isSamePoint =
                    tooltipPos.x === data.x && tooltipPos.y === data.y;

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
