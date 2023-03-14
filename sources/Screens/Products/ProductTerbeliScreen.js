import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, useToast, Text, Box, HStack, Button } from "native-base";
import ToastErrorContent from "../../Components/ToastErrorContent";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import checkInternet from "../../Services/CheckInternet";
import { getGroupedProduk } from "../../Redux/Produk/produkActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Dimensions, SafeAreaView } from "react-native";
import LoadingIndicator from "../../Components/Indicator/LoadingIndicator";

const TotalProduk = ({ _id }) => {
  const [total, setTotal] = useState(0);
  const baseUrl = useSelector((state) => state.initReducer.baseUrl);
  const token = useSelector((state) => state.authReducer.token);

  useEffect(() => {
    fetch(baseUrl + `/masterdata/v1/products/${_id}/purchased/count`, {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status) {
          console.log(JSON.stringify(json.data.tota, null, 2));
          setTotal(json.data.total);
        } else {
          setTotal("err");
        }
      })
      .catch(() => {
        setTotal("err");
      });
  }, []);

  return <Text>( {total} )</Text>;
};

const ProductTerbeliScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const toast = useToast();
  const groupedProduk = useSelector(
    (state) => state.produkReducer.groupedProduk
  );

  useLayoutEffect(() => {
    checkInternet().then((data) => {
      if (data) {
        dispatch(getGroupedProduk());
      } else {
        toast.show({
          placement: "top",
          duration: null,
          width: Dimensions.get("screen").width / 1.3,
          render: ({ id }) => {
            return (
              <>
                <ToastErrorContent
                  content="Kamu tidak terhubung ke internet"
                  onPress={() => {
                    toast.closeAll();
                    navigation.goBack();
                  }}
                />
              </>
            );
          },
        });
      }
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DefaultAppBar backEnabled={true} title="Produk Terbeli" />
      {groupedProduk.loading ? (
        <View flex={1}>
          <LoadingIndicator />
        </View>
      ) : groupedProduk.error ? (
        <View flex={1}>
          <Text>{groupedProduk.error}</Text>
        </View>
      ) : (
        <View flex={1} paddingX={2} paddingTop={5}>
          {groupedProduk.data && (
            <>
              {groupedProduk.data.map(
                (el, idx) =>
                  idx !== 2 && (
                    <Button
                      marginBottom={2}
                      key={idx}
                      shadow={2}
                      bg={"white"}
                      _pressed={{ bg: "gray.100" }}
                      justifyContent={"flex-start"}
                      onPress={() =>
                        navigation.navigate("ProductPurchasedScreen", {
                          id: el._id,
                        })
                      }
                    >
                      <HStack>
                        <View
                          style={{
                            marginEnd: Dimensions.get("screen").width / 2.1,
                            width: Dimensions.get("screen").width / 3,
                          }}
                        >
                          <Text fontSize={17}>
                            {idx === 0 ? "Materi Belajar" : "Produk Tryout"}
                          </Text>
                        </View>
                        <TotalProduk _id={el._id} />
                      </HStack>
                    </Button>
                  )
              )}
            </>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

export default ProductTerbeliScreen;
