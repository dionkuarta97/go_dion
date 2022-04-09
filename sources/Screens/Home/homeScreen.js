import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import SliverAppBar from "../../Components/sliverAppBar";
import HomeContent from "./Component/HomeContent";
import { useNavigation } from "@react-navigation/core";
import { FontAwesome5 } from "@expo/vector-icons";

import Fonts from "../../Theme/Fonts";
import Colors from "../../Theme/Colors";
import ActionButtonCart from "../../Components/ActionButton/ActionButtonCart";
import VersionText from "../../Components/VersionText";
import {
  Box,
  Actionsheet,
  useDisclose,
  Heading,
  Input,
  Icon,
  Button,
} from "native-base";
import gift from "../../../assets/Images/helper/gift.png";
import error from "../../../assets/Images/helper/error.png";
import success from "../../../assets/Images/helper/success.png";
import { getRedeemCode, setRedeemCode } from "../../Redux/Produk/produkActions";
const HomeScreen = (props) => {
  const isLogin = useSelector((state) => state.authReducer.isLogin);
  const profile = useSelector((state) => state.profileReducer.profile);
  const [code, setCode] = useState("");
  const [errorCode, setErrorCode] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclose();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const redeemCode = useSelector((state) => state.produkReducer.redeemCode);

  console.log(JSON.stringify(redeemCode, null, 2), "wkwkwk");
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SliverAppBar
        rightItem={
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {!isLogin && (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => navigation.navigate("LoginScreen")}
              >
                <Text
                  style={{
                    paddingHorizontal: 15,
                    paddingVertical: 5,
                    borderRadius: 50,
                    backgroundColor: Colors.blackColor,
                    color: Colors.primaryColor,
                    fontWeight: "bold",
                    letterSpacing: 1.2,
                  }}
                >
                  Login
                </Text>
              </TouchableOpacity>
            )}
            <View style={{ width: 15 }} />
            <Box
              style={{
                marginRight: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  if (!isLogin) {
                    Alert.alert(
                      "Tidak Bisa Masuk",
                      "Kamu harus login terlebih dahulu untuk mengakses menu ini"
                    );
                  } else {
                    onOpen();
                  }
                }}
              >
                <FontAwesome5 name="gift" size={24} color="black" />
              </TouchableOpacity>
              <Actionsheet
                isOpen={isOpen}
                onClose={() => {
                  setCode("");
                  setErrorCode(false);
                  dispatch(
                    setRedeemCode({ data: null, error: null, loading: false })
                  );
                  onClose();
                }}
              >
                <Actionsheet.Content>
                  <Heading>Redeem Voucher</Heading>
                  {redeemCode.loading ? (
                    <Box
                      style={{
                        paddingVertical: 100,
                      }}
                    >
                      <ActivityIndicator color="black" size={80} />
                    </Box>
                  ) : (
                    <>
                      {redeemCode.error ? (
                        <>
                          <Image
                            style={{
                              width: Dimensions.get("screen").width / 1.4,
                              height: Dimensions.get("screen").height / 3.8,
                            }}
                            source={error}
                            resizeMode="contain"
                          />

                          <Box
                            style={{
                              marginTop: 20,
                              marginBottom: 100,
                              padding: 20,
                            }}
                          >
                            <Text
                              style={{
                                textAlign: "center",
                              }}
                            >
                              {redeemCode.error}
                            </Text>
                          </Box>
                        </>
                      ) : redeemCode.data ? (
                        <>
                          <Image
                            style={{
                              width: Dimensions.get("screen").width / 1.4,
                              height: Dimensions.get("screen").height / 3.8,
                            }}
                            source={success}
                            resizeMode="contain"
                          />

                          <Box
                            style={{
                              marginTop: 20,
                              marginBottom: 100,
                              padding: 20,
                            }}
                          >
                            <Text
                              style={{
                                textAlign: "center",
                              }}
                            >
                              {redeemCode.data}
                            </Text>
                          </Box>
                        </>
                      ) : (
                        <>
                          <Image
                            style={{
                              width: Dimensions.get("screen").width / 1.4,
                              height: Dimensions.get("screen").height / 3.8,
                            }}
                            source={gift}
                            resizeMode="contain"
                          />

                          <Input
                            onChangeText={(val) => setCode(val)}
                            style={{}}
                            w={{
                              base: "75%",
                              md: "25%",
                            }}
                            InputLeftElement={
                              <Icon
                                as={<FontAwesome5 name="gift" />}
                                size={5}
                                ml="2"
                                color="muted.400"
                              />
                            }
                            placeholder="Voucher Code"
                          />
                          {errorCode && (
                            <Text style={{ color: "red" }}>
                              * Voucher tidak boleh kosong
                            </Text>
                          )}
                          <Box
                            style={{
                              padding: 10,
                              marginBottom: 50,
                            }}
                          >
                            <Button
                              bg={"amber.400"}
                              onPress={() => {
                                if (code === "") {
                                  setErrorCode(true);
                                } else {
                                  dispatch(
                                    getRedeemCode(
                                      JSON.stringify({
                                        code: code,
                                      })
                                    )
                                  );
                                }
                              }}
                              style={{
                                width: Dimensions.get("screen").width / 1.4,
                              }}
                            >
                              Redeem Sekarang
                            </Button>
                          </Box>
                        </>
                      )}
                    </>
                  )}
                </Actionsheet.Content>
              </Actionsheet>
            </Box>

            <ActionButtonCart />
          </View>
        }
        element={
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
            }}
          >
            <View style={{ flex: 1 }}>
              <Text>Hello,</Text>
              <Text style={Fonts.black25Bold}>
                {isLogin && profile !== null ? profile.full_name : "Guest"}
              </Text>
            </View>
            {isLogin && (
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.navigate("ProfileScreen")}
              >
                <Image
                  style={{
                    height: 80.0,
                    width: 80.0,
                    borderRadius: 40.0,
                  }}
                  source={require("../../../assets/Images/user_profile/no-user.jpg")}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            )}
          </View>
        }
        toolbarColor={Colors.primaryColor}
        toolBarMinHeight={40}
        toolbarMaxHeight={230}
        src={require("../../../assets/Images/appbar_bg.png")}
      >
        <HomeContent />
        <VersionText />
        <StatusBar backgroundColor={Colors.primaryColor} />
      </SliverAppBar>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
