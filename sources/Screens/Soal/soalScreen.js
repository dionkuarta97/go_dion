import React, { useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  Text,
  ScrollView,
  View,
  StyleSheet,
  BackHandler,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";

import LoadingIndicator from "../../Components/Indicator/LoadingIndicator";
import { getSoal, setNumber } from "../../Redux/Soal/soalActions";

import SoalContent from "./Component/soalContent";

const SoalScreen = ({ route }) => {
  const params = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const soal = useSelector((state) => state.soalReducer.soal);
  console.log(params.blockTime);

  useEffect(() => {
    dispatch(getSoal());
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DefaultAppBar
        title="Soal"
        backEnabled={params.blockTime ? false : true}
        backPressed={() => {
          Alert.alert("Cancel taking quiz", "Are you sure?", [
            {
              text: "Cancel",
              onPress: () => {},
            },
            {
              text: "Yes",
              onPress: () => navigation.goBack(),
            },
          ]);
        }}
      />
      {soal.loading && <LoadingIndicator />}
      {soal.data != null && (
        <SoalContent title={params.title} blockTime={params.blockTime} />
      )}
    </SafeAreaView>
  );
};

export default SoalScreen;

const styles = StyleSheet.create({});
