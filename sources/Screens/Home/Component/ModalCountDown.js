import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Dimensions,
  Modal,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from "react-native";
import CountDown from "react-native-countdown-component";
import warning from "../../../../assets/Images/warning.png";
import Sizes from "../../../Theme/Sizes";
import { Button } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import {
  setSaveAnswer,
  setSoal,
  setSoalUrl,
} from "../../../Redux/Soal/soalActions";
import LoadingIndicator from "../../../Components/Indicator/LoadingIndicator";
import Colors from "../../../Theme/Colors";

const ModalCountDown = (props) => {
  const { sesi, waktu, setSesi, soal, setFinish, setPending } = props;
  console.log(waktu);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (loading) {
      setLoading(false);
    }
  }, [waktu]);
  return (
    <Modal transparent={true} animationType="fade">
      <View style={styles.container}>
        <View style={styles.dimBackground} />
        <View style={styles.dialog}>
          <Image
            style={{
              width: Dimensions.get("screen").width / 2,
              height: Dimensions.get("screen").width / 2,
            }}
            source={warning}
          />
          {loading ? (
            <LoadingIndicator />
          ) : (
            <>
              <Text
                style={{
                  fontSize: 17,
                  textAlign: "center",
                  fontWeight: "bold",
                  color: Colors.neutralRedColor,
                }}
              >
                Tryout Kamu Sedang Berlangsung
              </Text>
              <Text
                style={{
                  marginTop: 20,
                  fontSize: 16,
                }}
              >
                Sesi {sesi + 1}
              </Text>

              <CountDown
                key={"Count 1"}
                until={waktu}
                digitStyle={{
                  backgroundColor: "transparent",
                }}
                showSeparator={true}
                onFinish={() => {
                  setLoading(true);
                  setSesi(sesi + 1);
                }}
                size={30}
                timeToShow={["M", "S"]}
                timeLabels={{ m: null, s: null }}
              />
              <Button
                onPress={() => {
                  dispatch(
                    setSaveAnswer({
                      data: null,
                      error: null,
                      loading: false,
                    })
                  );
                  dispatch(
                    setSoal({ data: null, error: null, loading: false })
                  );
                  dispatch(setSoalUrl(soal.soalUrl));
                  setFinish(false);
                  setPending(false);
                  navigation.navigate("SoalScreen", {
                    title: soal.title,
                    blockTime: soal.blockTime,
                    soalUrl: soal.soalUrl,
                  });
                }}
                bg={"amber.400"}
                _pressed={{ bg: "amber.200" }}
              >
                Lanjutkan Tryout Kamu
              </Button>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

ModalCountDown.propTypes = {
  children: PropTypes.node,
};

export default ModalCountDown;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  dimBackground: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: "black",
    opacity: 0.3,
  },
  dialog: {
    width: Dimensions.get("screen").width * 0.8,
    maxHeight: Dimensions.get("screen").width * 1.5,
    backgroundColor: "white",
    padding: Sizes.fixPadding * 2,
    borderRadius: Sizes.fixPadding,
    alignItems: "center",
  },
});
