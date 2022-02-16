import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
import { useToast } from "native-base";
import ToastErrorContent from "../../Components/ToastErrorContent";

const bottomNavMenu = [
  { title: "Home", icon: "home" },
  { title: "Pembelian", icon: "shopping-cart" },
  { title: "Laporan", icon: "show-chart" },
  { title: "Leaderboard", icon: "insert-chart" },
  { title: "Lainnya", icon: "more-vert" },
];

export default MainScreen = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { firstLogin } = useSelector((state) => state.authReducer);
  const { checkVersion } = useSelector((state) => state.versionReducer);
  const toast = useToast();
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
      {checkVersion.upToDate ? (
        <View style={{ flex: 1 }}>
          {currentIndex == 0 ? (
            <HomeScreen />
          ) : currentIndex == 1 ? (
            <PurchaseScreen />
          ) : currentIndex == 4 ? (
            <LainnyaScreen />
          ) : currentIndex == 2 ? (
            <LaporanScreen />
          ) : (
            <SafeAreaView style={{ flex: 1 }}>
              <DefaultAppBar title={"Leaderboard"} />
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "white",
                }}
              >
                <Image
                  style={{
                    width: Dimensions.get("screen").width / 2,
                    height: Dimensions.get("screen").width / 2,
                  }}
                  source={require("../../../assets/Images/helper/underdev.png")}
                />

                <Text style={{ fontSize: 15 }}>Data ini akan muncul</Text>
                <Text style={{ fontSize: 15 }}>
                  setelah kamu melakukan tryout
                </Text>
              </View>
            </SafeAreaView>
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
      ) : (
        <NoData msg={checkVersion.message} />
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
