import React from "react";
import {Alert, Text, TouchableOpacity, View} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import Sizes from "../../../Theme/Sizes";
import Colors from "../../../Theme/Colors";
import Fonts from "../../../Theme/Fonts";
import {useNavigation} from "@react-navigation/core";
import {useDispatch, useSelector} from "react-redux";
import {setLoginData, setLoginStatus} from "../../../Redux/Auth/authActions";
import {defaultInitState} from "../../../Redux/helper";

const LainnyaContent = () => {
    const isLogin = useSelector((state) => state.authReducer.isLogin);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const renderTile = (lable, icon, onPress) => {
        return (
            <TouchableOpacity activeOpacity={0.7} onPress={() => onPress()}>
                <View
                    style={{
                        flexDirection: "row",
                        padding: Sizes.fixPadding * 2,
                        backgroundColor: "white",
                        elevation: 2,
                        marginBottom: Sizes.fixPadding * 2,
                        alignItems: "center",
                    }}
                >
                    <MaterialIcons name={icon} size={28} color="gray" />
                    <Text
                        style={{
                            flex: 1,
                            ...Fonts.gray17Regular,
                            fontWeight: "bold",
                            marginLeft: Sizes.fixPadding,
                        }}
                    >
                        {lable}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };
    return (
        <View style={{flex: 1, paddingVertical: Sizes.fixPadding * 2}}>
            {renderTile("Profil", "person", () => {
                if (isLogin) {
                    navigation.navigate("ProfileScreen");
                } else {
                    Alert.alert(
                        "Tidak Bisa Masuk",
                        "Anda belum punya akun untuk mengakses menu ini"
                    );
                }
            })}
            {renderTile("History Pengerjaan", "history", () =>
                navigation.navigate("history")
            )}
            {isLogin &&
                renderTile("Logout", "logout", () => {
                    dispatch(setLoginStatus(false));
                    dispatch(
                        setLoginData({
                            data: null,
                            loading: false,
                            error: null,
                        })
                    );
                })}
        </View>
    );
};

export default LainnyaContent;
