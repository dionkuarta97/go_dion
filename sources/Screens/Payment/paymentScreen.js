import React, { useEffect } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import NumberFormat from "react-number-format";

import Fonts from "../../Theme/Fonts";
import Sizes from "../../Theme/Sizes";
import Colors from "../../Theme/Colors";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import CountDown from "react-native-countdown-component";

import { useNavigation } from "@react-navigation/core";
import CompStyles from "../../Theme/styles/globalStyles";
import { useDispatch, useSelector } from "react-redux";
import { getPaymentDetail } from "../../Redux/Payment/paymentActions";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button, HStack, ScrollView } from "native-base";

const PaymentScreen = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const paymentDetail = useSelector(
    (state) => state.paymentReducer.paymentDetail
  );
  const orderId = props.route.params.orderId;

  const totalHarga = (arr) => {
    let temp = 0;
    for (const i in arr) {
      if (arr[i].price_discount > 0) {
        temp += arr[i].price_discount;
      } else {
        temp += arr[i].price;
      }
    }

    return temp;
  };

  useEffect(() => {
    dispatch(getPaymentDetail(orderId));
  }, []);

  const getTotalSec = (time) => {
    const minSec = time.minutes * 60;
    return minSec + time.seconds;
  };

  const getVaNumber = (detail) => {
    if (detail.va_numbers !== undefined) {
      return detail.va_numbers[0].va_number;
    }
    return detail.permata_va_number;
  };

  const getVaBank = (vadetail) => {
    return vadetail[0].bank.toUpperCase();
  };
  console.log(JSON.stringify(paymentDetail, null, 2));
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <DefaultAppBar title="Pembayaran" backEnabled={true} />
      <ScrollView style={{ flex: 1, padding: Sizes.fixPadding * 2 }}>
        {paymentDetail.loading && (
          <View>
            <ActivityIndicator color={Colors.orangeColor} size={30} />
          </View>
        )}
        {paymentDetail.data !== null && (
          <>
            {paymentDetail.data.status === "pending" && (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    ...CompStyles.defaultCard,
                  }}
                >
                  <Text style={{ flex: 1 }}>Time Remaining</Text>
                  <CountDown
                    until={getTotalSec(paymentDetail.data.time_remaining)}
                    digitStyle={{
                      backgroundColor: "transparent",
                    }}
                    showSeparator={true}
                    onFinish={() => console.log("finish")}
                    size={14}
                    timeToShow={["M", "S"]}
                    timeLabels={{ m: null, s: null }}
                    style={{ ...Fonts.blackRegular }}
                    onChange={(t) => {}}
                    running={true}
                  />
                </View>
                <View style={{ ...CompStyles.defaultCard }}>
                  <Text
                    style={{
                      marginVertical: Sizes.fixPadding * 2,
                      paddingHorizontal: Sizes.fixPadding * 2,
                      paddingVertical: Sizes.fixPadding / 2,
                      backgroundColor: Colors.primaryColor,
                      color: "white",
                      borderRadius: Sizes.fixPadding,
                      letterSpacing: 1.2,
                      alignSelf: "center",
                    }}
                  >
                    PENDING
                  </Text>
                  <Text>ID Order</Text>
                  <Text style={{ ...Fonts.black15Regular }}>
                    {paymentDetail.data.order_id}
                  </Text>

                  <Text style={{ marginTop: Sizes.fixPadding }}>
                    Payment Method
                  </Text>
                  <Text style={{ ...Fonts.black15Regular }}>
                    {paymentDetail.data.payment_type}
                  </Text>
                  <Text style={{ marginTop: Sizes.fixPadding }}>Bank</Text>
                  <Text style={{ ...Fonts.black15Regular }}>
                    {paymentDetail.data.provider.toUpperCase()}
                  </Text>

                  {paymentDetail.data.payment_type === "bank_transfer" && (
                    <View>
                      <Text style={{ marginTop: Sizes.fixPadding }}>
                        Virtual Account
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            ...Fonts.black17Bold,
                            flex: 1,
                          }}
                        >
                          {getVaNumber(paymentDetail.data.payment_detail)}
                        </Text>
                        <TouchableOpacity
                          onPress={() =>
                            Clipboard.setString(
                              getVaNumber(paymentDetail.data.payment_detail)
                            )
                          }
                        >
                          <View
                            style={{
                              paddingVertical: Sizes.fixPadding / 2,
                              paddingHorizontal: Sizes.fixPadding,
                              backgroundColor: Colors.primaryColor,
                              borderRadius: 5,
                            }}
                          >
                            <Text>Copy</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}

                  {paymentDetail.data.payment_type === "echannel" && (
                    <View>
                      <Text style={{ marginTop: Sizes.fixPadding }}>
                        Bill Code
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            ...Fonts.black17Bold,
                            flex: 1,
                          }}
                        >
                          {paymentDetail.data.payment_detail.biller_code}
                        </Text>
                        <TouchableOpacity
                          onPress={() =>
                            Clipboard.setString(
                              paymentDetail.data.payment_detail.biller_code
                            )
                          }
                        >
                          <View
                            style={{
                              paddingVertical: Sizes.fixPadding / 2,
                              paddingHorizontal: Sizes.fixPadding,
                              backgroundColor: Colors.primaryColor,
                              borderRadius: 5,
                            }}
                          >
                            <Text>Copy</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <Text style={{ marginTop: Sizes.fixPadding }}>
                        Bill Key
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            ...Fonts.black17Bold,
                            flex: 1,
                          }}
                        >
                          {paymentDetail.data.payment_detail.bill_key}
                        </Text>
                        <TouchableOpacity
                          onPress={() =>
                            Clipboard.setString(
                              paymentDetail.data.payment_detail.bill_key
                            )
                          }
                        >
                          <View
                            style={{
                              paddingVertical: Sizes.fixPadding / 2,
                              paddingHorizontal: Sizes.fixPadding,
                              backgroundColor: Colors.primaryColor,
                              borderRadius: 5,
                            }}
                          >
                            <Text>Copy</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}

                  <Text style={{ marginTop: Sizes.fixPadding }}>
                    Total Amount
                  </Text>
                  <NumberFormat
                    value={
                      paymentDetail.data.payment_detail.gross_amount.split(
                        "."
                      )[0]
                    }
                    displayType={"text"}
                    thousandSeparator="."
                    decimalSeparator=","
                    prefix={"IDR "}
                    renderText={(value, props) => (
                      <Text style={{ ...Fonts.black17Bold }}>{value}</Text>
                    )}
                  />
                </View>
              </>
            )}
            <View>
              <View style={{ ...CompStyles.defaultCard }}>
                <Text style={{ alignSelf: "center", ...Fonts.black20Bold }}>
                  Detail Order
                </Text>
                <View
                  style={{
                    marginEnd: 8,
                    marginStart: 8,
                    marginTop: 5,
                    borderBottomColor: Colors.ligthGreyColor,
                    borderBottomWidth: 1,
                  }}
                />
                {paymentDetail.data?.products.map((val, idx) => (
                  <View View key={val._id}>
                    <View
                      style={{
                        marginEnd: 8,
                        marginStart: 8,
                        marginTop: 5,
                      }}
                    >
                      <Text style={{ marginEnd: "auto" }}>
                        {idx + 1}. {val.title}
                      </Text>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={{ marginEnd: "auto", marginStart: 15 }}>
                          Harga :
                        </Text>
                        <NumberFormat
                          value={
                            val.price_discount !== 0
                              ? val.price_discount
                              : val.price
                          }
                          displayType={"text"}
                          thousandSeparator="."
                          decimalSeparator=","
                          prefix={"IDR "}
                          renderText={(value, props) => (
                            <Text
                              style={{
                                ...Fonts.black17Bold,
                              }}
                            >
                              {value}
                            </Text>
                          )}
                        />
                      </View>
                    </View>
                    {val.price_discount > 0 && (
                      <View style={{ alignItems: "flex-end", marginEnd: 8 }}>
                        <NumberFormat
                          value={val.price}
                          displayType={"text"}
                          thousandSeparator="."
                          decimalSeparator=","
                          prefix={"IDR "}
                          renderText={(value, props) => (
                            <Text
                              style={{
                                marginLeft: Sizes.fixPadding,
                                color: "black",
                                opacity: 0.8,
                                textDecorationLine: "line-through",
                              }}
                            >
                              {value}
                            </Text>
                          )}
                        />
                      </View>
                    )}
                  </View>
                ))}
                <HStack
                  style={{
                    marginTop: 8,
                    paddingHorizontal: 10,
                  }}
                >
                  <Text style={{ marginEnd: "auto" }}>Service Fee:</Text>
                  <NumberFormat
                    value={
                      paymentDetail.data.payment_detail.gross_amount.split(
                        "."
                      )[0] - totalHarga(paymentDetail.data?.products)
                    }
                    displayType={"text"}
                    thousandSeparator="."
                    decimalSeparator=","
                    prefix={"IDR "}
                    renderText={(value, props) => (
                      <Text
                        style={{
                          ...Fonts.black17Bold,
                        }}
                      >
                        {value}
                      </Text>
                    )}
                  />
                </HStack>
              </View>
              <View
                style={{
                  padding: 10,
                }}
              >
                <Button
                  marginTop={10}
                  colorScheme="yellow"
                  onPress={() => {
                    navigation.navigate("MainScreen", { idx: 0 });
                  }}
                >
                  <Text
                    style={{
                      color: "whitesmoke",
                    }}
                  >
                    Kembali Ke Home
                  </Text>
                </Button>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentScreen;
