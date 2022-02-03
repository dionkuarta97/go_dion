import { Box, HStack, Text, View } from "native-base";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  VictoryChart,
  VictoryPolarAxis,
  VictoryArea,
  VictoryTheme,
  VictoryGroup,
  VictoryLabel,
} from "victory-native";
import { getDetailTryout } from "../../../Redux/Laporan/LaporanAction";

import { AntDesign } from "@expo/vector-icons";
import Colors from "../../../Theme/Colors";

export default function ProgressTryoutContent(props) {
  const { _id, type } = props;
  const { detailTryout } = useSelector((state) => state.laporanReducer);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState();
  const [maxima, setMaxima] = useState();

  useEffect(() => {
    dispatch(getDetailTryout({ _id, type }));
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

  return (
    <>
      <View style={{ padding: 10 }}>
        {/* <Box
          bg={"white"}
          padding={3}
          mb={3}
          alignItems={"center"}
          borderRadius={15}
          shadow={6}
        >
          {detailTryout.data !== null && (
            <Text fontSize={17} bold>
              {detailTryout.data.tryout_name}
            </Text>
          )}
        </Box> */}
        <Box
          bg={"white"}
          shadow={4}
          style={{
            alignItems: "center",
            borderRadius: 15,
          }}
        >
          <Text mt={2} bold fontSize={15}>
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
                style={{ data: { fillOpacity: 0.2, strokeWidth: 2 } }}
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
                      grid: { stroke: "grey", strokeWidth: 0.25, opacity: 0.3 },
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
                      type === "sbmptn" ? `${t * 1000}` : `${t * 100}`
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
          {detailTryout.data !== null && (
            <Box
              bg={"amber.50"}
              mb={2}
              padding={2}
              borderRadius={20}
              borderWidth={1}
              borderColor={"amber.400"}
            >
              {type === "uas" ? (
                <Text>
                  <Text bold color={"amber.400"}>
                    {detailTryout.data.score}
                  </Text>
                  <Text color={"light.400"}>/100</Text>
                </Text>
              ) : (
                <Text>
                  <Text bold color={"amber.400"}>
                    {detailTryout.data.score1}
                  </Text>
                  <Text color={"light.400"}>/1000</Text>
                </Text>
              )}
            </Box>
          )}
        </Box>
      </View>
      <ScrollView style={{ paddingHorizontal: 10, paddingBottom: 10, flex: 1 }}>
        <Box
          shadow={3}
          mt={5}
          padding={5}
          style={{
            backgroundColor: "white",
            borderRadius: 15,
            marginBottom: 30,
          }}
        >
          {detailTryout.data !== null && (
            <>
              {detailTryout.data.matpel.map((el) => (
                <Box
                  key={el.title + el.score}
                  my={2}
                  borderBottomWidth={1}
                  paddingBottom={2}
                >
                  <Text>
                    <AntDesign
                      name="book"
                      size={15}
                      color={Colors.primaryColor}
                    />{" "}
                    {el.title.toUpperCase()}{" "}
                    {type !== "uas" && `(${el.key.toUpperCase()})`}
                  </Text>
                  <HStack mt={1}>
                    <Text style={{ marginEnd: "auto" }}>
                      <AntDesign
                        size={15}
                        name="rocket1"
                        color={Colors.neutralRedColor}
                      />{" "}
                      Score :
                    </Text>
                    <Box
                      bg={"green.600"}
                      paddingX={1}
                      paddingY={0.3}
                      borderRadius={5}
                    >
                      <Text bold color={"light.50"}>
                        {el.score === null ? 0 : el.score}
                      </Text>
                    </Box>
                  </HStack>
                </Box>
              ))}
            </>
          )}
        </Box>
      </ScrollView>
    </>
  );
}
