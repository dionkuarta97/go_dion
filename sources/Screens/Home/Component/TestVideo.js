import { Center, Heading, Button, VStack, Box } from "native-base";
import React, { useEffect, useRef, useState } from "react";

import * as ScreenOrientation from "expo-screen-orientation";

import { Dimensions, StyleSheet, View } from "react-native";

import { useNavigation } from "@react-navigation/core";

import { Video } from "expo-av";
const TestVideo = () => {
  const [inFullscreen, setInFullsreen] = useState(false);
  const refVideo = useRef(null);

  const navigation = useNavigation();
  const refVideo2 = useRef(null);
  const [inFullscreen2, setInFullsreen2] = useState(false);
  const refScrollView = useRef(null);
  const [auto, setAuto] = useState(
    "https://videodelivery.net/e70c304f701e6edd557ed928a5dd827a/manifest/video.m3u8"
  );
  const [resolution, setResolution] = useState(null);
  const onFullscreenUpdate = async ({ fullscreenUpdate }) => {
    switch (fullscreenUpdate) {
      case Video.FULLSCREEN_UPDATE_PLAYER_DID_PRESENT:
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.LANDSCAPE
        );
        // await ScreenOrientation.unlockAsync();
        break;
      case Video.FULLSCREEN_UPDATE_PLAYER_WILL_DISMISS:
        // await ScreenOrientation.unlockAsync();

        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.PORTRAIT
        );
        break;
    }
  };

  async function getHLSStream(reso) {
    const url = `https://videodelivery.net/e70c304f701e6edd557ed928a5dd827a`;
    const res = await fetch(`${url}/manifest/video.m3u8`);

    const streamText = await res.text();

    const playList = streamText.split("\n");
    if (reso === 1080) {
      setResolution(1080);
      setAuto(
        "https://videodelivery.net/e70c304f701e6edd557ed928a5dd827a/manifest/" +
          playList[5]
      );
    } else if (reso === 720) {
      setResolution(720);
      setAuto(
        "https://videodelivery.net/e70c304f701e6edd557ed928a5dd827a/manifest/" +
          playList[7]
      );
    } else if (reso === 540) {
      setResolution(540);
      setAuto(
        "https://videodelivery.net/e70c304f701e6edd557ed928a5dd827a/manifest/" +
          playList[9]
      );
    } else if (reso === 360) {
      setResolution(360);
      setAuto(
        "https://videodelivery.net/e70c304f701e6edd557ed928a5dd827a/manifest/" +
          playList[11]
      );
    }
  }

  useEffect(() => {
    setResolution(null);
    setAuto(
      "https://videodelivery.net/e70c304f701e6edd557ed928a5dd827a/manifest/video.m3u8"
    );
  }, []);

  console.log(auto);
  return (
    <>
      <Center>
        <Box
          style={{
            marginVertical: 30,
          }}
        >
          <Heading>Testing Video</Heading>
        </Box>
      </Center>
      <View>
        <Video
          style={styles.videoFrame}
          useNativeControls
          source={{
            uri: `${auto}`,
          }}
          isLooping={true}
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
                "https://videodelivery.net/e70c304f701e6edd557ed928a5dd827a/manifest/video.m3u8"
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
      </Center>
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
