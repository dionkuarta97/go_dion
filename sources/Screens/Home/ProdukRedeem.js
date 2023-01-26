import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Text,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import Fonts from "../../Theme/Fonts";
import Sizes from "../../Theme/Sizes";
import CompStyles from "../../Theme/styles/globalStyles";
import { MaterialIcons } from "@expo/vector-icons";
import { Box, Button, HStack } from "native-base";
import { capitalizeFirstLetter } from "../../Services/helper";
import DefaultModal from "../../Components/Modal/DefaultModal";
import LoadingIndicator from "../../Components/Indicator/LoadingIndicator";
import { RedeemCode } from "../../Redux/Produk/produkActions";

const ProdukRedeem = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const { data, code } = props.route.params;
  console.log(JSON.stringify(data, null, 2));
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DefaultAppBar backEnabled={true} title="Produk Redeem" />
      {modalShow && (
        <DefaultModal>
          <Box paddingX={2} paddingY={5}>
            {loading && <LoadingIndicator />}
            {message && <Text style={{ textAlign: "center" }}>{message}</Text>}
            {error && <Text style={{ textAlign: "center" }}>{error}</Text>}
            {!loading && (
              <Button
                onPress={() => {
                  navigation.popToTop("MainScreen");
                  setModalShow(false);
                }}
                bg={"amber.400"}
                _pressed={{ bg: "amber.200" }}
                marginTop={5}
              >
                Kembali ke Home
              </Button>
            )}
          </Box>
        </DefaultModal>
      )}
      <FlatList
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View
            style={{
              ...CompStyles.defaultCard,
              marginHorizontal: Sizes.fixPadding * 1,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: Sizes.fixPadding,
                marginRight: Sizes.fixPadding,
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Image
                source={{ uri: item.thumbnail }}
                style={{
                  width: "100%",
                  height: "100%",
                }}
                resizeMode="cover"
              />
            </View>
            <View
              style={{
                flex: 1,
                paddingVertical: Sizes.fixPadding / 2,
              }}
            >
              <Text
                style={{
                  ...Fonts.orangeColor14Bold,
                }}
              >
                {capitalizeFirstLetter(item.details.category)}
              </Text>
              <Text
                style={{
                  ...Fonts.black17Regular,
                }}
              >
                {item.title}
              </Text>
              {item.purchased && (
                <HStack marginTop={"auto"} space={1} alignItems="center">
                  <View
                    style={{
                      width: 15,
                      height: 15,
                      backgroundColor: "green",

                      borderRadius: 13,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <MaterialIcons name="check" size={12} color="white" />
                  </View>
                  <Text
                    style={{
                      ...Fonts.black17Regular,
                    }}
                  >
                    Sudah Dibeli
                  </Text>
                </HStack>
              )}
            </View>
          </View>
        )}
        data={data}
      />
      <Box padding={5} bg={"white"}>
        <Button
          bg={"amber.400"}
          _pressed={{ bg: "amber.200" }}
          onPress={() => {
            setLoading(true);
            setModalShow(true);
            dispatch(
              RedeemCode(
                JSON.stringify({
                  code: code,
                })
              )
            )
              .then((msg) => setMessage(msg))
              .catch((err) => setError(err))
              .finally(() => {
                setLoading(false);
              });
          }}
        >
          <Text
            style={{
              ...Fonts.black20Bold,
            }}
          >
            Lanjutkan Redeem
          </Text>
        </Button>
      </Box>
    </SafeAreaView>
  );
};

export default ProdukRedeem;
