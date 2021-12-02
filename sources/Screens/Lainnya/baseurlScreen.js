import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import DefaultPrimaryButton from "../../Components/Button/DefaultPrimaryButton";
import DefaultTextInput from "../../Components/CustomTextInput/DefaultTextInput";
import { setBaseurl } from "../../Redux/Init/initActions";
import Sizes from "../../Theme/Sizes";

const BaseurlScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [newBaseUrl, setNewBaseUrl] = useState("");

    const baseUrl = useSelector((state) => state.initReducer.baseUrl);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <DefaultAppBar title="Ganti BaseUrl" backEnabled={true} />
            <View style={{ flex: 1, padding: Sizes.fixPadding * 2 }}>
                <Text>Current Base Url : {baseUrl}</Text>

                <DefaultTextInput
                    placeholder="New BaseUrl"
                    onChangeText={setNewBaseUrl}
                />
                <DefaultPrimaryButton
                    text="Submit New Base Url"
                    onPress={() => {
                        dispatch(setBaseurl(newBaseUrl));
                    }}
                />
                <TouchableOpacity
                    onPress={() => {
                        dispatch(
                            setBaseurl("https://apionline.gobimbelonline.net")
                        );
                    }}
                >
                    <Text>Back to normal</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default BaseurlScreen;
