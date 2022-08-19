import {
  HStack,
  Text,
  Button,
  View,
  ScrollView,
  Box,
  Center,
  VStack,
  useToast,
} from "native-base";
import { Image, Animated } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLeaderboard } from "../../../Redux/Leaderboard/leaderboardAction";
import LeaderboardCard from "./LeaderboardCard";
import { Dimensions, ActivityIndicator } from "react-native";
import Colors from "../../../Theme/Colors";
import { useNavigation } from "@react-navigation/native";
import defaultImage from "../../../../assets/Images/user_profile/no-user.jpg";
import NoData from "../../../Components/NoData";
import { capitalizeFirstLetter } from "../../../Services/helper";
import TahunAjaran from "./TahunAjaran";
const DEFAULT_IMAGE = Image.resolveAssetSource(defaultImage).uri;
const LeaderboardContent = () => {
  const dispatch = useDispatch();
  const scrollY = new Animated.Value(0);
  const diffclamp = Animated.diffClamp(scrollY, 0, 500);
  const translateY = diffclamp.interpolate({
    inputRange: [0, 500],
    outputRange: [0, -500],
    extrapolate: "clamp",
  });
  const { leaderboard, loading } = useSelector(
    (state) => state.leaderboardReducer
  );
  const navigation = useNavigation();
  const [select, setSelect] = useState("Nasional");
  const [page, setPage] = useState(1);
  const { listTahunAjaran } = useSelector((state) => state.dataReducer);
  const [tahunAjaran, setTahunAjaran] = useState(listTahunAjaran.data[0].id);
  const toast = useToast();

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
        tahun: tahunAjaran,
      })
    );
  }, [select]);

  const onChange = (val) => {
    setTahunAjaran(val);
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
        tahun: val,
      })
    );
  };

  function handleInfinityScroll(e) {
    let mHeight = e.nativeEvent.layoutMeasurement.height;
    let cSize = e.nativeEvent.contentSize.height;
    let Y = e.nativeEvent.contentOffset.y;
    if (Math.ceil(mHeight + Y) >= cSize) {
      return true;
    }
    return false;
  }

  const singkatNama = (str) => {
    if (str !== undefined) {
      if (str.length > 15) {
        return str.substr(0, 15) + "...";
      }
    }

    return str;
  };

  return (
    <>
      <View
        bg={"light.200"}
        style={{
          flex: 1,
          padding: 20,
        }}
      >
        {leaderboard.data?.rankings.length === 0 && (
          <Center>
            <View marginTop={200}>
              <NoData msg="Belum Ada Data" img="noimage" />
            </View>
          </Center>
        )}
        <Animated.View
          style={{
            transform: [{ translateY: translateY }],
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 50,
            padding: 20,
            backgroundColor: "white",
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
          <HStack marginTop={6}>
            <Text bold marginRight={"auto"}>
              Tingkat {select}
            </Text>
            <Text color={"light.400"}>
              {leaderboard.data?.total_data} Result
            </Text>
          </HStack>

          <TahunAjaran
            onChange={onChange}
            tahun={listTahunAjaran.data !== null ? listTahunAjaran.data : []}
          />
        </Animated.View>
        {leaderboard.loading ? (
          <View padding={5}>
            <ActivityIndicator color={Colors.orangeColor} size={30} />
          </View>
        ) : (
          <>
            <ScrollView
              bounces={false}
              paddingTop={190}
              scrollEventThrottle={16}
              flex={1}
              onScroll={(e) => {
                if (e.nativeEvent.contentOffset.y >= 0) {
                  scrollY.setValue(e.nativeEvent.contentOffset.y);
                }

                if (
                  leaderboard.data?.total_data !==
                  leaderboard.data?.rankings.length
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
                              tahun: tahunAjaran,
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
            >
              {leaderboard.data?.rankings.map((el, idx) => (
                <LeaderboardCard
                  loading={loading}
                  idx={idx}
                  length={leaderboard.data?.rankings.length}
                  data={el}
                  key={el.position}
                />
              ))}
            </ScrollView>
          </>
        )}
      </View>

      {leaderboard.data !== null && (
        <View bg={"error.400"} paddingY={5}>
          <HStack alignItems={"center"} paddingX={5}>
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
              style={{
                marginRight: Dimensions.get("screen").width / 15,
                height: 50.0,
                width: 50.0,
                borderRadius: 100.0,
              }}
              source={{
                uri: leaderboard.data?.user.avatar
                  ? leaderboard.data?.user.avatar
                  : DEFAULT_IMAGE,
              }}
              resizeMode="contain"
            />
            <Box
              marginRight={"auto"}
              maxWidth={Dimensions.get("screen").width / 2.5}
            >
              <VStack space={2}>
                <Text color={"white"} bold>
                  {singkatNama(
                    capitalizeFirstLetter(leaderboard.data?.user.full_name)
                  )}
                </Text>
                {leaderboard.data?.my_position > 0 && (
                  <Button
                    size={"xs"}
                    bg={"white"}
                    onPress={() => {
                      if (leaderboard.data?.my_position === 0) {
                        toast.show({
                          title: "Maaf",
                          status: "warning",
                          description: "Kamu belum pernah mengerjakan soal",
                          placement: "top",
                          width: Dimensions.get("screen").width / 1.3,
                        });
                      } else {
                        navigation.navigate("MyPosition", {
                          select,
                          tahun: tahunAjaran,
                        });
                      }
                    }}
                  >
                    Lihat Posisi Saya
                  </Button>
                )}
              </VStack>
            </Box>

            <Text color={"white"} bold>
              {leaderboard.data?.my_point !== 0
                ? Number(leaderboard.data?.my_point)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                : "N/A"}
            </Text>
          </HStack>
        </View>
      )}
    </>
  );
};

export default LeaderboardContent;
