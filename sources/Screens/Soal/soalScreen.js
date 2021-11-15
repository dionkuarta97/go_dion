import React, { useState } from "react";
import {
    Alert,
    SafeAreaView,
    Text,
    ScrollView,
    View,
    StyleSheet,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import DefaultPrimaryButton from "../../Components/Button/DefaultPrimaryButton";
import RoundedButton from "../../Components/Button/RoundedButton";
import Colors from "../../Theme/Colors";
import Fonts from "../../Theme/Fonts";
import Sizes from "../../Theme/Sizes";
import CompStyles from "../../Theme/styles/globalStyles";
import DelaySession from "./Component/DelaySession";
import ModalStatusSoal from "./Component/ModalStatusSoal";
import NavigasiSoal from "./Component/NavigasiSoal";
import PertanyaanEssay from "./Component/Pertanyaan/PertanyaanEssay";
import PertanyaanEssayMajemuk from "./Component/Pertanyaan/PertanyaanEssayMajemuk";
import PertanyaanPBCT from "./Component/Pertanyaan/PertanyaanPBCT";
import PertanyaanPBK from "./Component/Pertanyaan/PertanyaanPBK";
import PertanyaanPBS from "./Component/Pertanyaan/PertanyaanPBS";
import SoalPG from "./Component/Pertanyaan/PertanyaanPBS";
import TimerSoal from "./Component/TimerSoal";

const SoalScreen = () => {
    const totalSoal = 5;
    const [number, setNumber] = useState(1);

    const [visibleStatusModal, setVisibleStatusModal] = useState(false);

    const [delay, setDelay] = useState(false);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {visibleStatusModal && (
                <ModalStatusSoal
                    onClose={() => {
                        setVisibleStatusModal(false);
                        console.log("tes modal");
                    }}
                />
            )}
            <DefaultAppBar title="Soal" />
            <View style={{ padding: Sizes.fixPadding * 2 }}>
                <Text style={{ color: Colors.ligthGreyColor }}>Sesi 1/2</Text>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ ...Fonts.black17Bold, flex: 1 }}>
                        Bahasa Indonesia
                    </Text>
                    <View>
                        {/* <TimerSoal
                            length={10}
                            onDelay={() => {
                                console.log("delay mulai");
                                setDelay(true);
                            }}
                            onFinish={() => {
                                setDelay(false);
                                console.log("selesai");
                            }}
                        /> */}
                    </View>
                </View>
            </View>
            {delay && <DelaySession />}
            {!delay && (
                <View style={{ flex: 1 }}>
                    <View
                        style={{
                            flex: 1,
                            paddingHorizontal: Sizes.fixPadding * 2,
                            marginTop: Sizes.fixPadding,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginBottom: Sizes.fixPadding,
                            }}
                        >
                            <Text style={{ flex: 1, color: "black" }}>
                                Soal {number}/{totalSoal}
                            </Text>

                            <RoundedButton
                                title="Lihat Status"
                                onPress={() => setVisibleStatusModal(true)}
                            />
                        </View>
                        <ScrollView style={{ flex: 1 }}>
                            <PertanyaanEssayMajemuk />
                        </ScrollView>
                    </View>
                    <NavigasiSoal
                        itemLength={totalSoal}
                        currentIndex={0}
                        onChange={(index) => setNumber(index + 1)}
                        onFinish={() => console.log("Selesai")}
                    />
                </View>
            )}
        </SafeAreaView>
    );
};

export default SoalScreen;

const styles = StyleSheet.create({});
