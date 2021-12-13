import React, { useCallback, useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal, Pressable, ActivityIndicator, Alert } from "react-native";
import PasswordTextInput from "../../../Components/CustomTextInput/PasswordTextInput";
import Fonts from "../../../Theme/Fonts";
import Sizes from "../../../Theme/Sizes";
import Colors from "../../../Theme/Colors";
import { useDispatch, useSelector } from "react-redux";
import { getCheckPassword, setCheckPassword } from "../../../Redux/Auth/authActions";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
const GantiPasswordContent = (props) => {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const { checkPassword } = useSelector((state) => state.authReducer);
  const { profile } = useSelector((state) => state.profileReducer);
  const [oldPass, setOldPass] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reNewPassword, setReNewPassword] = useState("");
  const { email } = props;
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = () => {
    dispatch(getCheckPassword({ username: email, password: oldPass }));
  };

  function passwordValidation(text) {
    if (text.length < 8) return "Password must be atleast 8 characters";
    if (!text.match(new RegExp("[A-Z]"))) return "Password must contain at least one uppercase";
    if (!text.match(new RegExp("[a-z]"))) return "Password must contain at least one lowercase";
    if (text.search(/[0-9]/) < 0) {
      return "Your password must contain at least one digit";
    }
    return null;
  }
  console.log(profile);

  const handleSave = () => {
    if (passwordValidation(newPassword) !== null) {
      Alert.alert("WARNING", "Format Password Anda Salah");
    }
    if (newPassword !== reNewPassword) {
      Alert.alert("WARNING", "Password Tidak Sama");
    }
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(setCheckPassword({ valid: false, loading: false, error: null }));
    }, [])
  );

  useEffect(() => {
    if (checkPassword.loading === true) {
      setModalVisible(true);
    } else {
      setTimeout(() => setModalVisible(false), 500);
    }
  }, [checkPassword]);
  return (
    <>
      <ScrollView
        style={{
          flex: 1,
          paddingVertical: Sizes.fixPadding * 10,
          paddingHorizontal: Sizes.fixPadding * 5,
        }}
      >
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <ActivityIndicator color={Colors.orangeColor} size={40} />
              </View>
            </View>
          </Modal>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
          }}
        >
          <PasswordTextInput onChangeText={(val) => setOldPass(val)} placeholder="Masukan Password Lama" />
        </View>

        {checkPassword.valid !== true && (
          <TouchableOpacity activeOpacity={0.9} style={styles.button} onPress={handlePress}>
            <Text style={{ ...Fonts.black19Bold }}>Cek</Text>
          </TouchableOpacity>
        )}
        {checkPassword.error === 401 && <Text style={{ color: "red", marginTop: 30 }}>Password Kamu Salah !</Text>}
        {checkPassword.error === 500 && <Text style={{ color: "red", marginTop: 30 }}>Terjadi kesalahan saat memproses data, Coba Lagi Nanti</Text>}

        {checkPassword.valid === true && (
          <>
            <View
              style={{
                marginTop: 70,
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
              }}
            >
              <PasswordTextInput onChangeText={(val) => setNewPassword(val)} placeholder="Masukan Password Baru" />
            </View>
            {passwordValidation(newPassword) != null && <Text style={{ fontSize: 12, color: "red", opacity: 0.5 }}>{passwordValidation(newPassword)}</Text>}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
              }}
            >
              <PasswordTextInput onChangeText={(val) => setReNewPassword(val)} placeholder="Masukan Password Baru Sekali Lagi" />
            </View>
            {newPassword !== reNewPassword && <Text style={{ fontSize: 12, color: "red", opacity: 0.5 }}>Password tidak sama</Text>}
            <TouchableOpacity activeOpacity={0.9} style={styles.button} onPress={handleSave}>
              <Text style={{ ...Fonts.black19Bold }}>SIMPAN</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </>
  );
};

export default GantiPasswordContent;
