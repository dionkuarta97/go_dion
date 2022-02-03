import { Box, View } from "native-base";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListTryout } from "../../../Redux/Laporan/LaporanAction";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../../Theme/Colors";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
const ListTryout = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { type } = props;
  const { listTryout } = useSelector((state) => state.laporanReducer);

  useEffect(() => {
    if (type) dispatch(getListTryout(type));
  }, [type]);

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
                onPress={() =>
                  navigation.navigate("ProgressTryout", {
                    type: type,
                    _id: el._id,
                  })
                }
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
