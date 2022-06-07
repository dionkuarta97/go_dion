import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { useSelector } from "react-redux";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import NoData from "../../Components/NoData";
import GantiFotoContent from "./Component/GantiFotoContent";

const GantiFotoScreen = ({ route }) => {
  const { params } = route;
  const { isLogin } = useSelector((state) => state.authReducer);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DefaultAppBar backEnabled={true} title={"Ganti Foto"} />
      {!isLogin ? (
        <View
          style={{
            justifyContent: "center",
            flex: 1,
          }}
        >
          <NoData
            msg="Halaman ini akan muncul setelah kamu login"
            img="noimage"
          />
        </View>
      ) : (
        <GantiFotoContent poto={params.poto} />
      )}
    </SafeAreaView>
  );
};

export default GantiFotoScreen;
