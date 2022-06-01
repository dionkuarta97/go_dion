import {
  HStack,
  Text,
  Button,
  View,
  ScrollView,
  Box,
  Image,
} from "native-base";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLeaderboard } from "../../../Redux/Leaderboard/leaderboardAction";
import LeaderboardCard from "./LeaderboardCard";
import { Dimensions, ActivityIndicator, TouchableOpacity } from "react-native";
import Colors from "../../../Theme/Colors";
import { useNavigation } from "@react-navigation/native";
const LeaderboardContent = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profileReducer.profile);
  const { leaderboard, loading } = useSelector(
    (state) => state.leaderboardReducer
  );
  const navigation = useNavigation();
  const [select, setSelect] = useState("Nasional");
  const [page, setPage] = useState(1);
  useEffect(() => {
    setPage(1);
    dispatch(
      getLeaderboard({
        type:
          select === "Nasional"
            ? "national"
            : select === "Kota"
            ? "region"
            : "school",
        page: 1,
        limit: 20,
      })
    );
  }, [select]);

  function handleInfinityScroll(e) {
    let mHeight = e.nativeEvent.layoutMeasurement.height;
    let cSize = e.nativeEvent.contentSize.height;
    let Y = e.nativeEvent.contentOffset.y;
    if (Math.ceil(mHeight + Y) >= cSize) {
      return true;
    }
    return false;
  }

  console.log(JSON.stringify(leaderboard, null, 2));
  return (
    <>
      <View
        bg={"light.200"}
        style={{
          flex: 1,
          padding: 20,
        }}
      >
        <HStack space={3}>
          <Button
            rounded={15}
            colorScheme={select === "Nasional" ? "amber" : "coolGray"}
            variant={"solid"}
            disabled={select === "Nasional" ? true : false}
            onPress={() => {
              setSelect("Nasional");
            }}
          >
            Nasional
          </Button>
          <Button
            rounded={15}
            colorScheme={select === "Kota" ? "amber" : "coolGray"}
            disabled={select === "Kota" ? true : false}
            onPress={() => {
              setSelect("Kota");
            }}
          >
            Kota
          </Button>
          <Button
            rounded={15}
            colorScheme={select === "Sekolah" ? "amber" : "coolGray"}
            disabled={select === "Sekolah" ? true : false}
            onPress={() => {
              setSelect("Sekolah");
            }}
          >
            Sekolah
          </Button>
        </HStack>
        <HStack marginY={6}>
          <Text bold marginRight={"auto"}>
            Tingkat {select}
          </Text>
          <Text color={"light.400"}>{leaderboard.data?.total_data} Result</Text>
        </HStack>
        {leaderboard.loading && (
          <View padding={5}>
            <ActivityIndicator color={Colors.orangeColor} size={30} />
          </View>
        )}
        <ScrollView
          onScroll={(e) => {
            if (
              leaderboard.data?.total_data !== leaderboard.data?.rankings.length
            ) {
              if (!loading) {
                if (handleInfinityScroll(e)) {
                  let temp = leaderboard.data?.rankings;
                  if (temp) {
                    dispatch(
                      getLeaderboard(
                        {
                          type:
                            select === "Nasional"
                              ? "national"
                              : select === "Kota"
                              ? "region"
                              : "school",
                          page: page + 1,
                          limit: 20,
                        },
                        temp
                      )
                    );
                  }
                  setPage(page + 1);
                }
              }
            }
          }}
          marginBottom={Dimensions.get("screen").height / 5}
        >
          {leaderboard.data?.rankings.map((el) => (
            <LeaderboardCard data={el} key={el.position} />
          ))}
          {loading && (
            <View padding={5}>
              <ActivityIndicator color={Colors.orangeColor} size={30} />
            </View>
          )}
        </ScrollView>
      </View>
      <TouchableOpacity
        style={{ position: "absolute", bottom: 0.0, left: 0.0, right: 0.0 }}
        onPress={() => {
          console.log("mantap");
          navigation.navigate("MyPosition", { select });
        }}
      >
        <View bg={"error.400"} paddingTop={5} paddingBottom={10} paddingX={5}>
          <HStack alignItems={"center"} marginBottom={50}>
            <Text
              color={"white"}
              marginRight={Dimensions.get("screen").width / 13}
              bold
            >
              {leaderboard.data?.my_position !== 0
                ? leaderboard.data?.my_position
                : "N/A"}
            </Text>
            <Image
              marginRight={Dimensions.get("screen").width / 15}
              size={50}
              borderRadius={100}
              source={{
                uri: "https://corbetonreadymix.com/wp-content/uploads/2021/09/2-1.jpg",
              }}
              alt="Alternate Text"
            />
            <Box
              marginRight={"auto"}
              maxWidth={Dimensions.get("screen").width / 3}
            >
              <Text color={"white"}>{profile.full_name}</Text>
            </Box>

            <Text color={"white"} bold>
              {leaderboard.data?.my_point !== 0
                ? leaderboard.data?.my_point
                : "N/A"}
            </Text>
          </HStack>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default LeaderboardContent;
