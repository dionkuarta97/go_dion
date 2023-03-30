import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../Theme/Colors";
import { useNavigation } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import { getCarts } from "../../Redux/Cart/cartActions";

const ActionButtonCart = (props) => {
   const { from } = props;
   const cart = useSelector((state) => state.cartReducer.cart);
   const carts = useSelector((state) => state.cartReducer.carts);
   const dispatch = useDispatch();
   const navigation = useNavigation();
   useEffect(() => {
      dispatch(getCarts());
   }, []);

   return (
      <View>
         <View style={{ position: "relative" }}>
            <MaterialIcons
               name="shopping-cart"
               size={25}
               color="black"
               onPress={() => {
                  navigation.navigate("CartScreen", {
                     from: from ? from : null,
                  });
               }}
            />
         </View>
         {carts.data !== null && (
            <View
               style={{
                  position: "absolute",
                  width: 18,
                  height: 18,
                  backgroundColor: Colors.orangeColor,
                  right: -9,
                  top: -9,
                  borderRadius: 9,
                  justifyContent: "center",
                  alignItems: "center",
               }}
            >
               <Text style={{ fontSize: 10 }}>{carts.data.length}</Text>
            </View>
         )}
      </View>
   );
};

export default ActionButtonCart;
