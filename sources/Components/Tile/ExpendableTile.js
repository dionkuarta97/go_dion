import React, {useState} from "react";
import {Animated, Text, TouchableOpacity, View} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import PropTypes from "prop-types";
import Sizes from "../../Theme/Sizes";
import Fonts from "../../Theme/Fonts";

const proptype = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
    children: PropTypes.node.isRequired,
};

const ExpandableTile = (props) => {
    const [isExpand, setIsExpand] = useState(false);
    return (
        <View>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                    setIsExpand(!isExpand);
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        backgroundColor: "white",
                        paddingVertical: Sizes.fixPadding * 2,
                        paddingHorizontal: Sizes.fixPadding * 2,
                        justifyContent: "center",
                        alignItems: "center",
                        borderWidth: 1,
                        borderColor: "lightgrey",
                    }}
                >
                    {props.icon != null && (
                        <MaterialIcons
                            name={props.icon}
                            size={22}
                            color="black"
                            style={{marginRight: Sizes.fixPadding}}
                        />
                    )}

                    <Text style={{flex: 1, ...Fonts.black15Bold}}>
                        {props.title}
                    </Text>
                    {isExpand ? (
                        <MaterialIcons
                            name="keyboard-arrow-down"
                            size={25}
                            color="black"
                        />
                    ) : (
                        <MaterialIcons
                            name="chevron-right"
                            size={25}
                            color="black"
                        />
                    )}
                </View>
            </TouchableOpacity>
            {isExpand && (
                <Animated.View style={{height: isExpand ? null : 0}}>
                    {props.children}
                </Animated.View>
            )}
        </View>
    );
};

ExpandableTile.propTypes = proptype;

export default ExpandableTile;
