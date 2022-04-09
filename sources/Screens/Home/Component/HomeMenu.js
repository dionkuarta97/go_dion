import React, { useEffect, useCallback } from "react";
import {
  Alert,
  BackHandler,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  VirtualizedList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import { getHomeMenu } from "../../../Redux/Home/homeActions";
import { FlatList } from "react-native-gesture-handler";
import { useNavigation, useFocusEffect } from "@react-navigation/core";
import Fonts from "../../../Theme/Fonts";
import Sizes from "../../../Theme/Sizes";
import Colors from "../../../Theme/Colors";
import { HStack, useToast, VStack } from "native-base";
import checkInternet from "../../../Services/CheckInternet";
import ToastErrorContent from "../../../Components/ToastErrorContent";

const HomeMenu = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const homeMenuState = useSelector((state) => state.homeReducer.homeMenu);
  const isLogin = useSelector((state) => state.authReducer.isLogin);

  useEffect(() => {
    checkInternet().then((connection) => {
      if (connection) {
        dispatch(getHomeMenu());
      } else {
        toast.show({
          placement: "top",
          duration: null,
          width: Dimensions.get("screen").width / 1.3,
          render: (props) => {
            return (
              <>
                <ToastErrorContent
                  content="Kamu tidak terhubung ke internet"
                  onPress={() => {
                    toast.closeAll();
                  }}
                />
              </>
            );
          },
        });
      }
    });
  }, []);

  useEffect(() => {
    if (homeMenuState.error) {
      toast.show({
        placement: "top",
        duration: 4000,
        width: Dimensions.get("screen").width / 1.3,
        render: () => {
          return (
            <>
              <ToastErrorContent content="Terjadi kesalahan saat memproses data" />
            </>
          );
        },
      });
    }
  }, [homeMenuState]);

  console.log(homeMenuState);

  const onPressItem = (idx) => {
    switch (idx) {
      case 0:
        navigation.navigate("ProductScreen");
        break;
      case 1:
        if (isLogin) {
          navigation.navigate("TestVideo");
        } else {
          Alert.alert(
            "Tidak Bisa Masuk",
            "Kamu harus login terlebih dahulu untuk mengakses menu ini"
          );
        }
        break;
      case 2:
        if (isLogin) {
          navigation.navigate("GoTryoutScreen");
        } else {
          Alert.alert(
            "Tidak Bisa Masuk",
            "Kamu harus login terlebih dahulu untuk mengakses menu ini"
          );
        }
        break;
      default:
        break;
    }
  };

  const menuComponent = (item) => {
    return (
      <VStack alignItems={"center"}>
        <TouchableHighlight
          style={{ marginHorizontal: 15, borderRadius: 180 }}
          onPress={() => onPressItem(item.idx)}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={styles.menu}>
              <Image
                source={{ uri: item.image }}
                style={{
                  width: 65,
                  height: 65,
                  tintColor: Colors.orangeColor,
                }}
              />
            </View>
          </View>
        </TouchableHighlight>
        <Text
          style={{
            ...Fonts.black15Bold,
            marginTop: Sizes.fixPadding,
          }}
        >
          {item.title}
        </Text>
      </VStack>
    );
  };

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 20,
      }}
    >
      {homeMenuState.loading && homeMenuState.error == null ? (
        <View>
          <Text>Loading.. </Text>
        </View>
      ) : (
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => `homemenu${item._id}`}
          data={homeMenuState.data}
          renderItem={({ item }) => menuComponent(item)}
        />
      )}
    </View>
  );
};

export default HomeMenu;

const styles = StyleSheet.create({
  menu: {
    height: 120,
    width: 120,
    elevation: 3,
    backgroundColor: Colors.whiteColor,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});
