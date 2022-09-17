import { View, ScrollView } from "native-base";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setJawabanNon } from "../../../Redux/Soal/soalActions";
import HeaderSoal from "./HeaderSoal";
import RenderSoal from "./RenderSoal";

import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";

const NewSoalScreen = (props) => {
  const {
    soal,
    title,
    sesi,
    totalSesi,
    nomor,
    blockTime,
    waktuUjian,
    setWaktuUjian,
    setNomor,
    delay,
    sisaTime,
    setFinish,
    setDelay,
    setSesi,
    firestoreId,
    loadingBawah,
    loading,
    setLoading,
    scrollRef,
  } = props;

  const dispatch = useDispatch();
  const [sisaWaktu, setSisaWaktu] = useState(
    soal.data.sessions[sesi].session_configs.session_duration
  );

  const { jawabanNon, jawaban } = useSelector((state) => state.soalReducer);
  const navigation = useNavigation();
  const pilihJawaban = (pilih) => {
    if (!blockTime) {
      setLoading(true);
      let temp = jawabanNon;
      temp[sesi][nomor] = pilih;
      dispatch(setJawabanNon(temp));
      setLoading(false);
    } else {
      setLoading(true);
      let temp = jawabanNon;
      temp[sesi][nomor] = pilih;
      dispatch(setJawabanNon(temp));
      let newTemp = {};
      for (const key in temp) {
        newTemp[`${key}`] = temp[key];
      }
      firestore()
        .collection("Jawaban")
        .doc(firestoreId)
        .update({
          jawaban: newTemp,
        })
        .then(() => setLoading(false))
        .catch(() => navigation.goBack());
    }
  };

  return (
    <>
      {!delay && (
        <>
          <View paddingX={3}>
            <HeaderSoal
              config={soal.data.sessions[sesi].session_configs}
              mapel={soal.data.sessions[sesi].title}
              nomor={nomor}
              title={title}
              sesi={sesi}
              totalSesi={totalSesi}
              waktuUjian={waktuUjian}
              setWaktuUjian={setWaktuUjian}
              setSisaWaktu={setSisaWaktu}
              pertanyaan={soal.data.sessions[sesi].questions}
              delay={delay}
              allJawab={jawabanNon}
              setNomor={setNomor}
              sisaTime={sisaTime}
              setDelay={setDelay}
              setFinish={setFinish}
              setSesi={setSesi}
              blockTime={blockTime}
              loading={loading}
              loadingBawah={loadingBawah}
            />
          </View>
          <ScrollView ref={scrollRef} paddingX={3} flex={1} mt={5}>
            <RenderSoal
              loadingBawah={loadingBawah}
              loading={loading}
              jawab={jawabanNon !== null ? jawabanNon[sesi][nomor] : null}
              allJawab={jawabanNon[sesi]}
              pertanyaan={soal.data.sessions[sesi].questions[nomor]}
              pilihJawaban={pilihJawaban}
              nomor={nomor}
            />
          </ScrollView>
        </>
      )}
    </>
  );
};

export default NewSoalScreen;
