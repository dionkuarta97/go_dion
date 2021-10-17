import React from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import DefaultCard from "./../../../Components/Card/DefaultCard";
import Fonts from "../../../Theme/Fonts";
import Sizes from "../../../Theme/Sizes";

const ProductTabMateri = () => {
    return (
        <View
            style={{
                flex: 1,
                paddingHorizontal: Sizes.fixPadding,
                paddingVertical: Sizes.fixPadding * 2,
            }}
        >
            <ScrollView
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
            >
                <DefaultCard>
                    <Text style={Fonts.gray16Regular}>Video</Text>
                    <Text style={Fonts.black17Bold}>
                        Penjelasan Pendahuluan
                    </Text>
                </DefaultCard>
                <DefaultCard>
                    <Text style={Fonts.gray16Regular}>PDF</Text>
                    <Text style={Fonts.black17Bold}>Mulai belajar disini</Text>
                </DefaultCard>
                <DefaultCard>
                    <Text style={Fonts.gray16Regular}>Ujian</Text>
                    <Text style={Fonts.black17Bold}>Uji pemahaman</Text>
                </DefaultCard>
            </ScrollView>
        </View>
    );
};

export default ProductTabMateri;

const styles = StyleSheet.create({
    content: {
        padding: Sizes.fixPadding,
        height: 1000,
    },
});
