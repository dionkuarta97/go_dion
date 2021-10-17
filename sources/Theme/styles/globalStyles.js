import {StyleSheet} from "react-native";
import Colors from "../Colors";
import Fonts from "../Fonts";
import Sizes from "../Sizes";

const CompStyles = StyleSheet.create({
    defaultCard: {
        marginVertical: Sizes.fixPadding,
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        padding: Sizes.fixPadding,
        elevation: 2,
    },
});

export default CompStyles;
