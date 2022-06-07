import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import NoData from "../../Components/NoData";
import TryoutLeaderContent from "./Component/TryoutLeaderContent";

const TryoutLeaderScreen = ({ route }) => {
  const { params } = route;
  const { isLogin } = useSelector((state) => state.authReducer);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DefaultAppBar backEnabled={true} title={params.title} />
      {!isLogin ? (
        <View
          style={{
            justifyScreen: "center",
            flex: 1,
          }}
        >
          <NoData
            msg="Halaman ini akan muncul setelah kamu login"
            img="noimage"
          />
        </View>
      ) : (
        <TryoutLeaderContent id={params.id} tahun={params.tahun.split("/")} />
      )}
    </SafeAreaView>
  );
};

export default TryoutLeaderScreen;
