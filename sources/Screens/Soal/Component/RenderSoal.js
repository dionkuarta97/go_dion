import { Box } from "native-base";
import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import RenderHTML from "react-native-render-html";
import RenderOption from "./RenderOption";

const RenderSoal = (props) => {
  const { pertanyaan, jawab, allJawab, pilihJawaban, nomor } = props;
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
          {pertanyaan.jawaban.map((el, idx) => (
            <RenderOption
              nomor={nomor}
              key={idx}
              el={el}
              idx={idx}
              allJawab={allJawab}
              pilihan={pilihan ? pilihan : null}
              setPilihan={setPilihan}
              pilihJawaban={pilihJawaban}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default RenderSoal;
