import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
   ActivityIndicator,
   Dimensions,
   Image,
   ScrollView,
   Text,
   View,
} from "react-native";
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
import { HStack, useToast, VStack } from "native-base";
import checkInternet from "../../../Services/CheckInternet";
import ToastErrorContent from "../../../Components/ToastErrorContent";

const SoalContent = (props) => {
   const { blockTime } = props;
   const toast = useToast();
   const dispatch = useDispatch();
   const navigation = useNavigation();

   const number = useSelector((state) => state.soalReducer.currentNumber);
   const related_to = useSelector(
      (state) => state.soalReducer.soal.data.related_to
   );

   const sessions = useSelector(
      (state) => state.soalReducer.soal.data.sessions
   );
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
         <HStack
            paddingX={5}
            paddingTop={4}
         >
            <VStack style={{ marginEnd: "auto" }}>
               <Text style={{ ...Fonts.black17Bold }}>{sessionTitle}</Text>
               <View
                  style={{
                     flexDirection: "row",
                     justifyContent: "center",
                     alignItems: "center",
                  }}
               >
                  <Text style={{ color: Colors.ligthGreyColor, flex: 1 }}>
                     Sesi {sessionIndex + 1}/{sessionTotal}
                  </Text>
               </View>
               <Text style={{ ...Fonts.black17Bold, marginTop: 10 }}>
                  {props.title}
               </Text>
            </VStack>
            {!delay && (
               <CountDown
                  key={"Count 1"}
                  until={60}
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
                                       title: sessionTitle,
                                       questions:
                                          sessions[sessionIndex].questions,
                                       session_configs:
                                          sessions[sessionIndex]
                                             .session_configs,
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
                        } else {
                           dispatch(
                              setSaveScore({
                                 answers: [...saveScore.answers, answers],
                                 rawData: [
                                    ...saveScore.rawData,
                                    {
                                       title: sessionTitle,
                                       questions:
                                          sessions[sessionIndex].questions,
                                       session_configs:
                                          sessions[sessionIndex]
                                             .session_configs,
                                       total: sessions[sessionIndex].total,
                                    },
                                 ],
                                 status: status,
                              })
                           );

                           checkInternet().then((data) => {
                              if (data) {
                                 setFinish(true);
                                 dispatch(saveAnswer());
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
                                                navigation.popToTop();
                                                navigation.navigate(
                                                   "MainScreen"
                                                );
                                             }}
                                          />
                                       );
                                    },
                                 });
                              }
                           });
                        }
                     } else {
                        let jawabanKosong = answers;
                        for (
                           let i = answers.length;
                           i < questions.length;
                           i++
                        ) {
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
                                       title: sessionTitle,
                                       questions:
                                          sessions[sessionIndex].questions,
                                       session_configs:
                                          sessions[sessionIndex]
                                             .session_configs,
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
                        } else {
                           dispatch(
                              setSaveScore({
                                 answers: [...saveScore.answers, answers],
                                 rawData: [
                                    ...saveScore.rawData,
                                    {
                                       title: sessionTitle,
                                       questions:
                                          sessions[sessionIndex].questions,
                                       session_configs:
                                          sessions[sessionIndex]
                                             .session_configs,
                                       total: sessions[sessionIndex].total,
                                    },
                                 ],
                                 status: status,
                              })
                           );
                           checkInternet().then((data) => {
                              if (data) {
                                 setFinish(true);
                                 dispatch(saveAnswer());
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
                                                navigation.popToTop();
                                                navigation.navigate(
                                                   "MainScreen"
                                                );
                                             }}
                                          />
                                       );
                                    },
                                 });
                              }
                           });
                        }
                     }

                     setTimeout(() => {
                        setDelay(false);
                     }, 5000);
                  }}
                  size={30}
                  timeToShow={["M", "S"]}
                  timeLabels={{ m: null, s: null }}
                  onChange={(t) => {
                     setDuration(t);
                  }}
                  running={!finish && !delay}
               />
            )}
         </HStack>
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
            <Text style={{ marginTop: 30, fontWeight: "bold" }}>
               Sesi Berakhir
            </Text>
            <Text style={{ color: "grey" }}>
               Sabar ya, sesi selanjutnya sedang dipersiapkan
            </Text>

            <View
               style={{
                  marginTop: 10,
               }}
            >
               <ActivityIndicator
                  color={Colors.primaryColor}
                  size={50}
               />
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
                  marginHorizontal: 10,
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
                     : "Klik tombol dibawah ini untuk cek skor kamu"}
               </Text>
               {finish && save.loading && (
                  <View
                     style={{
                        marginTop: 10,
                     }}
                  >
                     <ActivityIndicator
                        color={Colors.primaryColor}
                        size={50}
                     />
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
               bukaSoal === 0
                  ? sessionDuration - duration
                  : bukaSoal - duration,
            user_answer: answer,
         };
         currentAnswer[number - 1] = tes;
         setAnswers(currentAnswer);
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
                                       title: sessionTitle,
                                       questions:
                                          sessions[sessionIndex].questions,
                                       session_configs:
                                          sessions[sessionIndex]
                                             .session_configs,
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
                        } else {
                           dispatch(
                              setSaveScore({
                                 answers: [...saveScore.answers, answers],
                                 rawData: [
                                    ...saveScore.rawData,
                                    {
                                       title: sessionTitle,
                                       questions:
                                          sessions[sessionIndex].questions,
                                       session_configs:
                                          sessions[sessionIndex]
                                             .session_configs,
                                       total: sessions[sessionIndex].total,
                                    },
                                 ],
                                 status: status,
                              })
                           );
                           checkInternet().then((data) => {
                              if (data) {
                                 setFinish(true);
                                 dispatch(saveAnswer());
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
                                                navigation.popToTop();
                                                navigation.navigate(
                                                   "MainScreen"
                                                );
                                             }}
                                          />
                                       );
                                    },
                                 });
                              }
                           });
                        }
                     } else {
                        let jawabanKosong = answers;
                        for (
                           let i = answers.length;
                           i < questions.length;
                           i++
                        ) {
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
                                       title: sessionTitle,
                                       questions:
                                          sessions[sessionIndex].questions,
                                       session_configs:
                                          sessions[sessionIndex]
                                             .session_configs,
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
                        } else {
                           dispatch(
                              setSaveScore({
                                 answers: [...saveScore.answers, answers],
                                 rawData: [
                                    ...saveScore.rawData,
                                    {
                                       title: sessionTitle,
                                       questions:
                                          sessions[sessionIndex].questions,
                                       session_configs:
                                          sessions[sessionIndex]
                                             .session_configs,
                                       total: sessions[sessionIndex].total,
                                    },
                                 ],
                                 status: status,
                              })
                           );
                           checkInternet().then((data) => {
                              if (data) {
                                 setFinish(true);
                                 dispatch(saveAnswer());
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
                                                navigation.popToTop();
                                                navigation.navigate(
                                                   "MainScreen"
                                                );
                                             }}
                                          />
                                       );
                                    },
                                 });
                              }
                           });
                        }
                     }

                     setTimeout(() => {
                        setDelay(false);
                     }, 5000);
                  }}
                  onChange={(index) => dispatch(setNumber(index + 1))}
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
               }}
            />
         )}
      </View>
   );
};

export default SoalContent;
