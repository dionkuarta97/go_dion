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

import firestore from "@react-native-firebase/firestore";
import Fonts from "../../../Theme/Fonts";
import Sizes from "../../../Theme/Sizes";
import DefaultPrimaryButton from "../../../Components/Button/DefaultPrimaryButton";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { addToCart } from "../../../Redux/Cart/cartActions";
import RNIap, {
  purchaseErrorListener,
  purchaseUpdatedListener,
} from "react-native-iap";
import { getPaymentApple } from "../../../Redux/Payment/paymentActions";
import DefaultModal from "../../../Components/Modal/DefaultModal";
import LoadingModal from "../../../Components/Modal/LoadingModal";
import { capitalizeFirstLetter } from "../../../Services/helper";
import { setTransIos } from "../../../Redux/Init/initActions";
import { useToast } from "native-base";

let purchaseUpdateSubscription = null;

let purchaseErrorSubscription = null;

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
    ios: ["com.goonline.app." + item._id],
    android: ["com.example.coins100"],
  });

  useEffect(async () => {
    if (Platform.OS === "ios") {
      if (!item.purchased) {
        setLoading(true);
        try {
          const products = await RNIap.getProducts(itemSkus);
          if (products) {
            if (isLogin) {
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
                  .finally(() => {
                    setLoading(false);
                  });
              } else {
                setLoading(false);
              }
            } else {
              setLoading(false);
            }
          } else {
            setError("Mohon maaf, produk ini belum terdaftar");
            setLoading(false);
          }
        } catch (err) {
          console.warn(err);
          setError("Terjadi kesalahan coba beberapa saat lagi");
          setLoading(false);
        }

        RNIap.initConnection().then(() => {
          purchaseUpdateSubscription = purchaseUpdatedListener(
            async (purchase) => {
              const receipt = purchase.transactionReceipt;
              if (receipt) {
                console.log("sukkseessss");
                const receiptBody = {
                  "receipt-data": receipt,
                  password: "f72a4af2242a467395a3bb582c099e69",
                };
                const validate = await RNIap.validateReceiptIos(
                  receiptBody,
                  true
                );
                if (validate) {
                  if (isLogin) {
                    dispatch(getPaymentApple(item))
                      .then(async (json) => {
                        console.log(
                          JSON.stringify(json, null, 2),
                          "<<<<<bawah"
                        );
                        if (json.status) {
                          let newTrans = newTransIos.filter(
                            (value) => value.user_id !== profile._id
                          );
                          dispatch(setTransIos(newTrans));
                          await RNIap.finishTransaction(purchase, true);
                          setLoading(false);
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
                          setError(
                            "Pesanan anda sedang dalam antrian, coba beberapa saat lagi"
                          );
                          await RNIap.finishTransaction(purchase, true);
                          setLoading(false);
                        }
                      })
                      .catch(async (err) => {
                        dispatch(
                          setTransIos([
                            ...newTransIos,
                            { item: item, user_id: profile._id },
                          ])
                        );
                        setError(
                          "Mohon maaf telah terjadi kesalahan pada server, coba beberapa saat lagi"
                        );
                        await RNIap.finishTransaction(purchase, true);
                        setLoading(false);
                      })
                      .finally(() => {
                        purchaseUpdateSubscription.remove();
                        purchaseUpdateSubscription = null;
                      });
                  }
                }
              }
            }
          );
          purchaseErrorSubscription = purchaseErrorListener((error) => {
            setLoading(false);
            setError("Transaksi di Batalkan");
            console.warn("purchaseErrorListener", error);
          });
        });
      }
    }
    return () => {
      if (purchaseUpdateSubscription) {
        purchaseUpdateSubscription.remove();
        purchaseUpdateSubscription = null;
      }
      if (purchaseErrorSubscription) {
        purchaseErrorSubscription.remove();
        purchaseErrorSubscription = null;
      }
    };
  }, []);

  const requestPurchase = async () => {
    try {
      setLoading(true);
      await RNIap.requestPurchase("com.goonline.app." + item._id, false);
    } catch (err) {
      setLoading(false);
      console.warn(err);
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
