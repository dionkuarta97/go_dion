import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Text,
  View,
  Linking,
  Alert,
  Dimensions,
  Platform,
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
import {
  batalTranksaksi,
  getPaymentDetail,
} from "../../Redux/Payment/paymentActions";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button, HStack, ScrollView, useToast, VStack } from "native-base";

const PaymentScreen = (props) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const paymentDetail = useSelector(
    (state) => state.paymentReducer.paymentDetail
  );
  const orderId = props.route.params.orderId;
  const from = props.route.params.from;
  const OpenWEB = (url) => {
    Linking.openURL(url);
  };
  const [timeOut, SetTimeOut] = useState(false);
  const totalHarga = (arr) => {
    let temp = 0;
    for (const i in arr) {
      if (arr[i].price_discount > 0 && Platform.OS === "android") {
        temp += arr[i].price_discount;
      } else {
        if (Platform.OS === "android") temp += arr[i].price;
        else temp += arr[i].price_ios;
      }
    }
    return temp;
  };

  useEffect(() => {
    dispatch(getPaymentDetail(orderId));
  }, []);

  const getTotalSec = (time) => {
    console.log(JSON.stringify(time, null, 2));
    let temp = 0;
    if (time.hours > 0) {
      temp += time.hours * 60 * 60;
    }
    if (time.minutes > 0) {
      temp += time.minutes * 60;
    }
    temp += time.seconds;
    return temp;
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
      <DefaultAppBar title="Detail Transaksi" backEnabled={true} />
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
                  <Text style={{ flex: 1 }}>Sisa Waktu</Text>
                  <CountDown
                    until={getTotalSec(paymentDetail.data.time_remaining)}
                    digitStyle={{
                      backgroundColor: "transparent",
                    }}
                    showSeparator={true}
                    onFinish={() => SetTimeOut(true)}
                    size={14}
                    timeToShow={["H", "M", "S"]}
                    timeLabels={{ m: null, s: null }}
                    style={{ ...Fonts.blackRegular }}
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
                    Belum Bayar
                  </Text>
                  <Text>ID Pesanan</Text>
                  <Text style={{ ...Fonts.black15Regular }}>
                    {paymentDetail.data.order_id}
                  </Text>

                  <Text style={{ marginTop: Sizes.fixPadding }}>
                    Metode Pembayaran
                  </Text>
                  <Text style={{ ...Fonts.black15Regular }}>
                    {paymentDetail.data.payment_title}
                  </Text>

                  {paymentDetail.data.payment_type === "bank_transfer" && (
                    <View>
                      <Text style={{ marginTop: Sizes.fixPadding }}>
                        Nomor Rekening Virtual
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
                          onPress={() => {
                            toast.show({
                              description: "Berhasil di Copy",
                            });
                            Clipboard.setString(
                              getVaNumber(paymentDetail.data.payment_detail)
                            );
                          }}
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

                  {paymentDetail.data.payment_type === "cstore" && (
                    <>
                      <View>
                        <Text style={{ marginTop: Sizes.fixPadding }}>
                          Payment Code
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
                            {paymentDetail.data.payment_detail.payment_code}
                          </Text>
                          <TouchableOpacity
                            onPress={() =>
                              Clipboard.setString(
                                paymentDetail.data.payment_detail.payment_code
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
                    </>
                  )}

                  {(paymentDetail.data.payment_type === "gopay" ||
                    paymentDetail.data.payment_type === "shopeepay") && (
                    <>
                      <View
                        style={{
                          paddingVertical: 10,
                          paddingHorizontal: 20,
                        }}
                      >
                        <Button
                          colorScheme={timeOut ? "trueGray" : "green"}
                          disabled={timeOut}
                          onPress={() => {
                            navigation.navigate("MainScreen");
                            OpenWEB(
                              paymentDetail.data.payment_type === "gopay"
                                ? paymentDetail.data.payment_detail.actions[1]
                                    .url
                                : paymentDetail.data.payment_detail.actions[0]
                                    .url
                            );
                          }}
                        >
                          Lanjutkan Pembayaran
                        </Button>
                      </View>
                    </>
                  )}

                  <Text style={{ marginTop: Sizes.fixPadding }}>
                    Jumlah Total
                  </Text>
                  <NumberFormat
                    value={
                      typeof paymentDetail.data.payment_detail.gross_amount ===
                      "string"
                        ? paymentDetail.data.payment_detail.gross_amount.split(
                            "."
                          )[0]
                        : paymentDetail.data.payment_detail.gross_amount
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
                  Detail Pesanan
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
                <VStack
                  style={{
                    marginEnd: 8,
                    marginStart: 8,
                    marginTop: 5,
                  }}
                >
                  {paymentDetail.data?.products.map((val, idx) => (
                    <VStack
                      style={{
                        marginEnd: 8,
                        marginStart: 8,
                        marginTop: 5,
                      }}
                    >
                      <Text style={{ marginEnd: "auto" }}>
                        {idx + 1}. {val.title}
                      </Text>
                      <HStack>
                        <View
                          style={{
                            width: Dimensions.get("screen").width / 2.3,
                          }}
                        >
                          <Text>Harga :</Text>
                        </View>
                        <View
                          style={{
                            marginEnd: "auto",
                          }}
                        >
                          <Text style={{ ...Fonts.black17Bold }}>IDR</Text>
                        </View>
                        <View>
                          <NumberFormat
                            value={
                              Platform.OS === "android"
                                ? val.price_discount !== 0
                                  ? val.price_discount
                                  : val.price
                                : val.price_ios
                            }
                            displayType={"text"}
                            thousandSeparator="."
                            decimalSeparator=","
                            prefix={""}
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
                      </HStack>
                    </VStack>
                  ))}
                  <HStack
                    style={{
                      marginTop: 8,
                      paddingHorizontal: 8,
                    }}
                  >
                    <View
                      style={{
                        width: Dimensions.get("screen").width / 2.3,
                      }}
                    >
                      <Text>Biaya Layanan :</Text>
                    </View>
                    <View
                      style={{
                        marginEnd: "auto",
                      }}
                    >
                      <Text style={{ ...Fonts.black17Bold }}>IDR</Text>
                    </View>
                    <View>
                      <NumberFormat
                        value={
                          typeof paymentDetail.data.payment_detail
                            .gross_amount === "string"
                            ? paymentDetail.data.payment_detail.gross_amount.split(
                                "."
                              )[0] - totalHarga(paymentDetail.data?.products)
                            : paymentDetail.data.payment_detail.gross_amount -
                              totalHarga(paymentDetail.data?.products)
                        }
                        displayType={"text"}
                        thousandSeparator="."
                        decimalSeparator=","
                        prefix={""}
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
                  </HStack>
                  <View
                    style={{
                      marginEnd: 8,
                      marginStart: 8,
                      marginTop: 5,
                      borderBottomColor: Colors.ligthGreyColor,
                      borderBottomWidth: 1,
                    }}
                  />
                  <HStack
                    style={{
                      marginTop: 8,
                      paddingHorizontal: 8,
                    }}
                  >
                    <View
                      style={{
                        width: Dimensions.get("screen").width / 2.3,
                      }}
                    >
                      <Text>Total Biaya :</Text>
                    </View>
                    <View
                      style={{
                        marginEnd: "auto",
                      }}
                    >
                      <Text style={{ ...Fonts.black17Bold }}>IDR</Text>
                    </View>
                    <View>
                      <NumberFormat
                        value={
                          typeof paymentDetail.data.payment_detail
                            .gross_amount === "string"
                            ? paymentDetail.data.payment_detail.gross_amount.split(
                                "."
                              )[0]
                            : paymentDetail.data.payment_detail.gross_amount
                        }
                        displayType={"text"}
                        thousandSeparator="."
                        decimalSeparator=","
                        prefix={""}
                        renderText={(value, props) => (
                          <Text style={{ ...Fonts.black17Bold }}>{value}</Text>
                        )}
                      />
                    </View>
                  </HStack>
                </VStack>
              </View>
              <View
                style={{
                  padding: 10,
                  marginBottom: 100,
                }}
              >
                {paymentDetail.data.status === "pending" && (
                  <Button
                    marginTop={10}
                    colorScheme={"danger"}
                    onPress={() => {
                      Alert.alert(
                        "Peringatan",
                        "Kamu yakin ingin membatalkan transaksi ini?",
                        [
                          { text: "batal", onPress: () => {} },
                          {
                            text: "yakin",
                            onPress: () => {
                              dispatch(
                                batalTranksaksi({
                                  order_id: paymentDetail.data.order_id,
                                })
                              )
                                .then(() => {
                                  navigation.navigate("MainScreen", {
                                    from: "pembayaran",
                                  });
                                  toast.show({
                                    title: "Berhasil",
                                    status: "success",
                                    description:
                                      "Transaksi kamu berhasil dibatalkan",
                                    placement: "top",
                                    width: Dimensions.get("screen").width / 1.3,
                                  });
                                })
                                .catch((err) => {
                                  if (err === "gagal") {
                                    navigation.navigate("MainScreen", {
                                      from: "pembayaran",
                                    });
                                    toast.show({
                                      title: "Gagal",
                                      status: "error",
                                      description:
                                        "Terjadi kesalahan pada server",
                                      placement: "top",
                                      width:
                                        Dimensions.get("screen").width / 1.3,
                                    });
                                  } else {
                                    navigation.navigate("MainScreen", {
                                      from: "pembayaran",
                                    });

                                    toast.show({
                                      title: "Gagal",
                                      status: "error",
                                      description: err,
                                      placement: "top",
                                      width:
                                        Dimensions.get("screen").width / 1.3,
                                    });
                                  }
                                });
                            },
                          },
                        ]
                      );
                    }}
                  >
                    Batalkan Transaksi
                  </Button>
                )}
                {!from && (
                  <Button
                    marginTop={2}
                    colorScheme="amber"
                    onPress={() => {
                      navigation.navigate("MainScreen", {
                        from: "pembayaran",
                      });
                    }}
                  >
                    Kembali Ke Beranda
                  </Button>
                )}
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentScreen;
