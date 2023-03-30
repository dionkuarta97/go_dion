import React from "react";
import { Text, View } from "react-native";
import Sizes from "../../../Theme/Sizes";

const OnResult = (props) => {
   const detail = props.detail;

   return (
      <View style={{ flex: 1, alignItems: "center" }}>
         <View
            style={{
               alignItems: "center",
               marginBottom: Sizes.fixPadding * 2,
            }}
         >
            <Text style={{ color: "grey" }}>Total Score</Text>
            <Text
               style={{
                  color: "#7DC579",
                  fontWeight: "bold",
                  fontSize: 28,
               }}
            >
               {detail.sessions.scores[0].final_score}
            </Text>
         </View>
         <View
            style={{
               flexDirection: "row",
               borderBottomWidth: 1,
               borderBottomColor: "lightgrey",
               paddingVertical: Sizes.fixPadding,
            }}
         >
            <Text style={{ color: "grey", flex: 1 }}>Full Score</Text>
            <Text style={{ fontWeight: "bold" }}>
               {detail.sessions.scores[0].user_statistics.true_answer}
            </Text>
         </View>
         <View
            style={{
               flexDirection: "row",
               borderBottomWidth: 1,
               borderBottomColor: "lightgrey",
               paddingVertical: Sizes.fixPadding,
            }}
         >
            <Text style={{ color: "grey", flex: 1 }}>Half Score</Text>
            <Text style={{ fontWeight: "bold" }}>
               {detail.sessions.scores[0].user_statistics.true_half_answer}
            </Text>
         </View>
         <View
            style={{
               flexDirection: "row",
               borderBottomWidth: 1,
               borderBottomColor: "lightgrey",
               paddingVertical: Sizes.fixPadding,
            }}
         >
            <Text style={{ color: "grey", flex: 1 }}>False Score</Text>
            <Text style={{ fontWeight: "bold" }}>
               {detail.sessions.scores[0].user_statistics.false_answer}
            </Text>
         </View>
         <View
            style={{
               flexDirection: "row",
               borderBottomWidth: 1,
               borderBottomColor: "lightgrey",
               paddingVertical: Sizes.fixPadding,
            }}
         >
            <Text style={{ color: "grey", flex: 1 }}>Zero Score</Text>
            <Text style={{ fontWeight: "bold" }}>
               {detail.sessions.scores[0].user_statistics.no_answer}
            </Text>
         </View>
      </View>
   );
};

export default OnResult;
