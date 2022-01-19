import React from "react";
import { Text, View } from "react-native";
import Sizes from "../../../Theme/Sizes";

const TryoutScoreContent = (props) => {
  const detail = props.detail;
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <View
        style={{
          flexDirection: "row",
          borderBottomWidth: 1,
          borderBottomColor: "lightgrey",
          paddingVertical: Sizes.fixPadding,
        }}
      >
        <Text style={{ color: "grey", flex: 1 }}>True Answer</Text>
        <Text style={{ fontWeight: "bold" }}>{detail.true_answer}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          borderBottomWidth: 1,
          borderBottomColor: "lightgrey",
          paddingVertical: Sizes.fixPadding,
        }}
      >
        <Text style={{ color: "grey", flex: 1 }}>Half Answer</Text>
        <Text style={{ fontWeight: "bold" }}>{detail.true_half_answer}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          borderBottomWidth: 1,
          borderBottomColor: "lightgrey",
          paddingVertical: Sizes.fixPadding,
        }}
      >
        <Text style={{ color: "grey", flex: 1 }}>False Answer</Text>
        <Text style={{ fontWeight: "bold" }}>{detail.false_answer}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          borderBottomWidth: 1,
          borderBottomColor: "lightgrey",
          paddingVertical: Sizes.fixPadding,
        }}
      >
        <Text style={{ color: "grey", flex: 1 }}>No Answer</Text>
        <Text style={{ fontWeight: "bold" }}>{detail.no_answer}</Text>
      </View>
    </View>
  );
};

export default TryoutScoreContent;
