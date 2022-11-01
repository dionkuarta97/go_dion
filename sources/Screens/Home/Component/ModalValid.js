import React from "react";
import PropTypes from "prop-types";
import { Dimensions, Modal, Text, View, StyleSheet, Image } from "react-native";
import Sizes from "../../../Theme/Sizes";
import { Button } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import warning from "../../../../assets/Images/warning.png";
import { Colors } from "react-native/Libraries/NewAppScreen";
import {
  setLoginData,
  setLoginStatus,
  setToken,
} from "../../../Redux/Auth/authActions";
import { setProfile } from "../../../Redux/Profile/profileActions";

const ModalValid = (props) => {
  const { setValid } = props;
  const navigation = useNavigation();
  const dispatch = useDispatch();
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
          <Text
            style={{
              fontSize: 17,
              textAlign: "center",
              fontWeight: "bold",
              color: Colors.neutralRedColor,
            }}
          >
            Kamu sedang mengerjakan tryout blocking time di device lain
          </Text>
          <Button
            onPress={() => {
              dispatch(setLoginStatus(false));
              dispatch(setToken(null));
              dispatch(setProfile(null));
              dispatch(
                setLoginData({
                  data: null,
                  loading: false,
                  error: null,
                })
              );
              navigation.navigate("MainScreen");
              setValid(true);
            }}
            mt={4}
            bg={"amber.400"}
            _pressed={{ bg: "amber.200" }}
          >
            Keluar
          </Button>
        </View>
      </View>
    </Modal>
  );
};

ModalValid.propTypes = {
  children: PropTypes.node,
  soal: PropTypes.object,
};

export default ModalValid;

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
