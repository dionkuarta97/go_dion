import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  Alert,
} from "react-native";

let ExpoIap;

import Fonts from "../../../Theme/Fonts";
import Sizes from "../../../Theme/Sizes";
import DefaultPrimaryButton from "../../../Components/Button/DefaultPrimaryButton";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { addCart, addToCart } from "../../../Redux/Cart/cartActions";

import { getPaymentApple } from "../../../Redux/Payment/paymentActions";
import DefaultModal from "../../../Components/Modal/DefaultModal";
import LoadingModal from "../../../Components/Modal/LoadingModal";
import { capitalizeFirstLetter } from "../../../Services/helper";
import { setTransIos } from "../../../Redux/Init/initActions";
import { Box, Center, HStack, useToast } from "native-base";
import moment from "moment";
import "moment/min/locales";

// if (Platform.OS === "ios") {
//   ExpoIap = require("expo-in-app-purchases");
// }

const { width } = Dimensions.get("screen");

const ProductDetailContent = (props) => {
  const toast = useToast();
  const isLogin = useSelector((state) => state.authReducer.isLogin);
  const { newTransIos } = useSelector((state) => state.initReducer);
  const [sukses, setSukses] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tanggal_awal, setTanggal_awal] = useState(null);
  const [tanggal_akhir, setTanggal_akhir] = useState(null);
  const [givenAwal, setGivenAwal] = useState(null);
  const [givenAkhir, setGivenAkhir] = useState(null);
  const [current, setCurrent] = useState(null);

  const profile = useSelector((state) => state.profileReducer.profile);

  const item = props.item;
  const section = props.section;
  const onCart = props.onCart;
  const itemSkus = Platform.select({
    ios: ["com.goonline.app." + item.details.apple_id],
    android: ["com.example.coins100"],
  });

  console.log(JSON.stringify(item, null, 2));
  const firstProces = async () => {
    if (Platform.OS === "ios") {
      await ExpoIap.connectAsync();
      if (!item.purchased) {
        setLoading(true);

        const { responseCode, results } = await ExpoIap.getProductsAsync(
          itemSkus
        );
        if (responseCode === ExpoIap.IAPResponseCode.OK) {
          if (results.length > 0) {
            if (isLogin) {
              console.log(JSON.stringify(results, null, 2));

              let trans = newTransIos.filter((value) =>
                value.user_id.includes(profile._id)
              );
              console.log(JSON.stringify(trans, null, 2), "<<<trans");
              if (trans.length > 0) {
                dispatch(getPaymentApple(item))
                  .then(async (json) => {
                    if (json.status) {
                      let newTrans = newTransIos.filter(
                        (value) => value.user_id !== profile._id
                      );
                      dispatch(setTransIos(newTrans));
                      toast.show({
                        title: "Berhasil",
                        status: "success",
                        description: "Berhasil melakukan pembelian",
                        placement: "top",
                        width: Dimensions.get("screen").width / 1.3,
                      });
                      navigation.navigate("MainScreen");
                    } else {
                      toast.show({
                        title: "Kesalahan",
                        status: "error",
                        description:
                          "Pesanan anda sedang dalam antrian, coba beberapa saat lagi",
                        placement: "top",
                        width: Dimensions.get("screen").width / 1.3,
                      });
                      navigation.navigate("MainScreen");
                      setError(
                        "Pesanan anda sedang dalam antrian, coba beberapa saat lagi"
                      );
                    }
                    console.log(json, "<<<<<Json");
                  })
                  .catch(async (err) => {
                    setError(
                      "Mohon maaf telah terjadi kesalahan pada server, coba beberapa saat lagi"
                    );
                  })
                  .finally(async () => {
                    setLoading(false);
                    await ExpoIap.disconnectAsync();
                  });
              } else {
                setLoading(false);
                await ExpoIap.disconnectAsync();
              }
            } else {
              setLoading(false);
              await ExpoIap.disconnectAsync();
            }
          } else {
            toast.show({
              title: "Kesalahan",
              status: "error",
              description:
                "Mohon maaf telah terjadi kesalahan pada server, coba beberapa saat lagi",
              placement: "top",
              width: Dimensions.get("screen").width / 1.3,
            });
            navigation.navigate("MainScreen");
            setError(
              "Mohon maaf, produk ini belum terdaftar untuk platfrom IOS"
            );
            toast.show({
              title: "Informasi",
              status: "warning",
              description:
                "Mohon maaf, produk ini belum terdaftar untuk platfrom IOS",
              placement: "top",
              width: Dimensions.get("screen").width / 1.3,
            });
            navigation.navigate("MainScreen");
            setLoading(false);
            await ExpoIap.disconnectAsync();
          }
        }
      } else {
        await ExpoIap.disconnectAsync();
      }
    }
  };

  const initIAPandEventListeners = async () => {
    // connect to store if not done so already
    // purchase listener. Most of this is boilerplate from the official docs, with a
    // couple of additions to process a purchase and stop processing.
    ExpoIap.setPurchaseListener(
      async ({ responseCode, results, errorCode }) => {
        // Purchase was successful
        if (responseCode === ExpoIap.IAPResponseCode.OK) {
          results.forEach(async (purchase) => {
            if (!purchase.acknowledged) {
              // process transaction here and unlock content
              // !! This is your own logic that is not a part of expo-in-app-purchases.
              // any processing that needs to be done within your app or on your server
              // can be executed here, just before finishTransactionAsync

              // finish the transaction on platform's end
              if (isLogin) {
                dispatch(getPaymentApple(item))
                  .then(async (json) => {
                    console.log(JSON.stringify(json, null, 2), "<<<<<bawah");
                    if (json.status) {
                      let newTrans = newTransIos.filter(
                        (value) => value.user_id !== profile._id
                      );
                      dispatch(setTransIos(newTrans));
                      toast.show({
                        title: "Berhasil",
                        status: "success",
                        description: "Berhasil melakukan pembelian",
                        placement: "top",
                        width: Dimensions.get("screen").width / 1.3,
                      });
                      navigation.navigate("MainScreen");
                    } else {
                      dispatch(
                        setTransIos([
                          ...newTransIos,
                          { item: item, user_id: profile._id },
                        ])
                      );
                      toast.show({
                        title: "Kesalahan",
                        status: "error",
                        description:
                          "Pesanan anda sedang dalam antrian, coba beberapa saat lagi",
                        placement: "top",
                        width: Dimensions.get("screen").width / 1.3,
                      });
                      navigation.navigate("MainScreen");
                      setError(
                        "Pesanan anda sedang dalam antrian, coba beberapa saat lagi"
                      );
                    }
                  })
                  .catch(async (err) => {
                    dispatch(
                      setTransIos([
                        ...newTransIos,
                        { item: item, user_id: profile._id },
                      ])
                    );
                    toast.show({
                      title: "Kesalahan",
                      status: "error",
                      description:
                        "Mohon maaf telah terjadi kesalahan pada server, coba beberapa saat lagi",
                      placement: "top",
                      width: Dimensions.get("screen").width / 1.3,
                    });
                    navigation.navigate("MainScreen");
                    setError(
                      "Mohon maaf telah terjadi kesalahan pada server, coba beberapa saat lagi"
                    );
                  })
                  .finally(async () => {
                    ExpoIap.finishTransactionAsync(purchase, true);
                    await ExpoIap.disconnectAsync();
                    navigation.navigate("MainScreen");
                    setLoading(false);
                  });
              }
            }
          });

          // handle particular error codes
        } else if (responseCode === ExpoIap.IAPResponseCode.USER_CANCELED) {
          toast.show({
            title: "Informasi",
            status: "warning",
            description: "Kamu Membatalkan transaksi",
            placement: "top",
            width: Dimensions.get("screen").width / 1.3,
          });
          await ExpoIap.disconnectAsync();
          navigation.navigate("MainScreen");
          setLoading(false);
        } else if (responseCode === ExpoIap.IAPResponseCode.DEFERRED) {
          console.log(
            "User does not have permissions to buy but requested parental approval (iOS only)"
          );
        } else {
          toast.show({
            title: "Kesalahan",
            status: "error",
            description: "Telah terjadi kesalahan pada server",
            placement: "top",
            width: Dimensions.get("screen").width / 1.3,
          });

          await ExpoIap.disconnectAsync();
          navigation.navigate("MainScreen");
          setLoading(false);
          console.warn(
            `Something went wrong with the purchase. Received errorCode ${errorCode}`
          );
        }

        // stop processing. This state update should be reflected
        // in your components. E.g. make IAPs accessible again.
      }
    );
  };

  useEffect(async () => {
    if (Platform.OS === "ios") {
      firstProces();
      initIAPandEventListeners();
    }
    setTanggal_awal(moment(item.details.tanggal_awal).locale("id"));
    setTanggal_akhir(moment(item.details.tanggal_akhir).locale("id"));
    setGivenAwal(moment(item.details.tanggal_awal));
    setGivenAkhir(moment(item.details.tanggal_akhir));
    setCurrent(moment().utcOffset(7).startOf("second"));
  }, []);

  const requestPurchase = async () => {
    setLoading(true);
    await ExpoIap.connectAsync();
    const { responseCode, results } = await ExpoIap.getProductsAsync(itemSkus);
    if (responseCode === ExpoIap.IAPResponseCode.OK) {
      if (results.length > 0) {
        ExpoIap.purchaseItemAsync("com.goonline.app." + item.details.apple_id);
      }
    }
  };

  const titleText = (title) => {
    return (
      <Text style={{ ...Fonts.black17Bold, marginBottom: Sizes.fixPadding }}>
        {title}
      </Text>
    );
  };

  console.log(current);

  const infoTile = (title, text) => {
    return (
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "lightgrey",
          paddingVertical: Sizes.fixPadding,
        }}
      >
        <Text style={{ flex: 1, color: "grey", marginBottom: 0.5 }}>
          {title}
        </Text>
        <Text style={{ flex: 3 }}>{text}</Text>
      </View>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: Sizes.fixPadding * 2,
        paddingVertical: Sizes.fixPadding * 3,
        backgroundColor: "white",
      }}
    >
      {!loading && error && (
        <DefaultModal>
          <Text>{error}</Text>
          <DefaultPrimaryButton
            text="Kembali ke Home"
            onPress={() => {
              setError(null);
              setLoading(false);
              navigation.popToTop();
              navigation.navigate("MainScreen");
            }}
          />
        </DefaultModal>
      )}
      {!loading && sukses && (
        <DefaultModal>
          <Text>Berhasil melakukan pembelian</Text>
          <DefaultPrimaryButton
            text="Kembali ke Home"
            onPress={() => {
              setSukses(false);
              setLoading(false);
              navigation.popToTop();
              navigation.navigate("MainScreen");
            }}
          />
        </DefaultModal>
      )}
      {Platform.OS === "ios" && loading ? (
        <LoadingModal />
      ) : (
        <ScrollView
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
        >
          {givenAkhir !== null && (
            <>
              {moment.duration(givenAkhir.diff(current)).asDays() > 0 && (
                <>
                  {moment.duration(givenAwal.diff(current)).asDays() > 0 ? (
                    <>
                      <HStack mb={5} style={{ alignItems: "center" }} space={3}>
                        <Text style={{ ...Fonts.black15Bold }}>
                          Dimulai dalam
                        </Text>
                        <Box
                          bg={"green.500"}
                          paddingX={2}
                          paddingY={1}
                          borderRadius={10}
                        >
                          <Text
                            style={{ ...Fonts.black15Regular, color: "white" }}
                          >
                            {moment.duration(givenAwal.diff(current)).asDays() >
                            1
                              ? Math.floor(
                                  moment
                                    .duration(givenAwal.diff(current))
                                    .asDays()
                                ) + " hari lagi"
                              : Math.floor(
                                  moment
                                    .duration(givenAwal.diff(current))
                                    .asHours()
                                ) + " jam lagi"}
                          </Text>
                        </Box>
                      </HStack>
                    </>
                  ) : (
                    <>
                      <HStack mb={5} space={3} style={{ alignItems: "center" }}>
                        <Text style={{ ...Fonts.black15Bold }}>
                          Berakhir dalam
                        </Text>
                        <Box
                          bg={"red.500"}
                          paddingX={2}
                          paddingY={1}
                          borderRadius={10}
                        >
                          <Text style={{ color: "white" }}>
                            {moment
                              .duration(givenAkhir.diff(current))
                              .asDays() > 1
                              ? Math.floor(
                                  moment
                                    .duration(givenAkhir.diff(current))
                                    .asDays()
                                ) + " hari lagi"
                              : Math.floor(
                                  moment
                                    .duration(givenAkhir.diff(current))
                                    .asHours()
                                ) + " jam lagi"}
                          </Text>
                        </Box>
                      </HStack>
                    </>
                  )}
                </>
              )}
            </>
          )}

          {item.expired && (
            <Box
              padding={1}
              width={Dimensions.get("screen").width / 2.4}
              bg={"red.600"}
              borderRadius={10}
              mb={3}
            >
              <Center>
                <Text style={{ color: "white" }}>Produk telah berakhir</Text>
              </Center>
            </Box>
          )}

          {titleText("Detail Produk")}
          <View style={styles.content}>
            {infoTile("Informasi", item.desc)}
            {infoTile("Kategori", capitalizeFirstLetter(item.details.category))}
            {infoTile("Level", item.details.level)}
            {infoTile("Wilayah", item.details.wilayah)}

            {tanggal_awal &&
              tanggal_akhir !== null &&
              infoTile(
                "Periode Aktif",
                `${tanggal_awal.format(
                  "Do MMM YYYY HH:mm:ss"
                )} WIB - ${tanggal_akhir.format("Do MMM YYYY H:mm:ss")} WIB`
              )}

            {item.purchased && (
              <DefaultPrimaryButton
                text={
                  item.category === "tryout"
                    ? "Lihat Tryout mu"
                    : "Lanjutkan Belajar mu"
                }
                onPress={() => {
                  if (item.category === "tryout") {
                    navigation.navigate("GoTryoutScreen");
                  } else {
                    navigation.navigate("ProductIncludeScreen", {
                      produkId: item._id,
                    });
                  }
                }}
              />
            )}
            {Platform.OS === "ios" ? (
              <>
                {isLogin ? (
                  <>
                    {newTransIos.filter((value) =>
                      value.user_id.includes(profile._id)
                    ).length === 0 && (
                      <>
                        {!item.purchased && !onCart && (
                          <DefaultPrimaryButton
                            text="Beli Sekarang"
                            onPress={() => {
                              if (item.expired) {
                                Alert.alert(
                                  "Informasi",
                                  "Sayang sekali produk telah berakhir"
                                );
                              } else {
                                requestPurchase();
                              }
                            }}
                          />
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <DefaultPrimaryButton
                      text="Beli Sekarang"
                      onPress={() => {
                        Alert.alert(
                          "Informasi",
                          "Anda perlu login untuk melanjutkan pembayaran",
                          [
                            {
                              text: "Oke",
                              onPress: () => {
                                navigation.navigate("MainScreen");
                              },
                            },
                          ]
                        );
                      }}
                    />
                  </>
                )}
              </>
            ) : (
              <>
                {isLogin ? (
                  <>
                    {!item.purchased && !onCart && (
                      <DefaultPrimaryButton
                        text="Beli Sekarang"
                        onPress={() => {
                          if (item.expired) {
                            Alert.alert(
                              "Informasi",
                              "Sayang sekali produk telah berakhir"
                            );
                          } else {
                            dispatch(addToCart(item));
                            dispatch(addCart(item._id))
                              .then((data) => console.log(data, "<<data"))
                              .catch((err) => console.log(err, "<<err"));
                            navigation.navigate("CartScreen");
                          }
                        }}
                      />
                    )}
                  </>
                ) : (
                  <>
                    <DefaultPrimaryButton
                      text="Beli Sekarang"
                      onPress={() => {
                        Alert.alert(
                          "Informasi",
                          "Anda perlu login untuk melanjutkan pembayaran",
                          [
                            {
                              text: "Oke",
                              onPress: () => {
                                navigation.navigate("LoginScreen", {
                                  item: item,
                                  section: section,
                                });
                              },
                            },
                          ]
                        );
                      }}
                    />
                  </>
                )}
              </>
            )}

            {Platform.OS === "android" && (
              <>
                {!item.purchased && onCart && (
                  <DefaultPrimaryButton
                    text="Sudah Ada di Keranjang"
                    onPress={() => {
                      navigation.navigate("CartScreen");
                    }}
                  />
                )}
              </>
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default ProductDetailContent;

const styles = StyleSheet.create({
  content: {},
  button: {
    paddingVertical: Sizes.fixPadding + 2.0,
    alignItems: "center",
    justifyContent: "center",
    width: width - 40,
    borderRadius: Sizes.fixPadding - 5.0,
    marginTop: Sizes.fixPadding + 3.0,
  },
});
