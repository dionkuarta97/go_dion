import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import React, {useState} from "react";
import {Provider} from "react-redux";

import {PersistGate} from "redux-persist/integration/react";
import {persistor, store} from "./Redux/store";
import ForgotPasswordScreen from "./Screens/Auth/forgotPasswordScreen";
import LoginScreen from "./Screens/Auth/loginScreen";
import RegisterScreen from "./Screens/Auth/registerScreen";
import CartScreen from "./Screens/Cart/cartScreen";
import FilterResultScreen from "./Screens/Filter/filterResultScreen";
import FilterScreen from "./Screens/Filter/filterScreen";

import LoadingScreen from "./Screens/Global/loadingScreen";
import MainScreen from "./Screens/Global/mainScreen";
import PaymentScreen from "./Screens/Payment/paymentScreen";
import ProductCategoryScreen from "./Screens/Products/productCategoryScreen";
import ProductDetailScreen from "./Screens/Products/productDetailScreen";
import ProductScreen from "./Screens/Products/productScreen";
import CheckoutScreen from "./Screens/Payment/checkoutScreen";
import PaymentMethodScreen from "./Screens/Payment/paymentMethodScreen";

const Stack = createStackNavigator();

export default App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NavigationContainer>
                    <Stack.Navigator
                        initialRouteName="LoadingScreen"
                        screenOptions={{
                            headerShown: false,
                        }}
                    >
                        <Stack.Screen
                            name="LoadingScreen"
                            component={LoadingScreen}
                        />
                        <Stack.Screen
                            name="LoginScreen"
                            component={LoginScreen}
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
                    </Stack.Navigator>
                </NavigationContainer>
            </PersistGate>
        </Provider>
    );
};