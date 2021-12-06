import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./Redux/store";
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
import productPurchasedScreen from "./Screens/Products/productPurchasedScreen";
import ProductPurchasedScreen from "./Screens/Products/productPurchasedScreen";
import initialScreen from "./Screens/Global/initialScreen";
import MateriVideoScreen from "./Screens/GoBelajar/materiVideoScreen";
import MateriEbookScreen from "./Screens/GoBelajar/materiEbookScreen";
import NewPasswordScreen from "./Screens/Auth/newPasswordScreen";
import PDFScreen from "./Screens/GoBelajar/pdfScreen";
import ScoreScreen from "./Screens/Score/scoreScreen";
import Colors from "../sources/Theme/Colors";
import ProductIncludeScreen from "./Screens/Products/productIncludeScreen";
import ScoreListScreen from "./Screens/Score/scoreListScreen";
import BaseurlScreen from "./Screens/Lainnya/baseurlScreen";

const Stack = createStackNavigator();

export default App = () => {
    const config = {
        screens: {
            NewPasswordScreen: "newpassword/:email/:token/:date/:expdate",
        },
    };

    const linking = {
        prefixes: ["https://goapp/"],
        config,
    };

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NavigationContainer linking={linking}>
                    <Stack.Navigator
                        initialRouteName="InitialScreen"
                        screenOptions={{
                            headerShown: false,
                        }}
                    >
                        <Stack.Screen
                            name="InitialScreen"
                            component={initialScreen}
                        />
                        <Stack.Screen
                            name="LoginScreen"
                            component={LoginScreen}
                        />
                        <Stack.Screen
                            name="EmailCheckScreen"
                            component={EmailCheckScreen}
                        />
                        <Stack.Screen
                            name="RegisterScreen"
                            component={RegisterScreen}
                        />
                        <Stack.Screen
                            name="ForgotPasswordScreen"
                            component={ForgotPasswordScreen}
                        />
                        <Stack.Screen
                            name="NewPasswordScreen"
                            component={NewPasswordScreen}
                        />
                        <Stack.Screen
                            name="MainScreen"
                            component={MainScreen}
                        />
                        <Stack.Screen
                            name="ProductScreen"
                            component={ProductScreen}
                        />
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
                        <Stack.Screen
                            name="FilterScreen"
                            component={FilterScreen}
                        />
                        <Stack.Screen
                            name="FilterResultScreen"
                            component={FilterResultScreen}
                        />
                        <Stack.Screen
                            name="CartScreen"
                            component={CartScreen}
                        />
                        <Stack.Screen
                            name="PaymentScreen"
                            component={PaymentScreen}
                        />
                        <Stack.Screen
                            name="PaymentMethodScreen"
                            component={PaymentMethodScreen}
                        />
                        <Stack.Screen
                            name="CheckoutScreen"
                            component={CheckoutScreen}
                        />
                        <Stack.Screen
                            name="LainnyaScreen"
                            component={LainnyaScreen}
                        />
                        <Stack.Screen
                            name="BaseurlScreen"
                            component={BaseurlScreen}
                        />
                        <Stack.Screen
                            name="ProfileScreen"
                            component={ProfileScreen}
                        />
                        <Stack.Screen
                            name="ProfileEditScreen"
                            component={ProfileEditScreen}
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
                        <Stack.Screen
                            name="TryoutDetailScreen"
                            component={TryoutDetailScreen}
                        />
                        <Stack.Screen
                            name="SoalScreen"
                            component={SoalScreen}
                        />
                        <Stack.Screen
                            name="ScoreScreen"
                            component={ScoreScreen}
                        />
                        <Stack.Screen
                            name="ScoreListScreen"
                            component={ScoreListScreen}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </PersistGate>
        </Provider>
    );
};
