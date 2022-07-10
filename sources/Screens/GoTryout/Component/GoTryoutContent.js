import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import NoData from "../../../Components/NoData";
import { getGoTryout } from "../../../Redux/Tryout/tryoutActions";
import checkInternet from "../../../Services/CheckInternet";
import Colors from "../../../Theme/Colors";
import GoTryoutCard from "./GoTryoutCard";
import NoMateri from "../../GoBelajar/Component/noMateri";

const GoTryoutContent = (props) => {
  const dispatch = useDispatch();
  const { tryoutData } = useSelector((state) => state.tryoutReducer);

  useEffect(() => {
    checkInternet().then((data) => {
      if (data) {
        dispatch(getGoTryout(props.status));
      }
    });
  }, [props.status]);

  console.log(JSON.stringify(tryoutData.data, null, 2));
  return (
    <View style={{ flex: 1 }}>
      {tryoutData.loading ? (
        <View
          style={{
            marginTop: 10,
          }}
        >
          <ActivityIndicator color={Colors.primaryColor} size={50} />
        </View>
      ) : tryoutData.error ? (
        <NoMateri
          title="Tryout Tidak Di Temukan"
          status={props.status !== "untouched" ? true : false}
        />
      ) : (
        <ScrollView
          style={{
            marginBottom: 10,
          }}
        >
          {tryoutData.data?.map((el) => (
            <GoTryoutCard data={el} tryoutId={el._id} key={el._id} />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default GoTryoutContent;
