import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Platform,
  Alert,
} from "react-native";
import Divider from "../../../Components/Divider";

import Fonts from "../../../Theme/Fonts";
import Sizes from "../../../Theme/Sizes";
import Colors from "../../../Theme/Colors";
import DefaultPrimaryButton from "../../../Components/Button/DefaultPrimaryButton";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { addToCart } from "../../../Redux/Cart/cartActions";
import RNIap, {
  purchaseErrorListener,
  purchaseUpdatedListener,
  type ProductPurchase,
  type PurchaseError,
} from "react-native-iap";
import { getPaymentApple } from "../../../Redux/Payment/paymentActions";
import DefaultModal from "../../../Components/Modal/DefaultModal";
import LoadingModal from "../../../Components/Modal/LoadingModal";
import { capitalizeFirstLetter } from "../../../Services/helper";

const { width } = Dimensions.get("screen");

const ProductDetailContent = (props) => {
  const isLogin = useSelector((state) => state.authReducer.isLogin);
  const [sukses, setSukses] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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
            setLoading(false);
          }
          console.log(JSON.stringify(products, null, 2));
        } catch (err) {
          console.warn(err);
        }

        RNIap.initConnection().then(() => {
          // we make sure that "ghost" pending payment are removed
          // (ghost = failed pending payment that are still marked as pending in Google's native Vending module cache)
          RNIap.flushFailedPurchasesCachedAsPendingAndroid()
            .catch(() => {
              // exception can happen here if:
              // - there are pending purchases that are still pending (we can't consume a pending purchase)
              // in any case, you might not want to do anything special with the error
            })
            .then(() => {
              purchaseUpdateSubscription = purchaseUpdatedListener(
                (purchase) => {
                  console.log("purchaseUpdatedListener", purchase);
                  const receipt = purchase.transactionReceipt;
                  if (receipt) {
                    dispatch(getPaymentApple(item))
                      .then(async (json) => {
                        setLoading(false);
                        await RNIap.finishTransaction(purchase, true);
                      })
                      .catch((err) => {
                        setLoading(false);
                        console.log(err);
                      });
                  }
                }
              );
              purchaseErrorSubscription = purchaseErrorListener((error) => {
                console.warn("purchaseErrorListener", error);
              });
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

  // useEffect(() => {
  //   if (Platform.OS === "ios") {
  //     if (sukses) {
  //
  //     }
  //   }
  // }, [sukses]);

  const requestPurchase = async () => {
    try {
      setLoading(true);
      await RNIap.requestPurchase("com.goonline.app." + item._id, false)
        .then(async (res) => {
          console.log("baru beli");
          const recipt = res.transactionReceipt;
          console.log(res);
          if (recipt) {
            const receiptBody = {
              "receipt-data": recipt,
              password: "f72a4af2242a467395a3bb582c099e69",
            };
            console.log(recipt);
            const validate = await RNIap.validateReceiptIos(receiptBody, true);
            if (validate) {
              dispatch(getPaymentApple(item))
                .then(async (json) => {
                  setSukses(validate);
                  setLoading(false);
                  await RNIap.finishTransaction(res, true);
                  console.log(json, "<<<<<Json");
                })
                .then(() => {
                  navigation.popToTop();
                  navigation.navigate("MainScreen");
                })
                .catch(async (err) => {
                  console.log(err, "<<<<Error");
                  if (err.message) {
                    setError(err.message);
                  } else {
                    setError("Mohon maaf telah terjadi kesalahan pada server");
                  }
                  setLoading(false);

                  await RNIap.finishTransaction(res, true);
                });
            }
          }
        })
        .catch(() => {
          setLoading(false);
        });
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
      {error && (
        <DefaultModal>
          <Text>{error}</Text>
          <DefaultPrimaryButton
            text="Kembali ke Home"
            onPress={() => {
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
            {!item.purchased && !onCart && (
              <DefaultPrimaryButton
                text="Beli Sekarang"
                onPress={() => {
                  if (Platform.OS === "ios") {
                    if (isLogin) {
                      requestPurchase();
                    } else {
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
                    }
                  } else {
                    dispatch(addToCart(item));
                    navigation.navigate("CartScreen");
                  }
                }}
              />
            )}

            {!item.purchased && onCart && (
              <DefaultPrimaryButton
                text="Sudah Ada di Keranjang"
                onPress={() => {
                  navigation.navigate("CartScreen");
                }}
              />
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
