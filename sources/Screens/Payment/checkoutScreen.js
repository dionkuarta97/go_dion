import React, { useEffect } from "react";
import {
  Alert,
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import NumberFormat from "react-number-format";

import Fonts from "../../Theme/Fonts";
import Sizes from "../../Theme/Sizes";
import Colors from "../../Theme/Colors";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import DefaultPrimaryButton from "../../Components/Button/DefaultPrimaryButton";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import PaymentMethodCard from "./Component/PaymentMethodCard";
import {
  getPaymentList,
  getPaymentProcess,
  setPaymentMethod,
  setPaymentProcess,
  setSelectedPaymentMethod,
} from "../../Redux/Payment/paymentActions";
import LoadingModal from "../../Components/Modal/LoadingModal";
import { clearCart } from "../../Redux/Cart/cartActions";
import DefaultModal from "../../Components/Modal/DefaultModal";
import {
  HStack,
  useToast,
  useDisclose,
  Button,
  Actionsheet,
  Box,
  Center,
  Heading,
  Text,
} from "native-base";
import checkInternet from "../../Services/CheckInternet";
import ToastErrorContent from "../../Components/ToastErrorContent";
import { singkatNama } from "../../Services/helper";

const CheckoutScreen = () => {
  const { isOpen, onOpen, onClose } = useDisclose();
  const toast = useToast();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const cart = useSelector((state) => state.cartReducer.cart);

  const paymentProcess = useSelector(
    (state) => state.paymentReducer.paymentProcess
  );

  const selectedPaymentMethod = useSelector(
    (state) => state.paymentReducer.selectedPaymentMethod
  );
  const paymentList = useSelector((state) => state.paymentReducer.paymentList);

  const totalHarga = (arr) => {
    let temp = 0;
    for (const key in arr) {
      if (arr[key]["price_discount"] > 0) {
        temp += arr[key]["price_discount"];
      } else {
        temp += arr[key]["price"];
      }
    }
    return temp;
  };

  useEffect(() => {
    dispatch(setSelectedPaymentMethod(null));
    dispatch(setPaymentProcess({ loading: false, error: null, data: null }));
    dispatch(getPaymentList("pending"));
  }, []);

  console.log(JSON.stringify(cart, null, 2));

  const renderItem = (item) => {
    return (
      <View style={styles.item} key={item._id}>
        <Text style={{ ...Fonts.gray15Bold, marginEnd: "auto" }}>
          {singkatNama(item.title, 30)}
        </Text>
        <NumberFormat
          value={item.price_discount ? item.price_discount : item.price}
          displayType={"text"}
          thousandSeparator="."
          decimalSeparator=","
          prefix={"IDR "}
          renderText={(value, props) => (
            <Text
              style={{
                ...Fonts.gray15Regular,
              }}
            >
              {value}
            </Text>
          )}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <DefaultAppBar title="Checkout" backEnabled={true} />
      <View style={{ flex: 1, padding: Sizes.fixPadding * 2 }}>
        <Text style={{ ...Fonts.black19Bold }}>Ringkasan Pesanan</Text>
        <View
          style={{
            flex: 1,
            ...styles.card,
          }}
        >
          <ScrollView style={{ flex: 1 }}>
            {cart.map((val) => renderItem(val))}
          </ScrollView>
          {selectedPaymentMethod !== null && (
            <HStack style={{ paddingHorizontal: 10, marginBottom: 10 }}>
              <Box
                style={{
                  width: Dimensions.get("screen").width / 1.8,
                }}
              >
                <Text style={{ fontSize: 17 }}>Biaya Layanan</Text>
              </Box>
              <Text
                style={{
                  ...Fonts.black17Regular,
                  marginEnd: "auto",
                }}
              >
                IDR
              </Text>
              <NumberFormat
                value={cart.reduce(
                  (total, x) =>
                    selectedPaymentMethod?.service_fee.key === "var"
                      ? total +
                        (x.price_discount > 0
                          ? x.price_discount
                          : x.price *
                            (selectedPaymentMethod?.service_fee.value / 100))
                      : selectedPaymentMethod?.service_fee.value,
                  0
                )}
                displayType={"text"}
                thousandSeparator="."
                decimalSeparator=","
                prefix={""}
                renderText={(value, props) => (
                  <>
                    <Text
                      style={{
                        ...Fonts.black17Regular,
                      }}
                    >
                      {value}
                    </Text>
                  </>
                )}
              />
            </HStack>
          )}

          <HStack style={{ paddingHorizontal: 10, paddingBottom: 10 }}>
            <Box
              style={{
                width: Dimensions.get("screen").width / 1.8,
              }}
            >
              <Text
                style={{
                  ...Fonts.black19Bold,
                }}
              >
                Total
              </Text>
            </Box>
            <Text
              style={{
                ...Fonts.black17Regular,
                marginEnd: "auto",
              }}
            >
              IDR
            </Text>
            <NumberFormat
              value={
                selectedPaymentMethod === null
                  ? totalHarga(cart)
                  : selectedPaymentMethod?.service_fee.key === "var"
                  ? totalHarga(cart) +
                    totalHarga(cart) *
                      (selectedPaymentMethod?.service_fee.value / 100)
                  : totalHarga(cart) + selectedPaymentMethod?.service_fee.value
              }
              displayType={"text"}
              thousandSeparator="."
              decimalSeparator=","
              prefix={""}
              renderText={(value, props) => (
                <>
                  <Text
                    style={{
                      ...Fonts.black17Regular,
                    }}
                  >
                    {value}
                  </Text>
                </>
              )}
            />
          </HStack>
        </View>

        <PaymentMethodCard />

        <DefaultPrimaryButton
          text="Lanjutkan Pembayaran"
          onPress={() => {
            if (selectedPaymentMethod === null) {
              Alert.alert(
                "Informasi",
                "Silahkan pilih metode pembayaran pesanan kamu"
              );
            } else {
              if (paymentList.data) {
                onOpen(true);
              } else {
                checkInternet().then((data) => {
                  if (data) {
                    dispatch(getPaymentProcess(true));
                  } else {
                    toast.show({
                      placement: "top",
                      duration: null,
                      width: Dimensions.get("screen").width / 1.3,
                      render: () => {
                        return (
                          <ToastErrorContent
                            content="Kamu tidak terhubung ke internet"
                            onPress={() => {
                              toast.closeAll();
                              navigation.goBack();
                            }}
                          />
                        );
                      },
                    });
                  }
                });
              }
            }
          }}
        />

        {paymentProcess.loading && <LoadingModal />}

        {paymentProcess.data !== null && (
          <DefaultModal>
            <Text style={{ textAlign: "center" }}>Kamu Berhasil Checkout</Text>
            <DefaultPrimaryButton
              text="Lihat Status Pembayaran"
              onPress={() => {
                dispatch(clearCart());
                navigation.popToTop();
                navigation.navigate("PaymentScreen", {
                  orderId: paymentProcess.data.order_id,
                });
              }}
            />
          </DefaultModal>
        )}
      </View>

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Box w="100%" h={60} px={4} justifyContent="center">
            <Center>
              <Text bold fontSize={18}>
                Ada Transaksi Belum Dibayar
              </Text>
            </Center>
          </Box>
          <Box paddingX={3} marginBottom={5}>
            <Text textAlign="justify">
              Mau bayar sekaligus dengan transaksi sebelumnya? Jika tidak,
              transaksi sebelumnya akan dibatalkan
            </Text>
          </Box>
          <Box
            bg={"gray.300"}
            paddingX={3}
            paddingY={1}
            borderRadius={5}
            marginBottom={5}
            width={Dimensions.get("screen").width / 1.2}
          >
            <HStack>
              <Box
                marginRight={"auto"}
                maxWidth={Dimensions.get("screen").width / 2.7}
              >
                <Text>Transaksi Saat Ini</Text>
              </Box>

              <NumberFormat
                value={
                  selectedPaymentMethod === null
                    ? totalHarga(cart)
                    : selectedPaymentMethod?.service_fee.key === "var"
                    ? totalHarga(cart) +
                      totalHarga(cart) *
                        (selectedPaymentMethod?.service_fee.value / 100)
                    : totalHarga(cart) +
                      selectedPaymentMethod?.service_fee.value
                }
                displayType={"text"}
                thousandSeparator="."
                decimalSeparator=","
                prefix={"IDR "}
                renderText={(value, props) => (
                  <>
                    <Text
                      style={{
                        ...Fonts.black17Regular,
                      }}
                    >
                      {value}
                    </Text>
                  </>
                )}
              />
            </HStack>
            <HStack marginTop={1}>
              <Box
                marginRight={"auto"}
                maxWidth={Dimensions.get("screen").width / 2.7}
              >
                <Text>Transaksi Sebelumnya</Text>
              </Box>
              <NumberFormat
                value={
                  paymentList.data
                    ? paymentList.data[0].payment_detail.gross_amount.split(
                        "."
                      )[0]
                    : 0
                }
                displayType={"text"}
                thousandSeparator="."
                decimalSeparator=","
                prefix={"IDR "}
                renderText={(value, props) => (
                  <>
                    <Text
                      style={{
                        ...Fonts.black17Regular,
                      }}
                    >
                      {value}
                    </Text>
                  </>
                )}
              />
            </HStack>
            <HStack marginTop={3}>
              <Box
                marginRight={"auto"}
                maxWidth={Dimensions.get("screen").width / 2}
              >
                <Text bold>Total Gabungan Bayaran</Text>
              </Box>
              <NumberFormat
                value={
                  paymentList.data !== null
                    ? selectedPaymentMethod === null
                      ? totalHarga(cart) +
                        Number(
                          paymentList.data[0]?.payment_detail.gross_amount.split(
                            "."
                          )[0]
                        )
                      : selectedPaymentMethod?.service_fee.key === "var"
                      ? totalHarga(cart) +
                        totalHarga(cart) *
                          (selectedPaymentMethod?.service_fee.value / 100) +
                        Number(
                          paymentList.data[0]?.payment_detail.gross_amount.split(
                            "."
                          )[0]
                        )
                      : totalHarga(cart) +
                        selectedPaymentMethod?.service_fee.value +
                        Number(
                          paymentList.data[0]?.payment_detail.gross_amount.split(
                            "."
                          )[0]
                        )
                    : 0
                }
                displayType={"text"}
                thousandSeparator="."
                decimalSeparator=","
                prefix={"IDR "}
                renderText={(value, props) => (
                  <>
                    <Text
                      style={{
                        ...Fonts.black17Regular,
                      }}
                    >
                      {value}
                    </Text>
                  </>
                )}
              />
            </HStack>
          </Box>
          <Box paddingX={5} marginTop={5} marginBottom={2}>
            <Text bold color={"red.500"} fontSize={16}>
              Note :
            </Text>
            <Text textAlign="justify">
              Jika ada kesamaan produk pada transaksi saat ini dan sebelumnya,
              secara otomatis produk yang sama akan dihapus
            </Text>
          </Box>
          <Button
            colorScheme="amber"
            width={Dimensions.get("screen").width / 1.2}
            marginY={2}
            onPress={() => {
              checkInternet().then((data) => {
                if (data) {
                  dispatch(getPaymentProcess(true));
                } else {
                  toast.show({
                    placement: "top",
                    duration: null,
                    width: Dimensions.get("screen").width / 1.3,
                    render: () => {
                      return (
                        <ToastErrorContent
                          content="Kamu tidak terhubung ke internet"
                          onPress={() => {
                            toast.closeAll();
                            navigation.goBack();
                          }}
                        />
                      );
                    },
                  });
                }
              });
              onClose(true);
            }}
          >
            <Text bold>Bayar Sekaligus</Text>
          </Button>
          <Button
            colorScheme="amber"
            variant={"outline"}
            width={Dimensions.get("screen").width / 1.2}
            marginBottom={3}
            onPress={() => {
              checkInternet().then((data) => {
                if (data) {
                  dispatch(getPaymentProcess(false));
                } else {
                  toast.show({
                    placement: "top",
                    duration: null,
                    width: Dimensions.get("screen").width / 1.3,
                    render: () => {
                      return (
                        <ToastErrorContent
                          content="Kamu tidak terhubung ke internet"
                          onPress={() => {
                            toast.closeAll();
                            navigation.goBack();
                          }}
                        />
                      );
                    },
                  });
                }
              });
              onClose(true);
            }}
          >
            Bayar Transaksi Ini Saja
          </Button>
        </Actionsheet.Content>
      </Actionsheet>
    </SafeAreaView>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    paddingVertical: Sizes.fixPadding,
    paddingHorizontal: Sizes.fixPadding,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
  },
  card: {
    backgroundColor: "white",
    marginVertical: Sizes.fixPadding,
    borderRadius: Sizes.fixPadding,
  },
});
