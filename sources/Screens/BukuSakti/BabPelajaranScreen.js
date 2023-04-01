import React from "react";
import { SafeAreaView } from "react-native";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { getBab, setBab } from "../../Redux/BukuSakti/bukuSaktiAction";
import { defaultInitState } from "../../Redux/helper";
import BabPelajaranContent from "./Component/BabPelajaranContent";

const BabPelajaranScreen = (props) => {
   const { route } = props;
   const { title, _id, busakId } = route.params;
   const dispatch = useDispatch();

   useFocusEffect(
      useCallback(() => {
         dispatch(getBab({ _id, busakId }));

         return () => {
            dispatch(setBab(defaultInitState));
         };
      }, [])
   );

   return (
      <SafeAreaView style={{ flex: 1 }}>
         <DefaultAppBar
            title={title}
            backEnabled={true}
         />

         <BabPelajaranContent
            busakId={busakId}
            matpelId={_id}
         />
      </SafeAreaView>
   );
};

export default BabPelajaranScreen;
