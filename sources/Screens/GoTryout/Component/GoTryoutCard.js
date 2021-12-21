import React from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../../../Theme/Colors";
import Fonts from "../../../Theme/Fonts";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

const GoTryoutCard = (props) => {
  const navigation = useNavigation();
  const { data, tryoutId } = props;

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("TryoutDetailScreen", {
          data: data.includes,
          tryoutId: tryoutId,
        });
      }}
    >
      <View
        style={{
          marginEnd: 10,
          marginStart: 10,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: Colors.ligthGreyColor,
          marginTop: 15,
          backgroundColor: "white",
          paddingEnd: 8,
          paddingStart: 20,
          paddingBottom: 10,
          paddingTop: 10,
          flexDirection: "row",
        }}
      >
        <View style={{ marginEnd: "auto" }}>
          <Text style={{ ...Fonts.black17Bold }}>{data.title}</Text>
          <Text style={{ ...Fonts.black15Regular }}>{data.desc}</Text>
          <Text style={{ ...Fonts.black15Regular }}>{data.level}</Text>
        </View>

        <View style={{ justifyContent: "center" }}>
          <MaterialIcons name="arrow-forward-ios" size={30} color="black" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default GoTryoutCard;
