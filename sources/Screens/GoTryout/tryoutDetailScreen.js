import React from "react";
import { useNavigation } from "@react-navigation/core";
import { View, SafeAreaView, Text, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import Fonts from "../../Theme/Fonts";
import Sizes from "../../Theme/Sizes";
import { useDispatch } from "react-redux";
import { setSoalUrl } from "../../Redux/Soal/soalActions";
import { urlQuests } from "../../Services/ApiUrl";
import { MaterialIcons } from "@expo/vector-icons";

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
  console.log(detail);
  return (
    <>
      {detail.quiz ? (
        <TouchableOpacity
          onPress={() => {
            if (!detail.touched) {
              dispatch(
                setSoalUrl(urlQuests + `/tryout/${tryoutId}/bab/${detail._id}`)
              );
              navigation.navigate("SoalScreen", { title: detail.title });
            } else if (detail.score) {
              if (detail.score === "processing") {
                Alert.alert("score sedang di proses");
              } else {
                navigation.navigate("ScoreScreen", {
                  idMateri: detail.score._id,
                  from: "tryout",
                });
              }
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
              TPS ({detail.total_question} Soal - {detail.total_time / 60}{" "}
              menit)
            </Text>
            <Text style={{ marginTop: 10 }}>{detail.desc}</Text>
            {detail.touched && (
              <View
                style={{
                  position: "absolute",
                  width: 25,
                  height: 25,
                  backgroundColor: "green",
                  top: 10,
                  right: 10,
                  borderRadius: 13,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MaterialIcons name="check" size={12} color="white" />
              </View>
            )}
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
          {detail.touched && (
            <View
              style={{
                position: "absolute",
                width: 25,
                height: 25,
                backgroundColor: "green",
                top: 10,
                right: 10,
                borderRadius: 13,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialIcons name="check" size={12} color="white" />
            </View>
          )}
        </View>
      )}
    </>
  );
};
