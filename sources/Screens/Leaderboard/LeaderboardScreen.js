import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { useSelector } from "react-redux";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import NoData from "../../Components/NoData";
import LeaderboardContent from "./Component/LeaderboardContent";

const LeaderboardScreen = () => {
  const { isLogin } = useSelector((state) => state.authReducer);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DefaultAppBar title={"Leaderboard"} />
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
        <LeaderboardContent />
      )}
    </SafeAreaView>
  );
};

export default LeaderboardScreen;
