/**
 * base url dengan Kong
 */

export const urlBaseMock = "https://apionline.gobimbelonline.net/moc";
export const urlBaseMasterdata =
    "https://apionline.gobimbelonline.net/masterdata/v1";
export const urlBasePurchase =
    "https://apionline.gobimbelonline.net/purchase/v1";
export const urlBaseScoring = "https://apionline.gobimbelonline.net/scoring/v1";

/*** AUTH URL */
export const urlLogin = urlBaseMasterdata + "/login";
export const urlCheckEmail = urlBaseMasterdata + "/check-email";
export const urlRegister = urlBaseMasterdata + "/register";
export const urlForgotPassword = urlBaseMasterdata + "/fp/recovery";

/*** DATA URL */
export const urlWilayah = urlBaseMasterdata + "/master/wilayah";
export const urlProvinsi = urlWilayah + "/provinsi";
export const urlCommon = urlBaseMasterdata + "/master/common";
export const urlKelas = urlBaseMasterdata + "/grades";

/*** PROFILE URL */
export const urlMe = urlBaseMasterdata + "/auth/me";
export const urlUpdateMe = urlBaseMasterdata + "/auth/me/update";

/*** HOME URL */
export const urlHomeMenu = urlBaseMasterdata + "/home/menu";

/*** PRODUK URL */
export const urlGroupedProduk = urlBaseMasterdata + "/products";

/*** PAYMENT URL */
export const urlPayment = urlBasePurchase + "/payments";
export const urlPaymentMethod = urlBasePurchase + "/payments/method";
export const urlPaymentProcess = urlBasePurchase + "/payments/process";
