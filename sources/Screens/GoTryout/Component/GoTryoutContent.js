import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import NoData from "../../../Components/NoData";
import { getGoTryout } from "../../../Redux/Tryout/tryoutActions";
import checkInternet from "../../../Services/CheckInternet";
import Colors from "../../../Theme/Colors";
import GoTryoutCard from "./GoTryoutCard";
import NoMateri from "../../GoBelajar/Component/noMateri";
import { useFocusEffect } from "@react-navigation/native";

const GoTryoutContent = (props) => {
  const dispatch = useDispatch();
  const { tryoutData } = useSelector((state) => state.tryoutReducer);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      checkInternet().then((data) => {
        if (data) {
          if (!refreshing) dispatch(getGoTryout(props.status));
        }
      });
    }, [props.status])
  );

  useEffect(() => {
    if (refreshing) {
      dispatch(getGoTryout(props.status));
      if (!tryoutData.loading) {
        setRefreshing(false);
      }
    }
  }, [refreshing]);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
  }, []);

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
          title="Tryout Tidak Ditemukan"
          status={props.status !== "untouched" ? true : false}
        />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={{
            marginBottom: 10,
          }}
        >
          {tryoutData.data?.map((el) => (
            <GoTryoutCard
              data={el}
              tryoutId={el._id}
              key={el._id}
              status={props.status}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default GoTryoutContent;
