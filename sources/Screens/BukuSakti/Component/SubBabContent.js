import {
   Actionsheet,
   Button,
   HStack,
   Text,
   VStack,
   View,
   useDisclose,
} from "native-base";
import React from "react";
import { useSelector } from "react-redux";
import LoadingIndicator from "../../../Components/Indicator/LoadingIndicator";
import { Dimensions, ScrollView, TouchableOpacity } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

const SubBabContent = () => {
   const { listSubBab } = useSelector((state) => state.bukuSaktiReducer);

   const { isOpen, onOpen, onClose } = useDisclose();

   return (
      <View
         flex={1}
         padding={4}
      >
         {listSubBab.loading && <LoadingIndicator />}
         <ScrollView>
            {listSubBab.data?.map((el) => (
               <TouchableOpacity
                  style={{
                     backgroundColor: "white",
                     padding: 25,
                     borderRadius: 8,
                     elevation: 3,
                     marginBottom: 10,
                  }}
                  onPress={() => {
                     onOpen();
                  }}
                  key={el._id.$oid}
               >
                  <HStack alignItems={"center"}>
                     <VStack marginRight={"auto"}>
                        <Text
                           fontSize={18}
                           fontWeight={"semibold"}
                        >
                           {el.title}
                        </Text>
                        <Text>
                           Dijawab :{" "}
                           {el.total_answered + " / " + el.total_question}{" "}
                        </Text>
                        <HStack space={10}>
                           <Text>Benar : {el.true_answer}</Text>
                           <Text>Salah : {el.false_answer}</Text>
                        </HStack>
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
         <Actionsheet
            isOpen={isOpen}
            onClose={() => {
               onClose();
            }}
         >
            <Actionsheet.Content>
               <Actionsheet.Item
                  startIcon={
                     <MaterialIcons
                        name="work-outline"
                        size={24}
                        color="black"
                     />
                  }
               >
                  Kerjakan
               </Actionsheet.Item>
               <Actionsheet.Item
                  startIcon={
                     <MaterialIcons
                        name="lock-open"
                        size={24}
                        color="black"
                     />
                  }
               >
                  Lihat Solusi
               </Actionsheet.Item>
            </Actionsheet.Content>
         </Actionsheet>
      </View>
   );
};
export default SubBabContent;
