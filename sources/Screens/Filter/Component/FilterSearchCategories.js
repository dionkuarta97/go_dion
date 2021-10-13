import React from "react";
import {useNavigation} from "@react-navigation/core";
import {StyleSheet, Text, View} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import DefaultPrimaryButton from "../../../Components/Button/DefaultPrimaryButton";
import {LpColorsUtils, LpSizesUtils} from "../../../Theme/utils/learnProUtils";
import {LpFontStyles} from "../../../Theme/styles/learnProStyles";
import SingleBadgeSelection from "../../../Components/SingleBadgeSelection";

const listCategories = [
    {id: 1, title: "Pelajaran", type: "pelajaran", url: "urlFilterPelajaran"},
    {id: 2, title: "Kelas", type: "kelas", url: "urlFilterKelas"},
    {id: 3, title: "Semester", type: "semester", url: "urlFilterSemester"},
];

const FilterSearchCategories = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.card}>
            <Text style={{...LpFontStyles.black17Regular}}>
                Atau pilih dari kriteria dibawah ini.
            </Text>

            {listCategories.map((val) => (
                <SingleBadgeSelection
                    key={`filtersection-${val.id}`}
                    title={val.title}
                    icon="filter-alt"
                />
            ))}

            <View
                style={{
                    width: 180,
                    alignSelf: "flex-end",
                    marginTop: 30,
                }}
            >
                <DefaultPrimaryButton
                    text="Cari"
                    onPress={() => navigation.navigate("FilterResultScreen")}
                />
            </View>
        </View>
    );
};

export default FilterSearchCategories;

const styles = StyleSheet.create({
    card: {
        marginVertical: LpSizesUtils.fixPadding,
        backgroundColor: LpColorsUtils.whiteColor,
        borderRadius: LpSizesUtils.fixPadding,
        padding: LpSizesUtils.fixPadding,
        elevation: 2,
    },
});
