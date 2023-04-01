import { HStack, Text, VStack, View } from "native-base";
import React from "react";
import { useSelector } from "react-redux";
import LoadingIndicator from "../../../Components/Indicator/LoadingIndicator";
import { ScrollView, TouchableOpacity } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const BabPelajaranContent = (props) => {
   const { busakId, matpelId } = props;
   const navigation = useNavigation();
   const { listBab } = useSelector((state) => state.bukuSaktiReducer);

   return (
      <View
         flex={1}
         padding={4}
      >
         {listBab.loading && <LoadingIndicator />}
         <ScrollView>
            {listBab.data?.map((el) => (
               <TouchableOpacity
                  style={{
                     backgroundColor: "white",
                     padding: 25,
                     borderRadius: 8,
                     elevation: 3,
                     marginBottom: 10,
                  }}
                  onPress={() => {
                     navigation.navigate("SubBabScreen", {
                        busakId,
                        matpelId,
                        _id: el._id.$oid,
                        title: el.title,
                     });
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
      </View>
   );
};

export default BabPelajaranContent;
