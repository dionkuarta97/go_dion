import React from "react";

import { SafeAreaView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import ProgressTryoutContent from "./components/ProgressScreenContent";
const ProgressTryout = (props) => {
  const { type, _id, title } = props.route.params;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DefaultAppBar backEnabled={true} title={title} />

      <ProgressTryoutContent type={type} _id={_id} />
    </SafeAreaView>
  );
};

export default ProgressTryout;
