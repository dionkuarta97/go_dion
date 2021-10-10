import React from "react";
import {
    Text,
    View,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {MaterialIcons} from "@expo/vector-icons";
import SliverAppBar from "../../Components/sliverAppBar";
import {LpColorsUtils, LpSizesUtils} from "../../Theme/utils/learnProUtils";
import {LpFontStyles} from "../../Theme/styles/learnProStyles";
import {useNavigation} from "@react-navigation/core";
import LoginContent from "./Component/LoginContent";

const LoginScreen = (props) => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "#FAFAFA"}}>
            <SliverAppBar
                leftItem={
                    <MaterialIcons
                        name="arrow-back-ios"
                        size={24}
                        color={LpColorsUtils.blackColor}
                        onPress={() => navigation.goBack()}
                    />
                }
                element={
                    <Text style={{...LpFontStyles.black25Bold}}>Login</Text>
                }
                toolbarColor={LpColorsUtils.primaryColor}
                toolBarMinHeight={40}
                toolbarMaxHeight={230}
                src={require("../../../assets/Images/appbar_bg.png")}
            >
                <LoginContent />
                <StatusBar backgroundColor={LpColorsUtils.primaryColor} />
            </SliverAppBar>
        </SafeAreaView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
