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

const HomePendingPayment = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const paymentList = useSelector((state) => state.paymentReducer.paymentList);

  useFocusEffect(
    useCallback(() => {
      dispatch(getPaymentList("pending"));
    }, [])
  );

  return (
    <View>
      {paymentList.data !== null && paymentList.data.length > 0 ? (
        <View
          style={{
            ...CompStyles.defaultCard,
            marginHorizontal: Sizes.fixPadding * 2,
            backgroundColor: Colors.primaryColor,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("PurchasePendingScreen");
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
                Pending {paymentList.data.length} pembayaran
              </Text>
              <MaterialIcons name="chevron-right" size={25} color="black" />
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <View />
      )}
    </View>
  );
};

export default HomePendingPayment;
