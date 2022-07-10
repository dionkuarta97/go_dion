import React, { useEffect } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Text,
  View,
  Linking,
  Alert,
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
import { Button, HStack, ScrollView, useToast } from "native-base";

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
                    Belum Bayar
                  </Text>
                  <Text>ID Pesanan</Text>
                  <Text style={{ ...Fonts.black15Regular }}>
                    {paymentDetail.data.order_id}
                  </Text>

                  <Text style={{ marginTop: Sizes.fixPadding }}>
                    Metoda Pembayaran
                  </Text>
                  <Text style={{ ...Fonts.black15Regular }}>
                    {paymentDetail.data.payment_type
                      .split("_")
                      .join(" ")
                      .toUpperCase()}
                  </Text>
                  <Text style={{ marginTop: Sizes.fixPadding }}>Bank</Text>
                  <Text style={{ ...Fonts.black15Regular }}>
                    {paymentDetail.data.provider.toUpperCase()}
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

                  {paymentDetail.data.payment_type === "gopay" && (
                    <>
                      <View
                        style={{
                          paddingVertical: 10,
                          paddingHorizontal: 20,
                        }}
                      >
                        <Button
                          colorScheme="green"
                          onPress={() => {
                            OpenWEB(
                              paymentDetail.data.payment_detail.actions[1].url
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
                        <Text style={{ marginStart: 15 }}>Harga :</Text>
                        <Text
                          style={{
                            ...Fonts.black17Bold,

                            marginEnd: "auto",
                            marginStart: 160,
                          }}
                        >
                          IDR
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
                    </View>
                    {val.price_discount > 0 && (
                      <View style={{ alignItems: "flex-end", marginEnd: 8 }}>
                        <Text
                          style={{
                            ...Fonts.black17Bold,

                            marginEnd: "auto",
                            marginStart: 160,
                          }}
                        >
                          IDR
                        </Text>
                        <NumberFormat
                          value={val.price}
                          displayType={"text"}
                          thousandSeparator="."
                          decimalSeparator=","
                          prefix={""}
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
                    paddingHorizontal: 8,
                  }}
                >
                  <Text>Biaya Layanan:</Text>
                  <Text
                    style={{
                      ...Fonts.black17Bold,

                      marginEnd: "auto",
                      marginStart: 126,
                    }}
                  >
                    IDR
                  </Text>

                  <NumberFormat
                    value={
                      typeof paymentDetail.data.payment_detail.gross_amount ===
                      "string"
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
                </HStack>
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
                        "apakah anda yakin untuk membatalkan transaksi ini?",
                        [
                          { text: "batalkan", onPress: () => {} },
                          {
                            text: "yakin",
                            onPress: () => {
                              dispatch(
                                batalTranksaksi({
                                  order_id: paymentDetail.data.order_id,
                                })
                              ).then(() => {
                                navigation.navigate("MainScreen", {
                                  from: "pembayaran",
                                });
                                toast.show({
                                  title: "Berhasil",
                                  status: "success",
                                  description:
                                    "transaksi anda berhasil dibatalakan",
                                  placement: "top",
                                  width: Dimensions.get("screen").width / 1.3,
                                });
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
