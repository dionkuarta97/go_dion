import { useNavigation } from "@react-navigation/native";
import { Button } from "native-base";
import React from "react";
import { Text, Image, View, Linking, Platform } from "react-native";
import { useDispatch } from "react-redux";
import { setCheckVersion } from "../../../Redux/Version/versionActions";

const VersionMessage = (props) => {
  const dispatch = useDispatch();
  const OpenWEB = (url) => {
    Linking.openURL(url);
  };
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        style={{
          height: 100.0,
          width: 100.0,
          borderRadius: 40.0,
        }}
        source={require("../../../../assets/Images/icon.png")}
        resizeMode="contain"
      />
      <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Update ke versi terbaru?
        </Text>
      </View>
      <View
        style={{ marginTop: 50, paddingHorizontal: 10, paddingVertical: 5 }}
      >
        <Text
          style={{
            textAlign: "center",
            marginHorizontal: 10,
          }}
        >
          {props.message}
        </Text>
      </View>
      <View style={{ marginTop: 20, paddingVertical: 20 }}>
        <Button
          onPress={() => {
            if (Platform.OS === "ios") {
              OpenWEB(
                "https://apps.apple.com/id/app/go-bimbel-online/id1610694069"
              );
            } else {
              OpenWEB(
                "https://play.google.com/store/apps/details?id=com.goonline.app"
              );
            }
          }}
          colorScheme="amber"
        >
          Update Sekarang
        </Button>
        {props.status === 1 && (
          <Button
            marginTop={5}
            onPress={() => {
              dispatch(
                setCheckVersion({
                  upToDate: 0,
                  message: null,
                  error: null,
                })
              );
              navigation.replace("MainScreen");
            }}
            variant="ghost"
            colorScheme="dark"
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Nanti Saja
            </Text>
          </Button>
        )}
      </View>
    </View>
  );
};

export default VersionMessage;
