import {useNavigation} from "@react-navigation/core";
import React, {useEffect} from "react";
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    View,
} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";
import {useDispatch, useSelector} from "react-redux";
import DefaultCard from "../../../Components/Card/DefaultCard";
import Divider from "../../../Components/Divider";
import {getPaymentList} from "../../../Redux/Payment/paymentActions";
import Colors from "../../../Theme/Colors";
import Fonts from "../../../Theme/Fonts";
import Sizes from "../../../Theme/Sizes";
import CompStyles from "../../../Theme/styles/globalStyles";

const PurchaseContent = (props) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const paymentList = useSelector(
        (state) => state.paymentReducer.paymentList
    );

    useEffect(() => {
        dispatch(getPaymentList(props.status));
    }, [props.status]);

    const renderItem = (item) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    if (item.status === "pending")
                        navigation.navigate("PaymentScreen", {
                            orderId: item.order_id,
                        });
                }}
            >
                <View
                    style={{
                        ...CompStyles.defaultCard,
                    }}
                >
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Text
                            style={{
                                flex: 1,
                                ...Fonts.black17Bold,
                                color: Colors.orangeColor,
                            }}
                        >
                            {item.order_id}
                        </Text>
                        <Text
                            style={{
                                ...styles.status,
                                backgroundColor:
                                    item.status === "pending"
                                        ? Colors.primaryColor
                                        : item.status === "expire"
                                        ? Colors.neutralRedColor
                                        : Colors.neutralGreenColor,
                            }}
                        >
                            {item.status}
                        </Text>
                    </View>

                    <Divider />
                    <Text>{item.payment_detail.transaction_time}</Text>
                    <Text>Total : IDR {item.payment_detail.gross_amount}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={{flex: 1, padding: Sizes.fixPadding * 2}}>
            {paymentList.loading && (
                <View>
                    <ActivityIndicator color={Colors.primaryColor} size={30} />
                </View>
            )}
            {paymentList.data !== null && (
                <View style={{flex: 1}}>
                    <FlatList
                        style={{marginBottom: Sizes.fixPadding * 7}}
                        keyExtractor={(item) => `${item._id}`}
                        data={paymentList.data}
                        renderItem={({item, index}) => renderItem(item)}
                        scrollEnabled={true}
                    />
                </View>
            )}
        </View>
    );
};

export default PurchaseContent;

const styles = StyleSheet.create({
    status: {
        paddingHorizontal: Sizes.fixPadding * 2,
        paddingVertical: Sizes.fixPadding / 2,
        color: "white",
        borderRadius: Sizes.fixPadding,
        letterSpacing: 1.2,
    },
});