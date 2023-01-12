import { useNavigation, useIsFocused } from "@react-navigation/core";
import React, {
  useCallback,
  useEffect,
  useState,
  useLayoutEffect,
} from "react";

import { LogBox, Platform, Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Carousel from "react-native-snap-carousel";
import ProductCard from "../../../Components/ProductCard";
import Fonts from "../../../Theme/Fonts";
import Sizes from "../../../Theme/Sizes";
import Colors from "../../../Theme/Colors";
import HomeCarousel from "./HomeCarousel";
import HomeMenu from "./HomeMenu";
import dynamicLinks from "@react-native-firebase/dynamic-links";
import HomePendingPayment from "./HomePendingPayment";
import { useSelector } from "react-redux";
import HomePendingIos from "./HomePendingIos";
import Aktivitas from "./Aktivitas";

import firestore from "@react-native-firebase/firestore";
import PendingTryout from "./PendingTryout";
import ModalCountDown from "./ModalCountDown";
import ModalFinish from "./ModalFinish";
import LoadingIndicator from "../../../Components/Indicator/LoadingIndicator";
import VideoTest from "./VideoTest";
import OneSignal from "react-native-onesignal";
import ModalValid from "./ModalValid";

import { getUniqueId } from "react-native-device-info";

const products = [
  { id: 1, title: "a" },
  { id: 2, title: "a" },
  { id: 3, title: "a" },
  { id: 4, title: "a" },
];

const HomeContent = (props) => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const isLogin = useSelector((state) => state.authReducer.isLogin);
  const { newTransIos } = useSelector((state) => state.initReducer);
  const token = useSelector((state) => state.authReducer.token);
  const urlBase = useSelector((state) => state.initReducer.baseUrl);
  const [tryout, setTryout] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState(false);
  const profile = useSelector((state) => state.profileReducer.profile);
  const [soal, setSoal] = useState({});
  const [sesi, setSesi] = useState(null);
  const [waktu, setWaktu] = useState(null);
  const [finish, setFinish] = useState(false);
  const [firestoreTime, setFirestoreTime] = useState(null);
  const [timeOpen, setTimeOpen] = useState(null);
  const [valid, setValid] = useState(true);

  useEffect(async () => {
    console.log(isLogin, "<<<login");
    setLoading(true);
    if (isFocused) {
      try {
        const response = await fetch(
          urlBase + "/masterdata/v1/tryouts?status=touched",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await response.json();
        if (result.status) setTryout(result.data);
        else setTryout([]);
        console.log(result);
        setLoading(false);
      } catch (err) {
        setTryout([]);
        console.log(err);
      }
      if (isLogin && profile) {
        setLoading(true);
        getUniqueId().then((uniqueId) => {
          console.log(uniqueId, "<<<<unique id");
          firestore()
            .collection("Jawaban")
            .where("user_id", "==", profile._id)
            .get()
            .then((querySnapshot) => {
              if (querySnapshot.docs.length > 0) {
                let temp = querySnapshot.docs[0].data();
                if (temp.playerId === uniqueId) {
                  setValid(true);
                  setFirestoreTime(temp.time);
                  setTimeOpen(temp.firstOpen);
                  setSoal({
                    title: temp.title,
                    soalUrl: temp.soalUrl,
                    blockTime: temp.blockTime,
                  });
                  let now = new Date();
                  let int = (now.getTime() - temp.firstOpen[temp.sesi]) / 1000;
                  if (int < temp.time[temp.sesi]) {
                    setSesi(temp.sesi);
                    setWaktu(temp.time[temp.sesi] - int);
                  } else {
                    setSesi(temp.sesi + 1);
                  }
                  setPending(true);
                } else {
                  setValid(false);
                }
              } else {
                setFinish(false);
                setPending(false);
              }
            })
            .finally(() => {
              setLoading(false);
            });
        });
      }
    }

    return () => {
      setTryout([]);
      setLoading(true);
      setPending(false);
      setSoal({});
      setWaktu(null);
      setSesi(null);
      setFinish(false);
      setFirestoreTime(null);
      setTimeOpen(null);
      setValid(true);
    };
  }, [isFocused, isLogin]);

  useEffect(() => {
    setLoading(true);
  }, [props.currentIndex]);

  useEffect(() => {
    if (firestoreTime) {
      setLoading(true);
      if (sesi > 0 && sesi < firestoreTime.length) {
        let now = new Date();
        let temp = (now.getTime() - timeOpen[sesi]) / 1000;
        console.log(temp);
        if (temp < firestoreTime[sesi]) {
          setWaktu(firestoreTime[sesi] - temp);
          console.log(firestoreTime[sesi] - temp);
        } else {
          setSesi(sesi + 1);
        }
        setFinish(false);
      } else if (sesi === firestoreTime.length) {
        setFinish(true);
      }
      setLoading(false);
    }
  }, [sesi]);

  const sectionHeader = (title) => {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={{ ...Fonts.black20Bold, flex: 1 }}>{title}</Text>

        <TouchableOpacity activeOpacity={0.8}>
          <Text style={{ ...Fonts.orangeColor14Bold }}>Lihat Semua</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      {loading ? (
        <LoadingIndicator from={"home"} />
      ) : (
        <View style={{ flex: 1 }}>
          {isLogin && !loading && tryout.length > 0 && (
            <Aktivitas tryout={tryout} />
          )}

          {isLogin ? (
            <>
              {Platform.OS === "android" ? (
                <HomePendingPayment />
              ) : (
                <HomePendingIos />
              )}
              {!loading && (
                <>
                  <HomeMenu loading={loading} />
                  <HomeCarousel />
                </>
              )}
            </>
          ) : (
            <>
              <HomeMenu loading={loading} />
              <HomeCarousel />
            </>
          )}
          {!valid && <ModalValid setValid={setValid} />}
          {pending && !finish && (
            <ModalCountDown
              setFinish={setFinish}
              setPending={setPending}
              soal={soal}
              setSesi={setSesi}
              sesi={sesi}
              waktu={waktu}
            />
          )}
          {finish && (
            <ModalFinish
              setFinish={setFinish}
              setPending={setPending}
              soal={soal}
            />
          )}
          {/* <View>
         {sectionHeader("Materi Baru")}

         <FlatList
             keyExtractor={(item) => `${item.id}`}
             horizontal={true}
             showsHorizontalScrollIndicator={false}
             renderItem={(item) => <ProductCard />}
             data={products}
             contentContainerStyle={{
                 paddingHorizontal: Sizes.fixPadding,
                 paddingTop: Sizes.fixPadding * 2.0,
                 paddingBottom: Sizes.fixPadding * 4.0,
             }}
         />
     </View>

     <View>
         {sectionHeader("Materi Populer")}
         <FlatList
             keyExtractor={(item) => `${item.id}`}
             horizontal={true}
             showsHorizontalScrollIndicator={false}
             renderItem={(item) => <ProductCard />}
             data={products}
             contentContainerStyle={{
                 paddingHorizontal: Sizes.fixPadding,
                 paddingTop: Sizes.fixPadding * 2.0,
                 paddingBottom: Sizes.fixPadding * 4.0,
             }}
         />
     </View> */}
        </View>
      )}
    </>
  );
};

export default HomeContent;
