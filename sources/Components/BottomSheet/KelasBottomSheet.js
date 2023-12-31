import React, { useEffect, useLayoutEffect, useState } from "react";
import PropTypes from "prop-types";
import { MaterialIcons } from "@expo/vector-icons";

import {
   Dimensions,
   Modal,
   ScrollView,
   Text,
   View,
   TouchableOpacity,
   StyleSheet,
   ActivityIndicator,
   TextInput,
} from "react-native";
import Sizes from "../../Theme/Sizes";
import Colors from "../../Theme/Colors";
import Fonts from "../../Theme/Fonts";
import DefaultBottomSheet from "./DefaultBottomSheet";
import { FlatGrid } from "react-native-super-grid";
import { useDispatch, useSelector } from "react-redux";
import { getListGrades } from "../../Redux/Data/dataActions";
import { Box, Button, Center, HStack, useToast } from "native-base";
import { useNavigation } from "@react-navigation/native";
import checkInternet from "../../Services/CheckInternet";
import ToastErrorContent from "../ToastErrorContent";

const KelasBottomSheet = (props) => {
   const dispatch = useDispatch();
   const toast = useToast();
   const navigation = useNavigation();
   const listGrades = useSelector((state) => state.dataReducer.listGrades);
   const [idx, setIdx] = useState(0);

   useEffect(() => {
      if (props.value) {
         if (props.value >= 1 && props.value <= 6) {
            setIdx(2);
         } else if (props.value >= 7 && props.value <= 9) {
            setIdx(1);
         } else {
            setIdx(0);
         }
      }
   }, []);

   useLayoutEffect(() => {
      checkInternet().then((data) => {
         if (data) {
            dispatch(getListGrades());
         } else {
            props.onClose();
            toast.show({
               placement: "top",
               duration: null,
               width: Dimensions.get("screen").width / 1.3,
               render: () => {
                  return (
                     <ToastErrorContent
                        content="Kamu tidak terhubung ke internet"
                        onPress={() => {
                           toast.closeAll();
                           navigation.goBack();
                        }}
                     />
                  );
               },
            });
         }
      });
   }, []);
   return (
      <DefaultBottomSheet
         title="Tingkatan Kelas"
         onClose={() => props.onClose()}
      >
         {listGrades.loading && (
            <ActivityIndicator
               color={Colors.orangeColor}
               size={25}
            />
         )}
         <Center>
            <HStack space={6}>
               {listGrades.data !== null &&
                  listGrades.data.map((val, index) => {
                     return (
                        <Button
                           width={20}
                           marginBottom={6}
                           key={index}
                           onPress={() => setIdx(index)}
                           colorScheme={"amber"}
                           variant={idx === index ? "solid" : "outline"}
                        >
                           {val.title}
                        </Button>
                     );
                  })}
            </HStack>
         </Center>
         {listGrades.data !== null && (
            <FlatGrid
               key={idx}
               data={listGrades.data[idx].grade}
               renderItem={({ item, index }) => {
                  return (
                     <Button
                        variant={item === props.value ? "solid" : "outline"}
                        onPress={() => props.onSelect(item)}
                        colorScheme={
                           item.substring(3, 10) === "IPA" ? "muted" : "amber"
                        }
                        borderRadius={5}
                        paddingY={2}
                     >
                        {`Kelas ${item}`}
                     </Button>
                  );
               }}
            />
         )}
      </DefaultBottomSheet>
   );
};

KelasBottomSheet.propTypes = {
   onClose: PropTypes.func,
   onSelect: PropTypes.func,
};

export default KelasBottomSheet;

const styles = StyleSheet.create({
   tile: {
      flex: 1,
      paddingVertical: 5,
      paddingHorizontal: 15,
      backgroundColor: Colors.primaryColor,
      borderRadius: Sizes.fixPadding / 2,
   },
});
