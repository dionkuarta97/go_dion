import React from "react";
import { useNavigation } from "@react-navigation/core";
import { View, SafeAreaView, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import Fonts from "../../Theme/Fonts";
import Sizes from "../../Theme/Sizes";
import { useDispatch } from "react-redux";
import { setSoalUrl } from "../../Redux/Soal/soalActions";
import { urlQuests } from "../../Services/ApiUrl";

const TryoutDetailScreen = (props) => {
  const { route } = props;
  const { data, tryoutId } = route.params;
  console.log(data);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DefaultAppBar title="Tryout Detail" backEnabled={true} />
      {data.map((el) => (
        <TryoutCard detail={el} tryoutId={tryoutId} key={el._id} />
      ))}
    </SafeAreaView>
  );
};

export default TryoutDetailScreen;

const TryoutCard = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { detail, tryoutId } = props;
  console.log(detail._id);
  return (
    <>
      {detail.quiz ? (
        <TouchableOpacity
          onPress={() => {
            if (!detail.touched) {
              dispatch(setSoalUrl(urlQuests + `/tryout/${tryoutId}/bab/${detail._id}`));
              navigation.navigate("SoalScreen", { title: detail.title });
            }
          }}
        >
          <View
            style={{
              marginEnd: 10,
              marginStart: 10,
              borderRadius: 8,
              marginTop: Sizes.fixPadding,
              padding: Sizes.fixPadding,
              backgroundColor: "white",
              elevation: 2,
            }}
          >
            <Text style={{ ...Fonts.orangeColor20Bold }}>{detail.title}</Text>
            <Text style={{ ...Fonts.black17Bold }}>
              TPS ({detail.total_question} Soal - {detail.total_time} menit)
            </Text>
            <Text style={{ marginTop: 10 }}>{detail.desc}</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <View
          style={{
            marginEnd: 10,
            marginStart: 10,
            borderRadius: 8,
            marginTop: Sizes.fixPadding,
            padding: Sizes.fixPadding,
            backgroundColor: "white",
            elevation: 2,
          }}
        >
          <Text style={{ ...Fonts.orangeColor20Bold }}>{detail.title}</Text>
          <Text style={{ ...Fonts.black17Bold }}>
            TPS ({detail.total_question} Soal - {detail.total_time} menit)
          </Text>
          <Text style={{ marginTop: 10 }}>{detail.desc}</Text>
        </View>
      )}
    </>
  );
};
