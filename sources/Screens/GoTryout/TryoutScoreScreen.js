import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ActionButtonHome from "../../Components/ActionButton/ActionButtonHome";

import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import DefaultPrimaryButton from "../../Components/Button/DefaultPrimaryButton";
import ExpandableTile from "../../Components/Tile/ExpendableTile";
import { getScore } from "../../Redux/Score/scoreActions";
import Colors from "../../Theme/Colors";
import Fonts from "../../Theme/Fonts";
import TryoutScoreContent from "./Component/TryoutScoreContent";

const TryoutScoreScreen = (props) => {
  const dispatch = useDispatch();
  const { scores, related_to, fromSoal } = props.route.params;

  const score = useSelector((state) => state.scoreReducer.score);
  console.log(JSON.stringify(score, null, 2));
  useEffect(() => {
    if (scores) {
      dispatch(getScore(related_to));
    }
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DefaultAppBar
        title="Score Tryout"
        backEnabled={fromSoal ? false : true}
        rightItem={fromSoal && <ActionButtonHome />}
      />
      {scores ? (
        <>
          <View
            style={{
              height: Dimensions.get("screen").height / 6,
              backgroundColor: Colors.whiteColor,
              borderWidth: 2,
              borderTopColor: Colors.whiteColor,
              borderColor: Colors.ligthGreyColor,
              borderBottomEndRadius: 25,
              borderBottomStartRadius: 25,
              padding: 40,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  ...Fonts.black20Bold,
                  width: Dimensions.get("screen").width / 2,
                }}
              >
                Total Session
              </Text>

              <Text
                style={{
                  ...Fonts.black20Bold,
                  marginRight: Dimensions.get("screen").width / 8,
                }}
              >
                :
              </Text>
              <Text
                style={{
                  ...Fonts.black20Bold,
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
                  ...Fonts.black20Bold,
                  width: Dimensions.get("screen").width / 2,
                }}
              >
                Total Session Score
              </Text>

              <Text
                style={{
                  ...Fonts.black20Bold,
                  marginRight: Dimensions.get("screen").width / 8,
                }}
              >
                :
              </Text>
              <Text
                style={{
                  ...Fonts.black20Bold,
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
                  ...Fonts.black20Bold,
                  width: Dimensions.get("screen").width / 2,
                }}
              >
                Average Score
              </Text>

              <Text
                style={{
                  ...Fonts.black20Bold,
                  marginRight: Dimensions.get("screen").width / 8,
                }}
              >
                :
              </Text>
              <Text
                style={{
                  ...Fonts.black20Bold,
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
                        <Text style={{ ...Fonts.black20Bold, marginBottom: 5 }}>
                          Session {idx + 1}
                        </Text>
                        <Text style={{ color: "grey" }}>Total Score</Text>
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
                    Score Anda masih di proses
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
                  <View
                    style={{
                      height: Dimensions.get("screen").height / 6,
                      backgroundColor: Colors.whiteColor,
                      borderWidth: 2,
                      borderTopColor: Colors.whiteColor,
                      borderColor: Colors.ligthGreyColor,
                      borderBottomEndRadius: 25,
                      borderBottomStartRadius: 25,
                      padding: 40,
                      overflow: "hidden",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                      }}
                    >
                      <Text
                        style={{
                          ...Fonts.black20Bold,
                          width: Dimensions.get("screen").width / 2,
                        }}
                      >
                        Total Session
                      </Text>

                      <Text
                        style={{
                          ...Fonts.black20Bold,
                          marginRight: Dimensions.get("screen").width / 8,
                        }}
                      >
                        :
                      </Text>
                      <Text
                        style={{
                          ...Fonts.black20Bold,
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
                          ...Fonts.black20Bold,
                          width: Dimensions.get("screen").width / 2,
                        }}
                      >
                        Total Session Score
                      </Text>

                      <Text
                        style={{
                          ...Fonts.black20Bold,
                          marginRight: Dimensions.get("screen").width / 8,
                        }}
                      >
                        :
                      </Text>
                      <Text
                        style={{
                          ...Fonts.black20Bold,
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
                          ...Fonts.black20Bold,
                          width: Dimensions.get("screen").width / 2,
                        }}
                      >
                        Average Score
                      </Text>

                      <Text
                        style={{
                          ...Fonts.black20Bold,
                          marginRight: Dimensions.get("screen").width / 8,
                        }}
                      >
                        :
                      </Text>
                      <Text
                        style={{
                          ...Fonts.black20Bold,
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
                                    ...Fonts.black20Bold,
                                    marginBottom: 5,
                                  }}
                                >
                                  Session {idx + 1}
                                </Text>
                                <Text style={{ color: "grey" }}>
                                  Total Score
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
