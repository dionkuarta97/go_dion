import React from "react";
import PropTypes from "prop-types";
import {
    Dimensions,
    Modal,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
} from "react-native";
import Sizes from "../../Theme/Sizes";
import Colors from "../../Theme/Colors";

const LoadingModal = (props) => {
    return (
        <Modal transparent={true} animationType="fade">
            <View style={styles.container}>
                <View style={styles.dimBackground} />
                <View style={styles.dialog}>
                    <ActivityIndicator
                        color={Colors.primaryColor}
                        animating={true}
                        size="large"
                    />
                </View>
            </View>
        </Modal>
    );
};

export default LoadingModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },
    dimBackground: {
        width: "100%",
        height: "100%",
        position: "absolute",
        backgroundColor: "black",
        opacity: 0.3,
    },
    dialog: {
        width: Dimensions.get("screen").width * 0.8,
        maxHeight: 120,
        backgroundColor: "white",
        padding: Sizes.fixPadding * 2,
        borderRadius: Sizes.fixPadding,
    },
});
