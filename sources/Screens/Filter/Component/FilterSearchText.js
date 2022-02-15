import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import DefaultPrimaryButton from "../../../Components/Button/DefaultPrimaryButton";
import DefaultCard from "../../../Components/Card/DefaultCard";
import DefaultTextInput from "../../../Components/CustomTextInput/DefaultTextInput";

import Fonts from "../../../Theme/Fonts";
import Sizes from "../../../Theme/Sizes";
import Colors from "../../../Theme/Colors";
import { useDispatch } from "react-redux";
import { getSearchProductTitle } from "../../../Redux/Produk/produkActions";
import { useToast } from "native-base";
import ToastErrorContent from "../../../Components/ToastErrorContent";
import checkInternet from "../../../Services/CheckInternet";

const FilterSearchText = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [keyword, setKeyword] = useState("");
  return (
    <DefaultCard>
      <Text style={{ ...Fonts.black17Regular }}>
        Ketikkan pelajaran atau bab yang kamu inginkan dibawah ini.
      </Text>

      <DefaultTextInput
        value={keyword}
        onChangeText={(val) => setKeyword(val)}
        placeholder="ketikkan yang dicari"
      />

      <View style={{ width: 180, alignSelf: "flex-end" }}>
        <DefaultPrimaryButton
          text="Cari"
          onPress={() => {
            checkInternet().then((connection) => {
              if (connection) {
                if (!keyword) {
                  toast.show({
                    placement: "top",
                    duration: 3000,
                    width: Dimensions.get("screen").width / 1.3,
                    render: () => {
                      return (
                        <ToastErrorContent content="Keyword tidak boleh kosong" />
                      );
                    },
                  });
                } else {
                  dispatch(getSearchProductTitle(keyword));
                  navigation.navigate("FilterResultScreen", {
                    keyword: keyword,
                  });
                }
              } else {
                toast.show({
                  placement: "top",
                  duration: null,
                  width: Dimensions.get("screen").width / 1.3,
                  render: () => {
                    return (
                      <ToastErrorContent
                        content="Kamu tidak terhubung ke internet"
                        onPress={() => {
                          toast.closeAll();
                          navigation.goBack();
                        }}
                      />
                    );
                  },
                });
              }
            });
          }}
        />
      </View>
    </DefaultCard>
  );
};

export default FilterSearchText;
