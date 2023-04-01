import { HStack, Text, VStack, View } from "native-base";
import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import LoadingIndicator from "../../../Components/Indicator/LoadingIndicator";
import { useSelector } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const MataPelajaranContent = (props) => {
   const { busakId } = props;
   const { listMapel } = useSelector((state) => state.bukuSaktiReducer);
   const navigation = useNavigation();

   return (
      <View
         flex={1}
         padding={4}
      >
         {listMapel.loading && <LoadingIndicator />}
         <ScrollView>
            {listMapel.data?.map((el) => (
               <TouchableOpacity
                  style={{
                     backgroundColor: "white",
                     padding: 25,
                     borderRadius: 8,
                     elevation: 3,
                     marginBottom: 10,
                  }}
                  key={el._id.$oid + "mapel"}
                  onPress={() => {
                     navigation.navigate("BabPelajaranScreen", {
                        _id: el._id.$oid,
                        title: el.title,
                        busakId,
                     });
                  }}
               >
                  <HStack alignItems={"center"}>
                     <VStack marginRight={"auto"}>
                        <Text
                           fontSize={18}
                           fontWeight={"semibold"}
                        >
                           {el.title}
                        </Text>
                        <HStack space={5}>
                           <Text>{el.total_include} Topik</Text>
                           <Text>
                              Dijawab{" "}
                              {el.total_answered + " / " + el.total_question}
                           </Text>
                        </HStack>
                        <Text>Progress : {el.progress} %</Text>
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

export default MataPelajaranContent;
