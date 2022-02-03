import React, { useCallback, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Image,
  Dimensions,
  Text,
  TouchableHighlight,
  Alert,
  StatusBar,
} from "react-native";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import imgMateri from "../../../assets/Images/laporan/materi_terkuasai.png";
import imgTryout from "../../../assets/Images/laporan/tryout.png";
import { MaterialIcons } from "@expo/vector-icons";
import Fonts from "../../Theme/Fonts";

import { useNavigation, useFocusEffect } from "@react-navigation/core";
import SliverAppBar from "../../Components/sliverAppBar";
import Colors from "../../Theme/Colors";
import { useToast } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import {
  setChartTryout,
  setListTryout,
} from "../../Redux/Laporan/LaporanAction";
import NoData from "../../Components/NoData";
const LaporanScreen = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigation = useNavigation();
  const { isLogin } = useSelector((state) => state.authReducer);

  useFocusEffect(
    useCallback(() => {
      dispatch(setChartTryout({ data: null, loading: false, error: null }));
      dispatch(setListTryout({ data: null, loading: false, error: null }));
    }, [])
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <SliverAppBar
        element={
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Text style={Fonts.black25Bold}>Laporan</Text>
          </View>
        }
        toolbarColor={Colors.primaryColor}
        toolBarMinHeight={40}
        toolbarMaxHeight={230}
        src={require("../../../assets/Images/appbar_bg.png")}
      >
        {!isLogin ? (
          <View
            style={{
              marginTop: 50,
            }}
          >
            <NoData
              msg="Data ini akan muncul setelah kamu login"
              img="noimage"
            />
          </View>
        ) : (
          <View style={{ padding: 20 }}>
            <TouchableHighlight
              style={{ borderRadius: 15 }}
              onPress={() => {
                toast.show({
                  title: "Informasi",
                  status: "info",
                  description: "Fitur ini sedang dalam pengembangan",
                  placement: "top",
                  width: Dimensions.get("screen").width / 1.3,
                });
              }}
            >
              <View
                style={{
                  backgroundColor: "white",
                  height: Dimensions.get("screen").height / 6.5,
                  flexDirection: "row",
                  padding: 20,
                  elevation: 4,
                  borderRadius: 15,
                }}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                    elevation: 3,
                    borderRadius: 15,
                  }}
                >
                  <Image
                    source={imgMateri}
                    style={{
                      width: Dimensions.get("screen").width / 4,
                      height: Dimensions.get("screen").width / 4,
                    }}
                  />
                </View>
                <View
                  style={{
                    marginEnd: "auto",
                    marginStart: 10,
                    justifyContent: "center",
                    flex: 1,
                  }}
                >
                  <Text style={{ ...Fonts.black17Bold }}>Materi Terkuasai</Text>
                  <Text style={{ ...Fonts.gray15Regular }}>
                    Cek laporan yang sudah kamu kuasai
                  </Text>
                </View>

                <View style={{ justifyContent: "center" }}>
                  <MaterialIcons
                    name="arrow-forward-ios"
                    size={30}
                    color="black"
                  />
                </View>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              style={{ borderRadius: 15, marginTop: 15 }}
              onPress={() => navigation.navigate("LaporanTryoutScreen")}
            >
              <View
                style={{
                  backgroundColor: "white",
                  height: Dimensions.get("screen").height / 6.5,
                  flexDirection: "row",
                  padding: 20,
                  elevation: 4,
                  borderRadius: 15,
                }}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                    elevation: 3,
                    borderRadius: 15,
                  }}
                >
                  <Image
                    source={imgTryout}
                    style={{
                      width: Dimensions.get("screen").width / 4,
                      height: Dimensions.get("screen").width / 4,
                    }}
                  />
                </View>
                <View
                  style={{
                    marginEnd: "auto",
                    marginStart: 10,
                    justifyContent: "center",
                    flex: 1,
                  }}
                >
                  <Text style={{ ...Fonts.black17Bold }}>Tryout</Text>
                  <Text style={{ ...Fonts.gray15Regular }}>
                    Cek laporan hasil Tryout kamu
                  </Text>
                </View>

                <View style={{ justifyContent: "center" }}>
                  <MaterialIcons
                    name="arrow-forward-ios"
                    size={30}
                    color="black"
                  />
                </View>
              </View>
            </TouchableHighlight>
          </View>
        )}
        <StatusBar backgroundColor={Colors.primaryColor} />
      </SliverAppBar>
    </SafeAreaView>
  );
};

export default LaporanScreen;
