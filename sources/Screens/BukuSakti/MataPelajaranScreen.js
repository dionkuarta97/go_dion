import React, { useCallback, useEffect } from "react";
import { SafeAreaView } from "react-native";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import { useDispatch } from "react-redux";
import { getMapel } from "../../Redux/BukuSakti/bukuSaktiAction";
import MataPelajaranContent from "./Component/MataPelajaranContent";
import { defaultInitState } from "../../Redux/helper";
import { useFocusEffect } from "@react-navigation/native";

const MataPelajaranScreen = (props) => {
   const { route } = props;
   const { _id, title } = route.params;
   const dispatch = useDispatch();

   useFocusEffect(
      useCallback(() => {
         dispatch(getMapel(_id));
         return () => {
            dispatch(getMapel(defaultInitState));
         };
      }, [])
   );

   return (
      <SafeAreaView style={{ flex: 1 }}>
         <DefaultAppBar
            title={title}
            backEnabled={true}
         />
         <MataPelajaranContent busakId={_id} />
      </SafeAreaView>
   );
};

export default MataPelajaranScreen;
