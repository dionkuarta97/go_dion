import React, { useCallback } from "react";
import { Dimensions, SafeAreaView, BackHandler } from "react-native";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import DefaultTabBar from "../../Components/DefaultTabBar";
import { useFocusEffect } from "@react-navigation/native";

import PurchaseContent from "./Component/purchaseContent";
import checkInternet from "../../Services/CheckInternet";
import { useToast } from "native-base";
import ToastErrorContent from "../../Components/ToastErrorContent";

const PurchaseScreen = () => {
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
      <DefaultTabBar
        routes={[
          { key: "item1", title: "Pending" },
          { key: "item2", title: "Success" },
          { key: "item3", title: "Expired" },
        ]}
        screen={[
          <PurchaseContent status="pending" />,
          <PurchaseContent status="done" />,
          <PurchaseContent status="expire" />,
        ]}
      />
      {/* <View style={{flex: 1}}>
                <PurchaseContent />
            </View> */}
    </SafeAreaView>
  );
};

export default PurchaseScreen;
