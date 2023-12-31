import React, { useCallback, useEffect, useState } from "react";
import {
   Dimensions,
   Image,
   SafeAreaView,
   StatusBar,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
   BackHandler,
   Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import Fonts from "../../Theme/Fonts";
import Sizes from "../../Theme/Sizes";
import Colors from "../../Theme/Colors";
import { useSelector } from "react-redux";
import HomeScreen from "../Home/homeScreen";
import CartScreen from "../Cart/cartScreen";
import PurchaseScreen from "../Purchase/purchaseScreen";
import LainnyaScreen from "../Lainnya/lainnyaScreen";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import OneSignal from "react-native-onesignal";
import NoData from "../../Components/NoData";
import LaporanScreen from "../Laporan/LaporanScreen";
import { Button, useToast } from "native-base";
import ToastErrorContent from "../../Components/ToastErrorContent";
import {
   useFocusEffect,
   useNavigation,
   useRoute,
} from "@react-navigation/native";
import LeaderboardScreen from "../Leaderboard/LeaderboardScreen";
import PilihLeaderboardScreen from "../Leaderboard/PilihLeaderboardScreen";
import VersionMessage from "./components/VersionMessage";

const bottomNavMenu = [
   { title: "Beranda", icon: "home" },
   { title: "Pembelian", icon: "shopping-cart" },
   { title: "Laporan", icon: "show-chart" },
   { title: "Leaderboard", icon: "insert-chart" },
   { title: "Lainnya", icon: "more-vert" },
];

export default MainScreen = (props) => {
   const [currentIndex, setCurrentIndex] = useState(0);
   const { checkVersion } = useSelector((state) => state.versionReducer);

   const toast = useToast();
   const route = useRoute();
   const { params } = props.route;
   const navigation = useNavigation();
   useFocusEffect(
      useCallback(() => {
         if (route.name === "MainScreen") {
            const backAction = () => {
               Alert.alert(
                  "Perhatian",
                  "Anda yakin ingin keluar dari aplikasi?",
                  [
                     {
                        text: "Tidak",
                        onPress: () => null,
                        style: "cancel",
                     },
                     { text: "Iya", onPress: () => BackHandler.exitApp() },
                  ]
               );
               return true;
            };

            const backHandler = BackHandler.addEventListener(
               "hardwareBackPress",
               backAction
            );

            return () => backHandler.remove();
         }
      }, [])
   );

   useEffect(() => {
      if (checkVersion.error) {
         toast.show({
            placement: "top",
            duration: 4000,
            width: Dimensions.get("screen").width / 1.3,
            render: () => {
               return (
                  <ToastErrorContent content="Terjadi kesalahan saat memproses data" />
               );
            },
         });
      }
   }, [checkVersion]);

   useFocusEffect(
      useCallback(() => {
         if (params?.from === "pembayaran") {
            setCurrentIndex(0);
            delete params.from;
         } else if (params?.from === "gantiFoto") {
            setCurrentIndex(4);
            delete params.from;
         }
      }, [params])
   );

   const bottomTabBarItem = ({ index, icon, title }) => {
      return (
         <TouchableOpacity
            key={index.toString()}
            activeOpacity={0.9}
            onPress={() => setCurrentIndex(index)}
         >
            {currentIndex == index ? (
               <View
                  style={{
                     flexDirection: "row",
                     alignItems: "center",
                     justifyContent: "center",
                     backgroundColor: "#FFEACC",
                     width: 140.0,
                     paddingVertical: Sizes.fixPadding,
                     borderRadius: Sizes.fixPadding * 4.0,
                  }}
               >
                  {icon}
                  <Text
                     style={{
                        ...Fonts.orangeColor14Bold,
                        marginLeft: Sizes.fixPadding * 2.0,
                     }}
                  >
                     {title}
                  </Text>
               </View>
            ) : (
               icon
            )}
         </TouchableOpacity>
      );
   };
   return (
      <>
         {checkVersion.upToDate === 0 ? (
            <View style={{ flex: 1 }}>
               {currentIndex == 0 ? (
                  <HomeScreen currentIndex={currentIndex} />
               ) : currentIndex == 1 ? (
                  <PurchaseScreen from="home" />
               ) : currentIndex == 4 ? (
                  <LainnyaScreen />
               ) : currentIndex == 2 ? (
                  <LaporanScreen />
               ) : (
                  <PilihLeaderboardScreen />
               )}

               <View style={styles.bottomTabBarStyle}>
                  {bottomNavMenu.map((val, idx) =>
                     bottomTabBarItem({
                        index: idx,
                        icon: (
                           <MaterialIcons
                              name={val.icon}
                              size={27}
                              color={Colors.orangeColor}
                           />
                        ),
                        title: val.title,
                     })
                  )}
               </View>
               <StatusBar backgroundColor={Colors.primaryColor} />
            </View>
         ) : checkVersion.upToDate === 1 || checkVersion.upToDate === 2 ? (
            <VersionMessage
               message={checkVersion.message}
               status={checkVersion.upToDate}
            />
         ) : (
            <>
               {checkVersion.error && (
                  <NoData
                     msg={
                        "Telah terjadi kesalahan, silahkan coba beberapa saat lagi"
                     }
                     button={
                        <Button
                           width={150}
                           onPress={() => navigation.navigate("InitialScreen")}
                        >
                           Coba Sekarang
                        </Button>
                     }
                  />
               )}
            </>
         )}
      </>
   );
};

const styles = StyleSheet.create({
   bottomTabBarStyle: {
      position: "absolute",
      bottom: 0.0,
      left: 0.0,
      right: 0.0,
      height: 65.0,
      backgroundColor: "white",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: Sizes.fixPadding * 2.0,
      elevation: 4,
      borderTopEndRadius: 15,
      borderTopStartRadius: 15,
   },
});
