import { useNavigation } from "@react-navigation/native";
import { useToast } from "native-base";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ActionButtonHome from "../../Components/ActionButton/ActionButtonHome";

import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import DefaultPrimaryButton from "../../Components/Button/DefaultPrimaryButton";
import ExpandableTile from "../../Components/Tile/ExpendableTile";
import ToastErrorContent from "../../Components/ToastErrorContent";
import { getScore, setScore } from "../../Redux/Score/scoreActions";
import checkInternet from "../../Services/CheckInternet";
import Colors from "../../Theme/Colors";
import Fonts from "../../Theme/Fonts";
import TryoutScoreContent from "./Component/TryoutScoreContent";

const TryoutScoreScreen = (props) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigation = useNavigation();
  const { scores, related_to, fromSoal } = props.route.params;

  const score = useSelector((state) => state.scoreReducer.score);
  console.log(JSON.stringify(score, null, 2));
  useEffect(() => {
    if (scores) {
      checkInternet().then((data) => {
        if (data) {
          dispatch(getScore(related_to));
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
                    if (fromSoal) {
                      navigation.popToTop();
                      navigation.navigate("MainScreen");
                    } else {
                      navigation.goBack();
                    }
                  }}
                />
              );
            },
          });
        }
      });
    }
    return () => {
      dispatch(setScore({ loading: false, error: null, data: null }));
    };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DefaultAppBar
        title="Nilai Tryout"
        backEnabled={fromSoal ? false : true}
        rightItem={
          fromSoal && (
            <ActionButtonHome
              onPress={() => navigation.navigate("MainScreen")}
            />
          )
        }
      />
      {scores ? (
        <>
          <View style={style.score}>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  ...Fonts.black19Regular,
                  width: Dimensions.get("screen").width / 2,
                }}
              >
                Total Sesi
              </Text>

              <Text
                style={{
                  ...Fonts.black19Regular,
                  marginRight: Dimensions.get("screen").width / 8,
                }}
              >
                :
              </Text>
              <Text
                style={{
                  ...Fonts.black19Regular,
                }}
              >
                {scores.total_session}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  ...Fonts.black19Regular,
                  width: Dimensions.get("screen").width / 2,
                }}
              >
                Total Nilai Sesi
              </Text>

              <Text
                style={{
                  ...Fonts.black19Regular,
                  marginRight: Dimensions.get("screen").width / 8,
                }}
              >
                :
              </Text>
              <Text
                style={{
                  ...Fonts.black19Regular,
                }}
              >
                {scores.total_session_final_score}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  ...Fonts.black19Regular,
                  width: Dimensions.get("screen").width / 2,
                }}
              >
                Rata-Rata Nilai
              </Text>

              <Text
                style={{
                  ...Fonts.black19Regular,
                  marginRight: Dimensions.get("screen").width / 8,
                }}
              >
                :
              </Text>
              <Text
                style={{
                  ...Fonts.black19Regular,
                }}
              >
                {scores.total_session_score.toFixed(2)}
              </Text>
            </View>
          </View>
          <ScrollView
            style={{
              marginTop: 20,
              paddingHorizontal: 20,
              paddingBottom: 100,
            }}
          >
            {scores.scores.map((el, idx) => (
              <View
                key={"mantap" + idx}
                style={{
                  elevation: 2,
                  paddingTop: 20,
                  borderRadius: 10,
                  backgroundColor: "white",
                  borderWidth: 1,
                  marginBottom: 10,
                  borderColor: Colors.ligthGreyColor,
                }}
              >
                <ExpandableTile
                  onIcon={true}
                  header={
                    <>
                      <View style={{ alignItems: "center", marginBottom: 5 }}>
                        <Text
                          style={{ ...Fonts.black19Regular, marginBottom: 5 }}
                        >
                          {el.title}
                        </Text>
                        <Text style={{ color: "grey" }}>Total Nilai</Text>
                        <Text
                          style={{
                            color: "#7DC579",
                            fontWeight: "bold",
                            fontSize: 28,
                          }}
                        >
                          {el.final_score}
                        </Text>
                      </View>
                    </>
                  }
                >
                  <View style={{ flex: 1, padding: 20 }}>
                    <TryoutScoreContent detail={el.user_statistics} />
                  </View>
                </ExpandableTile>
              </View>
            ))}
          </ScrollView>
        </>
      ) : (
        <>
          {score.loading ? (
            <View style={{ justifyContent: "center", flex: 1 }}>
              <ActivityIndicator color={Colors.orangeColor} size={30} />
            </View>
          ) : (
            <>
              {!score.data ? (
                <View
                  style={{
                    justifyContent: "center",
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      ...Fonts.black17Bold,
                      marginBottom: 10,
                    }}
                  >
                    Score kamu sedang diproses
                  </Text>
                  <View
                    style={{
                      width: Dimensions.get("screen").width / 2,
                    }}
                  >
                    <DefaultPrimaryButton
                      text="Refresh"
                      onPress={() => {
                        dispatch(getScore(related_to));
                      }}
                    />
                  </View>
                </View>
              ) : (
                <>
                  <View style={style.score}>
                    <View
                      style={{
                        flexDirection: "row",
                      }}
                    >
                      <Text
                        style={{
                          ...Fonts.black19Regular,
                          width: Dimensions.get("screen").width / 2,
                        }}
                      >
                        Total Sesi
                      </Text>

                      <Text
                        style={{
                          ...Fonts.black19Regular,
                          marginRight: Dimensions.get("screen").width / 8,
                        }}
                      >
                        :
                      </Text>
                      <Text
                        style={{
                          ...Fonts.black19Regular,
                        }}
                      >
                        {score.data?.sessions.total_session}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                      }}
                    >
                      <Text
                        style={{
                          ...Fonts.black19Regular,
                          width: Dimensions.get("screen").width / 2,
                        }}
                      >
                        Total Nilai Sesi
                      </Text>

                      <Text
                        style={{
                          ...Fonts.black19Regular,
                          marginRight: Dimensions.get("screen").width / 8,
                        }}
                      >
                        :
                      </Text>
                      <Text
                        style={{
                          ...Fonts.black19Regular,
                        }}
                      >
                        {score.data?.sessions.total_session_final_score}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                      }}
                    >
                      <Text
                        style={{
                          ...Fonts.black19Regular,
                          width: Dimensions.get("screen").width / 2,
                        }}
                      >
                        Rata-Rata Nilai
                      </Text>

                      <Text
                        style={{
                          ...Fonts.black19Regular,
                          marginRight: Dimensions.get("screen").width / 8,
                        }}
                      >
                        :
                      </Text>
                      <Text
                        style={{
                          ...Fonts.black19Regular,
                        }}
                      >
                        {score.data?.sessions.total_session_score.toFixed(2)}
                      </Text>
                    </View>
                  </View>
                  <ScrollView
                    style={{
                      marginTop: 20,
                      paddingHorizontal: 20,
                      paddingBottom: 100,
                    }}
                  >
                    {score.data?.sessions.scores.map((el, idx) => (
                      <View
                        key={"mantap" + idx}
                        style={{
                          elevation: 2,
                          paddingTop: 20,
                          borderRadius: 10,
                          backgroundColor: "white",
                          borderWidth: 1,
                          marginBottom: 10,
                          borderColor: Colors.ligthGreyColor,
                        }}
                      >
                        <ExpandableTile
                          onIcon={true}
                          header={
                            <>
                              <View
                                style={{
                                  alignItems: "center",
                                  marginBottom: 5,
                                }}
                              >
                                <Text
                                  style={{
                                    ...Fonts.black19Regular,
                                    marginBottom: 5,
                                  }}
                                >
                                  {el.title}
                                </Text>
                                <Text style={{ color: "grey" }}>
                                  Total Nilai
                                </Text>
                                <Text
                                  style={{
                                    color: "#7DC579",
                                    fontWeight: "bold",
                                    fontSize: 28,
                                  }}
                                >
                                  {el.final_score}
                                </Text>
                              </View>
                            </>
                          }
                        >
                          <View style={{ flex: 1, padding: 20 }}>
                            <TryoutScoreContent detail={el.user_statistics} />
                          </View>
                        </ExpandableTile>
                      </View>
                    ))}
                  </ScrollView>
                </>
              )}
            </>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default TryoutScoreScreen;

const style = StyleSheet.create({
  score: {
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: 40,
    paddingVertical: 20,
    overflow: "hidden",
    elevation: 4,
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
  },
});
