import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./Redux/store";
import { NativeBaseProvider } from "native-base";
import ForgotPasswordScreen from "./Screens/Auth/forgotPasswordScreen";
import LoginScreen from "./Screens/Auth/loginScreen";
import RegisterScreen from "./Screens/Auth/registerScreen";
import CartScreen from "./Screens/Cart/cartScreen";
import FilterResultScreen from "./Screens/Filter/filterResultScreen";
import FilterScreen from "./Screens/Filter/filterScreen";
import MainScreen from "./Screens/Global/mainScreen";
import PaymentScreen from "./Screens/Payment/paymentScreen";
import ProductCategoryScreen from "./Screens/Products/productCategoryScreen";
import ProductDetailScreen from "./Screens/Products/productDetailScreen";
import ProductScreen from "./Screens/Products/productScreen";
import CheckoutScreen from "./Screens/Payment/checkoutScreen";
import PaymentMethodScreen from "./Screens/Payment/paymentMethodScreen";
import LainnyaScreen from "./Screens/Lainnya/lainnyaScreen";
import ProfileScreen from "./Screens/Profile/profileScreen";
import ProfileEditScreen from "./Screens/Profile/profileEditScreen";
import GoBelajarScreen from "./Screens/GoBelajar/gobelajarScreen";
import SubMateriScreen from "./Screens/GoBelajar/subMateriScreen";
import TryoutDetailScreen from "./Screens/GoTryout/tryoutDetailScreen";
import SoalScreen from "./Screens/Soal/soalScreen";
import EmailCheckScreen from "./Screens/Auth/emailCheckScreen";
import ProductPurchasedScreen from "./Screens/Products/productPurchasedScreen";
import InitialScreen from "./Screens/Global/initialScreen";
import MateriVideoScreen from "./Screens/GoBelajar/materiVideoScreen";
import MateriEbookScreen from "./Screens/GoBelajar/materiEbookScreen";
import NewPasswordScreen from "./Screens/Auth/newPasswordScreen";
import PDFScreen from "./Screens/GoBelajar/pdfScreen";
import ScoreScreen from "./Screens/Score/scoreScreen";
import Colors from "../sources/Theme/Colors";
import ProductIncludeScreen from "./Screens/Products/productIncludeScreen";
import ScoreListScreen from "./Screens/Score/scoreListScreen";
import BaseurlScreen from "./Screens/Lainnya/baseurlScreen";
import PurchasePendingScreen from "./Screens/Purchase/purchasePendingScreen";
import GantiPasswordScreen from "./Screens/Profile/GantiPasswordScreen";
import GoTryoutScreen from "./Screens/GoTryout/GoTryoutScreen";
import BoardingScreen from "./Screens/Boarding/BoardingScreen";
import OneSignal from "react-native-onesignal";
import TryoutScoreScreen from "./Screens/GoTryout/TryoutScoreScreen";
import PilihProdiScreen from "./Screens/Profile/PilihProdiScreen";
import LihatProdiScreen from "./Screens/Profile/LihatProdiScreen";
import { LaporanTryoutScreen } from "./Screens/Laporan/LaporanTryoutScreen";
import ProgressTryout from "./Screens/Laporan/ProgressTryout";
import TestVideo from "./Screens/Home/Component/TestVideo";
import LeaderboardScreen from "./Screens/Leaderboard/LeaderboardScreen";
import MyPosition from "./Screens/Leaderboard/MyPosition";
import { Platform, StatusBar, View, Dimensions } from "react-native";
import PilihLeaderboardScreen from "./Screens/Leaderboard/PilihLeaderboardScreen";
import LeaderTryoutScreen from "./Screens/Leaderboard/LeaderTryoutScreen";
import GantiFotoScreen from "./Screens/Profile/GantiFotoScreen";
import TryoutLeaderScreen from "./Screens/Leaderboard/TryoutLeaderScreen";
import PositionTryoutScreen from "./Screens/Leaderboard/PositionTryoutScreen";
import SolusiScreen from "./Screens/Laporan/SolusiScreen";
import ProductTerbeliScreen from "./Screens/Products/ProductTerbeliScreen";

const Stack = createStackNavigator();
const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;
const HEADER_HEIGHT = Platform.OS === "ios" ? 44 : 56;

