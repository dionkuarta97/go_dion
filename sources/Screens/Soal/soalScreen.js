import React, { useCallback, useEffect, useState } from "react";
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
  setJawaban,
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
import checkInternet from "../../Services/CheckInternet";
import ToastErrorContent from "../../Components/ToastErrorContent";

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
  const [finish, setFinish] = useState(false);
  const {
    jawabanNon,
    saveAnswer: save,
    jawaban,
  } = useSelector((state) => state.soalReducer);

  const [indexNow, setIndexNow] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
            temp += soal.data.sessions[key].session_configs.session_duration;
          }

          let arry = [];
          for (let i = 0; i < soal.data.sessions.length; i++) {
            arry.push([]);
            for (let j = 0; j < soal.data.sessions[i].total; j++) {
              arry[i].push({
                duration: -1,
                user_answer: [-1],
              });
            }
          }
          dispatch(setJawabanNon(arry));
          setWaktuUjian(temp);
          setLoading(false);
        } else {
          let arry = [];
          for (let i = 0; i < soal.data.sessions.length; i++) {
            arry.push([]);
            for (let j = 0; j < soal.data.sessions[i].total; j++) {
              arry[i].push({
                duration: -1,
                user_answer: [-1],
              });
            }
          }
          dispatch(setJawabanNon(arry));
          setWaktuUjian(
            soal.data.sessions[sesi].session_configs.session_duration
          );
          setLoading(false);
        }
      }
    }
  }, [soal]);

  useEffect(() => {
    if (params.blockTime) {
      if (sesi > 0) {
        setWaktuUjian(
          soal.data.sessions[sesi].session_configs.session_duration
        );
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
                    setSoal({ data: null, loading: false, error: null })
                  );
              },
            },
          ]);
        }}
      />
      {soal.loading && <LoadingIndicator />}
      {delay && !soal.loading && !finish ? (
        <DelaySoal loading={loading} delay={delay} setDelay={setDelay} />
      ) : delay && finish ? (
        <DelayFinish delay={delay} setDelay={setDelay} />
      ) : !delay && finish ? (
        <Finish related_to={soal.data?.related_to} setFinish={setFinish} />
      ) : soal.error || save.error ? (
        <ErrorScreen />
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
              setNomor={setNomor}
              setFinish={setFinish}
              setDelay={setDelay}
              setWaktuUjian={setSisaTime}
              setSesi={setSesi}
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
                blockTime={params.blockTime}
                index={nomor}
                setSesi={setSesi}
                sesi={sesi}
                setIndex={setNomor}
                total={soal.data.sessions[sesi].total}
                delay={delay}
                setDelay={setDelay}
                sisaTime={sisaTime}
                setFinish={setFinish}
                setWaktuUjian={setWaktuUjian}
                totalSesi={soal.data.sessions.length}
              />
            </Box>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default SoalScreen;

const styles = StyleSheet.create({});
