import { Box, Text } from "native-base";
import React, { useEffect, useState, useMemo } from "react";
import { Dimensions } from "react-native";
import RenderHTML from "react-native-render-html";
import RenderOptionPBK from "./RenderOptionPBK";
import RenderOptionPBS from "./RenderOptionPBS";
import RenderOptionPBT from "./RenderOptionPBT";
import ImageView from "react-native-image-viewing";

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

   const [visible, setIsVisible] = useState(false);
   const [link, setLink] = useState("");

   function onPress(event, href) {
      setLink(href);
      setIsVisible(true);
   }

   const renderersProps = useMemo(
      () => ({
         a: {
            onPress: onPress,
         },
      }),
      []
   );

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
         <ImageView
            images={[
               {
                  uri: link,
               },
            ]}
            imageIndex={0}
            visible={visible}
            onRequestClose={() => setIsVisible(false)}
         />
         <>
            <Box flex={1}>
               <RenderHTML
                  renderersProps={renderersProps}
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
                              cek={
                                 allJawab[nomor].user_answer[idx] === -1
                                    ? false
                                    : true
                              }
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
                              key={idx + "dasd" + nomor}
                              loading={loading}
                              el={el}
                              idx={idx}
                              cek={
                                 allJawab[nomor].user_answer[idx] === 1
                                    ? true
                                    : false
                              }
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
