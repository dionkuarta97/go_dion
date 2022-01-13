import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import CountDown from "react-native-countdown-component";
import { useDispatch, useSelector } from "react-redux";
import DefaultPrimaryButton from "../../../Components/Button/DefaultPrimaryButton";
import RoundedButton from "../../../Components/Button/RoundedButton";
import * as Progress from "react-native-progress";
import {
  saveAnswer,
  setFinalAnswer,
  setNumber,
  setSaveAnswer,
} from "../../../Redux/Soal/soalActions";
import Fonts from "../../../Theme/Fonts";
import Sizes from "../../../Theme/Sizes";
import ModalStatusSoal from "./ModalStatusSoal";
import NavigasiSoal from "./NavigasiSoal";
import PertanyaanPBK from "./Pertanyaan/PertanyaanPBK";
import PertanyaanPBS from "./Pertanyaan/PertanyaanPBS";
import PertanyaanPBT from "./Pertanyaan/PertanyaanPBT";
import TimerSoal from "./TimerSoal";
import Colors from "../../../Theme/Colors";

const SoalContent = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const number = useSelector((state) => state.soalReducer.currentNumber);
  const quizId = useSelector((state) => state.soalReducer.soal.data._id);

  const sessions = useSelector((state) => state.soalReducer.soal.data.sessions);

  const save = useSelector((state) => state.soalReducer.saveAnswer);

  const [delay, setDelay] = useState(false);
  const [finish, setFinish] = useState(false);

  const [answers, setAnswers] = useState([]);

  const [sessionIndex, setSessionIndex] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(sessions.length);
  const [sessionConfig, setsessionConfig] = useState(
    sessions[sessionIndex].session_configs
  );
  const [sessionDuration, setSessionDuration] = useState(
    sessionConfig.session_duration
  );
  const [sessionWaitingDuration, setsessionWaitingDuration] = useState(
    sessionConfig.waiting_duration
  );
  // const [sessionDuration, setSessionDuration] = useState(10);
  const [questions, setQuestions] = useState(sessions[sessionIndex].questions);

  const [visibleStatusModal, setVisibleStatusModal] = useState(false);

  const [delayTime, setDelayTime] = useState(0);

  useEffect(() => {
    // dispatch(setSaveAnswer({ loading: false, error: null, data: null }));
    dispatch(setFinalAnswer([]));
    dispatch(setNumber(1));
  }, []);

  console.log(questions[number - 1].tipe, "tipe");
  console.log(sessions[sessionIndex].questions, "soal");
  const headerComponent = () => {
    return (
      <View style={{ padding: Sizes.fixPadding * 2 }}>
        <Text style={{ color: Colors.ligthGreyColor }}>
          Sesi {sessionIndex + 1}/{sessionTotal}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ ...Fonts.black17Bold, flex: 1 }}>{props.title}</Text>
          <View>
            {!delay ? (
              <CountDown
                key={"Count 1"}
                until={sessionDuration}
                digitStyle={{
                  backgroundColor: "transparent",
                }}
                showSeparator={true}
                onFinish={() => {
                  var status = "not_done";
                  if (answers.length === questions.length) {
                    status = "done";
                  }
                  if (sessionIndex + 1 !== sessionTotal) {
                    setDelay(true);
                    setDelayTime(0);
                    dispatch(setNumber(1));
                    const sesIndex = sessionIndex + 1;
                    setSessionIndex(sesIndex);
                    setQuestions(sessions[sesIndex].questions);
                    dispatch(setFinalAnswer(answers));
                    setAnswers([]);
                  } else {
                    setFinish(true);
                    dispatch(setFinalAnswer(answers));
                    dispatch(saveAnswer(status));
                  }
                }}
                size={14}
                timeToShow={["M", "S"]}
                timeLabels={{ m: null, s: null }}
                style={{ ...Fonts.blackRegular }}
                onChange={(t) => {}}
                running={!finish && !delay}
              />
            ) : (
              <CountDown
                key={"Count 2"}
                until={sessionWaitingDuration}
                digitStyle={{
                  backgroundColor: "transparent",
                }}
                showSeparator={true}
                onFinish={() => {
                  setDelay(false);
                  setDelayTime(0);
                }}
                size={14}
                timeToShow={["M", "S"]}
                timeLabels={{ m: null, s: null }}
                style={{ ...Fonts.blackRegular }}
                onChange={(t) => {
                  setDelayTime(t);
                }}
                running={true}
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

        <Progress.Bar
          progress={1 - delayTime / sessionWaitingDuration}
          width={200}
          color={Colors.primaryColor}
        />
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
            Jawaban Kamu Berhasil Dikirim
          </Text>
          <Text style={{ color: "grey", textAlign: "center" }}>
            Kamu bisa cek skor kamu dengan klik tombol dibawah ini.
          </Text>
        </View>
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
                navigation.navigate("ScoreScreen", {
                  idMateri: quizId,
                });
              }}
            />
          </View>
        </View>
      </View>
    );
  };

  const questionTypeComponent = () => {
    function onSelectAnswer(answer) {
      let currentAnswer = answers;
      const tes = {
        duration: 6,
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
      {!finish && headerComponent()}
      {finish && save.loading && loadingSendComponent()}
      {finish && save.data !== null && finishComponent()}
      {delay && sessionWaitComponent()}
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
            itemLength={questions.length}
            currentIndex={number - 1}
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
