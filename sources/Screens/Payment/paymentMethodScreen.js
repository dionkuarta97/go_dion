import React, { useEffect } from "react";
import {
   ActivityIndicator,
   Dimensions,
   SafeAreaView,
   ScrollView,
   StyleSheet,
   Text,
   View,
   Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import Sizes from "../../Theme/Sizes";
import ExpandableTile from "../../Components/Tile/ExpendableTile";
import { TouchableOpacity } from "react-native-gesture-handler";
import Fonts from "../../Theme/Fonts";
import { useDispatch, useSelector } from "react-redux";
import {
   getPaymentMethod,
   setSelectedPaymentMethod,
} from "../../Redux/Payment/paymentActions";
import Colors from "../../Theme/Colors";
import { useNavigation } from "@react-navigation/core";
import checkInternet from "../../Services/CheckInternet";
import { useToast } from "native-base";
import ToastErrorContent from "../../Components/ToastErrorContent";

const PaymentMethodScreen = () => {
   const toast = useToast();
   const dispatch = useDispatch();
   const navigation = useNavigation();
   const paymentMethod = useSelector(
      (state) => state.paymentReducer.paymentMethod
   );

   useEffect(() => {
      checkInternet().then((connection) => {
         if (connection) {
            dispatch(getPaymentMethod());
         } else {
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

   const renderHeader = ({ title, icon }) => {
      return (
         <View style={styles.itemHeader}>
            <MaterialIcons
               name={icon}
               size={22}
               color="black"
               style={{ marginRight: Sizes.fixPadding }}
            />

            <Text style={{ flex: 1, ...Fonts.black15Bold }}>{title}</Text>
         </View>
      );
   };

   const renderSubItem = (subItem) => {
      return (
         subItem.method !== "apple_pay" && (
            <TouchableOpacity
               key={subItem.name}
               onPress={() => {
                  dispatch(setSelectedPaymentMethod(subItem));
                  navigation.goBack();
               }}
            >
               <View style={styles.subItem}>
                  <Text style={{ flex: 1 }}>
                     {subItem.title === "Gojek" ? "Gopay" : subItem.title}
                  </Text>
                  <Text style={{ ...Fonts.gray14Regular }}>Pilih</Text>
               </View>
            </TouchableOpacity>
         )
      );
   };
   return (
      <SafeAreaView style={{ flex: 1 }}>
         <DefaultAppBar
            title="Metode Pembayaran"
            backEnabled={true}
         />
         {paymentMethod.loading && (
            <View
               style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
               }}
            >
               <ActivityIndicator
                  color={Colors.orangeColor}
                  size={30}
               />
            </View>
         )}
         {paymentMethod.data !== null && (
            <ScrollView
               style={{ paddingVertical: Sizes.fixPadding * 2, flex: 1 }}
            >
               {paymentMethod.data.map((val) => {
                  const providers = val.providers;
                  if (val.title !== "Other Methods") {
                     return (
                        <ExpandableTile
                           key={val._id}
                           header={renderHeader({
                              title: val.title,
                              icon: "money",
                           })}
                           tile
                        >
                           {providers.map((subItem) => renderSubItem(subItem))}
                        </ExpandableTile>
                     );
                  }
               })}
            </ScrollView>
         )}
      </SafeAreaView>
   );
};

export default PaymentMethodScreen;

const styles = StyleSheet.create({
   itemHeader: {
      flexDirection: "row",
      backgroundColor: "white",
      paddingVertical: Sizes.fixPadding * 2,
      paddingHorizontal: Sizes.fixPadding * 2,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "lightgrey",
   },
   subItem: {
      flexDirection: "row",
      backgroundColor: "white",
      marginLeft: 20,
      padding: Sizes.fixPadding,
      borderTopWidth: 1,
      borderTopColor: "lightgrey",
   },
});
