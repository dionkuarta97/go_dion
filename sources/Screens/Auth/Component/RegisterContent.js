import React, { useEffect, useState } from "react";
import { Text, View, Alert, Dimensions } from "react-native";
import DefaultPrimaryButton from "../../../Components/Button/DefaultPrimaryButton";
import DefaultTextInput from "../../../Components/CustomTextInput/DefaultTextInput";
import PasswordTextInput from "../../../Components/CustomTextInput/PasswordTextInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Fonts from "../../../Theme/Fonts";
import Sizes from "../../../Theme/Sizes";
import OnTapTextInput from "../../../Components/CustomTextInput/OnTapTextInput";

import ProvinceBottomSheet from "../../../Components/BottomSheet/ProvinceBottomSheet";
import CityBottomSheet from "../../../Components/BottomSheet/CityBottomSheet";
import KelasBottomSheet from "../../../Components/BottomSheet/KelasBottomSheet";
import SchoolBottomSheet from "../../../Components/BottomSheet/SchoolBottomSheet";
import { useDispatch, useSelector } from "react-redux";
import LoadingModal from "../../../Components/Modal/LoadingModal";
import DefaultModal from "../../../Components/Modal/DefaultModal";
import { getRegister, setRegister } from "../../../Redux/Auth/authActions";
import { useNavigation } from "@react-navigation/core";
import { Button, useToast } from "native-base";
import ToastErrorContent from "../../../Components/ToastErrorContent";
import checkInternet from "../../../Services/CheckInternet";
import { checkNomor, passwordValidations } from "../../../Services/helper";

