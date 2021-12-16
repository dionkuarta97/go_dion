import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { Image, SafeAreaView, Text, View } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import ExpandableTile from "../../Components/Tile/ExpendableTile";
import Colors from "../../Theme/Colors";
import Fonts from "../../Theme/Fonts";
import Sizes from "../../Theme/Sizes";
import CompStyles from "../../Theme/styles/globalStyles";
import { useDispatch, useSelector } from "react-redux";
import { getMateri } from "../../Redux/Materi/materiActions";
import LoadingIndicator from "../../Components/Indicator/LoadingIndicator";
import EmptyIndicator from "../../Components/Indicator/EmptyIndicator";
import NoMateri from "./Component/noMateri";

const GoBelajarScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const materi = useSelector((state) => state.materiReducer.materi);

  useEffect(() => {
    dispatch(getMateri());
  }, []);

  const renderItem = (item) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("SubMateriScreen", {
            materiId: item._id,
            materiTitle: item.title,
          })
        }
      >
        <View style={CompStyles.defaultCard}>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                width: 90,
                height: 90,
                backgroundColor: "#FFC960",
                borderRadius: 12,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../../assets/Images/helper/noimage.png")}
                style={{
                  width: "80%",
                  height: undefined,
                  aspectRatio: 1,
                }}
              />
            </View>
            <View
              style={{
                flex: 1,
                marginLeft: Sizes.fixPadding,
              }}
            >
              <Text style={{ ...Fonts.black17Bold }}>{item.title}</Text>
              <Text style={{ ...Fonts.gray15Regular }}>{item.desc}</Text>
              <View style={{ flex: 1 }} />
              <Text
                style={{
                  ...Fonts.indigoColor16Bold,
                  color: "blue",
                }}
              >
                {item.includes.length} Materi
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DefaultAppBar title="Materi Belajar" backEnabled={true} />
      <View
        style={{
          flex: 1,
          paddingVertical: Sizes.fixPadding * 3,
          paddingHorizontal: Sizes.fixPadding * 2,
        }}
      >
        {materi.loading && <LoadingIndicator />}
        {materi.data !== null ? (
          <View style={{ flex: 1 }}>{materi.data.length > 0 ? <FlatList data={materi.data} keyExtractor={(item) => item._id} renderItem={({ item, index }) => renderItem(item)} /> : <EmptyIndicator />}</View>
        ) : (
          !materi.loading && <NoMateri />
        )}
      </View>
    </SafeAreaView>
  );
};

export default GoBelajarScreen;
