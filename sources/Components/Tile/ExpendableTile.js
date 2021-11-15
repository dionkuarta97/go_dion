import React, { useState } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import Sizes from "../../Theme/Sizes";
import Fonts from "../../Theme/Fonts";

const proptype = {
    header: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
    tile: PropTypes.node.isRequired,
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
                {props.tile}
                {props.header}
            </TouchableOpacity>
            {isExpand && (
                <Animated.View style={{ height: isExpand ? null : 0 }}>
                    {props.children}
                </Animated.View>
            )}
        </View>
    );
};

ExpandableTile.propTypes = proptype;

export default ExpandableTile;