const RegisterContent = ({ sendedEmail, scrollRef }) => {
   const [classBottomSheetVisible, setClassBottomSheetVisible] =
      useState(false);
   const [provinceBottomSheetVisible, setProvinceBottomSheetVisible] =
      useState(false);
   const [cityBottomSheetVisible, setCityBottomSheetVisible] = useState(false);
   const [
      schoolProvinceBottomSheetVisible,
      setSchoolProvinceBottomSheetVisible,
   ] = useState(false);
   const [schoolCityBottomSheetVisible, setSchoolCityBottomSheetVisible] =
      useState(false);
   const [schoolNameBottomSheetVisible, setSchoolNameBottomSheetVisible] =
      useState(false);

   //Start: State for Form
   const [email, setEmail] = useState(sendedEmail);

   const [name, setName] = useState("");
   const [phone, setPhone] = useState("");
   const [role, setRole] = useState("Siswa");
   const [kelas, setKelas] = useState(null);
   const [password, setPassword] = useState("");
   const [repeatPassword, setRepeatPassword] = useState("");

   const [province, setProvince] = useState(null);
   const [city, setCity] = useState(null);
   const [address, setAddress] = useState("");

   const [schoolProvince, setSchoolProvince] = useState(null);
   const [schoolCity, setSchoolCity] = useState(null);
   const [schoolName, setSchoolName] = useState(null);

   const [waliName, setWaliName] = useState("");
   const [waliPhone, setWaliPhone] = useState("");
   const [waliEmail, setWaliEmail] = useState("");
   //End: State for Form

   const [show, setShow] = useState({
      nama: false,
      phone: false,
      kelas: false,
      password: false,
      repeatPassword: false,
      province: false,
      city: false,
      address: false,
      schoolProvince: false,
      schoolCity: false,
      schoolName: false,
      waliName: false,
      waliPhone: false,
      waliEmail: false,
   });

   const [msg, setMsg] = useState({
      nama: "Nama tidak boleh kosong",
      phone: [
         "Nomor telepon tidak boleh kosong",
         "Nomor telepon minimal 8 karakter",
      ],
      kelas: "Tingkatan kelas tidak boleh kosong",

      province: "Propinsi tidak boleh kosong",
      city: "Kab/kota tidak boleh kosong",
      address: "Alamat tidak boleh kosong",
      schoolProvince: "Propinsi tidak boleh kosong",
      schoolCity: "Kab/kota tidak boleh kosong",
      schoolName: "Nama sekolah tidak boleh kosong",
      waliName: "Nama wali tidak boleh kosong",
      waliPhone: "Nomor wali tidak boleh kosong",
      waliEmail: ["Wali email tidak boleh kosong", "Harus berbentuk email"],
   });

   const [layout, setLayout] = useState({
      nama: null,
      phone: null,
      kelas: null,
      password: null,
      repeatPassword: null,
      province: null,
      city: null,
      address: null,
      schoolProvince: null,
      schoolCity: null,
      schoolName: null,
      waliName: null,
      waliPhone: null,
      waliEmail: null,
   });

   const navigation = useNavigation();
   const dispatch = useDispatch();
   const register = useSelector((state) => state.authReducer.register);
   const toast = useToast();
   useEffect(() => {
      dispatch(setRegister({ loading: false, data: null, error: null }));
   }, []);

   const formatEmail = (email) => {
      const emailReg = new RegExp(
         /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.){1,2}[a-zA-Z]{2,}))$/
      );
      if (emailReg.test(email)) {
         return true;
      } else {
         return false;
      }
   };

   useEffect(() => {
      if (register.error) {
         toast.show({
            placement: "top",
            duration: 3000,
            width: Dimensions.get("screen").width / 1.4,
            render: () => {
               return <ToastErrorContent content={register.error} />;
            },
         });
      }
   }, [register]);

   return (
      <KeyboardAwareScrollView ref={scrollRef}>
         <View
            style={{
               paddingVertical: Sizes.fixPadding * 7.0,
               paddingHorizontal: Sizes.fixPadding * 2.0,
            }}
         >
            <View>
               <Text style={{ ...Fonts.black20Bold }}>Informasi Pendaftar</Text>
               <View>
                  <DefaultTextInput
                     placeholder="Email"
                     disable={false}
                     value={email}
                     onChangeText={setEmail}
                  />
               </View>
               <View
                  onLayout={(e) =>
                     setLayout({ ...layout, nama: e.nativeEvent.layout })
                  }
               >
                  <DefaultTextInput
                     onFocus={(val) => setShow({ ...show, nama: val })}
                     placeholder="Nama Lengkap"
                     value={name}
                     onChangeText={setName}
                  />
               </View>
               {show.nama && (
                  <>
                     {name === "" && (
                        <Text
                           style={{ fontSize: 12, color: "red", opacity: 0.5 }}
                        >
                           - {msg.nama}
                        </Text>
                     )}
                  </>
               )}
               <View
                  onLayout={(e) =>
                     setLayout({ ...layout, phone: e.nativeEvent.layout })
                  }
               >
                  <DefaultTextInput
                     onFocus={(val) => setShow({ ...show, phone: val })}
                     keyboardType="phone-pad"
                     placeholder="Nomor Telepon/HP"
                     value={phone}
                     nomor={true}
                     valid={checkNomor(phone)}
                     onChangeText={setPhone}
                  />
               </View>
               {show.phone && (
                  <>
                     {!checkNomor(phone) &&
                        msg.phone.map((el, idx) => (
                           <Text
                              key={idx + "aaa"}
                              style={{
                                 fontSize: 12,
                                 color: "red",
                                 opacity: 0.5,
                              }}
                           >
                              - {el}
                           </Text>
                        ))}
                  </>
               )}
               <View
                  onLayout={(e) =>
                     setLayout({ ...layout, kelas: e.nativeEvent.layout })
                  }
               >
                  <OnTapTextInput
                     placeholder="Tingkatan Kelas"
                     value={kelas}
                     onTap={() => {
                        setShow({ ...show, kelas: true });

                        setClassBottomSheetVisible(true);
                     }}
                  />
               </View>
               {show.kelas && (
                  <>
                     {kelas === null && (
                        <Text
                           style={{ fontSize: 12, color: "red", opacity: 0.5 }}
                        >
                           - {msg.kelas}
                        </Text>
                     )}
                  </>
               )}
               {classBottomSheetVisible && (
                  <KelasBottomSheet
                     onClose={() => setClassBottomSheetVisible(false)}
                     value={kelas}
                     onSelect={(val) => {
                        setKelas(val);
                        setSchoolName(null);
                        setClassBottomSheetVisible(false);
                     }}
                  />
               )}
               <View
                  onLayout={(e) =>
                     setLayout({ ...layout, password: e.nativeEvent.layout })
                  }
               >
                  <PasswordTextInput
                     placeholder="Password"
                     onChangeText={setPassword}
                     onFocus={(val) => setShow({ ...show, password: val })}
                     value={passwordValidations(password).valid}
                  />
               </View>
               {show.password && (
                  <>
                     {passwordValidations(password).valid === false &&
                        passwordValidations(password).error.map((val, idx) => (
                           <Text
                              key={idx}
                              style={{
                                 fontSize: 12,
                                 color: "red",
                                 opacity: 0.5,
                              }}
                           >
                              - {val}
                           </Text>
                        ))}
                  </>
               )}

               <View
                  onLayout={(e) =>
                     setLayout({
                        ...layout,
                        repeatPassword: e.nativeEvent.layout,
                     })
                  }
               >
                  <PasswordTextInput
                     placeholder="Password (Ulangi)"
                     onChangeText={setRepeatPassword}
                     onFocus={(val) => setShow({ ...show, rePass: val })}
                     value={
                        password !== repeatPassword || repeatPassword === ""
                           ? false
                           : true
                     }
                  />
               </View>
               {show.rePass && (
                  <>
                     {password !== repeatPassword && (
                        <Text
                           style={{ fontSize: 12, color: "red", opacity: 0.5 }}
                        >
                           - Password tidak sama
                        </Text>
                     )}
                  </>
               )}
            </View>

            <Text style={{ ...Fonts.black20Bold, marginTop: 50 }}>
               Informasi Alamat
            </Text>
            <View
               onLayout={(e) =>
                  setLayout({ ...layout, province: e.nativeEvent.layout })
               }
            >
               <OnTapTextInput
                  placeholder="Propinsi"
                  value={province !== null ? province.provinsi : ""}
                  onTap={() => {
                     setShow({ ...show, province: true });
                     setProvinceBottomSheetVisible(true);
                  }}
               />
            </View>
            {show.province && (
               <>
                  {province === null && (
                     <Text style={{ fontSize: 12, color: "red", opacity: 0.5 }}>
                        - {msg.province}
                     </Text>
                  )}
               </>
            )}
            {provinceBottomSheetVisible && (
               <ProvinceBottomSheet
                  onClose={() => setProvinceBottomSheetVisible(false)}
                  onSelect={(value) => {
                     setProvinceBottomSheetVisible(false);
                     setProvince(value);
                     setCity(null);
                  }}
               />
            )}
            <View
               onLayout={(e) =>
                  setLayout({ ...layout, city: e.nativeEvent.layout })
               }
            >
               <OnTapTextInput
                  placeholder="Kab/Kota"
                  value={city !== null ? city.kabkota : ""}
                  onTap={() => {
                     if (province === null) {
                        Alert.alert(
                           "Peringatan",
                           "Silakan memlih Propinsi terlebih dahulu"
                        );
                     } else {
                        setShow({ ...show, province: true });
                        setCityBottomSheetVisible(true);
                     }
                  }}
               />

               {show.city && (
                  <>
                     {city === null && (
                        <Text
                           style={{ fontSize: 12, color: "red", opacity: 0.5 }}
                        >
                           - {msg.city}
                        </Text>
                     )}
                  </>
               )}
               {cityBottomSheetVisible && (
                  <CityBottomSheet
                     idProvinsi={
                        province !== null
                           ? province.idprovinsi.toString()
                           : null
                     }
                     onClose={() => setCityBottomSheetVisible(false)}
                     onSelect={(value) => {
                        setCityBottomSheetVisible(false);
                        setCity(value);
                     }}
                  />
               )}
               <View
                  onLayout={(e) =>
                     setLayout({ ...layout, address: e.nativeEvent.layout })
                  }
               >
                  <DefaultTextInput
                     value={address}
                     onFocus={(val) => setShow({ ...show, address: true })}
                     placeholder="Alamat"
                     onChangeText={setAddress}
                  />
               </View>
               {show.address && (
                  <>
                     {address === "" && (
                        <Text
                           style={{ fontSize: 12, color: "red", opacity: 0.5 }}
                        >
                           - {msg.address}
                        </Text>
                     )}
                  </>
               )}
            </View>

            <Text style={{ ...Fonts.black20Bold, marginTop: 50 }}>
               Alamat Sekolah
            </Text>

            <View
               onLayout={(e) =>
                  setLayout({ ...layout, schoolProvince: e.nativeEvent.layout })
               }
            >
               <OnTapTextInput
                  placeholder="Propinsi"
                  value={schoolProvince !== null ? schoolProvince.provinsi : ""}
                  onTap={() => {
                     setShow({ ...show, schoolProvince: true });
                     setSchoolProvinceBottomSheetVisible(true);
                  }}
               />
               {show.schoolProvince && (
                  <>
                     {schoolProvince === null && (
                        <Text
                           style={{ fontSize: 12, color: "red", opacity: 0.5 }}
                        >
                           - {msg.schoolProvince}
                        </Text>
                     )}
                  </>
               )}
            </View>
            {schoolProvinceBottomSheetVisible && (
               <ProvinceBottomSheet
                  onClose={() => setSchoolProvinceBottomSheetVisible(false)}
                  onSelect={(value) => {
                     setSchoolProvinceBottomSheetVisible(false);
                     setSchoolProvince(value);
                     setSchoolCity(null);
                     setSchoolName(null);
                  }}
               />
            )}
            <View
               onLayout={(e) =>
                  setLayout({ ...layout, schoolCity: e.nativeEvent.layout })
               }
            >
               <OnTapTextInput
                  placeholder="Kab/Kota"
                  value={schoolCity !== null ? schoolCity.kabkota : ""}
                  onTap={() => {
                     if (schoolProvince === null) {
                        Alert.alert(
                           "Peringatan",
                           "Silakan memilih Propinsi terlebih dahulu"
                        );
                     } else {
                        setShow({ ...show, schoolCity: true });
                        setSchoolCityBottomSheetVisible(true);
                        setSchoolName(null);
                     }
                  }}
               />
               {show.schoolCity && (
                  <>
                     {schoolCity === null && (
                        <Text
                           style={{ fontSize: 12, color: "red", opacity: 0.5 }}
                        >
                           - {msg.schoolCity}
                        </Text>
                     )}
                  </>
               )}
            </View>
            {schoolCityBottomSheetVisible && (
               <CityBottomSheet
                  idProvinsi={
                     schoolProvince !== null
                        ? schoolProvince.idprovinsi.toString()
                        : null
                  }
                  onClose={() => setSchoolCityBottomSheetVisible(false)}
                  onSelect={(value) => {
                     setSchoolCityBottomSheetVisible(false);
                     setSchoolCity(value);
                  }}
               />
            )}
            <View
               onLayout={(e) =>
                  setLayout({ ...layout, schoolName: e.nativeEvent.layout })
               }
            >
               <OnTapTextInput
                  placeholder="Nama Sekolah"
                  value={schoolName}
                  onTap={() => {
                     if (kelas === null) {
                        toast.show({
                           title: "Peringatan",
                           status: "danger",
                           description: "Silahkan pilih kelas terlebih dahulu",
                           placement: "top",
                           width: Dimensions.get("screen").width / 1.3,
                        });
                     } else {
                        if (schoolCity === null) {
                           Alert.alert(
                              "Peringatan",
                              "Silakan memilih Kab/Kota terlebih dahulu"
                           );
                        } else {
                           setShow({ ...show, schoolName: true });
                           setSchoolNameBottomSheetVisible(true);
                        }
                     }
                  }}
               />

               {show.schoolName && (
                  <>
                     {schoolName === null && (
                        <Text
                           style={{ fontSize: 12, color: "red", opacity: 0.5 }}
                        >
                           - {msg.schoolName}
                        </Text>
                     )}
                  </>
               )}
               {schoolNameBottomSheetVisible && (
                  <SchoolBottomSheet
                     kelas={
                        Number(
                           kelas.split(" ")[0] > 0 && kelas.split(" ")[0] < 7
                        )
                           ? "SD"
                           : kelas.split(" ")[0] > 9
                           ? "SMA"
                           : "SMP"
                     }
                     idkabkota={
                        schoolCity !== null
                           ? schoolCity.idkabkota.toString()
                           : null
                     }
                     onClose={() => setSchoolNameBottomSheetVisible(false)}
                     onSelect={(value) => {
                        setSchoolNameBottomSheetVisible(false);
                        setSchoolName(value);
                     }}
                  />
               )}
            </View>

            <Text style={{ ...Fonts.black20Bold, marginTop: 50 }}>
               Informasi Wali
            </Text>
            <View
               onLayout={(e) =>
                  setLayout({ ...layout, waliName: e.nativeEvent.layout })
               }
            >
               <DefaultTextInput
                  placeholder="Nama Wali"
                  autoCapitalize="words"
                  value={waliName}
                  onFocus={(val) => setShow({ ...show, waliName: true })}
                  onChangeText={setWaliName}
               />
            </View>
            {show.waliName && (
               <>
                  {waliName === "" && (
                     <Text style={{ fontSize: 12, color: "red", opacity: 0.5 }}>
                        - {msg.waliName}
                     </Text>
                  )}
               </>
            )}
            <View
               onLayout={(e) =>
                  setLayout({ ...layout, waliPhone: e.nativeEvent.layout })
               }
            >
               <DefaultTextInput
                  placeholder="Nomor Telepon/HP Wali"
                  keyboardType="phone-pad"
                  value={waliPhone}
                  nomor={true}
                  valid={checkNomor(waliPhone)}
                  onFocus={(val) => setShow({ ...show, waliPhone: true })}
                  onChangeText={setWaliPhone}
               />
            </View>

            {show.waliPhone && (
               <>
                  {!checkNomor(waliPhone) &&
                     msg.phone.map((el, idx) => (
                        <Text
                           key={idx + "adaa"}
                           style={{ fontSize: 12, color: "red", opacity: 0.5 }}
                        >
                           - {el}
                        </Text>
                     ))}
               </>
            )}
            <View
               onLayout={(e) =>
                  setLayout({ ...layout, waliEmail: e.nativeEvent.layout })
               }
            >
               <DefaultTextInput
                  placeholder="Email Wali"
                  nomor={true}
                  valid={formatEmail(waliEmail)}
                  value={waliEmail}
                  onFocus={(val) => setShow({ ...show, waliEmail: true })}
                  onChangeText={setWaliEmail}
               />
            </View>
            {show.waliEmail && (
               <>
                  {!formatEmail(waliEmail) &&
                     msg.waliEmail.map((el, idx) => (
                        <Text
                           key={idx + "adaa"}
                           style={{ fontSize: 12, color: "red", opacity: 0.5 }}
                        >
                           - {el}
                        </Text>
                     ))}
               </>
            )}

            <View style={{ flexDirection: "row" }}>
               <View style={{ flex: 1, marginTop: 20 }}>
                  <Button
                     bg={
                        // email !== "" &&
                        // name !== "" &&
                        // checkNomor(phone) &&
                        // address !== "" &&
                        // waliName !== "" &&
                        // kelas !== null &&
                        // province !== null &&
                        // city !== null &&
                        // schoolProvince !== null &&
                        // schoolCity !== null &&
                        // schoolName !== null &&
                        // passwordValidations(password).valid &&
                        // password === repeatPassword &&
                        // formatEmail(waliEmail) &&
                        // checkNomor(waliPhone)
                        //   ? "amber.400"
                        //   : "amber.200"
                        "amber.400"
                     }
                     _pressed={{ bg: "amber.300" }}
                     // disabled={
                     //   email !== "" &&
                     //   name !== "" &&
                     //   checkNomor(phone) &&
                     //   address !== "" &&
                     //   waliName !== "" &&
                     //   kelas !== null &&
                     //   province !== null &&
                     //   city !== null &&
                     //   schoolProvince !== null &&
                     //   schoolCity !== null &&
                     //   schoolName !== null &&
                     //   passwordValidations(password).valid &&
                     //   password === repeatPassword &&
                     //   formatEmail(waliEmail) &&
                     //   checkNomor(waliPhone)
                     //     ? false
                     //     : true
                     // }
                     onPress={() => {
                        checkInternet().then((connection) => {
                           if (connection) {
                              if (name === "") {
                                 scrollRef.current?.scrollTo({
                                    y: layout.nama?.y,
                                    animated: true,
                                 });
                              } else if (!checkNomor(phone)) {
                                 scrollRef.current?.scrollTo({
                                    y: layout.phone?.y,
                                    animated: true,
                                 });
                              } else if (kelas === null) {
                                 scrollRef.current?.scrollTo({
                                    y: layout.kelas?.y,
                                    animated: true,
                                 });
                              } else if (!passwordValidations(password).valid) {
                                 scrollRef.current?.scrollTo({
                                    y: layout.password?.y,
                                    animated: true,
                                 });
                              } else if (
                                 password !== repeatPassword ||
                                 repeatPassword === ""
                              ) {
                                 scrollRef.current?.scrollTo({
                                    y: layout.repeatPassword?.y,
                                    animated: true,
                                 });
                              } else if (province === null) {
                                 scrollRef.current?.scrollTo({
                                    y: layout.province?.y,
                                    animated: true,
                                 });
                              } else if (city === null) {
                                 scrollRef.current?.scrollTo({
                                    y: layout.city?.y,
                                    animated: true,
                                 });
                              } else if (address === "") {
                                 scrollRef.current?.scrollTo({
                                    y: layout.address?.y,
                                    animated: true,
                                 });
                              } else if (schoolProvince === null) {
                                 scrollRef.current?.scrollTo({
                                    y: layout.schoolProvince?.y,
                                    animated: true,
                                 });
                              } else if (schoolCity === null) {
                                 scrollRef.current?.scrollTo({
                                    y: layout.schoolCity?.y,
                                    animated: true,
                                 });
                              } else if (schoolName === null) {
                                 scrollRef.current?.scrollTo({
                                    y: layout.schoolName?.y,
                                    animated: true,
                                 });
                              } else if (waliName === "") {
                                 scrollRef.current?.scrollTo({
                                    y: layout.waliName?.y,
                                    animated: true,
                                 });
                              } else if (!checkNomor(waliPhone)) {
                                 scrollRef.current?.scrollTo({
                                    y: layout.waliPhone?.y,
                                    animated: true,
                                 });
                              } else if (!formatEmail(waliEmail)) {
                                 scrollRef.current?.scrollTo({
                                    y: layout.waliEmail?.y,
                                    animated: true,
                                 });
                              } else {
                                 const bodyParams = JSON.stringify({
                                    email: email,
                                    full_name: name,
                                    kelas: kelas,
                                    role: role,
                                    phone: phone,
                                    provinsi:
                                       province !== null
                                          ? province.provinsi
                                          : "",
                                    kota: city !== null ? city.kabkota : "",
                                    alamat: address,
                                    provinsi_sekolah:
                                       schoolProvince !== null
                                          ? schoolProvince.provinsi
                                          : "",
                                    kota_sekolah:
                                       schoolCity !== null
                                          ? schoolCity.kabkota
                                          : "",
                                    sekolah: schoolName,
                                    password: password,
                                    password_comparison: repeatPassword,
                                    nama_wali: waliName,
                                    email_wali: waliEmail,
                                    phone_wali: waliPhone,
                                 });

                                 dispatch(getRegister(bodyParams));
                              }
                           } else {
                              toast.show({
                                 placement: "top",
                                 duration: null,
                                 width: Dimensions.get("screen").width / 1.3,
                                 render: () => {
                                    return (
                                       <ToastErrorContent
                                          content="Kamu tidak terhubung ke internet"
                                          onPress={() => {
                                             toast.closeAll();
                                             navigation.goBack();
                                          }}
                                       />
                                    );
                                 },
                              });
                           }
                        });
                     }}
                  >
                     <Text
                        style={{
                           fontSize: 20,
                           marginVertical: 8,
                           fontWeight: "bold",
                        }}
                     >
                        Daftar
                     </Text>
                  </Button>
               </View>
            </View>

            {register.loading && <LoadingModal />}
            {register.data !== null && (
               <DefaultModal>
                  <Text
                     style={{
                        marginBottom: Sizes.fixPadding * 0.2,
                        textAlign: "center",
                        fontSize: 18,
                        fontWeight: "bold",
                     }}
                  >
                     Berhasil Registrasi
                  </Text>
                  <Text
                     style={{
                        marginBottom: Sizes.fixPadding * 1,
                        textAlign: "center",
                        fontSize: 15,
                     }}
                  >
                     Cek email kamu untuk verifikasi ya :)
                  </Text>
                  <DefaultPrimaryButton
                     text="Kembali ke Halaman Login"
                     onPress={() => {
                        navigation.goBack();
                        navigation.goBack();
                     }}
                  />
               </DefaultModal>
            )}
         </View>
      </KeyboardAwareScrollView>
   );
};

export default RegisterContent;
