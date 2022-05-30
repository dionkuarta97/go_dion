import { useNavigation } from "@react-navigation/core";
import React, { useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { useDispatch, useSelector } from "react-redux";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import ExpandableTile from "../../Components/Tile/ExpendableTile";
import {
  getMateriDetail,
  setMateriQuiz,
} from "../../Redux/Materi/materiActions";
import Colors from "../../Theme/Colors";
import Fonts from "../../Theme/Fonts";
import Sizes from "../../Theme/Sizes";
import CompStyles from "../../Theme/styles/globalStyles";
import LoadingIndicator from "../../Components/Indicator/LoadingIndicator";
import { urlQuests } from "../../Services/ApiUrl";
import { setSoalUrl } from "../../Redux/Soal/soalActions";
import EmptyIndicator from "../../Components/Indicator/EmptyIndicator";

const SubMateriScreen = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const materiDetail = useSelector((state) => state.materiReducer.materiDetail);
  const materiId = props.route.params.materiId;
  const materiTitle = props.route.params.materiTitle;

  useEffect(() => {
    dispatch(getMateriDetail(materiId));
  }, []);

  const renderSubItem = (title, onPress) => {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => onPress()}>
        <View
          style={{
            paddingVertical: Sizes.fixPadding * 2,
            paddingHorizontal: Sizes.fixPadding,
            borderBottomWidth: 1,
            borderBottomColor: "lightgrey",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Text style={{ ...Fonts.black15Regular, flex: 1 }}>{title}</Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={30}
            color={Colors.orangeColor}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem = (item) => {
    return (
      <View
        style={{ ...CompStyles.defaultCard, marginBottom: 0, marginTop: 8 }}
        key={item._id}
      >
        <ExpandableTile
          header={
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  width: 90,
                  height: 90,
                  backgroundColor: "#FF8181",
                  borderRadius: 12,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../../assets/Images/helper/noimage2.png")}
                  style={{
                    width: "80%",
                    height: undefined,
                    aspectRatio: 1,
                  }}
                />
              </View>
              <View
                style={{
                  marginLeft: Sizes.fixPadding,
                  flex: 1,
                }}
              >
                <Text style={Fonts.gray15Bold}>{item.title}</Text>
                <Text style={Fonts.black17Bold}>{item.desc}</Text>
              </View>
            </View>
          }
        >
          {item.video.length > 0 &&
            renderSubItem(`Video    ( ${item?.video.length} )`, () =>
              navigation.navigate("MateriVideoScreen", {
                videos: item.video,
              })
            )}
          {item.pdf.length > 0 &&
            renderSubItem(`E-Book    ( ${item?.pdf.length} ) `, () =>
              navigation.navigate("MateriEbookScreen", {
                ebooks: item.pdf,
              })
            )}
          {/* {item.quiz &&
            renderSubItem("Quiz", () => {
              dispatch(setSoalUrl(urlQuests + `/materi/${materiId}/bab/${item._id}`));
              navigation.navigate("SoalScreen", { title: item.title });
            })} */}
        </ExpandableTile>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DefaultAppBar title={materiTitle} backEnabled={true} />
      <View style={styles.container}>
        {/* {renderItem("Video", "Kumpulan video menarik")}
                {renderItem("PDF", "Materi belajar disini")}
                {renderItem("Ujian", "Uji pemahaman", () =>
                    navigation.navigate("TryoutDetailScreen")
                )} */}
        {materiDetail.loading && <LoadingIndicator />}
        {materiDetail.data !== null && (
          <View style={{ flex: 1 }}>
            {materiDetail.data.length > 0 ? (
              <View style={{ flex: 1 }}>
                {materiDetail.data.map((item, index) => {
                  return renderItem(item);
                })}
              </View>
            ) : (
              <EmptyIndicator />
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default SubMateriScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingEnd: 15,
    paddingStart: 15,
    paddingBottom: 15,
  },
});
