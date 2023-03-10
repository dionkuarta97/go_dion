import { Box, View } from "native-base";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListTryout } from "../../../Redux/Laporan/LaporanAction";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../../Theme/Colors";
import { TouchableOpacity, Alert, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
const ListTryout = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { type } = props;
  const { listTryout } = useSelector((state) => state.laporanReducer);

  useEffect(() => {
    if (type) dispatch(getListTryout(type));
  }, [type]);

  console.log(JSON.stringify(type, null, 2));

  return (
    <>
      {listTryout.data !== null && (
        <>
          <Box
            padding={5}
            bg={"white"}
            shadow={3}
            style={{
              borderRadius: 10,
              marginBottom: 50,
            }}
          >
            {listTryout.data.map((el, idx) => (
              <TouchableOpacity
                key={el._id}
                onPress={() => {
                  if (type === "sbmptn") {
                    if (el.status) {
                      navigation.navigate("ProgressTryout", {
                        type: type,
                        _id: el._id,
                        title: el.title,
                      });
                    } else {
                      Alert.alert("Informasi", "Laporan kamu sedang diproses");
                    }
                  } else {
                    navigation.navigate("ProgressTryout", {
                      type: type,
                      _id: el._id,
                      title: el.title,
                    });
                  }
                }}
              >
                <View
                  style={{
                    marginTop: 5,
                    flexDirection: "row",
                    borderBottomWidth:
                      idx === listTryout.data.length - 1 ? 0 : 0.7,
                    paddingBottom: 10,
                    borderBottomColor: Colors.ligthGreyColor,
                  }}
                >
                  <Box marginRight={3}>{idx + 1 + ". "}</Box>
                  <Box
                    style={{
                      marginEnd: "auto",
                    }}
                  >
                    {el.title}
                  </Box>
                  <View style={{ justifyContent: "center" }}>
                    <MaterialIcons
                      name="arrow-forward-ios"
                      size={15}
                      color="black"
                    />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </Box>
        </>
      )}
    </>
  );
};

export default ListTryout;
