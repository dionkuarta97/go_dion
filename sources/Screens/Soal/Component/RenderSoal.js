import { Box, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import RenderHTML from "react-native-render-html";
import LoadingIndicator from "../../../Components/Indicator/LoadingIndicator";
import RenderOptionPBK from "./RenderOptionPBK";
import RenderOptionPBS from "./RenderOptionPBS";
import RenderOptionPBT from "./RenderOptionPBT";

const RenderSoal = (props) => {
  const {
    pertanyaan,
    jawab,
    allJawab,
    pilihJawaban,
    nomor,
    loading,
    loadingBawah,
  } = props;
  const [pilihan, setPilihan] = useState(null);

  useEffect(() => {
    setPilihan(jawab);
  }, [jawab]);

  return (
    <Box
      bg={"white"}
      paddingX={5}
      paddingY={3}
      borderRadius={5}
      marginBottom={20}
      shadow={1}
    >
      <>
        <Box flex={1}>
          <RenderHTML
            source={{
              html: `${pertanyaan.pertanyaan}`,
            }}
            contentWidth={Dimensions.get("screen").width / 1.2}
          />
        </Box>
        {pilihan && (
          <Box mt={5}>
            {pertanyaan.tipe === "PBS" ? (
              <>
                {pertanyaan.jawaban.map((el, idx) => (
                  <RenderOptionPBS
                    nomor={nomor}
                    key={idx}
                    loading={loading}
                    el={el}
                    idx={idx}
                    allJawab={allJawab}
                    pilihan={pilihan ? pilihan : null}
                    setPilihan={setPilihan}
                    pilihJawaban={pilihJawaban}
                    loadingBawah={loadingBawah}
                  />
                ))}
              </>
            ) : pertanyaan.tipe === "PBK" ? (
              <>
                {pertanyaan.jawaban.map((el, idx) => (
                  <RenderOptionPBK
                    nomor={nomor}
                    key={idx}
                    loading={loading}
                    el={el}
                    idx={idx}
                    jawab={jawab}
                    allJawab={allJawab}
                    pilihan={pilihan ? pilihan : null}
                    setPilihan={setPilihan}
                    pilihJawaban={pilihJawaban}
                    loadingBawah={loadingBawah}
                  />
                ))}
              </>
            ) : (
              <>
                {pertanyaan.table.map((el, idx) => (
                  <RenderOptionPBT
                    jawab={jawab}
                    key={idx + "oke"}
                    el={el}
                    idx={idx}
                    allJawab={allJawab}
                    pilihan={pilihan ? pilihan : null}
                    setPilihan={setPilihan}
                    pilihJawaban={pilihJawaban}
                    loadingBawah={loadingBawah}
                  />
                ))}
              </>
            )}
          </Box>
        )}
      </>
    </Box>
  );
};

export default RenderSoal;