export default App = () => {
  const config = {
    screens: {
      NewPasswordScreen: "newpassword/:email/:token/:date/:expdate",
    },
  };
  const linkingAndroid = {
    prefixes: ["https://goapp/"],
    config,
  };
  const linkingIos = {
    prefixes: ["https://student.gobimbelonline.net", "goonline://"],
    config,
  };

  useEffect(() => {
    OneSignal.setLogLevel(6, 0);
    OneSignal.setAppId("419576d0-3ce4-47c8-9538-452216cfb157");
    OneSignal.setNotificationOpenedHandler((notification) => {});
    if (Platform.OS === "ios") {
      OneSignal.promptForPushNotificationsWithUserResponse((response) => {});
    }
  }, []);

  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {Platform.OS === "ios" && (
            <View
              style={{
                height: Dimensions.get("window").height > 700 ? 48 : 20,
                backgroundColor: "#FFC226",
              }}
            >
              <StatusBar
                translucent
                backgroundColor="#FFC226"
                barStyle="dark-content"
              />
            </View>
          )}

          <NavigationContainer
            linking={Platform.OS === "android" ? linkingAndroid : linkingIos}
          >
            <Stack.Navigator
              initialRouteName="InitialScreen"
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="InitialScreen" component={InitialScreen} />
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen
                name="EmailCheckScreen"
                component={EmailCheckScreen}
              />
              <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
              <Stack.Screen
                name="ForgotPasswordScreen"
                component={ForgotPasswordScreen}
              />
              <Stack.Screen
                name="NewPasswordScreen"
                component={NewPasswordScreen}
              />
              <Stack.Screen name="MainScreen" component={MainScreen} />
              <Stack.Screen name="ProductScreen" component={ProductScreen} />
              <Stack.Screen
                name="ProductCategoryScreen"
                component={ProductCategoryScreen}
              />
              <Stack.Screen
                name="ProductDetailScreen"
                component={ProductDetailScreen}
              />
              <Stack.Screen
                name="ProductPurchasedScreen"
                component={ProductPurchasedScreen}
              />
              <Stack.Screen
                name="ProductIncludeScreen"
                component={ProductIncludeScreen}
              />
              <Stack.Screen name="FilterScreen" component={FilterScreen} />
              <Stack.Screen
                name="FilterResultScreen"
                component={FilterResultScreen}
              />
              <Stack.Screen name="CartScreen" component={CartScreen} />
              <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
              <Stack.Screen
                name="PaymentMethodScreen"
                component={PaymentMethodScreen}
              />
              <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
              <Stack.Screen
                name="PurchasePendingScreen"
                component={PurchasePendingScreen}
              />
              <Stack.Screen name="LainnyaScreen" component={LainnyaScreen} />
              <Stack.Screen name="BaseurlScreen" component={BaseurlScreen} />
              <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
              <Stack.Screen
                name="ProfileEditScreen"
                component={ProfileEditScreen}
              />
              <Stack.Screen
                name="GantiPasswordScreen"
                component={GantiPasswordScreen}
              />
              <Stack.Screen
                name="GoBelajarScreen"
                component={GoBelajarScreen}
              />
              <Stack.Screen
                name="SubMateriScreen"
                component={SubMateriScreen}
              />
              <Stack.Screen
                name="MateriVideoScreen"
                component={MateriVideoScreen}
              />
              <Stack.Screen
                name="MateriEbookScreen"
                component={MateriEbookScreen}
              />
              <Stack.Screen
                name="PDFScreen"
                component={PDFScreen}
                options={{
                  headerShown: true,
                  headerTintColor: "black",
                  title: "",
                  headerStyle: {
                    backgroundColor: Colors.primaryColor,
                  },
                }}
              />
              <Stack.Screen name="GoTryoutScreen" component={GoTryoutScreen} />
              <Stack.Screen
                name="TryoutDetailScreen"
                component={TryoutDetailScreen}
              />
              <Stack.Screen name="SoalScreen" component={SoalScreen} />
              <Stack.Screen name="ScoreScreen" component={ScoreScreen} />
              <Stack.Screen
                name="ScoreListScreen"
                component={ScoreListScreen}
              />
              <Stack.Screen name="BoardingScreen" component={BoardingScreen} />
              <Stack.Screen
                name="TryoutScoreScreen"
                component={TryoutScoreScreen}
              />
              <Stack.Screen
                name="PilihProdiScreen"
                component={PilihProdiScreen}
              />
              <Stack.Screen
                name="LihatProdiScreen"
                component={LihatProdiScreen}
              />
              <Stack.Screen
                name="LaporanTryoutScreen"
                component={LaporanTryoutScreen}
              />
              <Stack.Screen name="ProgressTryout" component={ProgressTryout} />
              <Stack.Screen name="TestVideo" component={TestVideo} />
              <Stack.Screen
                name="LeaderboardScreen"
                component={LeaderboardScreen}
              />
              <Stack.Screen
                name="PilihLeaderboardScreen"
                component={PilihLeaderboardScreen}
              />
              <Stack.Screen
                name="LeaderTryoutScreen"
                component={LeaderTryoutScreen}
              />
              <Stack.Screen name="MyPosition" component={MyPosition} />
              <Stack.Screen
                name="TryoutLeaderScreen"
                component={TryoutLeaderScreen}
              />
              <Stack.Screen
                name="GantiFotoScreen"
                component={GantiFotoScreen}
              />
              <Stack.Screen
                name="PositionTryoutScreen"
                component={PositionTryoutScreen}
              />
              <Stack.Screen name="SolusiScreen" component={SolusiScreen} />
              <Stack.Screen
                name="ProductTerbeliScreen"
                component={ProductTerbeliScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
          {Platform.OS === "ios" && (
            <View
              style={{
                height: Dimensions.get("window").height > 700 ? 48 : 20,
                backgroundColor: "#FFFFF",
              }}
            >
              <StatusBar
                translucent
                backgroundColor="#FFFFF"
                barStyle="dark-content"
              />
            </View>
          )}
        </PersistGate>
      </Provider>
    </NativeBaseProvider>
  );
};
