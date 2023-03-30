import React, { useRef, useEffect, useState } from "react";
import {
   Alert,
   SafeAreaView,
   StyleSheet,
   BackHandler,
   AppState,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import LoadingIndicator from "../../Components/Indicator/LoadingIndicator";
import {
   getSoal,
   saveAnswer,
   setJawabanNon,
   setSoal,
} from "../../Redux/Soal/soalActions";
import firestore from "@react-native-firebase/firestore";
import NewSoalScreen from "./Component/NewSoalScreen";
import TombolBawah from "./Component/TombolBawah";
import { Box, useToast } from "native-base";
import DelaySoal from "./Component/DelaySoal";
import DelayFinish from "./Component/DelayFinish";
import Finish from "./Component/Finish";
import ErrorScreen from "./Component/ErrorScreen";
import OneSignal from "react-native-onesignal";
import ModalValid from "../Home/Component/ModalValid";
import { getUniqueId } from "react-native-device-info";

const SoalScreen = ({ route }) => {
   const toast = useToast();
   const params = route.params;
   const profile = useSelector((state) => state.profileReducer.profile);
   const navigation = useNavigation();
   const dispatch = useDispatch();
   const soal = useSelector((state) => state.soalReducer.soal);
   const [nomor, setNomor] = useState(0);
   const [sesi, setSesi] = useState(0);
   const [delay, setDelay] = useState(true);
   const [waktuUjian, setWaktuUjian] = useState(0);
   const [sisaTime, setSisaTime] = useState(0);
   const [playerId, setPlayerId] = useState("");
   const [finish, setFinish] = useState(false);
   const [valid, setValid] = useState(true);
   const { jawabanNon, saveAnswer: save } = useSelector(
      (state) => state.soalReducer
   );

   const scrollRef = useRef();

   const [firestoreId, setFirestoreId] = useState(null);
   const [firestoreTime, setFirestoreTime] = useState(null);

   const [loading, setLoading] = useState(true);
   const [loadingBawah, setLoadingBawah] = useState(false);
   const [loadingSoal, setLoadingSoal] = useState(false);
   const [timeOpen, setTimeOpen] = useState(null);

   useEffect(() => {
      getUniqueId().then((uniqueId) => {
         setPlayerId(uniqueId);
      });
      dispatch(getSoal());

      const backHandler = BackHandler.addEventListener(
         "hardwareBackPress",
         () => true
      );
      return () => {
         backHandler.remove();
         dispatch(setJawabanNon(null));
      };
   }, []);

   useEffect(() => {
      if (soal.data) {
         if (waktuUjian === 0) {
            if (!params.blockTime) {
               let temp = 0;
               for (const key in soal.data.sessions) {
                  temp +=
                     soal.data.sessions[key].session_configs.session_duration;
               }

               let arry = [];
               for (let i = 0; i < soal.data.sessions.length; i++) {
                  arry.push([]);
                  for (let j = 0; j < soal.data.sessions[i].total; j++) {
                     if (soal.data.sessions[i].questions[j].tipe === "PBS") {
                        arry[i].push({
                           duration: -1,
                           user_answer: [-1],
                        });
                     } else if (
                        soal.data.sessions[i].questions[j].tipe === "PBK"
                     ) {
                        let tempJawab = [];
                        for (
                           let k = 0;
                           k <
                           soal.data.sessions[i].questions[j].jawaban.length;
                           k++
                        ) {
                           tempJawab.push(-1);
                        }
                        arry[i].push({
                           duration: -1,
                           user_answer: tempJawab,
                        });
                     } else if (
                        soal.data.sessions[i].questions[j].tipe === "PBT"
                     ) {
                        let tempJawab = [];
                        for (
                           let k = 0;
                           k < soal.data.sessions[i].questions[j].table.length;
                           k++
                        ) {
                           tempJawab.push(-1);
                        }
                        arry[i].push({
                           duration: -1,
                           user_answer: tempJawab,
                        });
                     }
                  }
               }

               dispatch(setJawabanNon(arry));
               setWaktuUjian(temp);
               setLoading(false);
            } else {
               firestore()
                  .collection("Jawaban")
                  .where("user_id", "==", profile._id)
                  .where("soal_id", "==", soal.data._id)
                  .get()
                  .then((querySnapshot) => {
                     let arry = {};
                     let temp = [];
                     for (let i = 0; i < soal.data.sessions.length; i++) {
                        arry[`${i}`] = [];
                        temp.push([]);
                        for (let j = 0; j < soal.data.sessions[i].total; j++) {
                           if (
                              soal.data.sessions[i].questions[j].tipe === "PBS"
                           ) {
                              arry[`${i}`].push({
                                 duration: -1,
                                 user_answer: [-1],
                              });
                              temp[i].push({
                                 duration: -1,
                                 user_answer: [-1],
                              });
                           } else if (
                              soal.data.sessions[i].questions[j].tipe === "PBK"
                           ) {
                              let tempJawab = [];
                              for (
                                 let k = 0;
                                 k <
                                 soal.data.sessions[i].questions[j].jawaban
                                    .length;
                                 k++
                              ) {
                                 tempJawab.push(-1);
                              }
                              arry[`${i}`].push({
                                 duration: -1,
                                 user_answer: tempJawab,
                              });
                              temp[i].push({
                                 duration: -1,
                                 user_answer: tempJawab,
                              });
                           } else if (
                              soal.data.sessions[i].questions[j].tipe === "PBT"
                           ) {
                              let tempJawab = [];
                              for (
                                 let k = 0;
                                 k <
                                 soal.data.sessions[i].questions[j].table
                                    .length;
                                 k++
                              ) {
                                 tempJawab.push(-1);
                              }
                              arry[`${i}`].push({
                                 duration: -1,
                                 user_answer: tempJawab,
                              });
                              temp[i].push({
                                 duration: -1,
                                 user_answer: tempJawab,
                              });
                           }
                        }
                     }
                     let time = [];
                     for (const key in soal.data.sessions) {
                        time.push(
                           soal.data.sessions[key].session_configs
                              .session_duration
                        );
                     }
                     let firstOpen = [];
                     let now = new Date();
                     let jml = 0;
                     for (let i = 0; i < time.length; i++) {
                        if (i === 0) {
                           firstOpen.push(now.getTime());
                        } else {
                           jml += time[i];
                           let int = (jml + 10) * 1000;
                           firstOpen.push(now.getTime() + int);
                        }
                     }
                     let data = {
                        user_id: profile._id,
                        soal_id: soal.data._id,
                        jawaban: arry,
                        sesi: sesi,
                        time: time,
                        firstOpen: firstOpen,
                        title: params.title,
                        blockTime: params.blockTime,
                        soalUrl: params.soalUrl,
                        playerId: playerId,
                     };

                     if (querySnapshot.docs.length === 0) {
                        firestore()
                           .collection("Jawaban")
                           .add(data)
                           .then((snapshot) => {
                              data.id = snapshot.id;
                              snapshot.set(data);
                              setFirestoreId(snapshot.id);
                              dispatch(setJawabanNon(temp));
                              setWaktuUjian(time[sesi]);
                              setLoading(false);
                           })
                           .catch(() => navigation.goBack());
                     } else {
                        let jwb = querySnapshot.docs[0].data();
                        if (jwb.playerId !== playerId) {
                           setValid(false);
                           setLoading(false);
                        } else {
                           let ar = [];
                           for (const key in jwb.jawaban) {
                              ar.push(jwb.jawaban[key]);
                           }

                           setFirestoreTime(jwb.time);
                           setTimeOpen(jwb.firstOpen);
                           setFirestoreId(jwb.id);
                           dispatch(setJawabanNon(ar));
                           let now = new Date();
                           let temp =
                              (now.getTime() - jwb.firstOpen[jwb.sesi]) / 1000;
                           if (temp < jwb.time[jwb.sesi]) {
                              setSesi(jwb.sesi);
                              setWaktuUjian(jwb.time[jwb.sesi] - temp);
                           } else {
                              setSesi(jwb.sesi + 1);
                           }
                           setValid(true);
                           setLoading(false);
                        }
                     }
                  })
                  .catch((err) => {
                     navigation.goBack();
                  });
            }
         }
      }
   }, [soal]);

   useEffect(() => {
      scrollRef.current?.scrollTo({
         y: 0,
         animated: false,
      });
      if (params.blockTime) {
         if (firestoreTime) {
            if (sesi > 0 && sesi < firestoreTime.length) {
               setLoading(true);
               if (!delay) {
                  setDelay(true);
               }
               firestore()
                  .collection("Jawaban")
                  .doc(firestoreId)
                  .update({
                     sesi: sesi,
                  })
                  .then(() => {
                     let now = new Date();
                     let temp = (now.getTime() - timeOpen[sesi]) / 1000;
                     if (temp < firestoreTime[sesi]) {
                        setWaktuUjian(firestoreTime[sesi] - temp);
                     } else {
                        setSesi(sesi + 1);
                     }
                  })
                  .then(() => setLoading(false))
                  .catch(() => navigation.goBack());
            } else if (sesi === firestoreTime.length) {
               setDelay(true);
               setFinish(true);
            }
         }
      }
   }, [sesi]);

   useEffect(() => {
      if (finish) {
         if (jawabanNon) {
            let status = "done";
            for (const key in jawabanNon) {
               for (const val in jawabanNon[key]) {
                  if (jawabanNon[key][val]["user_answer"][0] === -1) {
                     status = "not_done";
                  }
               }
            }
            dispatch(
               saveAnswer({
                  related_to: soal.data?.related_to,
                  rawData: soal.data?.sessions,
                  answers: jawabanNon,
                  status,
               })
            );
         }
      }
   }, [finish]);

   useEffect(() => {
      if (save.data) {
         if (params.blockTime) {
            firestore()
               .collection("Jawaban")
               .doc(firestoreId)
               .delete()
               .then(() => {});
         }
      }
   }, [save]);

   useEffect(() => {
      scrollRef.current?.scrollTo({
         y: 0,
         animated: false,
      });
   }, [nomor]);

   return (
      <SafeAreaView style={{ flex: 1 }}>
         <DefaultAppBar
            title={"Soal " + params.title}
            backEnabled={params.blockTime || finish || delay ? false : true}
            backPressed={() => {
               Alert.alert("Peringatan", "Batal ikut kuis?", [
                  {
                     text: "Tidak",
                     onPress: () => {},
                  },
                  {
                     text: "Ya",
                     onPress: () => {
                        navigation.goBack(),
                           dispatch(
                              setSoal({
                                 data: null,
                                 loading: false,
                                 error: null,
                              })
                           );
                     },
                  },
               ]);
            }}
         />
         {!valid && <ModalValid setValid={setValid} />}
         {soal.loading && <LoadingIndicator />}
         {soal.error || save.error ? (
            <ErrorScreen />
         ) : (
            <>
               {delay && !soal.loading && !finish ? (
                  <DelaySoal
                     loading={loading}
                     delay={delay}
                     setDelay={setDelay}
                  />
               ) : delay && finish ? (
                  <DelayFinish
                     delay={delay}
                     setDelay={setDelay}
                  />
               ) : !delay && finish ? (
                  <Finish
                     related_to={soal.data?.related_to}
                     setFinish={setFinish}
                  />
               ) : (
                  <>
                     {soal.data !== null && (
                        <NewSoalScreen
                           title={params.title}
                           soal={soal}
                           sesi={sesi}
                           blockTime={params.blockTime}
                           totalSesi={soal.data.sessions.length}
                           nomor={nomor}
                           sisaTime={sisaTime}
                           waktuUjian={waktuUjian}
                           delay={delay}
                           firestoreId={firestoreId}
                           setNomor={setNomor}
                           setFinish={setFinish}
                           setDelay={setDelay}
                           setWaktuUjian={setSisaTime}
                           setSesi={setSesi}
                           loadingBawah={loadingBawah}
                           loading={loadingSoal}
                           setLoading={setLoadingSoal}
                           scrollRef={scrollRef}
                        />
                     )}

                     {soal.data !== null && !delay && (
                        <Box
                           bg={"white"}
                           padding={3}
                           shadow={2}
                           borderTopLeftRadius={5}
                           borderTopRightRadius={5}
                           borderTopWidth={1}
                           borderColor={"gray.300"}
                        >
                           <TombolBawah
                              loadingSoal={loadingSoal}
                              blockTime={params.blockTime}
                              index={nomor}
                              setSesi={setSesi}
                              sesi={sesi}
                              setIndex={setNomor}
                              total={soal.data.sessions[sesi].total}
                              ttl={
                                 sesi > 0
                                    ? soal.data.sessions[sesi - 1].total
                                    : soal.data.sessions[sesi].total
                              }
                              delay={delay}
                              setDelay={setDelay}
                              sisaTime={sisaTime}
                              setFinish={setFinish}
                              setWaktuUjian={setWaktuUjian}
                              totalSesi={soal.data.sessions.length}
                              setLoadingBawah={setLoadingBawah}
                              firestoreId={firestoreId}
                           />
                        </Box>
                     )}
                  </>
               )}
            </>
         )}
      </SafeAreaView>
   );
};

export default SoalScreen;

const styles = StyleSheet.create({});
