import {useNavigation} from "@react-navigation/core";
import React from "react";
import {StyleSheet, Text, View} from "react-native";
import DefaultPrimaryButton from "../../../Components/Button/DefaultPrimaryButton";
import DefaultTextInput from "../../../Components/CustomTextInput/DefaultTextInput";
import {LpFontStyles} from "../../../Theme/styles/learnProStyles";
import {LpColorsUtils, LpSizesUtils} from "../../../Theme/utils/learnProUtils";

const FilterSearchText = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.card}>
            <Text style={{...LpFontStyles.black17Regular}}>
                Ketikkan pelajaran atau bab yang kamu inginkan dibawah ini.
            </Text>

            <DefaultTextInput placeholder="ketikkan yang dicari" />

            <View style={{width: 180, alignSelf: "flex-end"}}>
                <DefaultPrimaryButton
                    text="Cari"
                    onPress={() => navigation.navigate("FilterResultScreen")}
                />
            </View>
        </View>
    );
};

export default FilterSearchText;

const styles = StyleSheet.create({
    card: {
        marginVertical: LpSizesUtils.fixPadding,
        backgroundColor: LpColorsUtils.whiteColor,
        borderRadius: LpSizesUtils.fixPadding,
        padding: LpSizesUtils.fixPadding,
        elevation: 2,
    },
});
