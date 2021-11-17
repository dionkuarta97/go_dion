import React, {useLayoutEffect} from "react";
import PropTypes from "prop-types";
import {MaterialIcons} from "@expo/vector-icons";

import {
    Dimensions,
    Modal,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    TextInput,
} from "react-native";
import Sizes from "../../Theme/Sizes";
import Colors from "../../Theme/Colors";
import Fonts from "../../Theme/Fonts";
import DefaultBottomSheet from "./DefaultBottomSheet";
import {FlatGrid} from "react-native-super-grid";
import {useDispatch, useSelector} from "react-redux";
import {getListGrades} from "../../Redux/Data/dataActions";

const KelasBottomSheet = (props) => {
    const dispatch = useDispatch();
    const listGrades = useSelector((state) => state.dataReducer.listGrades);

    useLayoutEffect(() => {
        dispatch(getListGrades());
    }, []);

    return (
        <DefaultBottomSheet
            title="Select Class Level"
            onClose={() => props.onClose()}
        >
            {listGrades.loading && (
                <ActivityIndicator color={Colors.orangeColor} size={25} />
            )}
            {listGrades.data !== null &&
                listGrades.data.map((val, index) => {
                    return (
                        <View>
                            <Text>{val.title}</Text>
                        </View>
                    );
                })}
            <FlatGrid
                data={["1", "2", "3", "4", "5", "6"]}
                renderItem={({item, idx}) => {
                    return (
                        <TouchableOpacity onPress={() => props.onSelect(item)}>
                            <View style={styles.tile}>
                                <Text style={{alignSelf: "center"}}>
                                    {`Kelas ${item}`}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />
        </DefaultBottomSheet>
    );
};

KelasBottomSheet.propTypes = {
    onClose: PropTypes.func,
    onSelect: PropTypes.func,
};

export default KelasBottomSheet;

const styles = StyleSheet.create({
    tile: {
        flex: 1,
        paddingVertical: 5,
        paddingHorizontal: 15,
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding / 2,
    },
});
