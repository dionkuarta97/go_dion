import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import CountDown from "react-native-countdown-component";
import { useDispatch, useSelector } from "react-redux";
import DefaultPrimaryButton from "../../../Components/Button/DefaultPrimaryButton";
import RoundedButton from "../../../Components/Button/RoundedButton";
import * as Progress from "react-native-progress";
import {
  saveAnswer,
  setFinalAnswer,
  setNumber,
  setSaveScore,
} from "../../../Redux/Soal/soalActions";
import Fonts from "../../../Theme/Fonts";
import Sizes from "../../../Theme/Sizes";
import ModalStatusSoal from "./ModalStatusSoal";
import NavigasiSoal from "./NavigasiSoal";
import PertanyaanPBK from "./Pertanyaan/PertanyaanPBK";
import PertanyaanPBS from "./Pertanyaan/PertanyaanPBS";
import PertanyaanPBT from "./Pertanyaan/PertanyaanPBT";
import Colors from "../../../Theme/Colors";

const SoalContent = (props) => {
  const { blockTime } = props;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const number = useSelector((state) => state.soalReducer.currentNumber);
  const related_to = useSelector(
    (state) => state.soalReducer.soal.data.related_to
  );

  const sessions = useSelector((state) => state.soalReducer.soal.data.sessions);
  const type = useSelector(
    (state) => state.soalReducer.soal.data.related_to.key
  );
  const save = useSelector((state) => state.soalReducer.saveAnswer);
  const { saveScore } = useSelector((state) => state.soalReducer);

  const [delay, setDelay] = useState(false);
  const [finish, setFinish] = useState(false);

  const [answers, setAnswers] = useState([]);

  const [sessionIndex, setSessionIndex] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(sessions.length);
  const [sessionConfig, setsessionConfig] = useState(
    sessions[sessionIndex].session_configs
  );
  const [sessionTitle, setSessionTitle] = useState(
    sessions[sessionIndex].title
  );
  const [sessionDuration, setSessionDuration] = useState(
    sessionConfig.session_duration
  );
  const [sessionWaitingDuration, setsessionWaitingDuration] = useState(
    sessionConfig.waiting_duration
  );
  const [questions, setQuestions] = useState(sessions[sessionIndex].questions);

  const [visibleStatusModal, setVisibleStatusModal] = useState(false);

  const [currentAnswer, setCurrentAnswer] = useState({
    duration: 6,
    user_answer: -1,
  });

  const [duration, setDuration] = useState(0);

  const [delayTime, setDelayTime] = useState(0);
  const [bukaSoal, setBukaSoal] = useState();
  const [notAnswer, setNotAnswer] = useState(true);

  useEffect(() => {
    dispatch(setFinalAnswer([]));
    dispatch(setNumber(1));
    dispatch(
      setSaveScore({
        rawData: [],
        answers: [],
        status: null,
      })
    );
  }, []);

  useEffect(() => {
    if (answers[number - 1] === undefined) {
      setBukaSoal(duration);
    } else {
      setBukaSoal(duration + answers[number - 1].duration);
    }

    if (notAnswer) {
      setAnswers([
        ...answers,
        {
          duration: -1,
          user_answer: [-1],
        },
      ]);
    } else {
      setNotAnswer(true);
    }
  }, [number]);

  const headerComponent = () => {
    return (
      <View style={{ padding: Sizes.fixPadding * 2 }}>
        <Text style={{ ...Fonts.black17Bold }}>{sessionTitle}</Text>
        <Text style={{ color: Colors.ligthGreyColor }}>
          Sesi {sessionIndex + 1}/{sessionTotal}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ ...Fonts.black17Bold, flex: 1 }}>{props.title}</Text>
          <View>
            {!delay && (
              <CountDown
                key={"Count 1"}
                until={sessionDuration}
                digitStyle={{
                  backgroundColor: "transparent",
                }}
                showSeparator={true}
                onFinish={() => {
                  setDelay(true);
                  var status = "not_done";
                  if (answers.length === questions.length) {
                    status = "done";
                    if (sessionIndex + 1 !== sessionTotal) {
                      dispatch(
                        setSaveScore({
                          answers: [...saveScore.answers, answers],
                          rawData: [
                            ...saveScore.rawData,
                            {
                              questions: sessions[sessionIndex].questions,
                              session_configs:
                                sessions[sessionIndex].session_configs,
                              total: sessions[sessionIndex].total,
                            },
                          ],
                          status: status,
                        })
                      );
                      dispatch(setNumber(1));
                      const sesIndex = sessionIndex + 1;
                      setSessionIndex(sesIndex);
                      setQuestions(sessions[sesIndex].questions);
                      setSessionTitle(sessions[sesIndex].title);
                      setAnswers([]);
                      console.log(saveScore, "<<save score");
                    } else {
                      dispatch(
                        setSaveScore({
                          answers: [...saveScore.answers, answers],
                          rawData: [
                            ...saveScore.rawData,
                            {
                              questions: sessions[sessionIndex].questions,
                              session_configs:
                                sessions[sessionIndex].session_configs,
                              total: sessions[sessionIndex].total,
                            },
                          ],
                          status: status,
                        })
                      );
                      setFinish(true);
                      dispatch(saveAnswer());
                    }
                  } else {
                    let jawabanKosong = answers;
                    for (let i = answers.length; i < questions.length; i++) {
                      jawabanKosong.push({
                        duration: -1,
                        user_answer: [-1],
                      });
                    }
                    if (sessionIndex + 1 !== sessionTotal) {
                      dispatch(
                        setSaveScore({
                          answers: [...saveScore.answers, jawabanKosong],
                          rawData: [
                            ...saveScore.rawData,
                            {
                              questions: sessions[sessionIndex].questions,
                              session_configs:
                                sessions[sessionIndex].session_configs,
                              total: sessions[sessionIndex].total,
                            },
                          ],
                          status: status,
                        })
                      );
                      dispatch(setNumber(1));
                      const sesIndex = sessionIndex + 1;
                      setSessionIndex(sesIndex);
                      setQuestions(sessions[sesIndex].questions);
                      setSessionTitle(sessions[sesIndex].title);
                      setAnswers([]);
                      console.log(
                        JSON.stringify(jawabanKosong),
                        "<<save score"
                      );
                      console.log(jawabanKosong.length, "jawaban kosong");
                    } else {
                      dispatch(
                        setSaveScore({
                          answers: [...saveScore.answers, answers],
                          rawData: [
                            ...saveScore.rawData,
                            {
                              questions: sessions[sessionIndex].questions,
                              session_configs:
                                sessions[sessionIndex].session_configs,
                              total: sessions[sessionIndex].total,
                            },
                          ],
                          status: status,
                        })
                      );
                      setFinish(true);
                      dispatch(saveAnswer());
                    }
                  }

                  setTimeout(() => {
                    setDelay(false);
                  }, 5000);
                }}
                size={14}
                timeToShow={["M", "S"]}
                timeLabels={{ m: null, s: null }}
                style={{ ...Fonts.blackRegular }}
                onChange={(t) => {
                  setDuration(t);
                }}
                running={!finish && !delay}
              />
            )}
          </View>
        </View>
      </View>
    );
  };

  const sessionWaitComponent = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          style={{ height: 200 }}
          resizeMode="contain"
          source={require("../../../../assets/Images/soal/sesidone.png")}
        />
        <Text style={{ marginTop: 30, fontWeight: "bold" }}>Sesi Berakhir</Text>
        <Text style={{ color: "grey" }}>
          Sabar ya, sesi selanjutnya sedang dipersiapkan
        </Text>

        <View
          style={{
            marginTop: 10,
          }}
        >
          <ActivityIndicator color={Colors.primaryColor} size={50} />
        </View>
      </View>
    );
  };

  const loadingSendComponent = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          style={{ height: 200 }}
          resizeMode="contain"
          source={require("../../../../assets/Images/soal/onsend.png")}
        />
        <Text style={{ marginTop: 30, fontWeight: "bold" }}>
          Jawaban sedang dikirim,
        </Text>
        <Text style={{ color: "grey", textAlign: "center" }}>
          Tunggu sebentar ya, hasil pengiriman akan segera muncul
        </Text>
        <View
          style={{
            marginTop: 10,
          }}
        >
          <ActivityIndicator color={Colors.primaryColor} size={50} />
        </View>
      </View>
    );
  };

  const finishComponent = () => {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 20,
          }}
        >
          <Image
            style={{ height: 200 }}
            resizeMode="contain"
            source={require("../../../../assets/Images/soal/ondone.png")}
          />
          <Text style={{ marginTop: 30, fontWeight: "bold" }}>
            {finish && save.loading
              ? "Jawaban sedang dikirim"
              : "Jawaban Kamu Berhasil Dikirim"}
          </Text>
          <Text style={{ color: "grey", textAlign: "center" }}>
            {finish && save.loading
              ? "Tunggu sebentar ya, hasil pengiriman akan segera muncul"
              : "Kamu bisa cek skor kamu dengan klik tombol dibawah ini."}
          </Text>
          {finish && save.loading && (
            <View
              style={{
                marginTop: 10,
              }}
            >
              <ActivityIndicator color={Colors.primaryColor} size={50} />
            </View>
          )}
        </View>

        {finish && !save.loading && (
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "white",
              paddingHorizontal: 25,
              paddingVertical: 25,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              elevation: 30,
            }}
          >
            <View style={{ flex: 1 }}>
              <DefaultPrimaryButton
                text="Cek Skor Kamu"
                onPress={() => {
                  navigation.popToTop();
                  if (type !== "tryout") {
                    navigation.navigate("ScoreScreen", {
                      related_to: {
                        product_type: related_to.key,
                        product_id: related_to.key_id,
                        quiz_id: related_to.bab_id,
                      },
                    });
                  } else {
                    navigation.navigate("TryoutScoreScreen", {
                      fromSoal: true,
                      related_to: {
                        product_type: related_to.key,
                        product_id: related_to.key_id,
                        quiz_id: related_to.bab_id,
                      },
                    });
                  }
                }}
              />
            </View>
          </View>
        )}
      </View>
    );
  };

  const questionTypeComponent = () => {
    function onSelectAnswer(answer) {
      let currentAnswer = answers;
      const tes = {
        duration:
          bukaSoal === 0 ? sessionDuration - duration : bukaSoal - duration,
        user_answer: answer,
      };
      currentAnswer[number - 1] = tes;
      setAnswers(currentAnswer);
      console.log("-----> Current Answer");
      console.log(currentAnswer);
    }

    switch (questions[number - 1].tipe) {
      case "PBS":
        return (
          <PertanyaanPBS
            question={questions[number - 1]}
            answer={
              answers[number - 1] !== undefined
                ? answers[number - 1].user_answer[0]
                : null
            }
            onSelect={(answer) => {
              onSelectAnswer(answer);
              setNotAnswer(false);
              console.log(answers);
            }}
          />
        );
      case "PBK":
        return (
          <PertanyaanPBK
            question={questions[number - 1]}
            answer={
              answers[number - 1] !== undefined
                ? answers[number - 1].user_answer
                : null
            }
            onSelect={(answer) => {
              onSelectAnswer(answer);
              // console.log(answers);
            }}
          />
        );
      case "PBT":
        return (
          <PertanyaanPBT
            question={questions[number - 1]}
            answer={
              answers[number - 1] !== undefined
                ? answers[number - 1].user_answer
                : null
            }
            onSelect={(answer) => {
              onSelectAnswer(answer);
              console.log(answers);
            }}
          />
        );
      default:
        return;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {!finish && !delay && headerComponent()}
      {finish && finishComponent()}
      {delay && !finish && sessionWaitComponent()}
      {!delay && !finish && (
        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              paddingHorizontal: Sizes.fixPadding * 2,
              marginTop: Sizes.fixPadding,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: Sizes.fixPadding,
              }}
            >
              <Text style={{ flex: 1, color: "black" }}>
                Soal {number}/{questions.length}
              </Text>

              <RoundedButton
                title="Lihat Status"
                onPress={() => setVisibleStatusModal(true)}
              />
            </View>

            <ScrollView style={{ flex: 1 }}>
              {questionTypeComponent()}
            </ScrollView>
          </View>
          <NavigasiSoal
            blockTime={blockTime}
            itemLength={questions.length}
            currentIndex={number - 1}
            sesi={sessionIndex}
            totalSesi={sessionTotal}
            type={type}
            onSesiEnd={() => {
              setDelay(true);
              var status = "not_done";
              if (answers.length === questions.length) {
                status = "done";
                if (sessionIndex + 1 !== sessionTotal) {
                  dispatch(
                    setSaveScore({
                      answers: [...saveScore.answers, answers],
                      rawData: [
                        ...saveScore.rawData,
                        {
                          questions: sessions[sessionIndex].questions,
                          session_configs:
                            sessions[sessionIndex].session_configs,
                          total: sessions[sessionIndex].total,
                        },
                      ],
                      status: status,
                    })
                  );
                  dispatch(setNumber(1));
                  const sesIndex = sessionIndex + 1;
                  setSessionIndex(sesIndex);
                  setQuestions(sessions[sesIndex].questions);
                  setSessionTitle(sessions[sesIndex].title);
                  setAnswers([]);
                  console.log(saveScore, "<<save score");
                } else {
                  dispatch(
                    setSaveScore({
                      answers: [...saveScore.answers, answers],
                      rawData: [
                        ...saveScore.rawData,
                        {
                          questions: sessions[sessionIndex].questions,
                          session_configs:
                            sessions[sessionIndex].session_configs,
                          total: sessions[sessionIndex].total,
                        },
                      ],
                      status: status,
                    })
                  );
                  setFinish(true);
                  dispatch(saveAnswer());
                }
              } else {
                let jawabanKosong = answers;
                for (let i = answers.length; i < questions.length; i++) {
                  jawabanKosong.push({
                    duration: -1,
                    user_answer: [-1],
                  });
                }
                if (sessionIndex + 1 !== sessionTotal) {
                  dispatch(
                    setSaveScore({
                      answers: [...saveScore.answers, jawabanKosong],
                      rawData: [
                        ...saveScore.rawData,
                        {
                          questions: sessions[sessionIndex].questions,
                          session_configs:
                            sessions[sessionIndex].session_configs,
                          total: sessions[sessionIndex].total,
                        },
                      ],
                      status: status,
                    })
                  );
                  dispatch(setNumber(1));
                  const sesIndex = sessionIndex + 1;
                  setSessionIndex(sesIndex);
                  setQuestions(sessions[sesIndex].questions);
                  setSessionTitle(sessions[sesIndex].title);
                  setAnswers([]);
                  console.log(JSON.stringify(jawabanKosong), "<<save score");
                  console.log(jawabanKosong.length, "jawaban kosong");
                } else {
                  dispatch(
                    setSaveScore({
                      answers: [...saveScore.answers, answers],
                      rawData: [
                        ...saveScore.rawData,
                        {
                          questions: sessions[sessionIndex].questions,
                          session_configs:
                            sessions[sessionIndex].session_configs,
                          total: sessions[sessionIndex].total,
                        },
                      ],
                      status: status,
                    })
                  );
                  setFinish(true);
                  dispatch(saveAnswer());
                }
              }

              setTimeout(() => {
                setDelay(false);
              }, 5000);
            }}
            onChange={(index) => dispatch(setNumber(index + 1))}
            onFinish={() => console.log("Selesai")}
          />
        </View>
      )}
      {visibleStatusModal && (
        <ModalStatusSoal
          questions={questions}
          answers={answers}
          number={number - 1}
          onSelect={(index) => {
            setVisibleStatusModal(false);
            dispatch(setNumber(index + 1));
          }}
          onClose={() => {
            setVisibleStatusModal(false);
            console.log("tes modal");
          }}
        />
      )}
    </View>
  );
};

export default SoalContent;
