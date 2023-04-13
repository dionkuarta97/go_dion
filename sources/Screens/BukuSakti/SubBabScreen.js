import React, { useCallback } from "react";
import { SafeAreaView } from "react-native";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { getSubBab, setSubBab } from "../../Redux/BukuSakti/bukuSaktiAction";
import { defaultInitState } from "../../Redux/helper";
import SubBabContent from "./Component/SubBabContent";

const SubBabScreen = (props) => {
   const { route } = props;
   const dispatch = useDispatch();
   const { title, busakId, matpelId, _id } = route.params;

   useFocusEffect(
      useCallback(() => {
         dispatch(getSubBab({ busakId, matpelId, _id }));
         return () => {
            dispatch(setSubBab(defaultInitState));
         };
      }, [])
   );

   return (
      <SafeAreaView style={{ flex: 1 }}>
         <DefaultAppBar
            backEnabled={true}
            title={title}
         />
         <SubBabContent />
      </SafeAreaView>
   );
};

export default SubBabScreen;
