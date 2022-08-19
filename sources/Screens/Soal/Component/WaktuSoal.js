import React from "react";
import CountDown from "react-native-countdown-component";

const WaktuSoal = (props) => {
  const {
    waktu,
    setSisaWaktu,
    setFinish,
    setDelay,
    blockTime,
    totalSesi,
    setSesi,
    sesi,
    setNomor,
  } = props;
  return (
    <>
      <CountDown
        key={"Count 1"}
        until={waktu}
        digitStyle={{
          backgroundColor: "transparent",
        }}
        showSeparator={true}
        onFinish={() => {
          if (!blockTime) {
            setDelay(true);
            setFinish(true);
          } else {
            if (sesi + 1 === totalSesi) {
              setDelay(true);
              setFinish(true);
            } else {
              setDelay(true);
              setSesi(sesi + 1);
              setNomor(0);
            }
          }
        }}
        size={30}
        timeToShow={["M", "S"]}
        timeLabels={{ m: null, s: null }}
        onChange={(t) => {
          setSisaWaktu(t);
        }}
      />
    </>
  );
};

export default WaktuSoal;
