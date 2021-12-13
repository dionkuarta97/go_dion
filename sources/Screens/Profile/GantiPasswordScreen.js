import React from "react";
import { SafeAreaView } from "react-native";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";

import GantiPasswordContent from "./Component/GantiPasswordContent";
const GantiPasswordScreen = (props) => {
  const { route } = props;
  const { email } = route.params;
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <DefaultAppBar title="Ganti Password" backEnabled={true} />
        <GantiPasswordContent email={email} />
      </SafeAreaView>
    </>
  );
};

export default GantiPasswordScreen;
