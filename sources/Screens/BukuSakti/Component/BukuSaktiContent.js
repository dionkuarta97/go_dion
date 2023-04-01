import React, { useCallback, useEffect } from "react";
import { HStack, Text, VStack, View } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { getBusak, setBusak } from "../../../Redux/BukuSakti/bukuSaktiAction";
import LoadingIndicator from "../../../Components/Indicator/LoadingIndicator";
import { ScrollView, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { defaultInitState } from "../../../Redux/helper";

const BukuSaktiContent = (props) => {
   const { status } = props;
   const navigation = useNavigation();
   const dispatch = useDispatch();
   const { listBusak } = useSelector((state) => state.bukuSaktiReducer);

   useFocusEffect(
      useCallback(() => {
         dispatch(getBusak(status));
         return () => {
            dispatch(setBusak(defaultInitState));
         };
      }, [status])
   );

   return (
      <View
         flex={1}
         padding={4}
      >
         {listBusak.loading && <LoadingIndicator />}
         <ScrollView>
            {listBusak.data?.map((el) => (
               <TouchableOpacity
                  onPress={() => {
                     navigation.navigate("MataPelajaranScreen", {
                        _id: el._id,
                        title: el.title,
                     });
                  }}
                  style={{
                     backgroundColor: "white",
                     padding: 25,
                     borderRadius: 8,
                     elevation: 3,
                     marginBottom: 10,
                  }}
                  key={el._id}
               >
                  <HStack alignItems={"center"}>
                     <VStack marginRight={"auto"}>
                        <Text
                           fontSize={18}
                           fontWeight={"semibold"}
                        >
                           {el.title}
                        </Text>
                        <Text>{el.includes.length} Mata Pelajaran</Text>
                        <Text>Progress: {el.total_progress} %</Text>
                        {el.remainin_time_label !== "" && (
                           <Text
                              color={"red.700"}
                              marginTop={3}
                           >
                              {el.remainin_time_label}
                           </Text>
                        )}
                     </VStack>
                     <MaterialIcons
                        name="arrow-forward-ios"
                        size={30}
                        color="black"
                     />
                  </HStack>
               </TouchableOpacity>
            ))}
         </ScrollView>
      </View>
   );
};

export default BukuSaktiContent;
