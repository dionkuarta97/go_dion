import React, { useCallback } from "react";
import { Dimensions, SafeAreaView, Platform } from "react-native";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import DefaultTabBar from "../../Components/DefaultTabBar";
import { useFocusEffect } from "@react-navigation/native";

import PurchaseContent from "./Component/purchaseContent";
import checkInternet from "../../Services/CheckInternet";
import { useToast } from "native-base";
import ToastErrorContent from "../../Components/ToastErrorContent";
import PurchaseContentIos from "./Component/PurchaseContentIos";

const PurchaseScreen = (props) => {
  const { from } = props;
  const toast = useToast();
  useFocusEffect(
    useCallback(() => {
      checkInternet().then((connection) => {
        if (!connection) {
          toast.show({
            placement: "top",
            duration: null,
            width: Dimensions.get("screen").width / 1.3,
            render: (props) => {
              return (
                <>
                  <ToastErrorContent
                    content="Kamu tidak terhubung ke internet"
                    onPress={() => {
                      toast.closeAll();
                    }}
                  />
                </>
              );
            },
          });
        }
      });
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DefaultAppBar backEnabled={false} title="Pembelian" />
      {Platform.OS === "android" ? (
        <DefaultTabBar
          routes={[
            { key: "item1", title: "Pending" },
            { key: "item2", title: "Success" },
            { key: "item3", title: "Expired" },
          ]}
          screen={[
            <PurchaseContent from={from} status="pending" />,
            <PurchaseContent from={from} status="done" />,
            <PurchaseContent from={from} status="expire" />,
          ]}
        />
      ) : (
        <PurchaseContentIos from={from} />
      )}

      {/* <View style={{flex: 1}}>
                <PurchaseContent />
            </View> */}
    </SafeAreaView>
  );
};

export default PurchaseScreen;
