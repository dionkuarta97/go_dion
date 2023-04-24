import {
   Box,
   HStack,
   Text,
   View,
   ScrollView,
   Center,
   Button,
   Heading,
} from "native-base";
import React, { useEffect, useRef, useState } from "react";
import RenderHtml from "react-native-render-html";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LihatSoal from "./LihatSoal";
import moment from "moment";
import SolusiPBS from "./SolusiPBS";
import SolusiPBK from "./SolusiPBK";
import SolusiPBT from "./SolusiPBT";
import LoadingIndicator from "../../../Components/Indicator/LoadingIndicator";
import ImageView from "react-native-image-viewing";

const options = ["A", "B", "C", "D", "E", "F"];

const SolusiContent = (props) => {
   const {
      solution,
      quiz,
      answer,
      index,
      quiz_options,
      title,
      setIndex,
      loading,
   } = props;

   const navigation = useNavigation();

   const scrollRef = useRef();
   const [givenAkhir, setGivenAkhir] = useState(null);
   const [current, setCurrent] = useState(null);

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
      scrollRef.current?.scrollTo({
         y: 0,
         animated: false,
      });
      setGivenAkhir(moment(solution[index].tanggal_rilis_solusi));
      setCurrent(moment().utcOffset(7).startOf("second"));
   }, [index]);

   return (
      <ScrollView
         ref={scrollRef}
         padding={15}
      >
         <Heading>{title}</Heading>
         <HStack>
            <Text
               marginTop={2}
               style={{ marginEnd: "auto" }}
               fontSize={16}
            >
               Soal {index + 1} / {quiz.length}
            </Text>
            <LihatSoal
               quiz={quiz}
               idx={index}
               setIndex={setIndex}
            />
         </HStack>

         <Box
            bg={"white"}
            paddingX={5}
            paddingY={3}
            borderRadius={10}
            marginTop={5}
            shadow={2}
         >
            <RenderHtml
               renderersProps={renderersProps}
               source={{
                  html: `${
                     quiz[index] !== undefined
                        ? quiz[index]
                        : "<p>Soal tidak tersedia</p>"
                  }`,
               }}
               contentWidth={Dimensions.get("screen").width / 1.2}
            />
         </Box>
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
         <Text
            bold
            fontSize={18}
            marginTop={5}
         >
            Jawaban
         </Text>
         <Box
            bg={"white"}
            paddingX={5}
            paddingY={3}
            borderRadius={10}
            marginTop={5}
            shadow={2}
         >
            {!loading ? (
               <>
                  {quiz_options[index].map((el, idx) => (
                     <>
                        {answer[index].type === "PBS" ? (
                           <SolusiPBS
                              answer={answer}
                              index={index}
                              el={el}
                              options={options}
                              key={idx}
                              idx={idx}
                           />
                        ) : answer[index].type === "PBK" ? (
                           <SolusiPBK
                              answer={answer}
                              index={index}
                              el={el}
                              options={options}
                              key={idx}
                              idx={idx}
                           />
                        ) : (
                           <SolusiPBT
                              answer={answer}
                              index={index}
                              el={el}
                              options={options}
                              key={idx}
                              idx={idx}
                           />
                        )}
                     </>
                  ))}
               </>
            ) : (
               <LoadingIndicator />
            )}
         </Box>

         <Text
            bold
            fontSize={18}
            marginTop={5}
         >
            Solusi
         </Text>

         {givenAkhir !== null && (
            <>
               {moment.duration(givenAkhir?.diff(current)).asDays() < 0 ? (
                  <>
                     {solution[index]["type"] === "VIDEO" ? (
                        <Center
                           marginTop={10}
                           marginBottom={100}
                        >
                           <Button
                              shadow={2}
                              bg={"amber.400"}
                              width={Dimensions.get("screen").width / 1.8}
                              onPress={() => {
                                 navigation.navigate("TestVideo", {
                                    video: solution[index]["video"],
                                    from: "Video Solusi",
                                 });
                              }}
                           >
                              <Text bold>Lihat Video</Text>
                           </Button>
                        </Center>
                     ) : solution[index]["type"] === "TEXT" ? (
                        <Box
                           bg={"white"}
                           paddingX={5}
                           paddingY={3}
                           borderRadius={10}
                           marginTop={5}
                           shadow={2}
                           marginBottom={50}
                        >
                           <RenderHtml
                              source={{
                                 html: `${solution[index]["text"]}`,
                              }}
                              contentWidth={
                                 Dimensions.get("screen").width / 1.2
                              }
                           />
                        </Box>
                     ) : solution[index]["type"] === "VIDEO DAN TEXT" ? (
                        <>
                           <Center marginTop={10}>
                              <Button
                                 shadow={2}
                                 bg={"amber.400"}
                                 width={Dimensions.get("screen").width / 1.8}
                                 onPress={() => {
                                    navigation.navigate("TestVideo", {
                                       video: solution[index]["video"],
                                       from: "Video Solusi",
                                    });
                                 }}
                              >
                                 <Text bold>Lihat Video</Text>
                              </Button>
                           </Center>
                           <Box
                              bg={"white"}
                              paddingX={5}
                              paddingY={3}
                              borderRadius={10}
                              marginTop={5}
                              shadow={2}
                              marginBottom={50}
                           >
                              <RenderHtml
                                 source={{
                                    html: `${solution[index]["text"]}`,
                                 }}
                                 contentWidth={
                                    Dimensions.get("screen").width / 1.2
                                 }
                              />
                           </Box>
                        </>
                     ) : (
                        <Box
                           bg={"white"}
                           paddingX={5}
                           paddingY={3}
                           borderRadius={10}
                           marginTop={5}
                           shadow={2}
                           marginBottom={50}
                        >
                           <Text>Solusi Belum Tersedia</Text>
                        </Box>
                     )}
                  </>
               ) : (
                  <Box
                     bg={"white"}
                     paddingX={5}
                     paddingY={3}
                     borderRadius={10}
                     marginTop={5}
                     shadow={2}
                     marginBottom={50}
                  >
                     <Text>Solusi Belum Tersedia</Text>
                  </Box>
               )}
            </>
         )}
      </ScrollView>
   );
};

export default SolusiContent;
