import React, {useEffect, useLayoutEffect} from "react";
import {View, StyleSheet, Text} from "react-native";
import * as Font from "expo-font";

export default LoadingScreen = ({navigation}) => {
    const _loadFontsAsync = async () => {
        await Font.loadAsync({
            SignikaNegative_Bold: require("../../../assets/Fonts/SignikaNegative-Bold.ttf"),
            SignikaNegative_Regular: require("../../../assets/Fonts/SignikaNegative-Regular.ttf"),
        });

        //TODO:Navigate to Splashscreen
        setTimeout(() => {
            navigation.replace("MainScreen");
        }, 2000);
    };

    useEffect(() => {
        _loadFontsAsync();
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
