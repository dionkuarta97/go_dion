import { useNavigation } from "@react-navigation/native";
import { useToast } from "native-base";
import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, Dimensions, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";

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
  const urlBase = useSelector((state) => state.initReducer.baseUrl);
  const token = useSelector((state) => state.authReducer.token);
  const [tryout, setTryout] = useState([]);
  const [loading, setLoading] = useState(true);
  const { tryoutData } = useSelector((state) => state.tryoutReducer);

  const getTryout = async () => {
    try {
      const response = await fetch(
        urlBase + "/masterdata/v1/tryouts?status=touched",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      if (result.status) setTryout(result.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

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
        getTryout();
      }
    });
  }, []);

  console.log("sekali");
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DefaultAppBar title="Tryout" backEnabled={true} />
      {!loading && (
        <DefaultTabBar
          routes={[
            { key: "item1", title: "Belum Diikuti" },
            {
              key: "item2",
              title: `Diikuti Sebagian`,
              tryout: tryout.length,
            },
            { key: "item3", title: "Selesai" },
          ]}
          screen={[
            <GoTryoutContent status="untouched" />,
            <GoTryoutContent status="touched" />,
            <GoTryoutContent status="done" />,
          ]}
        />
      )}
    </SafeAreaView>
  );
};

export default GoTryoutScreen;
