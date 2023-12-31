import React, { useEffect, useCallback } from "react";
import {
   Alert,
   BackHandler,
   Dimensions,
   Image,
   StyleSheet,
   Text,
   TouchableHighlight,
   TouchableOpacity,
   View,
   VirtualizedList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import { getHomeMenu } from "../../../Redux/Home/homeActions";
import { FlatList } from "react-native-gesture-handler";
import { useNavigation, useFocusEffect } from "@react-navigation/core";
import Fonts from "../../../Theme/Fonts";
import Sizes from "../../../Theme/Sizes";
import Colors from "../../../Theme/Colors";
import { HStack, useToast, VStack } from "native-base";
import checkInternet from "../../../Services/CheckInternet";
import ToastErrorContent from "../../../Components/ToastErrorContent";
import analytics from "@react-native-firebase/analytics";

const HomeMenu = (props) => {
   const toast = useToast();
   const navigation = useNavigation();
   const dispatch = useDispatch();
   const homeMenuState = useSelector((state) => state.homeReducer.homeMenu);
   const isLogin = useSelector((state) => state.authReducer.isLogin);

   useEffect(() => {
      checkInternet().then((connection) => {
         if (connection) {
            dispatch(getHomeMenu());
         } else {
            toast.show({
               placement: "top",
               duration: null,
               width: Dimensions.get("screen").width / 1.3,
               render: (props) => {
                  return (
                     <>
                        <ToastErrorContent
                           content="Kamu tidak terhubung ke internet"
                           onPress={() => {
                              toast.closeAll();
                           }}
                        />
                     </>
                  );
               },
            });
         }
      });
   }, []);

   useEffect(() => {
      if (homeMenuState.error) {
         toast.show({
            placement: "top",
            duration: 4000,
            width: Dimensions.get("screen").width / 1.3,
            render: () => {
               return (
                  <>
                     <ToastErrorContent content="Terjadi kesalahan saat memproses data" />
                  </>
               );
            },
         });
      }
   }, [homeMenuState]);

   const onPressItem = async (key) => {
      switch (key) {
         case "produk_kami":
            navigation.navigate("ProductScreen");
            break;
         case "busak":
            if (isLogin) {
               navigation.navigate("BukuSaktiScreen");
            } else {
               Alert.alert(
                  "Tidak Bisa Masuk",
                  "Kamu harus login terlebih dahulu untuk mengakses menu ini"
               );
            }
            break;
         case "materi_belajar":
            if (isLogin) {
               navigation.navigate("GoBelajarScreen");
            } else {
               Alert.alert(
                  "Tidak Bisa Masuk",
                  "Kamu harus login terlebih dahulu untuk mengakses menu ini"
               );
            }
            break;
         case "tryout":
            if (isLogin) {
               navigation.navigate("GoTryoutScreen");
            } else {
               Alert.alert(
                  "Tidak Bisa Masuk",
                  "Kamu harus login terlebih dahulu untuk mengakses menu ini"
               );
            }
            break;

         default:
            break;
      }
   };

   const menuComponent = (item) => {
      return (
         <VStack alignItems={"center"}>
            <TouchableHighlight
               style={{ marginHorizontal: 10, borderRadius: 180 }}
               onPress={() => onPressItem(item.key)}
            >
               <View
                  style={{
                     justifyContent: "center",
                     alignItems: "center",
                  }}
               >
                  <View style={{ ...styles.menu, elevation: 3 }}>
                     <Image
                        source={{ uri: item.image }}
                        style={{
                           width: Dimensions.get("screen").width / 9.6,
                           height: Dimensions.get("screen").width / 9.6,
                           tintColor: Colors.orangeColor,
                        }}
                     />
                  </View>
               </View>
            </TouchableHighlight>
            <View
               style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: Dimensions.get("screen").width / 6,
               }}
            >
               <Text
                  style={{
                     textAlign: "center",
                     marginTop: 5,
                     fontWeight: "500",
                     fontSize: Dimensions.get("screen").width / 31,
                  }}
               >
                  {item.title}
               </Text>
            </View>
         </VStack>
      );
   };

   return (
      <View
         style={{
            alignItems: "center",
            justifyContent: "center",
            marginVertical: 30,
            paddingHorizontal: 10,
         }}
      >
         {homeMenuState.loading &&
         homeMenuState.error == null &&
         props.loading ? (
            <View>
               <Text>Loading.. </Text>
            </View>
         ) : (
            <FlatList
               horizontal={true}
               scrollEnabled={false}
               showsHorizontalScrollIndicator={false}
               keyExtractor={(item) => `homemenu${item._id}`}
               data={homeMenuState.data}
               renderItem={({ item }) => menuComponent(item)}
            />
         )}
      </View>
   );
};

export default HomeMenu;

const styles = StyleSheet.create({
   menu: {
      height: Dimensions.get("screen").width / 6,
      width: Dimensions.get("screen").width / 6,

      backgroundColor: Colors.whiteColor,
      borderRadius: 60,
      justifyContent: "center",
      alignItems: "center",
   },
});
