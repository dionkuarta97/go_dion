import React, { useCallback, useEffect, useState } from "react";
import {
   View,
   Text,
   ScrollView,
   StyleSheet,
   TouchableOpacity,
   Modal,
   Pressable,
   ActivityIndicator,
   Alert,
   Dimensions,
} from "react-native";
import PasswordTextInput from "../../../Components/CustomTextInput/PasswordTextInput";
import Fonts from "../../../Theme/Fonts";
import Sizes from "../../../Theme/Sizes";
import Colors from "../../../Theme/Colors";
import { useDispatch, useSelector } from "react-redux";
import {
   getCheckPassword,
   setCheckPassword,
} from "../../../Redux/Auth/authActions";
import { Button, useToast } from "native-base";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { passwordValidations } from "../../../Services/helper";
import {
   getUpdateProfile,
   setUpdateProfile,
} from "../../../Redux/Profile/profileActions";
import LoadingModal from "../../../Components/Modal/LoadingModal";
const GantiPasswordContent = (props) => {
   const navigate = useNavigation();

   const update = useSelector((state) => state.profileReducer.updateProfile);

   const dispatch = useDispatch();
   const { checkPassword } = useSelector((state) => state.authReducer);
   const { profile } = useSelector((state) => state.profileReducer);
   const [oldPass, setOldPass] = useState("");
   const [newPassword, setNewPassword] = useState("");
   const [reNewPassword, setReNewPassword] = useState("");
   const { email } = props;
   const [modalVisible, setModalVisible] = useState(false);
   const toast = useToast();
   const navigation = useNavigation();
   const handlePress = () => {
      dispatch(getCheckPassword({ username: email, password: oldPass }));
   };

   function passwordValidation(text) {
      if (text.length < 8) return "Password must be atleast 8 characters";
      if (!text.match(new RegExp("[A-Z]")))
         return "Password must contain at least one uppercase";
      if (!text.match(new RegExp("[a-z]")))
         return "Password must contain at least one lowercase";
      if (text.search(/[0-9]/) < 0) {
         return "Your password must contain at least one digit";
      }
      return null;
   }

   const handleSave = () => {
      let data = {
         ...props.profile,
         password: newPassword,
         password_comparison: reNewPassword,
      };
      dispatch(getUpdateProfile(JSON.stringify(data)));
   };

   useFocusEffect(
      useCallback(() => {
         dispatch(
            setCheckPassword({ valid: false, loading: false, error: null })
         );
      }, [])
   );

   useEffect(() => {
      if (update.data) {
         dispatch(
            setUpdateProfile({ data: null, loading: false, error: null })
         );
         toast.show({
            title: "Berhasil",
            status: "success",
            description: "Berhasil memperbarui password",
            placement: "top",
            width: Dimensions.get("screen").width / 1.3,
         });
         navigation.goBack();
      }
      if (update.error) {
         toast.show({
            title: "error",
            status: "error",
            description: update.error,
            placement: "top",
            width: Dimensions.get("screen").width / 1.3,
         });
         navigation.goBack();
      }
   }, [update]);

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
               paddingVertical: Sizes.fixPadding * 5,
               paddingHorizontal: Sizes.fixPadding * 2,
            }}
         >
            <View
               style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                  alignItems: "center",
               }}
            >
               <PasswordTextInput
                  onChangeText={(val) => setOldPass(val)}
                  placeholder="Masukan Password Lama"
                  value={passwordValidations(oldPass).valid}
               />
            </View>

            {update.loading || (checkPassword.loading && <LoadingModal />)}

            {checkPassword.valid !== true && (
               <Button
                  bg={"amber.400"}
                  _pressed={{ bg: "amber.300" }}
                  onPress={handlePress}
               >
                  Periksa Password
               </Button>
            )}
            {checkPassword.error === 401 && (
               <Text style={{ color: "red", marginTop: 30 }}>
                  Password Kamu Salah !
               </Text>
            )}
            {checkPassword.error === 500 && (
               <Text style={{ color: "red", marginTop: 30 }}>
                  Terjadi kesalahan saat memproses data, Coba Lagi Nanti
               </Text>
            )}

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
                     <PasswordTextInput
                        onChangeText={(val) => setNewPassword(val)}
                        value={passwordValidations(newPassword).valid}
                        placeholder="Masukan Password Baru"
                     />
                  </View>
                  {passwordValidations(newPassword).valid === false &&
                     passwordValidations(newPassword).error.map((val, idx) => (
                        <Text
                           key={idx}
                           style={{ fontSize: 12, color: "red", opacity: 0.5 }}
                        >
                           - {val}
                        </Text>
                     ))}
                  <View
                     style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "100%",
                        alignItems: "center",
                     }}
                  >
                     <PasswordTextInput
                        onChangeText={(val) => setReNewPassword(val)}
                        value={passwordValidations(reNewPassword).valid}
                        placeholder="Masukan Password Baru Sekali Lagi"
                     />
                  </View>
                  {newPassword !== reNewPassword && (
                     <Text style={{ fontSize: 12, color: "red", opacity: 0.5 }}>
                        Password tidak sama
                     </Text>
                  )}
                  <Button
                     disabled={
                        newPassword !== reNewPassword ||
                        newPassword === "" ||
                        !passwordValidations(newPassword).valid
                           ? true
                           : false
                     }
                     bg={
                        newPassword !== reNewPassword ||
                        newPassword === "" ||
                        !passwordValidations(newPassword).valid
                           ? "amber.200"
                           : "amber.400"
                     }
                     marginTop={5}
                     _pressed={{ bg: "amber.300" }}
                     onPress={handleSave}
                  >
                     Simpan
                  </Button>
               </>
            )}
         </ScrollView>
      </>
   );
};

export default GantiPasswordContent;
