import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import Colors from "../../../Theme/Colors";
import Sizes from "../../../Theme/Sizes";
import CompStyles from "../../../Theme/styles/globalStyles";
import Fonts from "../../../Theme/Fonts";
import { useNavigation } from "@react-navigation/core";
import { useDispatch } from "react-redux";
import {
  setSaveAnswer,
  setSoal,
  setSoalUrl,
} from "../../../Redux/Soal/soalActions";

const PendingTryout = (props) => {
  const { soal } = props;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <View>
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
            dispatch(
              setSaveAnswer({
                data: null,
                error: null,
                loading: false,
              })
            );
            dispatch(setSoal({ data: null, error: null, loading: false }));
            dispatch(setSoalUrl(soal.soalUrl));
            navigation.navigate("SoalScreen", {
              title: soal.title,
              blockTime: soal.blockTime,
              soalUrl: soal.soalUrl,
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
              Anda sedang mengerjakan tryout
            </Text>
            <MaterialIcons name="chevron-right" size={25} color="black" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PendingTryout;
