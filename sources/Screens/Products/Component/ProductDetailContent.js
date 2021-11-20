import React from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import Divider from "../../../Components/Divider";

import Fonts from "../../../Theme/Fonts";
import Sizes from "../../../Theme/Sizes";

const ProductDetailContent = (props) => {
    const item = props.item;

    const titleText = (title) => {
        return <Text style={{...Fonts.indigoColor18Bold}}>{title}</Text>;
    };
    return (
        <View
            style={{
                flex: 1,
                paddingHorizontal: Sizes.fixPadding,
                paddingVertical: Sizes.fixPadding * 3,
            }}
        >
            <ScrollView
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
            >
                {titleText("Informasi")}
                <View style={styles.content}>
                    <Text>{item.desc}</Text>
                </View>
                <Divider />
            </ScrollView>
        </View>
    );
};

export default ProductDetailContent;

const styles = StyleSheet.create({
    content: {
        padding: Sizes.fixPadding,
        height: 1000,
    },
});
