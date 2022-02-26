import { useNavigation } from "@react-navigation/native";
import { useToast } from "native-base";
import React, { useEffect } from "react";
import { View, Text, SafeAreaView, Dimensions } from "react-native";
import { useDispatch } from "react-redux";

import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import DefaultTabBar from "../../Components/DefaultTabBar";
import ToastErrorContent from "../../Components/ToastErrorContent";
import { getMe } from "../../Redux/Profile/profileActions";
import checkInternet from "../../Services/CheckInternet";
import GoTryoutContent from "./Component/GoTryoutContent";

const GoTryoutScreen = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigation = useNavigation();
  useEffect(() => {
    checkInternet().then((data) => {
      if (!data) {
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
      } else {
        dispatch(getMe());
      }
    });
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DefaultAppBar title="Go Tryout" backEnabled={true} />
      <DefaultTabBar
        routes={[
          { key: "item1", title: "Belum Diikuti" },
          { key: "item2", title: "Diikuti Sebagian" },
          { key: "item3", title: "Sudah Diikuti" },
        ]}
        screen={[
          <GoTryoutContent status="untouched" />,
          <GoTryoutContent status="touched" />,
          <GoTryoutContent status="done" />,
        ]}
      />
    </SafeAreaView>
  );
};

export default GoTryoutScreen;
