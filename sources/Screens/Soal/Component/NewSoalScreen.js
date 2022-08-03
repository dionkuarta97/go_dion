import { View, ScrollView } from "native-base";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setJawaban, setJawabanNon } from "../../../Redux/Soal/soalActions";
import HeaderSoal from "./HeaderSoal";
import RenderSoal from "./RenderSoal";

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
    indexNow,
  } = props;

  const dispatch = useDispatch();
  const [sisaWaktu, setSisaWaktu] = useState(
    soal.data.sessions[sesi].session_configs.session_duration
  );
  const { jawabanNon, jawaban } = useSelector((state) => state.soalReducer);
  const profile = useSelector((state) => state.profileReducer.profile);
  const pilihJawaban = (pilih) => {
    let temp = jawabanNon;
    temp[sesi][nomor] = pilih;
    dispatch(setJawabanNon(temp));
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
            />
          </View>
          <ScrollView paddingX={3} mt={5}>
            <RenderSoal
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
