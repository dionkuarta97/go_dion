import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import React, {useState} from "react";
import {Provider} from "react-redux";

import {PersistGate} from "redux-persist/integration/react";
import {persistor, store} from "./Redux/store";
import ForgotPasswordScreen from "./Screens/Auth/forgotPasswordScreen";
import LoginScreen from "./Screens/Auth/loginScreen";
import RegisterScreen from "./Screens/Auth/registerScreen";

import LoadingScreen from "./Screens/Global/loadingScreen";
import MainScreen from "./Screens/Global/mainScreen";
import ProductDetailScreen from "./Screens/Products/productDetailScreen";

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
                            name="ProductDetailScreen"
                            component={ProductDetailScreen}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </PersistGate>
        </Provider>
    );
};
