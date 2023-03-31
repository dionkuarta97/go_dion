import React from "react";
import { SafeAreaView } from "react-native";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";

const BukuSaktiScreen = () => {
   return (
      <SafeAreaView style={{ flex: 1 }}>
         <DefaultAppBar
            title="Buku Sakti"
            backEnabled={true}
         />
      </SafeAreaView>
   );
};

export default BukuSaktiScreen;
