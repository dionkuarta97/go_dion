import React, {useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import {LpColorsUtils, LpSizesUtils} from "../Theme/utils/learnProUtils";
import {LpFontStyles} from "../Theme/styles/learnProStyles";
import PropTypes from "prop-types";

const proptype = {
    icon: PropTypes.string,
    title: PropTypes.string.isRequired,
    url: PropTypes.string,
    data: PropTypes.array,
    onChange: PropTypes.func,
};
const SingleBadgeSelection = (props) => {
    const [selectedIndex, setselectedIndex] = useState(0);
    const badgeComponent = (idx, title) => {
        return (
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                    setselectedIndex(idx);
                }}
            >
                <Text
                    style={{
                        ...styles.badge,
                        backgroundColor:
                            selectedIndex == idx
                                ? LpColorsUtils.orangeColor
                                : LpColorsUtils.whiteColor,
                        borderWidth: selectedIndex == idx ? 0 : 1,
                        borderColor: LpColorsUtils.blackColor,
                    }}
                >
                    {title}
                </Text>
            </TouchableOpacity>
        );
    };
    return (
        <View style={{marginTop: LpSizesUtils.fixPadding * 2}}>
            <View
                style={{
                    flexDirection: "row",
                    marginBottom: LpSizesUtils.fixPadding,
                }}
            >
                {props.icon != null && (
                    <MaterialIcons name={props.icon} size={25} color="black" />
                )}
                <View style={{width: LpSizesUtils.fixPadding}} />
                <Text style={LpFontStyles.black17Bold}>{props.title}</Text>
            </View>
            <View style={{flexDirection: "row", flexWrap: "wrap"}}>
                {badgeComponent(0, "Semua Pelajaran")}
                {badgeComponent(1, "Bahasa Indonesia")}
            </View>
        </View>
    );
};

export default SingleBadgeSelection;

SingleBadgeSelection.propTypes = proptype;

const styles = StyleSheet.create({
    badge: {
        paddingVertical: LpSizesUtils.fixPadding / 2,
        paddingHorizontal: LpSizesUtils.fixPadding * 2,
        borderRadius: 50,
        marginRight: LpSizesUtils.fixPadding,
    },
});
