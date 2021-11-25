import React from "react";
import {Dimensions, Text, View} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";

import Sizes from "../../Theme/Sizes";
import {useNavigation} from "@react-navigation/core";
import Pdf from "react-native-pdf";

const PDFScreen = (props) => {
    const navigation = useNavigation();
    const book = props.route.params.book;
    console.log(book);
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
                position: "relative",
            }}
        >
            <View
                style={{
                    position: "absolute",
                    flexDirection: "row",

                    top: 0,
                    paddingVertical: Sizes.fixPadding + 5.0,
                    paddingHorizontal: Sizes.fixPadding * 2.0,
                }}
            >
                <MaterialIcons
                    name="arrow-back-ios"
                    size={24}
                    color="black"
                    onPress={() => navigation.goBack()}
                />
                <View style={{flex: 1}} />
            </View>

            <Pdf
                source={{uri: book}}
                onLoadComplete={(numberOfPages, filePath) => {
                    console.log(`Number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page, numberOfPages) => {
                    console.log(`Current page: ${page}`);
                }}
                onError={(error) => {
                    console.log(error);
                }}
                onPressLink={(uri) => {
                    console.log(`Link pressed: ${uri}`);
                }}
                style={{
                    flex: 1,
                    backgroundColor: "black",
                    width: Dimensions.get("screen").width,
                }}
            />
        </View>
    );
};

export default PDFScreen;
