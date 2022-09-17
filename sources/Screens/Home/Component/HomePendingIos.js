import React, { useCallback, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import Colors from "../../../Theme/Colors";
import Sizes from "../../../Theme/Sizes";
import CompStyles from "../../../Theme/styles/globalStyles";
import Fonts from "../../../Theme/Fonts";
import { useNavigation, useFocusEffect } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import { getPaymentList } from "../../../Redux/Payment/paymentActions";

const HomePendingIos = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { newTransIos } = useSelector((state) => state.initReducer);
  const profile = useSelector((state) => state.profileReducer.profile);

  return (
    <View>
      {profile && (
        <>
          {newTransIos.filter((value) => value.user_id.includes(profile._id))
            .length > 0 ? (
            <View
              style={{
                ...CompStyles.defaultCard,
                marginHorizontal: Sizes.fixPadding * 2,
                backgroundColor: Colors.primaryColor,
                marginTop: 30,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ProductDetailScreen", {
                    item: newTransIos.filter((value) =>
                      value.user_id.includes(profile._id)
                    )[0].item,
                    section:
                      newTransIos.filter((value) =>
                        value.user_id.includes(profile._id)
                      )[0].item.category === "tryout"
                        ? "Paket Tryout"
                        : newTransIos.filter((value) =>
                            value.user_id.includes(profile._id)
                          )[0].item.category === "busak"
                        ? "Buku Sakti"
                        : "Paket Belajar",
                  });
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ flex: 1, ...Fonts.black15Bold }}>
                    1 Transaksi Tertunda
                  </Text>
                  <MaterialIcons name="chevron-right" size={25} color="black" />
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <View />
          )}
        </>
      )}
    </View>
  );
};

export default HomePendingIos;
