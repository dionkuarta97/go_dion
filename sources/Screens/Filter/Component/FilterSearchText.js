import {useNavigation} from "@react-navigation/core";
import React from "react";
import {StyleSheet, Text, View} from "react-native";
import DefaultPrimaryButton from "../../../Components/Button/DefaultPrimaryButton";
import DefaultCard from "../../../Components/Card/DefaultCard";
import DefaultTextInput from "../../../Components/CustomTextInput/DefaultTextInput";

import Fonts from "../../../Theme/Fonts";
import Sizes from "../../../Theme/Sizes";
import Colors from "../../../Theme/Colors";

const FilterSearchText = () => {
    const navigation = useNavigation();
    return (
        <DefaultCard>
            <Text style={{...Fonts.black17Regular}}>
                Ketikkan pelajaran atau bab yang kamu inginkan dibawah ini.
            </Text>

            <DefaultTextInput placeholder="ketikkan yang dicari" />

            <View style={{width: 180, alignSelf: "flex-end"}}>
                <DefaultPrimaryButton
                    text="Cari"
                    onPress={() => navigation.navigate("FilterResultScreen")}
                />
            </View>
        </DefaultCard>
    );
};

export default FilterSearchText;
