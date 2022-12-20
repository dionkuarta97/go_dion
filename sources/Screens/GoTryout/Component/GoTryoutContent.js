import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  Alert,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import NoData from "../../../Components/NoData";
import { getGoTryout } from "../../../Redux/Tryout/tryoutActions";
import checkInternet from "../../../Services/CheckInternet";
import Colors from "../../../Theme/Colors";
import GoTryoutCard from "./GoTryoutCard";
import NoMateri from "../../GoBelajar/Component/noMateri";
import { useFocusEffect } from "@react-navigation/native";
import DefaultModal from "../../../Components/Modal/DefaultModal";
import { Button, Center } from "native-base";
import { AntDesign } from "@expo/vector-icons";

const GoTryoutContent = (props) => {
  const dispatch = useDispatch();
  const { tryoutData } = useSelector((state) => state.tryoutReducer);
  const [refreshing, setRefreshing] = useState(false);
  const [modal, setModal] = useState(false);

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
    if (tryoutData.expired) {
      if (props.status !== "done" && tryoutData.expired.expired) {
        setModal(true);
      }
    }
  }, [tryoutData]);
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

  console.log(modal);

  return (
    <View style={{ flex: 1 }}>
      {modal && props.status !== "done" && (
        <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
          <Center
            paddingX={"5"}
            paddingY={2}
            bg={"amber.100"}
            borderRadius={15}
          >
            <Text style={{ fontSize: 19, fontWeight: "bold", marginBottom: 5 }}>
              <AntDesign name="infocirlceo" size={20} color="black" /> Informasi
            </Text>
            <Text
              style={{ fontSize: 15, marginBottom: 6, textAlign: "center" }}
            >
              Ada produk tryout kamu yang dipindahkan ke bagian "Sudah diikuti"
              karena sudah habis masa pengerjaannya.
            </Text>
            <Button
              bg={"amber.400"}
              width={Dimensions.get("screen").width / 2}
              _pressed={{ bg: "amber.200" }}
              onPress={() => setModal(false)}
            >
              Tutup
            </Button>
          </Center>
        </View>
      )}
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
