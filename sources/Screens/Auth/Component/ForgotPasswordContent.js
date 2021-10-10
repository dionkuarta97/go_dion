import {useNavigation} from "@react-navigation/core";
import React, {useState} from "react";
import {Text, View} from "react-native";
import DefaultPrimaryButton from "../../../Components/Button/DefaultPrimaryButton";
import DefaultTextInput from "../../../Components/CustomTextInput/DefaultTextInput";
import {Fontisto} from "@expo/vector-icons";

import {LpFontStyles} from "../../../Theme/styles/learnProStyles";
import {LpColorsUtils, LpSizesUtils} from "../../../Theme/utils/learnProUtils";

const ForgotPasswordContent = () => {
    const navigation = useNavigation();

    const [kirim, setKirim] = useState(false);
    return (
        <View
            style={{
                paddingVertical: LpSizesUtils.fixPadding * 7.0,
                paddingHorizontal: LpSizesUtils.fixPadding * 2.0,
            }}
        >
            {!kirim ? (
                <View>
                    <View style={{marginBottom: LpSizesUtils.fixPadding}}>
                        <Text style={{...LpFontStyles.black17Regular}}>
                            Masukkan email yang kamu daftarkan. Kami akan
                            mengirimkan link untuk informasi password
                        </Text>
                    </View>
                    <DefaultTextInput placeholder="email kamu" />

                    <DefaultPrimaryButton
                        text="Kirim Permintaan"
                        onPress={() => setKirim(true)}
                    />
                </View>
            ) : (
                <View>
                    <View style={{flex: 1, alignItems: "center"}}>
                        <Fontisto
                            name="paper-plane"
                            size={100}
                            color={LpColorsUtils.primaryColor}
                        />
                        <View
                            style={{marginVertical: 50, alignItems: "center"}}
                        >
                            <Text style={{...LpFontStyles.black17Regular}}>
                                Kami mengirimkan link ke email kamu
                            </Text>
                            <Text
                                style={{
                                    ...LpFontStyles.black17Bold,
                                    marginTop: 20,
                                }}
                            >
                                emailku@gmail.com
                            </Text>
                        </View>
                    </View>
                    <DefaultPrimaryButton
                        text="Kembali ke halaman login"
                        onPress={() => navigation.goBack()}
                    />
                </View>
            )}
        </View>
    );
};

export default ForgotPasswordContent;
