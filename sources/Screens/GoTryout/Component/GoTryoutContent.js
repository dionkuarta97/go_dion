import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import NoData from "../../../Components/NoData";
import { getGoTryout } from "../../../Redux/Tryout/tryoutActions";
import Colors from "../../../Theme/Colors";
import GoTryoutCard from "./GoTryoutCard";

const GoTryoutContent = (props) => {
  const dispatch = useDispatch();
  const { tryoutData } = useSelector((state) => state.tryoutReducer);

  useEffect(() => {
    dispatch(getGoTryout(props.status));
  }, [props.status]);

  console.log(tryoutData.data);
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
        <NoData img="NoImage2" msg="Tryout Tidak Di Temukan" />
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
