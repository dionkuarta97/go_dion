import React, {useEffect, useLayoutEffect} from "react";
import {View, StyleSheet, Text} from "react-native";
import * as Font from "expo-font";
import {useDispatch, useSelector} from "react-redux";
import {
    setLoginData,
    setLoginStatus,
    setToken,
} from "../../Redux/Auth/authActions";
import {setProfile} from "../../Redux/Profile/profileActions";

export default InitialScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const login = useSelector((state) => state.authReducer.login);
    const _loadFontsAsync = async () => {
        await Font.loadAsync({
            SignikaNegative_Bold: require("../../../assets/Fonts/SignikaNegative-Bold.ttf"),
            SignikaNegative_Regular: require("../../../assets/Fonts/SignikaNegative-Regular.ttf"),
        });

        //TODO:Navigate to Splashscreen
        setTimeout(() => {
            navigation.replace("MainScreen");
            // navigation.replace("ScoreScreen");
        }, 2000);
    };

    useEffect(() => {
        _loadFontsAsync();

        if (login.data !== null) {
            console.log("Load ");
            dispatch(setProfile(login.data.user));
            dispatch(setToken(login.data.token));
        }

        // dispatch(setToken(null));
        // dispatch(setLoginStatus(false));
        // dispatch(setProfile(null));
        // dispatch(setLoginData({loading: false, error: null, data: null}));
    }, []);

    return (
        <View style={styles.container}>
            <Text>Loading</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
    },
});
