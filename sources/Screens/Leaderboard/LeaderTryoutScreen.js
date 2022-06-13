import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { useSelector } from "react-redux";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import NoData from "../../Components/NoData";
import LeaderboardContent from "./Component/LeaderboardContent";
import LeaderTryoutContent from "./Component/LeaderTryoutContent";

const LeaderTryoutScreen = () => {
  const { isLogin } = useSelector((state) => state.authReducer);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DefaultAppBar backEnabled={true} title={"Tryout"} />
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
        <LeaderTryoutContent />
      )}
    </SafeAreaView>
  );
};

export default LeaderTryoutScreen;
