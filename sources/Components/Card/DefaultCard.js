import React from "react";
import {StyleSheet, Text, View} from "react-native";
import PropTypes from "prop-types";
import CompStyles from "../../Theme/styles/globalStyles";

const propTypes = {
    children: PropTypes.node.isRequired,
};

const DefaultCard = (props) => {
    return <View style={CompStyles.defaultCard}>{props.children}</View>;
};

export default DefaultCard;
