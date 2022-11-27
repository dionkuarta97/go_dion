import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState, useCallback } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  ScrollView,
} from "react-native";
import NumberFormat from "react-number-format";
import moment from "moment";

import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import DefaultCard from "../../../Components/Card/DefaultCard";
import Divider from "../../../Components/Divider";
import { getPaymentList } from "../../../Redux/Payment/paymentActions";
import Colors from "../../../Theme/Colors";
import Fonts from "../../../Theme/Fonts";
import Sizes from "../../../Theme/Sizes";
import CompStyles from "../../../Theme/styles/globalStyles";
import EmptyIndicator from "../../../Components/Indicator/EmptyIndicator";
import checkInternet from "../../../Services/CheckInternet";
import { useToast } from "native-base";

const PurchaseContent = (props) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const paymentList = useSelector((state) => state.paymentReducer.paymentList);
  useEffect(() => {
    checkInternet().then((connection) => {
      if (connection) {
        if (!refreshing) {
          dispatch(getPaymentList(props.status));
        }
      }
    });
  }, [props.status]);

  useEffect(() => {
    if (refreshing) {
      dispatch(getPaymentList(props.status));
      if (!paymentList.loading) {
        setRefreshing(false);
      }
    }
  }, [refreshing]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
  }, []);

  const renderItem = (item) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (item.status === "pending")
            navigation.navigate("PaymentScreen", {
              orderId: item.order_id,
              from: props.from,
            });
          else {
            navigation.navigate("PaymentScreen", {
              orderId: item.order_id,
              from: props.from,
            });
          }
        }}
      >
        <View
          style={{
            ...CompStyles.defaultCard,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
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
                    : item.status === "expire" || item.status === "cancel"
                    ? Colors.neutralRedColor
                    : Colors.neutralGreenColor,
              }}
            >
              {item.status === "expire"
                ? "Kedaluwarsa"
                : item.status === "cancel"
                ? "Dibatalkan"
                : item.status === "done"
                ? "Berhasil"
                : "Tertunda"}
            </Text>
          </View>

          <Divider />
          <Text>
            {moment(item.payment_detail.transaction_time).format(
              "DD MMM YYYY, HH:mm"
            ) + " WIB"}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text>Total : </Text>
            <NumberFormat
              value={
                typeof item.payment_detail.gross_amount === "string"
                  ? item.payment_detail.gross_amount.split(".")[0]
                  : item.payment_detail.gross_amount
              }
              displayType={"text"}
              thousandSeparator="."
              decimalSeparator=","
              prefix={"IDR "}
              renderText={(value, props) => <Text>{value}</Text>}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, padding: Sizes.fixPadding * 2 }}>
      {paymentList.loading ? (
        <View>
          <ActivityIndicator color={Colors.primaryColor} size={30} />
        </View>
      ) : paymentList.data !== null ? (
        <View style={{ flex: 1 }}>
          <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            style={{ marginBottom: Sizes.fixPadding * 7 }}
            keyExtractor={(item) => `${item._id}`}
            data={paymentList.data}
            renderItem={({ item, index }) => renderItem(item)}
            scrollEnabled={true}
          />
        </View>
      ) : (
        <ScrollView
          style={{
            paddingTop: 150,
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <EmptyIndicator msg="Data pembelian kamu akan muncul di sini" />
        </ScrollView>
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
