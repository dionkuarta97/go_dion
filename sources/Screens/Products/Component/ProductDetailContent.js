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

import {
  connectAsync,
  getProductsAsync,
  IAPResponseCode,
  disconnectAsync,
  setPurchaseListener,
  finishTransactionAsync,
  purchaseItemAsync,
} from "expo-in-app-purchases";
import Fonts from "../../../Theme/Fonts";
import Sizes from "../../../Theme/Sizes";
import DefaultPrimaryButton from "../../../Components/Button/DefaultPrimaryButton";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { addToCart } from "../../../Redux/Cart/cartActions";

import { getPaymentApple } from "../../../Redux/Payment/paymentActions";
import DefaultModal from "../../../Components/Modal/DefaultModal";
import LoadingModal from "../../../Components/Modal/LoadingModal";
import { capitalizeFirstLetter } from "../../../Services/helper";
import { setTransIos } from "../../../Redux/Init/initActions";
import { useToast } from "native-base";

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

  const profile = useSelector((state) => state.profileReducer.profile);

  const item = props.item;
  const onCart = props.onCart;
  const itemSkus = Platform.select({
    ios: ["com.goonline.app." + item.details.apple_id],
    android: ["com.example.coins100"],
  });

  console.log(JSON.stringify(item, null, 2));
  const firstProces = async () => {
    if (Platform.OS === "ios") {
      await connectAsync();
      if (!item.purchased) {
        setLoading(true);

        const { responseCode, results } = await getProductsAsync(itemSkus);
        if (responseCode === IAPResponseCode.OK) {
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
                    await disconnectAsync();
                  });
              } else {
                setLoading(false);
                await disconnectAsync();
              }
            } else {
              setLoading(false);
              await disconnectAsync();
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
            await disconnectAsync();
          }
        }
      } else {
        await disconnectAsync();
      }
    }
  };

  const initIAPandEventListeners = async () => {
    // connect to store if not done so already
    // purchase listener. Most of this is boilerplate from the official docs, with a
    // couple of additions to process a purchase and stop processing.
    setPurchaseListener(async ({ responseCode, results, errorCode }) => {
      // Purchase was successful
      if (responseCode === IAPResponseCode.OK) {
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
                  finishTransactionAsync(purchase, true);
                  await disconnectAsync();
                  navigation.navigate("MainScreen");
                  setLoading(false);
                });
            }
          }
        });

        // handle particular error codes
      } else if (responseCode === IAPResponseCode.USER_CANCELED) {
        toast.show({
          title: "Informasi",
          status: "warning",
          description: "Kamu Membatalkan transaksi",
          placement: "top",
          width: Dimensions.get("screen").width / 1.3,
        });
        await disconnectAsync();
        navigation.navigate("MainScreen");
        setLoading(false);
      } else if (responseCode === IAPResponseCode.DEFERRED) {
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

        await disconnectAsync();
        navigation.navigate("MainScreen");
        setLoading(false);
        console.warn(
          `Something went wrong with the purchase. Received errorCode ${errorCode}`
        );
      }

      // stop processing. This state update should be reflected
      // in your components. E.g. make IAPs accessible again.
    });
  };

  useEffect(async () => {
    if (Platform.OS === "ios") {
      firstProces();
      initIAPandEventListeners();
    }
  }, []);

  const requestPurchase = async () => {
    setLoading(true);
    await connectAsync();
    const { responseCode, results } = await getProductsAsync(itemSkus);
    if (responseCode === IAPResponseCode.OK) {
      if (results.length > 0) {
        purchaseItemAsync("com.goonline.app." + item.details.apple_id);
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

  const infoTile = (title, text) => {
    return (
      <View
        style={{
          flexDirection: "row",
          borderBottomWidth: 1,
          borderBottomColor: "lightgrey",
          paddingVertical: Sizes.fixPadding,
        }}
      >
        <Text style={{ flex: 1, color: "grey" }}>{title}</Text>
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
          {titleText("Detail Produk")}
          <View style={styles.content}>
            {infoTile("Informasi", item.desc)}
            {infoTile("Kategori", capitalizeFirstLetter(item.details.category))}
            {infoTile("Level", item.details.level)}
            {infoTile("Wilayah", item.details.wilayah)}

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
                              requestPurchase();
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
                {!item.purchased && !onCart && (
                  <DefaultPrimaryButton
                    text="Beli Sekarang"
                    onPress={() => {
                      dispatch(addToCart(item));
                      navigation.navigate("CartScreen");
                    }}
                  />
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
