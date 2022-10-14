import { useNavigation } from "@react-navigation/native";
import { useToast } from "native-base";
import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, Alert, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import DefaultPrimaryButton from "../../Components/Button/DefaultPrimaryButton";
import OnTapTextInput from "../../Components/CustomTextInput/OnTapTextInput";
import NewModalLoading from "../../Components/Modal/NewLoadingModal";
import ToastErrorContent from "../../Components/ToastErrorContent";
import {
  getUpdateProfile,
  setUpdateProfile,
} from "../../Redux/Profile/profileActions";
import checkInternet from "../../Services/CheckInternet";
import Fonts from "../../Theme/Fonts";
import SelectJurusan from "./Component/SelectJurusan";
import SelectJurusanDua from "./Component/SelectJurusanDua";
import SelectUniversitas from "./Component/SelectUniversitas";
import SelectUniversitasDua from "./Component/SelectUniversitasDua";

const PilihProdiScreen = (props) => {
  const navigation = useNavigation();
  const toast = useToast();
  const { profile } = props.route.params;
  const dispatch = useDispatch();
  const update = useSelector((state) => state.profileReducer.updateProfile);
  const [showShetUniversitas, setShowShetUniversitas] = useState(false);
  const [showShetUniversitasDua, setShowShetUniversitasDua] = useState(false);
  const [pilihanSatu, setPilihanSatu] = useState({
    universitas: null,
    universitas_id: null,
    jurusan_id: null,
    jurusan: null,
    passing_grade: null,
  });
  const [pilihanDua, setPilihanDua] = useState({
    universitas: null,
    universitas_id: null,
    jurusan_id: null,
    jurusan: null,
    passing_grade: null,
  });
  const [showJurusanDua, setShowJurusanDua] = useState(false);
  const [showShetJurusanDua, setShowShetJurusanDua] = useState(false);
  const [idUniversitasDua, setIdUniversitasDua] = useState(null);
  const [showJurusan, setShowJurusan] = useState(false);
  const [showShetJurusan, setShowShetJurusan] = useState(false);
  const [idUniversitas, setIdUniversitas] = useState(null);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    if (update.data) {
      if (props.route.params.from !== undefined) {
        navigation.popToTop();
        navigation.navigate("GoTryoutScreen");
        toast.show({
          title: "Berhasil",
          status: "success",
          description: "Berhasil pilih prodi",
          placement: "top",
          width: Dimensions.get("screen").width / 1.3,
        });
      } else {
        navigation.popToTop();
        navigation.navigate("ProfileScreen");
        toast.show({
          title: "Berhasil",
          status: "success",
          description: "Berhasil pilih prodi",
          placement: "top",
          width: Dimensions.get("screen").width / 1.3,
        });
      }

      dispatch(setUpdateProfile({ data: null, loading: false, error: null }));
    }
  }, [update.data]);
  useEffect(() => {
    if (update.data !== null) {
      if (update.loading) {
        setShowModal(true);
      } else {
        setShowModal(false);
      }
    }
  }, [update.loading]);

  useEffect(() => {
    if (pilihanSatu.universitas !== null) {
      setPilihanSatu({ ...pilihanSatu, jurusan: null, passing_grade: null });
    }
  }, [pilihanSatu.universitas]);
  useEffect(() => {
    if (pilihanDua.universitas !== null) {
      setPilihanDua({ ...pilihanDua, jurusan: null, passing_grade: null });
    }
  }, [pilihanDua.universitas]);
  console.log(JSON.stringify(pilihanSatu));
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <DefaultAppBar title="Pilih Prodi" backEnabled={true} />
        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: 20,
          }}
        >
          <Text
            style={{
              color: "red",
            }}
          >
            * Saat ini pilihan prodi tidak dapat diubah
          </Text>
        </View>
        <ScrollView>
          <View
            style={{
              marginTop: 20,
              marginHorizontal: 20,
              padding: 20,
              backgroundColor: "white",
              elevation: 3,
              borderRadius: 8,
            }}
          >
            <Text
              style={{
                ...Fonts.black17Bold,
                alignSelf: "center",
              }}
            >
              Pilihan Satu
            </Text>
            <OnTapTextInput
              value={
                pilihanSatu.universitas
                  ? pilihanSatu.universitas
                  : "--UNIVERSITAS--"
              }
              onTap={() => setShowShetUniversitas(true)}
            />
            {showJurusan && (
              <OnTapTextInput
                value={
                  pilihanSatu.jurusan ? pilihanSatu.jurusan : "--JURUSAN--"
                }
                onTap={() => setShowShetJurusan(true)}
              />
            )}
            {pilihanSatu.passing_grade && (
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  marginHorizontal: 60,
                }}
              >
                <Text style={{ ...Fonts.black15Bold }}>Passing Grade</Text>
                <Text style={{ ...Fonts.black15Bold }}>
                  {pilihanSatu.passing_grade}
                </Text>
              </View>
            )}
          </View>

          {pilihanSatu.passing_grade && (
            <View
              style={{
                marginTop: 20,
                marginHorizontal: 20,
                padding: 20,
                backgroundColor: "white",
                elevation: 3,
                borderRadius: 8,
              }}
            >
              <Text
                style={{
                  ...Fonts.black17Bold,
                  alignSelf: "center",
                }}
              >
                Pilihan Dua
              </Text>
              <OnTapTextInput
                value={
                  pilihanDua.universitas
                    ? pilihanDua.universitas
                    : "--UNIVERSITAS--"
                }
                onTap={() => setShowShetUniversitasDua(true)}
              />
              {showJurusanDua && (
                <OnTapTextInput
                  value={
                    pilihanDua.jurusan ? pilihanDua.jurusan : "--JURUSAN--"
                  }
                  onTap={() => setShowShetJurusanDua(true)}
                />
              )}
              {pilihanDua.passing_grade && (
                <View
                  style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                    marginHorizontal: 60,
                  }}
                >
                  <Text style={{ ...Fonts.black15Bold }}>Passing Grade</Text>
                  <Text style={{ ...Fonts.black15Bold }}>
                    {pilihanDua.passing_grade}
                  </Text>
                </View>
              )}
            </View>
          )}
          {pilihanDua.passing_grade && (
            <View
              style={{
                marginTop: 20,
                padding: 25,
              }}
            >
              <DefaultPrimaryButton
                text="Simpan Pilihan"
                onPress={() => {
                  checkInternet().then((data) => {
                    if (data) {
                      Alert.alert(
                        "Peringatan",
                        "Setelah menentukan prodi, kamu tidak dapat mengubahnya lagi.\n\nPastikan kamu memilih prodi yang sesuai.",
                        [
                          { text: "TIDAK", onPress: () => {} },
                          {
                            text: "YA",
                            onPress: () => {
                              let program_studi = [pilihanSatu, pilihanDua];
                              let data = { ...profile, program_studi };
                              dispatch(getUpdateProfile(JSON.stringify(data)));
                            },
                          },
                        ]
                      );
                    } else {
                      toast.show({
                        placement: "top",
                        duration: null,
                        width: Dimensions.get("screen").width / 1.3,
                        render: () => {
                          return (
                            <ToastErrorContent
                              content="Kamu tidak terhubung ke interet"
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
              />
            </View>
          )}
        </ScrollView>

        {showShetUniversitas && (
          <SelectUniversitas
            onClose={() => setShowShetUniversitas(false)}
            onSelect={(val) => {
              setPilihanSatu({
                ...pilihanSatu,
                universitas: val.title,
                universitas_id: val.id,
              });
              setIdUniversitas(val.id);
              setShowShetUniversitas(false);
              setShowJurusan(true);
            }}
          />
        )}
        {showShetJurusan && (
          <SelectJurusan
            idUniversitas={idUniversitas}
            onClose={() => setShowShetJurusan(false)}
            onSelect={(val) => {
              setPilihanSatu({
                ...pilihanSatu,
                jurusan: val.title,
                jurusan_id: val.id,
                passing_grade: val.passing_grade,
              });
              setShowShetJurusan(false);
            }}
          />
        )}
        {showShetUniversitasDua && (
          <SelectUniversitasDua
            onClose={() => setShowShetUniversitasDua(false)}
            onSelect={(val) => {
              setPilihanDua({
                ...pilihanDua,
                universitas: val.title,
                universitas_id: val.id,
              });
              setIdUniversitasDua(val.id);
              setShowShetUniversitasDua(false);
              setShowJurusanDua(true);
            }}
          />
        )}
        {showShetJurusanDua && (
          <SelectJurusanDua
            idUniversitas={idUniversitasDua}
            onClose={() => setShowShetJurusanDua(false)}
            onSelect={(val) => {
              setPilihanDua({
                ...pilihanDua,
                jurusan: val.title,
                jurusan_id: val.id,
                passing_grade: val.passing_grade,
              });
              setShowShetJurusanDua(false);
            }}
          />
        )}
        <NewModalLoading modalVisible={showModal} />
      </SafeAreaView>
    </>
  );
};

export default PilihProdiScreen;
