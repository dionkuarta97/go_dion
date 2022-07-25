import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PropTypes from "prop-types";
import Colors from "../../../Theme/Colors";
import Sizes from "../../../Theme/Sizes";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
const NavigasiSoal = (props) => {
  const navigation = useNavigation();
  const [index, setIndex] = useState(props.currentIndex);

  useEffect(() => {
    setIndex(props.currentIndex);
  }, [props.currentIndex]);
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "white",
        paddingHorizontal: 25,
        paddingVertical: 25,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        elevation: 30,
      }}
    >
      {index !== 0 && (
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={styles.prevButton}
            onPress={() => {
              setIndex(index - 1);
              props.onChange(index - 1);
            }}
          >
            <Text>Kembali</Text>
          </TouchableOpacity>
        </View>
      )}
      {index === 0 && (
        <>
          {props.sesi + 1 === 1 && !props.blockTime && (
            <>
              <View style={{ flex: 1 }}>
                <TouchableOpacity
                  style={styles.prevButton}
                  onPress={() => {
                    Alert.alert("Cancel taking quiz", "Are You Sure?", [
                      {
                        text: "Cancel",
                        onPress: () => {},
                      },
                      {
                        text: "Yes",
                        onPress: () => navigation.goBack(),
                      },
                    ]);
                  }}
                >
                  <Text>Keluar</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </>
      )}

      {index !== props.itemLength - 1 && (
        <>
          <View style={{ flex: 2 }}>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => {
                setIndex(index + 1);
                props.onChange(index + 1);
              }}
            >
              <Text>Selanjutnya</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {index === props.itemLength - 1 && (
        <>
          {props.blockTime ? (
            <>
              {props.sesi + 1 !== props.totalSesi ? (
                <View style={{ flex: 2 }}>
                  <TouchableOpacity
                    style={styles.nextButton}
                    onPress={() => {
                      Alert.alert(
                        "Informasi",
                        "Tunggu sesi ini berakhir untuk melanjutkan sesi berikutnya.\n\nYuk review kembali jawaban kamu!"
                      );
                    }}
                  >
                    <Ionicons
                      name="md-information-circle-outline"
                      size={15}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={{ flex: 2 }}>
                  <TouchableOpacity
                    style={styles.nextButton}
                    onPress={() => {
                      Alert.alert(
                        "Informasi",
                        "Kamu harus menunggu waktu sesi ini berakhir.\n\nYuk review kembali jawaban kamu!"
                      );
                    }}
                  >
                    <Ionicons
                      name="md-information-circle-outline"
                      size={15}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
              )}
            </>
          ) : (
            <>
              {props.sesi + 1 !== props.totalSesi ? (
                <View style={{ flex: 2 }}>
                  <TouchableOpacity
                    style={styles.nextButton}
                    onPress={() => {
                      props.onSesiEnd();
                    }}
                  >
                    <Text>Next Sesi</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={{ flex: 2 }}>
                  <TouchableOpacity
                    style={styles.nextButton}
                    onPress={() => {
                      props.onSesiEnd();
                    }}
                  >
                    <Text>Finish</Text>
                  </TouchableOpacity>
                </View>
              )}
            </>
          )}
        </>
      )}
    </View>
  );
};

NavigasiSoal.propTypes = {
  itemLength: PropTypes.number.isRequired,
  currentIndex: PropTypes.number.isRequired,
  onChange: PropTypes.func,
  onFinish: PropTypes.func,
};

export default NavigasiSoal;

const styles = StyleSheet.create({
  nextButton: {
    marginLeft: Sizes.fixPadding,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primaryColor,
    padding: Sizes.fixPadding,
    borderRadius: Sizes.fixPadding,
  },
  prevButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: Sizes.fixPadding,
    borderWidth: 1,
    borderColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding,
  },
});
