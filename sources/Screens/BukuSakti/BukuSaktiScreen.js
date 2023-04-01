import React from "react";
import { SafeAreaView } from "react-native";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import DefaultTabBar from "../../Components/DefaultTabBar";
import BukuSaktiContent from "./Component/BukuSaktiContent";

const BukuSaktiScreen = () => {
   return (
      <SafeAreaView style={{ flex: 1 }}>
         <DefaultAppBar
            title="Buku Sakti"
            backEnabled={true}
         />
         <DefaultTabBar
            routes={[
               { key: "item1", title: "Belum Diikuti" },
               {
                  key: "item2",
                  title: `Diikuti Sebagian`,
               },
               { key: "item3", title: "Selesai" },
            ]}
            screen={[
               <BukuSaktiContent status="untouched" />,
               <BukuSaktiContent status="touched" />,
               <BukuSaktiContent status="done" />,
            ]}
         />
      </SafeAreaView>
   );
};

export default BukuSaktiScreen;
