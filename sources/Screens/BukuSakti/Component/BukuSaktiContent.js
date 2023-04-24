import React, { useCallback, useEffect } from "react";
import { Button, HStack, Text, VStack, View } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { getBusak, setBusak } from "../../../Redux/BukuSakti/bukuSaktiAction";
import LoadingIndicator from "../../../Components/Indicator/LoadingIndicator";

import { Dimensions, ScrollView, TouchableOpacity } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { defaultInitState } from "../../../Redux/helper";
import EmptyIndicator from "../../../Components/Indicator/EmptyIndicator";

import NoMateri from "../../GoBelajar/Component/noMateri";

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
      <>
         {listBusak.error && !listBusak.loading ? (
            <>
               <View
                  flex={1}
                  padding={8}
               >
                  <EmptyIndicator msg={"Data tidak ditemukan"} />
                  {status === "untouched" && (
                     <Button
                        bg={"amber.400"}
                        _pressed={{ bg: "amber.300" }}
                        onPress={() => navigation.navigate("ProductScreen")}
                        size={"lg"}
                     >
                        Beli Sekarang
                     </Button>
                  )}
               </View>
            </>
         ) : (
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
                              <Text>{el.total_pelajaran} Mata Pelajaran</Text>
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
         )}
      </>
   );
};

export default BukuSaktiContent;
