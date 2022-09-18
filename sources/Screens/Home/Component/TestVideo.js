import { Center, Heading, Button, VStack, Box } from "native-base";
import React, { useEffect, useRef, useState } from "react";

import * as ScreenOrientation from "expo-screen-orientation";

import { Dimensions, SafeAreaView, StyleSheet, View } from "react-native";

import { useNavigation } from "@react-navigation/core";
import { WebView } from "react-native-webview";
import { Video } from "expo-av";
import DefaultAppBar from "../../../Components/AppBar/DefaultAppBar";
const TestVideo = ({ route }) => {
  const [tes, setTes] = useState(0);
  const params = route.params;
  const [tesDua, setTesDua] = useState(0);
  console.log(params);
  async function getHLSStream(reso) {
    const url = `https://videodelivery.net/5c3256d61d556ef03a08f3a73f51d401`;
    const res = await fetch(`${url}/manifest/video.m3u8`);

    const streamText = await res.text();

    const playList = streamText.split("\n");
    if (reso === 1080) {
      setResolution(1080);
      setAuto(
        "https://videodelivery.net/5c3256d61d556ef03a08f3a73f51d401/manifest/" +
          playList[5]
      );
    } else if (reso === 720) {
      setResolution(720);
      setAuto(
        "https://videodelivery.net/5c3256d61d556ef03a08f3a73f51d401/manifest/" +
          playList[7]
      );
    } else if (reso === 540) {
      setResolution(540);
      setAuto(
        "https://videodelivery.net/5c3256d61d556ef03a08f3a73f51d401/manifest/" +
          playList[9]
      );
    } else if (reso === 360) {
      setResolution(360);
      setAuto(
        "https://videodelivery.net/5c3256d61d556ef03a08f3a73f51d401/manifest/" +
          playList[11]
      );
    }
  }

  useEffect(() => {
    setTes(0);
    setTesDua(0);
  }, []);

  useEffect(async () => {
    if (tesDua > 0) {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
    } else {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT
      );
    }
  }, [tesDua]);

  console.log(tes, "tes");
  console.log(tesDua, "tesDua");

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <DefaultAppBar
          title={params.from ? params.from : "Video Materi"}
          backEnabled={true}
        />
        <WebView
          source={{
            uri: params.video,
          }}
          androidLayerType={"hardware"}
          allowsFullscreenVideo={true}
          mediaPlaybackRequiresUserAction
          useNativeResumeAndPauseLifecycleEvents
          javaScriptEnabled
          allowsInlineMediaPlayback
          useWebKit={true}
          originWhitelist={["*"]}
          automaticallyAdjustContentInsets
          onLayout={async (e) => {
            console.log(e.nativeEvent.layout);
            if (tes === 0) {
              setTes(e.nativeEvent.layout.height);
            }

            if (tes < e.nativeEvent.layout.height && tes !== 0) {
              setTesDua(e.nativeEvent.layout.height);
            }

            if (tes === e.nativeEvent.layout.height) {
              setTesDua(0);
            }
          }}
        />
        {/* <View>
        <Video
          style={styles.videoFrame}
          useNativeControls
          source={{
            uri: `${auto}`,
          }}
          isLooping={true}
          shouldPlay
          resizeMode="contain"
          onFullscreenUpdate={onFullscreenUpdate}
        />
      </View>
      <Center style={{ marginVertical: 20 }}>
        <VStack space={3}>
          <Button
            disabled={!resolution ? true : false}
            width={Dimensions.get("screen").width / 1.5}
            bg={!resolution ? "light.500" : "light.200"}
            onPress={() => {
              setResolution(null);
              setAuto(
                "https://videodelivery.net/5c3256d61d556ef03a08f3a73f51d401/manifest/video.m3u8"
              );
            }}
          >
            Auto
          </Button>
          <Button
            disabled={resolution === 1080 ? true : false}
            bg={resolution === 1080 ? "light.500" : "light.200"}
            onPress={() => getHLSStream(1080)}
          >
            1080
          </Button>
          <Button
            disabled={resolution === 720 ? true : false}
            bg={resolution === 720 ? "light.500" : "light.200"}
            onPress={() => getHLSStream(720)}
          >
            720
          </Button>
          <Button
            disabled={resolution === 540 ? true : false}
            bg={resolution === 540 ? "light.500" : "light.200"}
            onPress={() => getHLSStream(540)}
          >
            540
          </Button>
          <Button
            disabled={resolution === 360 ? true : false}
            bg={resolution === 360 ? "light.500" : "light.200"}
            onPress={() => getHLSStream(360)}
          >
            360
          </Button>
          <Button
            onPress={() => {
              navigation.goBack();
            }}
          >
            Back
          </Button>
        </VStack>
      </Center> */}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  videoFrame: {
    aspectRatio: 16 / 9,
    backgroundColor: "black",
  },
});

export default TestVideo;
