import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Text,
  VStack,
} from "native-base";
import React, { useState } from "react";
import LihatSoal from "./LihatSoal";
import WaktuSoal from "./WaktuSoal";

const HeaderSoal = (props) => {
  const {
    config,
    title,
    mapel,
    sesi,
    nomor,
    totalSesi,
    allJawab,
    waktuUjian,
    setWaktuUjian,
    delay,
    pertanyaan,
    setNomor,
    sisaTime,
    setFinish,
    setDelay,
    blockTime,
    setSesi,
  } = props;

  console.log(JSON.stringify(allJawab, null, 2));

  return (
    <>
      <HStack
        alignItems={"center"}
        mt={3}
        bg="white"
        paddingX={2}
        paddingY={1}
        shadow={1}
        borderRadius={5}
      >
        <VStack marginRight={"auto"}>
          <Heading>{mapel}</Heading>
          <Text color={"gray.500"} fontSize={16}>
            Sesi {sesi + 1} / {totalSesi}
          </Text>
          <Text bold mr={"auto"} mt={3} fontSize={17}>
            {title}
          </Text>
        </VStack>
        <WaktuSoal
          delay={delay}
          waktu={waktuUjian}
          setSisaWaktu={setWaktuUjian}
          setFinish={setFinish}
          setDelay={setDelay}
          blockTime={blockTime}
          setSesi={setSesi}
          totalSesi={totalSesi}
          sesi={sesi}
          setNomor={setNomor}
        />
      </HStack>
      {sisaTime < 10 && sisaTime > 0 && (
        <Center mt={2}>
          <Text color={"red.600"}>Waktu ujian akan segera habis!</Text>
        </Center>
      )}
      <HStack alignItems={"center"} mt={3}>
        <Text mr={"auto"} fontSize={16}>
          Soal {nomor + 1} / {config.total_question}
        </Text>
        <LihatSoal
          quiz={pertanyaan}
          allJawab={allJawab[sesi]}
          idx={nomor}
          setIndex={setNomor}
        />
      </HStack>
    </>
  );
};

export default HeaderSoal;
