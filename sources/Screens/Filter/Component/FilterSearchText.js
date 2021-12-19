import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import DefaultPrimaryButton from "../../../Components/Button/DefaultPrimaryButton";
import DefaultCard from "../../../Components/Card/DefaultCard";
import DefaultTextInput from "../../../Components/CustomTextInput/DefaultTextInput";

import Fonts from "../../../Theme/Fonts";
import Sizes from "../../../Theme/Sizes";
import Colors from "../../../Theme/Colors";
import { useDispatch } from "react-redux";
import { getSearchProductTitle } from "../../../Redux/Produk/produkActions";

const FilterSearchText = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [keyword, setKeyword] = useState("");
  return (
    <DefaultCard>
      <Text style={{ ...Fonts.black17Regular }}>Ketikkan pelajaran atau bab yang kamu inginkan dibawah ini.</Text>

      <DefaultTextInput value={keyword} onChangeText={(val) => setKeyword(val)} placeholder="ketikkan yang dicari" />

      <View style={{ width: 180, alignSelf: "flex-end" }}>
        <DefaultPrimaryButton
          text="Cari"
          onPress={() => {
            dispatch(getSearchProductTitle(keyword));
            navigation.navigate("FilterResultScreen", { keyword: keyword });
          }}
        />
      </View>
    </DefaultCard>
  );
};

export default FilterSearchText;
