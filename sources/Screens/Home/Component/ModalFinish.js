import React from "react";
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
import Sizes from "../../../Theme/Sizes";
import waktu_habis from "../../../../assets/Images/waktu_habis.png";
import { Button } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import {
   setSaveAnswer,
   setSoal,
   setSoalUrl,
} from "../../../Redux/Soal/soalActions";
import { Colors } from "react-native/Libraries/NewAppScreen";

const ModalFinish = (props) => {
   const { soal, setFinish, setPending } = props;
   const navigation = useNavigation();
   const dispatch = useDispatch();
   return (
      <Modal
         transparent={true}
         animationType="fade"
      >
         <View style={styles.container}>
            <View style={styles.dimBackground} />
            <View style={styles.dialog}>
               <Image
                  style={{
                     width: Dimensions.get("screen").width / 2,
                     height: Dimensions.get("screen").width / 2,
                  }}
                  source={waktu_habis}
               />
               <Text
                  style={{
                     fontSize: 17,
                     textAlign: "center",
                     fontWeight: "bold",
                     color: Colors.neutralRedColor,
                  }}
               >
                  Waktu Tryout Kamu Habis
               </Text>
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
                        firestoreId: soal.id,
                     });
                  }}
                  mt={4}
                  bg={"amber.400"}
                  _pressed={{ bg: "amber.200" }}
               >
                  Kirim Jawaban Kamu
               </Button>
            </View>
         </View>
      </Modal>
   );
};

ModalFinish.propTypes = {
   children: PropTypes.node,
   soal: PropTypes.object,
};

export default ModalFinish;

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
