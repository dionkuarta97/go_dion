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
} from "react-native";
import {FlatGrid} from "react-native-super-grid";
import Colors from "../../../Theme/Colors";
import Fonts from "../../../Theme/Fonts";
import Sizes from "../../../Theme/Sizes";

const ModalStatusSoal = (props) => {
    const questions = props.questions;
    const answers = props.answers;
    const number = props.number;

    return (
        <Modal transparent={true} animationType="fade">
            <View style={styles.container}>
                <View style={styles.dimBackground} />
                <View style={styles.dialog}>
                    <Text style={{...Fonts.black17Bold, alignSelf: "center"}}>
                        Status Soal | Soal {questions.length}
                    </Text>
                    <FlatGrid
                        itemDimension={75}
                        spacing={Sizes.fixPadding * 2}
                        itemContainerStyle={{
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        item
                        data={questions}
                        renderItem={({item, index}) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => props.onSelect(index)}
                                >
                                    <View
                                        style={{
                                            width: 75,
                                            height: 75,
                                            // backgroundColor: "#FFE9E9",
                                            backgroundColor:
                                                index == number
                                                    ? "#7DC579"
                                                    : answers[index] !==
                                                      undefined
                                                    ? "#E1FFDF"
                                                    : "#FFE9E9",

                                            alignItems: "center",
                                            justifyContent: "center",
                                            borderRadius: Sizes.fixPadding * 2,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                // color: "#FF8181",
                                                color:
                                                    index == number
                                                        ? "white"
                                                        : answers[index] !==
                                                          undefined
                                                        ? "#7DC579"
                                                        : "#FF8181",
                                            }}
                                        >
                                            {index + 1}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        }}
                    />
                    <TouchableOpacity onPress={() => props.onClose()}>
                        <View
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                padding: Sizes.fixPadding,
                                borderWidth: 1,
                                borderColor: Colors.primaryColor,
                                borderRadius: Sizes.fixPadding,
                            }}
                        >
                            <Text>Tutup</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

ModalStatusSoal.propTypes = {
    onClose: PropTypes.func,
};

export default ModalStatusSoal;

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
        maxHeight: Dimensions.get("screen").height * 0.6,
        backgroundColor: "white",
        padding: Sizes.fixPadding * 2,
        borderRadius: Sizes.fixPadding,
    },
});
