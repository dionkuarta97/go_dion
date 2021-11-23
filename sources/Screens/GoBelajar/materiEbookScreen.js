import React, {useState} from "react";
import {
    Dimensions,
    Image,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";

import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import EmptyIndicator from "../../Components/Indicator/EmptyIndicator";
import {FlatGrid} from "react-native-super-grid";
import Sizes from "../../Theme/Sizes";
import {useNavigation} from "@react-navigation/core";

const MateriEbookScreen = (props) => {
    const navigation = useNavigation();

    const [selectedEbook, setSelectedEbook] = useState(0);
    const ebooks = props.route.params.ebooks;
    return (
        <SafeAreaView style={{flex: 1}}>
            <DefaultAppBar title="E-Book List" backEnabled={true} />
            <View style={{flex: 1}}>
                <FlatGrid
                    itemDimension={150}
                    spacing={Sizes.fixPadding * 2}
                    data={ebooks}
                    renderItem={({item, index}) => (
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate("PDFScreen", {book: item})
                            }
                        >
                            <View
                                style={{
                                    aspectRatio: 1,
                                    elevation: 2,
                                    backgroundColor: "white",
                                    borderRadius: 15,
                                    padding: Sizes.fixPadding,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Image
                                    source={require("../../../assets/Images/helper/book.png")}
                                    style={{width: 120, height: 100}}
                                />
                                <Text>Jilid {index + 1}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </SafeAreaView>
    );
};

export default MateriEbookScreen;
