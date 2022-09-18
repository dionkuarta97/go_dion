import {
  HStack,
  Text,
  Button,
  View,
  ScrollView,
  Box,
  Image,
  Center,
} from "native-base";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPositionTryout } from "../../../Redux/Leaderboard/leaderboardAction";
import LeaderboardCard from "./LeaderboardCard";
import { Dimensions, ActivityIndicator } from "react-native";
import Colors from "../../../Theme/Colors";
import { useNavigation } from "@react-navigation/native";
import NoData from "../../../Components/NoData";
const PositionTryoutContent = (props) => {
  const temp = props.select;
  const { id, tahun } = props;
  const dispatch = useDispatch();
  const { leaderboard, positionTryout } = useSelector(
    (state) => state.leaderboardReducer
  );
  const navigation = useNavigation();
  const [select, setSelect] = useState(temp);
  const [page, setPage] = useState(1);
  useEffect(() => {
    setPage(1);
    dispatch(
      getPositionTryout(
        select === "Nasional"
          ? "national"
          : select === "Kota"
          ? "region"
          : "school",
        { id, tahun }
      )
    );
  }, [select]);

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
        </HStack>
        {positionTryout.loading && (
          <View padding={5}>
            <ActivityIndicator color={Colors.orangeColor} size={30} />
          </View>
        )}
        {positionTryout.data?.rankings.length === 0 && (
          <Center>
            <View>
              <NoData msg="Belum Ada Data" img="noimage" />
            </View>
          </Center>
        )}
        <ScrollView marginBottom={Dimensions.get("screen").height / 30}>
          {positionTryout.data?.rankings.map((el) => (
            <LeaderboardCard
              from={true}
              data={el}
              key={el.position}
              position={positionTryout.data?.my_position}
            />
          ))}
        </ScrollView>
      </View>
    </>
  );
};

export default PositionTryoutContent;
