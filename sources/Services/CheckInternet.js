import React from "react";

import NetInfo from "@react-native-community/netinfo";

const checkInternet = () => {
  return new Promise((resolve, reject) => {
    NetInfo.fetch().then((state) => {
      resolve(state.isConnected);
    });
  });
};

export default checkInternet;
