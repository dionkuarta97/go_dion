import {StyleSheet} from "react-native";
import {LpColorsUtils, LpSizesUtils} from "../utils/learnProUtils";

const CompStyles = StyleSheet.create({
    defaultCard: {
        marginVertical: LpSizesUtils.fixPadding,
        backgroundColor: LpColorsUtils.whiteColor,
        borderRadius: LpSizesUtils.fixPadding,
        padding: LpSizesUtils.fixPadding,
        elevation: 2,
    },
});

export default CompStyles;
