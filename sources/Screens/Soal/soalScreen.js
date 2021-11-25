import React, {useEffect, useState} from "react";
import {
    Alert,
    SafeAreaView,
    Text,
    ScrollView,
    View,
    StyleSheet,
} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";
import {useDispatch, useSelector} from "react-redux";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import DefaultPrimaryButton from "../../Components/Button/DefaultPrimaryButton";
import RoundedButton from "../../Components/Button/RoundedButton";
import LoadingIndicator from "../../Components/Indicator/LoadingIndicator";
import {getSoal, setNumber} from "../../Redux/Soal/soalActions";
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
import SoalContent from "./Component/soalContent";
import TimerSoal from "./Component/TimerSoal";

const SoalScreen = () => {
    const dispatch = useDispatch();
    const soal = useSelector((state) => state.soalReducer.soal);

    useEffect(() => {
        dispatch(getSoal());
    }, []);

    return (
        <SafeAreaView style={{flex: 1}}>
            <DefaultAppBar title="Soal" backEnabled={true} />
            {soal.loading && <LoadingIndicator />}
            {soal.data != null && <SoalContent />}
        </SafeAreaView>
    );
};

export default SoalScreen;

const styles = StyleSheet.create({});
