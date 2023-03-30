import { useNavigation, useFocusEffect } from "@react-navigation/core";
import React, { useCallback, useState } from "react";
import { Dimensions, Image, SafeAreaView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ActionButtonHome from "../../Components/ActionButton/ActionButtonHome";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import DefaultPrimaryButton from "../../Components/Button/DefaultPrimaryButton";
import { getScore } from "../../Redux/Score/scoreActions";
import Sizes from "../../Theme/Sizes";
import OnResult from "./Component/OnResult";
import OnScoring from "./Component/OnScoring";

const ScoreScreen = (props) => {
   const navigation = useNavigation();
   const dispatch = useDispatch();

   const related_to = props.route.params.related_to;
   const from = props.route.params.from;
   const score = useSelector((state) => state.scoreReducer.score);

   useFocusEffect(
      useCallback(() => {
         dispatch(getScore(related_to));
      }, [])
   );

   const [done, setDone] = useState(false);
   return (
      <SafeAreaView style={{ flex: 1 }}>
         {from ? (
            <DefaultAppBar
               title="Detail Score"
               backEnabled={true}
            />
         ) : (
            <DefaultAppBar
               title="Detail Score"
               rightItem={<ActionButtonHome />}
            />
         )}

         <View style={{ flex: 1, position: "relative" }}>
            <View
               style={{
                  flex: 1,
                  justifyContent: "flex-start",
                  alignItems: "center",
                  paddingVertical: Sizes.fixPadding * 2,
               }}
            >
               <Image
                  style={{ height: 200 }}
                  resizeMode="contain"
                  source={require("../../../assets/Images/soal/onscoring.png")}
               />
            </View>
            <View
               style={{
                  position: "absolute",
                  bottom: 0,
                  backgroundColor: "white",
                  paddingHorizontal: 25,
                  paddingVertical: 25,
                  borderTopLeftRadius: 30,
                  borderTopRightRadius: 30,
                  elevation: 30,
                  minHeight: Dimensions.get("screen").height * 0.5,
                  width: Dimensions.get("screen").width,
               }}
            >
               {score.data === null && (
                  <View style={{ flex: 1 }}>
                     <OnScoring />
                     <DefaultPrimaryButton
                        text={"Refresh Skor"}
                        onPress={() => dispatch(getScore(related_to))}
                     />
                  </View>
               )}
               {score.data !== null && (
                  <View style={{ flex: 1 }}>
                     <OnResult detail={score.data} />
                     <DefaultPrimaryButton
                        text={from ? "Kembali" : "Kembali ke Home"}
                        onPress={() => {
                           if (from) {
                              navigation.goBack();
                           } else {
                              navigation.popToTop();
                           }
                        }}
                     />
                  </View>
               )}
            </View>
         </View>
      </SafeAreaView>
   );
};

export default ScoreScreen;
