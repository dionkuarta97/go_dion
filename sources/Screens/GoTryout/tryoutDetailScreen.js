import React from "react";
import { SafeAreaView } from "react-native";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import CountDown from "react-native-countdown-component";
import TryoutCard from "./Component/TryoutCard";

const TryoutDetailScreen = (props) => {
  const { route } = props;
  const { data, tryoutId, title } = route.params;
  console.log(JSON.stringify(data, null, 2));

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DefaultAppBar title={title} backEnabled={true} />
      {data.map((el) => (
        <TryoutCard detail={el} tryoutId={tryoutId} key={el._id} />
      ))}
    </SafeAreaView>
  );
};

export default TryoutDetailScreen;
