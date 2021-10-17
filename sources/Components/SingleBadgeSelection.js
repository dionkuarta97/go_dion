import React, {useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import PropTypes from "prop-types";

import Fonts from "../Theme/Fonts";
import Sizes from "../Theme/Sizes";
import Colors from "../Theme/Colors";

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
                                ? Colors.orangeColor
                                : Colors.whiteColor,
                        borderWidth: selectedIndex == idx ? 0 : 1,
                        borderColor: Colors.blackColor,
                    }}
                >
                    {title}
                </Text>
            </TouchableOpacity>
        );
    };
    return (
        <View style={{marginTop: Sizes.fixPadding * 2}}>
            <View
                style={{
                    flexDirection: "row",
                    marginBottom: Sizes.fixPadding,
                }}
            >
                {props.icon != null && (
                    <MaterialIcons name={props.icon} size={25} color="black" />
                )}
                <View style={{width: Sizes.fixPadding}} />
                <Text style={Fonts.black17Bold}>{props.title}</Text>
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
        paddingVertical: Sizes.fixPadding / 2,
        paddingHorizontal: Sizes.fixPadding * 2,
        borderRadius: 50,
        marginRight: Sizes.fixPadding,
    },
});
