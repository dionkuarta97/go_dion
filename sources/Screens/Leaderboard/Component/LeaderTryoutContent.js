import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGoTryout } from "../../../Redux/Tryout/tryoutActions";
import { Box, HStack, ScrollView, Text, View } from "native-base";
import { TouchableHighlight, ActivityIndicator } from "react-native";
import NoData from "../../../Components/NoData";
import Colors from "../../../Theme/Colors";
import { useNavigation } from "@react-navigation/native";
import { setTryoutLeader } from "../../../Redux/Leaderboard/leaderboardAction";

const LeaderTryoutContent = () => {
  const { tryoutData } = useSelector((state) => state.tryoutReducer);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    dispatch(getGoTryout("done"));
  }, []);

  return (
    <>
      <View paddingX={5} paddingTop={5}>
        <Text bold>Daftar tryout yang sudah kamu kerjakan</Text>
      </View>
      <View
        flex={1}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        {tryoutData.loading ? (
          <ActivityIndicator color={Colors.primaryColor} size={50} />
        ) : (
          tryoutData.data === null && (
            <NoData msg="Belum ada tryout yang selesai kamu kerjakan" />
          )
        )}
      </View>

      <ScrollView flex={1} paddingX={5} paddingY={5}>
        {tryoutData.data?.map((el, idx) => (
          <TouchableHighlight
            key={idx}
            style={{
              borderRadius: 10,
              marginTop: 10,
            }}
            onPress={() => {
              dispatch(
                setTryoutLeader({ data: null, loading: true, error: null })
              );
              navigation.navigate("TryoutLeaderScreen", {
                id: el._id,
                tahun: el.details.tahun_ajaran,
                title: el.title,
              });
            }}
          >
            <Box bg={"white"} padding={5} rounded={10} shadow={1}>
              <HStack>
                <Text marginRight={"auto"}>{el.title}</Text>
                <Text>{el.details.tahun_ajaran}</Text>
              </HStack>
            </Box>
          </TouchableHighlight>
        ))}
      </ScrollView>
    </>
  );
};

export default LeaderTryoutContent;
