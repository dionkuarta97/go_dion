import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
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
        tryoutData.data?.map((el) => <GoTryoutCard data={el} tryoutId={el._id} key={el._id} />)
      )}
    </View>
  );
};

export default GoTryoutContent;
